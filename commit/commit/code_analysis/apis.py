import os
import ast
import frappe
import json

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
            result = find_indexes_of_whitelist(file_content, no_of_occurrences)
            indexes, line_nos = result[0], result[1]
            no_of_occurrences = result[2]
            ast_names = result[3] if len(result) > 3 else None
            ast_def_indexes = result[4] if len(result) > 4 else None
            api_count += no_of_occurrences
            apis = get_api_details(app_name, file, file_content, indexes, line_nos, path, ast_names, ast_def_indexes)
            api_details.extend(apis)
    
    return api_details

def _find_whitelist_indexes_via_ast(file_content: str):
    '''
    Find all @frappe.whitelist decorator positions using AST.
    Returns (indexes, line_nos, function_names, def_indexes) or None if parse fails.
    This is order-independent and not confused by strings/comments.
    Uses AST-derived function names and def positions so multi-line signatures
    and "def " in comments do not cause missed APIs.
    '''
    try:
        tree = ast.parse(file_content)
    except SyntaxError:
        return None
    lines = file_content.split('\n')
    results = []  # (decorator_index, line_no, function_name, def_index)
    for node in ast.walk(tree):
        if not isinstance(node, ast.FunctionDef):
            continue
        decorators = get_decorators(node)
        if 'whitelist' not in decorators:
            continue
        for dec in node.decorator_list:
            name = get_decorator_name(dec)
            if name == 'whitelist':
                lineno = getattr(dec, 'lineno', node.lineno)
                if lineno < 1 or lineno > len(lines):
                    break
                line_start = sum(len(l) + 1 for l in lines[: lineno - 1])
                line_content = lines[lineno - 1]
                pos_in_line = line_content.find('@frappe.whitelist')
                if pos_in_line >= 0:
                    decorator_index = line_start + pos_in_line
                    # def_index: start of "def name" on the function's line
                    def_lineno = node.lineno
                    def_line_start = sum(len(l) + 1 for l in lines[: def_lineno - 1])
                    def_line_content = lines[def_lineno - 1]
                    def_pos_in_line = def_line_content.find('def ')
                    def_index = def_line_start + def_pos_in_line if def_pos_in_line >= 0 else decorator_index
                    results.append((decorator_index, lineno, node.name, def_index))
                break
    if not results:
        return None
    # Keep source order (ast.walk order is not guaranteed)
    results.sort(key=lambda r: r[0])
    return (
        [r[0] for r in results],
        [r[1] for r in results],
        [r[2] for r in results],
        [r[3] for r in results],
    )


def find_indexes_of_whitelist(file_content: str, count: int):
    '''
    Find indexes of @frappe.whitelist in the file content,
    ensuring it's not commented out or inside a string.
    Prefers AST-based discovery (order-independent); falls back to
    string scan when AST parse fails (e.g. syntax error).
    '''
    ast_result = _find_whitelist_indexes_via_ast(file_content)
    if ast_result is not None:
        indexes, line_nos, ast_names, ast_def_indexes = ast_result
        return indexes, line_nos, count - len(indexes), ast_names, ast_def_indexes

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
    
    return indexes, line_nos, actual_count, None, None

