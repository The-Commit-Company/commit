import frappe
from commit.api.github import get_file_in_repo, get_all_files_in_repo, search_for_file_in_repo
from commit.utils.conversions import convert_module_name
from commit.utils.api_analysis import get_api_details_from_file_contents
access_token = "*"

@frappe.whitelist(allow_guest=True)
def get_name_of_app(organization, repo):
    '''
    Get name of app from repo
    '''
    type = None
    app_name = None
    root_files = get_all_files_in_repo(access_token, organization, repo)
    for file in root_files:
        if file["name"] == "pyproject.toml":
            type = "pyproject.toml"
            break
        elif file["name"] == "setup.py":
            type = "setup.py"
            break
    
    if type == "pyproject.toml":
        app_name = get_app_name_from_pyproject_toml(organization, repo)
    elif type == "setup.py":
        app_name = get_app_name_from_setup_py(organization, repo)   

    return app_name

def get_app_name_from_setup_py(organization, repo):
    '''
    Get app name from setup.py
    '''
    setup_py = get_file_in_repo(access_token, organization, repo, "setup.py")
    app_name = setup_py.split("name=")[1].split(",")[0].strip().replace("'", "").replace('"', '')
    return app_name


def get_app_name_from_pyproject_toml(organization, repo):
    '''
    Get app name from pyproject.toml
    '''
    pyproject_toml = get_file_in_repo(access_token, organization, repo, "pyproject.toml")
    split_result = pyproject_toml.split("name = ")
    if len(split_result) > 1:
        app_name = pyproject_toml.split("name = ")[1].split("\n")[0].strip().replace("'", "").replace('"', '')
    else:
        app_name = get_app_name_from_setup_py(organization, repo)
    return app_name

# TODO: Function to get app version
# def get_app_version

# TODO: Function to get list of all dependencies in Python app
# def get_list_of_dependencies

@frappe.whitelist(allow_guest=True)
def get_list_of_modules(organization, repo, app_name):
    '''
    Get list of modules for a Frappe app
    '''
    modules = get_file_in_repo(access_token, organization, repo, app_name + "/modules.txt")
    return modules.split("\n")


@frappe.whitelist(allow_guest=True)
def get_list_of_doctypes_in_module(organization, repo, app_name, module: str):
    '''
    Get list of doctypes in a module
    '''
    module_pathname = convert_module_name(module)
    query = f"path:{app_name}/{module_pathname}/doctype+{module} in:file"
    search_results = search_for_file_in_repo(access_token, organization, repo, query, 'json')

    if search_results.get("total_count", 0) == 0:
        return []
    
    doctypes = []
    for result in search_results["items"]:
        path = result["path"]
        doctype_json_content = get_file_in_repo(access_token, organization, repo, path)
        doctype_json = frappe.parse_json(doctype_json_content)
        if doctype_json.get("doctype", "") == "DocType":
            doctypes.append(doctype_json)
    return {
        "module": module,
        "doctypes": doctypes,
        "count": len(doctypes)
    }

@frappe.whitelist(allow_guest=True)
def get_customized_doctypes_in_module(organization, repo, app_name, module: str):
    '''
    Get list of all customized doctypes for a Frappe app
    '''
    module_pathname = convert_module_name(module)
    query = f"path:{app_name}/{module_pathname}/custom+custom_fields in:file"
    search_results = search_for_file_in_repo(access_token, organization, repo, query, 'json')

    if search_results.get("total_count", 0) == 0:
        return []
    
    doctypes = []
    for result in search_results["items"]:
        path = result["path"]
        doctype_json_content = get_file_in_repo(access_token, organization, repo, path)
        doctype_json = frappe.parse_json(doctype_json_content)
        doctypes.append(doctype_json)
    return {
        "module": module,
        "doctypes": doctypes,
        "count": len(doctypes)
    }


@frappe.whitelist(allow_guest=True)
def get_all_whitelisted_api_in_app(organization, repo):
    '''
    Get list of all whitelisted API in a Frappe app with:
    1. Type
    2. Path
    3. Method name
    4. Arguments
    5. Python code snippet
    '''
    query = f"@frappe.whitelist in:file+language:python"
    search_results = search_for_file_in_repo(access_token, organization, repo, query)

    if search_results.get("total_count", 0) == 0:
        return []
    
    apis = []
    for result in search_results["items"]:
        path = result["path"]

        file_content = get_file_in_repo(access_token, organization, repo, path)

        apis_in_file = get_api_details_from_file_contents(file_content, path)
        for api in apis_in_file:
            apis.append(api)
        # break
        # api = get_whitelisted_api_in_file(path)
        # if api:
        #     apis.append(api)
    
    return {
        "count": len(apis),
        "apis": apis
    }