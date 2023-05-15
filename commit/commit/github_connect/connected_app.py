import frappe

@frappe.whitelist()
def trial():
    connected_app = frappe.get_doc("Connected App", "fa306fb623")
    return connected_app.initiate_web_application_flow()
    