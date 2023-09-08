import frappe
import json
import os


@frappe.whitelist(allow_guest=True)
def get_apis_for_project(project_branch: str):
    '''
        Gets the Project Branch document with the organization and app name
    '''
    branch_doc = frappe.get_doc("Commit Project Branch", project_branch)

    apis = json.loads(branch_doc.whitelisted_apis).get("apis", [])

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
def get_file_content_from_path(project_branch: str, file_path: str):
    '''
        Gets the Project Branch document with the organization and app name
    '''
    branch_doc = frappe.get_doc("Commit Project Branch", project_branch)

    api_data = json.loads(branch_doc.whitelisted_apis)['apis']

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
            file_content = file_content.read()
            return {
            "file_content": file_content
            }
        else:
            frappe.throw("File not found")