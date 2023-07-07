import frappe
from commit.api.github import get_file_in_repo, get_all_files_in_repo

access_token = "**"
organization = "Frappe"
# organization = "The-Commit-Company"
repo = "ERPNext"
# repo = "Raven"
app_name = "erpnext"


@frappe.whitelist()
def get_name_of_app():
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
        app_name = get_app_name_from_pyproject_toml()
    elif type == "setup.py":
        app_name = get_app_name_from_setup_py()   

    return app_name

def get_app_name_from_setup_py():
    '''
    Get app name from setup.py
    '''
    setup_py = get_file_in_repo(access_token, organization, repo, "setup.py")
    app_name = setup_py.split("name=")[1].split(",")[0].strip().replace("'", "").replace('"', '')
    return app_name


def get_app_name_from_pyproject_toml():
    '''
    Get app name from pyproject.toml
    '''
    pyproject_toml = get_file_in_repo(access_token, organization, repo, "pyproject.toml")
    app_name = pyproject_toml.split("name = ")[1].split("\n")[0].strip().replace("'", "").replace('"', '')
    return app_name

# TODO: Function to get app version
# def get_app_version

# TODO: Function to get list of all dependencies in Python app
# def get_list_of_dependencies

@frappe.whitelist()
def get_list_of_modules():
    '''
    Get list of modules for a Frappe app
    '''
    modules = get_file_in_repo(access_token, organization, repo, app_name + "/modules.txt")
    return modules.split("\n")


