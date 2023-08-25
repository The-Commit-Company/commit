import os
def get_module_path(path: str, app_name: str, module_name: str):
    '''
    Get path to modules directory
    '''
    parsed_module_name = parse_module_name(module_name)
    modules_path = os.path.join(path, app_name, parsed_module_name)
    return modules_path

def parse_module_name(module_name: str):
    '''
    Parse module name
    '''
    return module_name.replace('-', '_').replace(' ', '_').lower()