import json
from collections import Counter

import frappe

from commit.commit.code_analysis.apis import find_all_occurrences_of_whitelist


def _python_type_to_openapi_type(type_hint: str) -> dict:
    """
    Map a simple Python type hint string to an OpenAPI schema.
    Falls back to string when unsure.
    """
    if not type_hint:
        return {"type": "string"}

    normalized = type_hint.strip().lower()

    if normalized in {"int", "integer"}:
        return {"type": "integer"}
    if normalized in {"float", "decimal"}:
        return {"type": "number", "format": "float"}
    if normalized in {"bool", "boolean"}:
        return {"type": "boolean"}
    if normalized in {"list", "tuple", "set"}:
        return {"type": "array", "items": {"type": "string"}}
    if normalized in {"dict", "mapping"}:
        return {"type": "object"}

    return {"type": "string"}


def _get_duplicate_api_names(apis: list) -> set:
    """Return set of API names that appear more than once (so we can disambiguate summary)."""
    names = [api.get("name") or "" for api in apis if api.get("api_path")]
    counts = Counter(names)
    return {n for n, c in counts.items() if c > 1}


def _summary_for_api(api: dict, duplicate_names: set) -> str:
    """Unique summary: name, or 'name - (module)' when name is duplicate."""
    name = api.get("name") or api.get("api_path") or ""
    if not name:
        return api.get("api_path", "")
    if name not in duplicate_names:
        return name
    # Disambiguate with module path (api_path without last segment). Use one separator
    # to avoid " - (module)" becoming " - -module-" when tools sanitize for file names.
    api_path = api.get("api_path", "")
    parts = api_path.rsplit(".", 1)
    file_name = parts[0] if len(parts) == 2 else api_path
    return f"{name} · {file_name}"


def _build_operation_for_api(api: dict, duplicate_names: set | None = None) -> dict:
    """
    Build the OpenAPI operation object for a single API (summary, parameters, responses, security).
    Returns the operation dict that can be placed under a path and method (get, post, etc.).
    """
    duplicate_names = duplicate_names or set()
    api_path = api.get("api_path", "")
    arguments = api.get("arguments") or []
    documentation = api.get("documentation") or ""

    parameters = []
    for arg in arguments:
        name = arg.get("argument")
        if not name or name in {"self", "cls"}:
            continue
        schema = _python_type_to_openapi_type(arg.get("type", ""))
        required = arg.get("default", "") == ""
        parameters.append(
            {
                "name": name,
                "in": "query",
                "required": required,
                "schema": schema,
            }
        )

    summary = _summary_for_api(api, duplicate_names)
    operation = {
        "summary": summary,
        "description": documentation or "",
        "operationId": api_path.replace(".", "_"),
        "parameters": parameters,
        "responses": {
            "200": {
                "description": "Successful response",
            }
        },
    }
    if api.get("allow_guest"):
        operation["security"] = []

    return operation


def _build_path_item_for_api(
    api: dict, duplicate_names: set | None = None
) -> tuple[str, dict]:
    """
    Build the OpenAPI path and path-item (method -> operation) for a single API.
    Returns (path_string, path_item) where path_item is e.g. {"get": {...}, "post": {...}}.
    """
    api_path = api.get("api_path")
    if not api_path:
        return "", {}

    path = f"/api/method/{api_path}"
    request_types = api.get("request_types") or ["GET"]
    operation = _build_operation_for_api(api, duplicate_names)
    path_item = {}
    for method in request_types:
        method_lower = (method or "GET").lower()
        if method_lower not in path_item:
            path_item[method_lower] = dict(operation)
    return path, path_item


def get_openapi_for_single_api(api: dict) -> dict:
    """
    Return the OpenAPI paths object for a single API.
    Use this to get the OpenAPI representation of one whitelisted API (e.g. to expose or merge elsewhere).
    """
    path, path_item = _build_path_item_for_api(api)
    if not path:
        return {}
    return {path: path_item}


def _build_paths_from_apis(apis: list) -> dict:
    """
    Build OpenAPI paths from Commit's internal API discovery objects.
    One pass to find duplicate API names; summaries become 'name - (module)' only when duplicated.
    """
    duplicate_names = _get_duplicate_api_names(apis)
    paths: dict = {}
    for api in apis:
        path, path_item = _build_path_item_for_api(api, duplicate_names)
        if not path:
            continue
        if path not in paths:
            paths[path] = {}
        for method_lower, operation in path_item.items():
            if method_lower in paths[path]:
                continue
            paths[path][method_lower] = operation
    return paths


