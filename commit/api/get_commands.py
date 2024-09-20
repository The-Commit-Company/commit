import importlib
import sys
import traceback
import os
import frappe
from frappe.utils.bench_helper import get_app_commands

@frappe.whitelist(allow_guest=True)
def get_project_app_commands(app: str, app_path: str = None) -> dict:
    '''
        Gets the commands for the app
    '''
    if not app_path or app_path == '':
        # Check the permissions of the user
        if not frappe.has_permission('System Manager'):
            return frappe.throw('You do not have permission to access this resource', frappe.PermissionError)
        return get_site_app_commands(app)
    else:
        ret = {}
        try:
            if app_path:
                # Add the app's directory to the Python path
                sys.path.append(app_path)
            
            app_command_module = importlib.import_module(f"{app}.commands")
        except ModuleNotFoundError as e:
            if e.name == f"{app}.commands":
                return ret
            traceback.print_exc()
            return ret
        except Exception:
            traceback.print_exc()
            return ret
        finally:
            if app_path:
                # Remove the app's directory from the Python path to avoid side effects
                sys.path.remove(app_path)
        
        command_list = []
        if hasattr(app_command_module, 'get_commands') and callable(getattr(app_command_module, 'get_commands')):
            commands_from_function = app_command_module.get_commands()
            if commands_from_function:
                for command_instance in commands_from_function:
                    help_text = getattr(command_instance, 'help', 'No help text available')
                    name = getattr(command_instance, 'name', [])
                    obj = {
                        'name': name,
                        'help': help_text
                    }
                    command_list.append(obj)
        return command_list

@frappe.whitelist()
def get_site_app_commands(app: str) -> dict:
    app_command_module = importlib.import_module(f"{app}.commands")
     # Call get_commands if it is a callable

    command_list = []
    if hasattr(app_command_module, 'get_commands') and callable(getattr(app_command_module, 'get_commands')):
        commands_from_function = app_command_module.get_commands()
        if commands_from_function:
            for command_instance in commands_from_function:
                help_text = getattr(command_instance, 'help', 'No help text available')
                name = getattr(command_instance, 'name', [])
                obj = {
                    'name': name,
                    'help': help_text
                }
                command_list.append(obj)
    return command_list