def get_api_details(app_name, file, file_content: str, indexes: list, line_nos: list, path: str, ast_names=None, ast_def_indexes=None):
    '''
    Get details of the API
    '''
    apis = []
    for i, index in enumerate(indexes):
        try:
            whitelist_details = get_whitelist_details(file_content, index)
            use_ast = ast_names is not None and ast_def_indexes is not None and i < len(ast_names) and i < len(ast_def_indexes)
            if use_ast:
                api_name = ast_names[i]
                def_index = ast_def_indexes[i]
                api_details = get_api_name(file_content, index, def_index=def_index)
                api_details['name'] = api_name
                api_details['def_index'] = def_index
            else:
                api_details = get_api_name(file_content, index)
            if not api_details.get('name'):
                continue
            def_idx = api_details.get('def_index', -1)
            search_end = def_idx if isinstance(def_idx, int) and def_idx >= 0 else len(file_content)
            other_decorators = get_other_decorators(file_content, index, search_end)
            obj = {
                **api_details,
                **whitelist_details,
                'other_decorators': other_decorators,
                'index': index,
                'block_start': line_nos[i],
                'block_end': find_function_end_lines(file_content, api_details.get('name', '')),
                'file': file,
                'api_path': file.replace(path, '').replace('\\', '/').replace('.py', '').replace('/', '.')[1:] + '.' + api_details.get('name')
            }
            documentation, last_updated, is_published, published_on, publish_by, publish_id, published_route = get_documentation_from_branch_documentation(app_name, obj.get('name'), obj.get('api_path'))
            obj['documentation'] = documentation
            obj['last_updated'] = last_updated
            obj['is_published'] = is_published
            obj['published_on'] = published_on
            obj['publish_by'] = publish_by
            obj['publish_id'] = publish_id
            obj['published_route'] = published_route
            apis.append(obj)
        except Exception:
            frappe.log_error(f"Commit API discovery: skipped API at index {index} in {file}", "Commit API Discovery")
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

def _find_def_at_line_start(file_content: str, index: int):
    '''Find next "def " that starts a line (after newline or start of file). Avoids matching "def " in comments.'''
    start = index
    while True:
        def_index = file_content.find('def ', start)
        if def_index == -1:
            return -1
        if def_index == 0 or file_content[def_index - 1] == '\n':
            return def_index
        start = def_index + 1


def _find_signature_end(file_content: str, def_index: int):
    '''Find the "):" that closes the function signature. Prefers ) followed by newline or : to avoid type hints.'''
    pos = def_index
    while True:
        pos = file_content.find('):', pos)
        if pos == -1:
            return -1
        next_char = file_content[pos + 2] if pos + 2 < len(file_content) else '\n'
        if next_char in ('\n', ':'):
            return pos
        pos += 1


def get_api_name(file_content: str, index: int, def_index: int = None):
    '''
    Get name of the API.
    Finds the function definition after the decorator. When def_index is provided (from AST), uses it.
    Otherwise finds "def " at line start only to avoid matching comments.
    '''
    api_name = ''
    if def_index is None:
        def_index = _find_def_at_line_start(file_content, index)
    if def_index == -1:
        return {'name': '', 'arguments': [], 'def': '', 'def_index': -1}
    colon_index = _find_signature_end(file_content, def_index)
    if colon_index == -1:
        return {'name': '', 'arguments': [], 'def': '', 'def_index': def_index}
    api_def = file_content[def_index:colon_index + 1].replace('\n', '').replace('\t', '')
    api_name_with_params = api_def.replace('def ', '', 1)
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

def get_documentation_from_branch_documentation(app_name:str, name: str, api_path: str):
    '''
    Get documentation from the Commit Branch Documentation
    '''
    if frappe.db.exists('Commit Branch Documentation',app_name):
        branch_documentation = frappe.get_doc('Commit Branch Documentation', app_name)
        docs = json.loads(branch_documentation.documentation) if branch_documentation.documentation else {}
        apis = docs.get("apis", [])
        documentation = ''
        last_updated = ''
        is_published = ''
        published_on = ''
        publish_by = ''
        publish_id = ''
        published_route = ''
        for api in apis:
            if api.get("function_name") == name and api.get("path") == api_path:
                documentation = api.get("documentation")
                last_updated = api.get("last_updated")
                is_published = api.get("is_published",0)
                published_on = api.get("published_on", None)
                publish_by = api.get("publish_by", None)
                publish_id = api.get("publish_id", None)
                published_route = api.get("published_route", None)
                break
        return documentation, last_updated, is_published, published_on, publish_by, publish_id, published_route
    else:
        return '', '', '', '', '', '', ''
   