import frappe
from commit.commit.code_analysis.apis import find_all_occurrences_of_whitelist

@frappe.whitelist()
def get_installed_apps():
    install_app_doc = frappe.get_cached_doc('Installed Applications')
    install_apps = install_app_doc.get('installed_applications')
    updated_apps = []
    for app in install_apps:
        app_name = app.get('app_name')
        app_hooks = frappe.get_hooks(app_name=app_name)

        app_description = app_hooks.get('app_description')
        if app_description is not None:
            app_description = app_description[0]

        app_publisher = app_hooks.get('app_publisher')
        if app_publisher is not None:
            app_publisher = app_publisher[0]
        
        app_logo_url = app_hooks.get('app_logo_url')
        if app_logo_url is not None:
            app_logo_url = app_logo_url[0]
        
        app_version = app.get('app_version')

        git_branch = app.get('git_branch')

        updated_app = {
            'app_name': app_name,
            'app_publisher': app_publisher,
            'app_description': app_description,
            'app_logo_url': app_logo_url,
            'app_version': app_version,
            'git_branch': git_branch
        }
        updated_apps.append(updated_app)

    return updated_apps

@frappe.whitelist()
def get_apis_for_app(app_name: str):
    '''
        Gets the Project Branch document with the organization and app name
    '''
    app_path = frappe.get_app_path(app_name)

    # remove last part of the path which is the app name
    app_path = app_path.rsplit('/', 1)[0]
    apis = find_all_occurrences_of_whitelist(app_path,app_name)

    app_hooks = frappe.get_hooks(app_name=app_name)

    install_app_doc = frappe.get_cached_doc('Installed Applications')
    install_apps = install_app_doc.get('installed_applications')
    app = [app for app in install_apps if app.get('app_name') == app_name][0]

    branch_name = app.get('git_branch')
    return {
        "apis": apis,
        "app_name": app_name,
        "branch_name": branch_name,
    }