import os
from commit.commit.code_analysis.utils import get_module_path, parse_module_name
import json

def get_doctypes_in_module(path: str, app_name: str, module: str):
    '''
    Get list of doctypes in a module
    '''
    doctype_names = []
    module_path = get_module_path(path, app_name, module)
    doctype_folder_path = os.path.join(module_path, 'doctype')
    does_module_have_doctypes = os.path.isdir(doctype_folder_path)
    if does_module_have_doctypes:
        # Since the doctype folder exists - find all .json files within the folders (only one level deep) and return the file contents
        for dir in os.listdir(doctype_folder_path):
            # doctype .json files have the same name as the folder they are in
            doctype_file_path = os.path.join(doctype_folder_path, dir, dir + '.json')
            if os.path.isfile(doctype_file_path):
                doctype_file = open(doctype_file_path, 'r')
                doctype_json = json.loads(doctype_file.read())
                # doctypes_list.append(doctype_json)
                doctype_names.append(doctype_json.get(
                'name'
                ))
    
    return {
        'module': module,
        # 'doctypes': doctypes_list,
        'doctype_names': doctype_names,
        'number_of_doctypes': len(doctype_names)
    }

def get_doctype_json(path: str, app_name: str, module:str, doctype: str):
    module_path = get_module_path(path, app_name, module)
    module_doctypes_folder_path = os.path.join(module_path, 'doctype')
    does_module_have_doctypes = os.path.isdir(module_doctypes_folder_path)

    if does_module_have_doctypes:
        parsed_doctype_name = parse_module_name(doctype)
        doctype_folder_path = os.path.join(module_doctypes_folder_path, parsed_doctype_name)
        does_doctype_folder_exist = os.path.isdir(doctype_folder_path)

        if does_doctype_folder_exist:
            doctype_file_path = os.path.join(doctype_folder_path, parsed_doctype_name + '.json')
            if os.path.isfile(doctype_file_path):
                doctype_file = open(doctype_file_path, 'r')
                doctype_json = json.loads(doctype_file.read())
                return doctype_json
    
    return None