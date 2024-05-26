import os
import ast

other_decorators = [
    '@cache_source',
    '@frappe.validate_and_sanitize_search_inputs',
    '@rate_limit'
]
def find_all_occurrences_of_whitelist(path: str, app_name: str):
    '''
     Find all occurences of @frappe.whitelist in the app repository
     These should only be in .py files
    '''
    # Get list of all .py files in the app
    py_files = get_py_files(path, app_name)
    api_count = 0
    file_count = 0
    api_details = []
    # print(py_files)
    # For each file, check if @frappe.whitelist is present
    for file in py_files:
        file_content = open(file, 'r').read()
        # @frappe.whitelist can be mentioned multiple times in a file
        # So, we need to find all occurrences
        # We can use the count() method to find the number of occurrences
        # If the count is greater than 0, then the string is present
        no_of_occurrences = file_content.count('@frappe.whitelist')
        if no_of_occurrences > 0:
            api_count += no_of_occurrences
            file_count += 1

            ## Comment out later
            # if file.endswith('party.py'):
            indexes,line_nos,no_of_occurrences = find_indexes_of_whitelist(file_content, no_of_occurrences)
            api_count += no_of_occurrences
            apis = get_api_details(file, file_content, indexes,line_nos, path)
            api_details.extend(apis)
    
    return api_details
    
    # print(f'Number of APIs: {api_count}')
    # print(f'Number of files: {file_count}')
    # print(f'Number of Python files: {len(py_files)}')

def find_indexes_of_whitelist(file_content: str, count: int):
    '''
    Find indexes of @frappe.whitelist in the file content,
    ensuring it's not commented out or inside a string.
    '''
    def is_in_string_or_comment(file_content, index):
        # State variables
        in_single_quote = False
        in_double_quote = False
        in_comment = False
        in_triple_single_quote = False
        in_triple_double_quote = False

        i = 0
        while i < index:
            char = file_content[i]
            
            # Handle triple single-quoted strings
            if file_content[i:i+3] == "'''" and not in_double_quote:
                if in_triple_single_quote:
                    in_triple_single_quote = False
                    i += 2
                else:
                    in_triple_single_quote = True
                    i += 2
            # Handle triple double-quoted strings
            elif file_content[i:i+3] == '"""' and not in_single_quote:
                if in_triple_double_quote:
                    in_triple_double_quote = False
                    i += 2
                else:
                    in_triple_double_quote = True
                    i += 2
            # Handle single-quoted strings
            elif char == "'" and not in_double_quote and not in_triple_single_quote and not in_triple_double_quote:
                in_single_quote = not in_single_quote
            # Handle double-quoted strings
            elif char == '"' and not in_single_quote and not in_triple_single_quote and not in_triple_double_quote:
                in_double_quote = not in_double_quote
            # Handle single-line comments
            elif char == '#' and not in_single_quote and not in_double_quote and not in_triple_single_quote and not in_triple_double_quote:
                in_comment = True
            # Handle end of line for single-line comments
            elif char == '\n':
                in_comment = False
            
            i += 1

        return in_single_quote or in_double_quote or in_comment or in_triple_single_quote or in_triple_double_quote

    indexes = []
    line_nos = []
    actual_count = count
    
    start = 0
    while actual_count > 0:
        index = file_content.find('@frappe.whitelist', start)
        if index == -1:
            break
        if not is_in_string_or_comment(file_content, index):
            indexes.append(index)
            line_nos.append(file_content.count('\n', 0, index) + 1)
            actual_count -= 1
        start = index + len('@frappe.whitelist')
    
    return indexes, line_nos, actual_count

def get_api_details(file, file_content: str, indexes: list,line_nos:list, path: str):
    '''
    Get details of the API
    '''
    apis = []
    for index in indexes:
        whitelist_details = get_whitelist_details(file_content, index)
        api_details = get_api_name(file_content, index)
        other_decorators = get_other_decorators(file_content, index, api_details.get('def_index'))
        apis.append({
            **api_details,
            **whitelist_details,
            'other_decorators': other_decorators,
            'index': index,
            'block_start': line_nos[indexes.index(index)],
            'block_end': find_function_end_lines(file_content,api_details.get('name','')),
            'file': file,
            'api_path': file.replace(path, '').replace('\\', '/').replace('.py', '').replace('/', '.')[1:] + '.' + api_details.get('name')
        })
    
    return apis

def get_other_decorators(file_content: str, index: int, def_index: int):
    '''
        See if other decorators are present in between the @frappe.whitelist decorator and the def
    '''
    decorators = []
    for decorator in other_decorators:
        decorator_index = file_content.find(decorator, index, def_index)
        if decorator_index != -1:
            decorators.append(decorator)
    
    return decorators

def get_whitelist_details(file_content: str, index: int):

    '''
    Get details of the @frappe.whitelist decorator
    The index is the index of the first occurrence of @frappe.whitelist
    We need to find the first occurrence of ")" after the index
    '''
    whitelist_end_index = file_content.find(')', index)
    whitelisted_content = file_content[index:whitelist_end_index + 1]
    if "(" in whitelisted_content and ")" in whitelisted_content:
        args = whitelisted_content.split("(")[1].split(")")[0].split(",")
    else:
        args = []
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

def get_api_name(file_content: str, index: int):
    '''
    Get name of the API.
    To do this, we need to find the first occurrence of "def api_name" after the index 
    '''
    api_name = ''
    # Find the first occurrence of "def" after the index
    def_index = file_content.find('def ', index)

    # Find occurrence of ":" after the def_index
    colon_index = file_content.find(':', def_index)

    # Get the string between def_index and colon_index
    api_def = file_content[def_index:colon_index].replace('\n', '').replace('\t', '')

    # api_def is of the form "def api_name(self, arg1, arg2, ...)"
    # We need to get the api_name. To do this, we can remove the "def " first
    api_name_with_params = api_def.replace('def ', '')

    api_name = extract_name_from_def(api_name_with_params)
    arguments = extract_arguments_from_def(api_name_with_params)



    return {
        'name': api_name,
        'arguments': arguments,
        'def': api_def,
        'def_index': def_index,
    }

def extract_name_from_def(api_def: str):
    '''
    Extract name from def
    '''
    return api_def.split("(")[0].strip()

def extract_arguments_from_def(api_def: str):
    '''
    Extract arguments from def
    '''
    if "(" not in api_def or ")" not in api_def:
        arguments_with_types_defaults = []
    else:
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
def get_py_files(path: str, app_name: str):
    '''
    Get list of all .py files in the app
    '''
    py_files = []
    for root, dirs, files in os.walk(os.path.join(path, app_name)):
        for file in files:
            if file.endswith('.py'):
                py_files.append(os.path.join(root, file))
    return py_files

def find_function_end_lines(source_code: str,function_name:str):

    tree = ast.parse(source_code)

    function_end_lines = {}

    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            decorators = get_decorators(node)
            if 'whitelist' in decorators:
                end_line = node.end_lineno
                function_end_lines[node.name] = end_line

    return function_end_lines.get(function_name,0)

def get_decorator_name(node):
    if isinstance(node, ast.Call):
        if isinstance(node.func, ast.Name):
            return node.func.id
        elif isinstance(node.func, ast.Attribute):
            return node.func.attr
    elif isinstance(node, ast.Attribute):
        return node.attr
    else:
        return None

def get_decorators(node):
    decorators = []
    for decorator in node.decorator_list:
        decorator_name = get_decorator_name(decorator)
        if decorator_name is not None:
            decorators.append(decorator_name)
    return decorators