import re

def get_api_details_from_file_contents(file_contents: str, file_path: str):
    '''
    Get list of all whitelisted API in a file string with:
    1. Type
    2. Path
    3. Method name
    4. Arguments
    5. Python code snippet
    '''

    whitelist_indexes = find_all_mentions_of_whitelist_in_file(file_contents)

    # TODO: Get whitelist type (e.g. methods, rate_limit, etc.)

    api_details = get_api_content_from_file_contents(file_contents, whitelist_indexes, file_path)

    return api_details


    # return "{}:{}".format(base_path, indexes)


def convert_file_path_to_api_path(file_path: str):
    '''
    Convert file path to API path
    '''
    return file_path.replace("/", ".").replace(".py", "")

def find_all_mentions_of_whitelist_in_file(file_contents: str):
    '''
    Find all mentions of @frappe.whitelist() in a file
    '''

    indexes = [m.start() for m in re.finditer('@frappe.whitelist', file_contents)]
    return indexes

def get_api_content_from_file_contents(file_contents: str, indexes: list, file_path: str):
    '''
    Get API name from file contents
    '''
    # Loop over to find the first mention of "def" after the indexes
    base_path = convert_file_path_to_api_path(file_path)
    api_string = []
    for index in indexes:
        whitelist_properties = {}
        newline_after_whitelist = file_contents.find("\n", index)
        if newline_after_whitelist != -1:
            whitelisted_content = file_contents[index:newline_after_whitelist]
            whitelist_properties = parse_whitelist(whitelisted_content)

        index_of_def = file_contents.find("def", index)
        if index_of_def != -1:
            # Found the first mention of "def" after the index
            # Get the API name by looking for the first ":" after the index_of_def
            index_of_colon = file_contents.find(":", index_of_def)
            api_def = ""
            api_content = ""
            indentation_of_def = ""
            if index_of_colon != -1:
                api_def = file_contents[index_of_def + 4:index_of_colon]

                # Need to find the start and end of the API function

                # Need the level of indentation of the "def" line

                index_of_newline_before_def = file_contents.rfind("\n", 0, index_of_def)
                api_content = index_of_newline_before_def
                # Get the indentation string between the \n and the def
                indentation_of_def = file_contents[index_of_newline_before_def + 1:index_of_def]
                if indentation_of_def == "":
                    # No indentation. Find first line after def that has no indentation
                    pass
                else:
                    pass

                # Find the next line containing the same number of indentation

            if api_def:
                api_string.append({
                    "function_def": api_def,
                    "content": api_content,
                    "indentation": indentation_of_def,
                    "name": extract_name_from_def(api_def),
                    "arguments": extract_arguments_from_def(api_def),
                    "path": base_path,
                    "file_path": file_path,
                    **whitelist_properties,
                })
    
    return api_string


def extract_name_from_def(api_def: str):
    '''
    Extract name from def
    '''
    return api_def.split("(")[0].strip()

def extract_arguments_from_def(api_def: str):
    '''
    Extract arguments from def
    '''
    arguments_with_types_defaults = api_def.split("(")[1].split(")")[0].split(",")

    arguments = []
    for arg in arguments_with_types_defaults:
        argument_with_types_default = arg.strip()
        default = ""
        argument = ""
        type = ""
        if "=" in argument_with_types_default:
            default_split = argument_with_types_default.split("=")
            default = default_split[1].strip().replace('"', '').replace("'", "")
            argument = default_split[0].strip()
        else:
            argument = argument_with_types_default
        if ":" in argument:
            type = argument.split(":")[1].strip()
            argument = argument.split(":")[0].strip()
        arguments.append({
            "argument": argument,
            "type": type,
            "default": default
        })

    return arguments

def parse_whitelist(whitelisted_content: str):
    '''
    Input being @frappe.whitelist() with args, find request type and other params
    '''
    args = whitelisted_content.split("(")[1].split(")")[0].split(",")
    request_types = []
    xss_safe = False
    allow_guest = False
    for arg in args:
        if "methods" in arg:
            request_types = arg.split("=")[1].replace("[", "").replace("]", "").replace('"', '').replace("'", "").split(",")
        
        if "xss_safe" in arg:
            xss_safe = arg.split("=")[1].strip() == "True"
        
        if "allow_guest" in arg:
            allow_guest = arg.split("=")[1].strip() == "True"
    
    return {
        "request_types": request_types,
        "xss_safe": xss_safe,
        "allow_guest": allow_guest
    }