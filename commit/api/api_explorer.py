import frappe
import json
import os
from commit.commit.code_analysis.apis import find_all_occurrences_of_whitelist


@frappe.whitelist(allow_guest=True)
def get_apis_for_project(project_branch: str):
    '''
        Gets the Project Branch document with the organization and app name
    '''
    branch_doc = frappe.get_doc("Commit Project Branch", project_branch)

    apis = json.loads(branch_doc.whitelisted_apis).get("apis", []) if branch_doc.whitelisted_apis else []
    documentation = json.loads(branch_doc.documentation).get("apis", []) if branch_doc.documentation else []
    print('documentation', len(documentation))
    for api in apis:
        # find the documentation for the api whose function_name equals to name and path same as path
        for doc in documentation:
            if doc.get("function_name") == api.get("name") and doc.get("path") == api.get("api_path"):
                api["documentation"] = doc.get("documentation")
                break
            
    app_name, organization, app_logo = frappe.db.get_value("Commit Project", branch_doc.project, ["app_name", "org", "image"])
    organization_name, org_logo, organization_id = frappe.db.get_value("Commit Organization", organization, ["organization_name", "image", "name"])

    return {
        "apis": apis,
        "app_name": app_name,
        "organization_name": organization_name,
        "organization_id": organization_id,
        "app_logo": app_logo,
        "org_logo": org_logo,
        "branch_name": branch_doc.branch_name,
        "project_branch": branch_doc.name,
        "last_updated": branch_doc.last_fetched
    }


@frappe.whitelist(allow_guest=True)
def get_file_content_from_path(project_branch: str, file_path: str,block_start: int, block_end: int,viewer_type: str):
    '''
        Gets the Project Branch document with the organization and app name
    '''
    if viewer_type == "project":
        branch_doc = frappe.get_doc("Commit Project Branch", project_branch)

        api_data = json.loads(branch_doc.whitelisted_apis)['apis']
    else:
        app_path = frappe.get_app_path(project_branch)

        # remove last part of the path which is the app name
        app_path = app_path.rsplit('/', 1)[0]
        api_data = find_all_occurrences_of_whitelist(app_path,project_branch)

    found = False

    for api in api_data:
        if api['file'] == file_path:
            found = True
            break

    if not found:
        frappe.throw("File not found-")
    else:
        if os.path.isfile(file_path):
            file_content = open(file_path, 'r')
            file_content = file_content.readlines()
            # fetch the block
            file_content = file_content[block_start:block_end]
            return {
            "file_content": file_content
            }
        else:
            frappe.throw("File not found")