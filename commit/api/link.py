import frappe

@frappe.whitelist()
def get_link_title(doctype, docname):
	meta = frappe.get_meta(doctype)
	if meta.title_field:
		return frappe.get_value(doctype, docname, meta.title_field)
	return docname