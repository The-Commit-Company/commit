import frappe
from commit.commit.code_analysis.schema_builder import get_schema_from_doctypes_json
import json


@frappe.whitelist(allow_guest=True)
def get_doctype_json(project_branch: str, doctype: str):
    '''
    Get doctype json from a project branch
    '''
    project_branch = frappe.get_cached_doc(
        "Commit Project Branch", project_branch)
    doctype_json = project_branch.get_doctype_json(doctype)
    return doctype_json


@frappe.whitelist(allow_guest=True)
def get_erd_schema_for_module(project_branch: str, module: str):
    '''
    Get ERD schema for a module
    '''

    project_branch = frappe.get_cached_doc(
        "Commit Project Branch", project_branch)
    module_doctypes = project_branch.get_doctypes_in_module(module)
    schema = get_erd_schema_for_doctypes(
        project_branch.name, json.dumps(module_doctypes))
    return schema


@frappe.whitelist(allow_guest=True)
def get_erd_schema_for_doctypes(project_branch: list, doctypes):
    doctypes = json.loads(doctypes)
    branch_doctypes = {}
    doctype_list = []
    for doctype in doctypes:
        if doctype['project_branch'] not in branch_doctypes:
            branch_doctypes[doctype['project_branch']] = []
        branch_doctypes[doctype['project_branch']].append(doctype['doctype'])
        doctype_list.append(doctype['doctype'])

    doctype_jsons = []
    for project_branch, doctypes in branch_doctypes.items():
        project_branch_doc = frappe.get_cached_doc(
            "Commit Project Branch", project_branch)

        for doctype in doctypes:
            doctype_json = project_branch_doc.get_doctype_json(doctype)
            doctype_jsons.append(doctype_json)

    schema = get_schema_from_doctypes_json({
        'doctypes': doctype_jsons,
        'doctype_names': doctype_list
    })

    return schema

@frappe.whitelist()
def get_meta_erd_schema_for_doctypes(doctypes:list):
    '''
    Get ERD schema for a list of doctypes
    '''
    doctype_jsons = []
    for doctype in doctypes:
        doctype_json = frappe.get_meta(doctype)
        doctype_jsons.append(doctype_json)

    schema = get_schema_from_doctypes_json({
        'doctypes': doctype_jsons,
        'doctype_names': doctypes
    })

    return schema

@frappe.whitelist()
def get_meta_for_doctype(doctype):
    '''
    Get meta for a doctype
    '''
    return frappe.get_meta(doctype)