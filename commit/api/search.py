import frappe
from frappe.desk.search import search_widget, build_for_autosuggest

# this is called by the Link Field
@frappe.whitelist()
def search_link(
	doctype,
	txt,
	query=None,
	filters=None,
	page_length=20,
    start=0,
	searchfield=None,
	reference_doctype=None,
	ignore_user_permissions=False,
):
	results = search_widget(
		doctype,
		txt.strip(),
		query,
		searchfield=searchfield,
		page_length=page_length,
		filters=filters,
		reference_doctype=reference_doctype,
		ignore_user_permissions=ignore_user_permissions,
	)
	return build_for_autosuggest(results, doctype=doctype)