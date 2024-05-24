def convert_module_name(module: str):
    '''
    Convert module name to frappe module path name
    Replace spaces with underscores and convert to lowercase
    '''
    return module.replace(" ", "_").lower()