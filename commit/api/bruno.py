import frappe

@frappe.whitelist()
def generate_bruno_file(data, return_type='download'):
    request_data = frappe.parse_json(data)
    """
    Generates .bru file content for a single request based on the provided request data.
    
    :param request_data: A dictionary containing request information. 
                         Expected keys are:
                         - name: The name of the request.
                         - arguments: A list of dictionaries containing argument information.
                         - def: The function definition.
                         - def_index: The index of the function definition.
                         - request_types: A list of request types (e.g., ['GET', 'POST']).
                         - xss_safe: A boolean indicating if the request is XSS safe.
                         - allow_guest: A boolean indicating if guests are allowed.
                         - other_decorators: A list of other decorators.
                         - index: An index number.
                         - block_start: The start of the block.
                         - block_end: The end of the block.
                         - file: The file path.
                         - api_path: The API path in the format 'raven.www.raven.get_context_for_dev'.
    :return: A dictionary where keys are request types and values are the content of the corresponding .bru files.
    """
    base_url_template = "{{baseUrl}}/api/method"
    
    def format_name(name):
        return ' '.join(word.capitalize() for word in name.split('_'))
    
    name = format_name(request_data.get('name', 'Request'))
    api_path = request_data.get('api_path', '')
    request_types = request_data.get('request_types', ['GET']) or ['GET']  # Default to GET if empty
    params = {arg['argument']: arg['default'] for arg in request_data.get('arguments', []) if arg['argument']}
    
    bru_files = {}

    request_type = request_types[0]
    seq = 1
    request_type_upper = request_type.upper()
    request_type_lower = request_type.lower()
    url = f"{base_url_template}/{api_path}"
    
    query_string = '&'.join([f'{k}={v}' for k, v in params.items() if v])
    full_url = f'{url}?{query_string}' if query_string else url

    bru_content = []

    # Meta section
    bru_content.append(f'meta {{\n  name: {name}\n  type: http\n  seq: {seq}\n}}\n')

    # Request section
    bru_content.append(f'{request_type_lower} {{\n  url: {full_url}\n  body: none\n  auth: none\n}}\n')

    # Params section
    if params:
        bru_content.append(f'params:query {{\n')
        for k, v in params.items():
            if v:
                bru_content.append(f'  {k}: {v}\n')
        bru_content.append('}\n')
    
    bru_files[request_type_upper] = '\n'.join(bru_content)
    if return_type == 'download':
        frappe.local.response.filename =  f'{name} {request_type}.bru'  if len(request_types) > 1 else f'{name}.bru'
        frappe.local.response.filecontent = bru_files[request_type_upper]
        frappe.local.response.type = 'download'  
    else:
        return bru_files[request_type_upper]