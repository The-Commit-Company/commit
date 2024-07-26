import os
import json


DISALLOWED_FIELD_TYPES = ['Section Break', 'Tab Break', 'Fold', 'Column Break', 'Heading', 'HTML', 'Image', 'Icon', 'Button']
LINK_FIELD_TYPES = ['Link', 'Table', 'Table MultiSelect']
def get_schema_from_doctypes_json(doctypes_json: dict):
    '''
    Parse doctype file
    '''

    tables = []
    relationships = []

    doctype_names = doctypes_json.get('doctype_names')
    doctype_jsons = doctypes_json.get('doctypes')

    for doctype_json in doctype_jsons:
        doctype_name = doctype_json.get('name')
        if doctype_name:
            columns = [{
                'name': 'ID',
                'id': 'name',
                'format': 'Data',
            }]

            # dynamic_links = []
            for field in doctype_json.get('fields'):
                fieldname = field.get('fieldname')
                fieldtype = field.get('fieldtype')
                if fieldtype not in DISALLOWED_FIELD_TYPES:
                    column = {
                        'name': field.get('label', fieldname),
                        'id': fieldname,
                        'format': fieldtype,
                        'is_custom_field': field.get('is_custom_field') or False,
                    }
                    columns.append(column)
                
                    if fieldtype in LINK_FIELD_TYPES:
                        if field.get('options') in doctype_names:
                            relationship = {
                                'id': doctype_name + "_" + fieldname,
                                'source_table_name': doctype_name,
                                'source_column_name': fieldname,
                                'target_table_name': field.get('options'),
                                'target_column_name': 'name',
                            }
                            relationships.append(relationship)
            table = {
                'name': doctype_name,
                'id': doctype_name,
                'module': doctype_json.get('module'),
                'istable': doctype_json.get('istable'),
                'columns': columns,
            }
            tables.append(table)
    
    return {
        'tables': tables,
        'relationships': relationships,
    }

        
            