def _get_apis_from_project_branch(project_branch: str) -> list:
    """
    Collect API definitions for a single Commit Project Branch (from stored whitelisted_apis).
    """
    branch_doc = frappe.get_cached_doc("Commit Project Branch", project_branch)
    apis = (
        json.loads(branch_doc.whitelisted_apis).get("apis", [])
        if branch_doc.whitelisted_apis
        else []
    )
    documentation = (
        json.loads(branch_doc.documentation).get("apis", [])
        if branch_doc.documentation
        else []
    )
    for api in apis:
        for doc in documentation:
            if isinstance(doc, str):
                try:
                    doc = json.loads(doc)
                except json.JSONDecodeError:
                    continue
            if doc.get("function_name") == api.get("name") and doc.get(
                "path"
            ) == api.get("api_path"):
                api["documentation"] = doc.get("documentation")
                break
    return apis


def _get_request_base_url() -> str:
    """Return the current request's base URL (scheme + host) so the OpenAPI spec has a default server."""
    try:
        return frappe.utils.get_url().rstrip("/")
    except Exception:
        return "https://your-frappe-site.com"


def _build_openapi_document(
    apis: list,
    title: str | None = None,
    description: str | None = None,
) -> dict:
    """
    Build a minimal OpenAPI 3.0 document from Commit's API discovery data.
    """
    site_name = frappe.local.site if getattr(frappe.local, "site", None) else "Commit"
    default_title = f"Commit API - {site_name}"
    default_description = (
        "Automatically generated OpenAPI definition for Frappe whitelisted methods."
    )
    base_url = _get_request_base_url()

    return {
        "openapi": "3.0.0",
        "info": {
            "title": title or default_title,
            "version": frappe.get_hooks().get("app_version", ["0.0.0"])[0],
            "description": description or default_description,
        },
        "servers": [{"url": base_url, "description": "Frappe site"}],
        "paths": _build_paths_from_apis(apis),
        "components": {
            "securitySchemes": {
                "UserKey": {
                    "type": "apiKey",
                    "in": "header",
                    "name": "Authorization",
                    "description": "Frappe user API key / token or session cookie.",
                }
            }
        },
        "security": [{"UserKey": []}],
    }


@frappe.whitelist(allow_guest=True)
def get_openapi_definition_installed_apps(app_name: str | None = None) -> dict:
    """
    Return an OpenAPI 3.0 definition for Installed Apps only.

    - When app_name is provided, only that app's whitelisted APIs are included.
    - When app_name is omitted, all installed apps on the current site are included.

    Use this for APIs discovered from apps in Installed Applications.
    """
    if not app_name:
        frappe.throw("App name is required.")

    app_path = frappe.get_app_path(app_name)
    if not app_path:
        frappe.throw(f"App {app_name} is not installed on this site.")
    root_path = app_path.rsplit("/", 1)[0]
    apis = find_all_occurrences_of_whitelist(root_path, app_name)
    title = f"{app_name}'s OpenAPI Definition"

    return _build_openapi_document(
        apis,
        title=title,
        description=f"OpenAPI definition for whitelisted methods for {app_name}.",
    )


@frappe.whitelist(allow_guest=True)
def get_openapi_definition_project_apps(project_branch: str | None = None) -> dict:
    """
    Return an OpenAPI 3.0 definition for Project Apps (Commit Project Branch) only.

    - When project_branch is provided, only that branch's APIs are included.
    - When project_branch is omitted, all Commit Project Branch documents on the site are included.

    Use this for APIs from project branches (stored whitelisted_apis).
    """
    if not project_branch:
        frappe.throw("Project branch is required.")

    if not frappe.db.exists("Commit Project Branch", project_branch):
        frappe.throw(f"Project branch {project_branch} does not exist.")

    project_branch_doc = frappe.get_cached_doc("Commit Project Branch", project_branch)
    apis = _get_apis_from_project_branch(project_branch)
    title = f"{project_branch_doc.app_name}'s OpenAPI Definition"

    return _build_openapi_document(
        apis,
        title=title,
        description=f"OpenAPI definition for whitelisted methods for {project_branch_doc.app_name} ({project_branch_doc.branch_name}).",
    )
