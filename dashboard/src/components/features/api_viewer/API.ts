export const APIJSON = [
    {
        "name": "retry_failing_transaction",
        "arguments": [
            {
                "argument": "log_date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def retry_failing_transaction(log_date=None)",
        "def_index": 338,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 318,
        "file": "erpnext/erpnext/bulk_transaction/doctype/bulk_transaction_log/bulk_transaction_log.py"
    },
    {
        "name": "get_linked_material_requests",
        "arguments": [
            {
                "argument": "items",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_linked_material_requests(items)",
        "def_index": 3689,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3669,
        "file": "erpnext/erpnext/buying/utils.py"
    },
    {
        "name": "get_scoring_standing",
        "arguments": [
            {
                "argument": "standing_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_scoring_standing(standing_name)",
        "def_index": 251,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 231,
        "file": "erpnext/erpnext/buying/doctype/supplier_scorecard_standing/supplier_scorecard_standing.py"
    },
    {
        "name": "get_standings_list",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_standings_list()",
        "def_index": 405,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 385,
        "file": "erpnext/erpnext/buying/doctype/supplier_scorecard_standing/supplier_scorecard_standing.py"
    },
    {
        "name": "get_criteria_list",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_criteria_list()",
        "def_index": 1074,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1054,
        "file": "erpnext/erpnext/buying/doctype/supplier_scorecard_criteria/supplier_scorecard_criteria.py"
    },
    {
        "name": "make_purchase_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_order(source_name, target_doc=None)",
        "def_index": 3602,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3582,
        "file": "erpnext/erpnext/buying/doctype/supplier_quotation/supplier_quotation.py"
    },
    {
        "name": "make_purchase_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_invoice(source_name, target_doc=None)",
        "def_index": 4706,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4686,
        "file": "erpnext/erpnext/buying/doctype/supplier_quotation/supplier_quotation.py"
    },
    {
        "name": "make_quotation",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_quotation(source_name, target_doc=None)",
        "def_index": 5153,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5133,
        "file": "erpnext/erpnext/buying/doctype/supplier_quotation/supplier_quotation.py"
    },
    {
        "name": "get_last_purchase_rate",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_last_purchase_rate(self)",
        "def_index": 7947,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7926,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "close_or_unclose_purchase_orders",
        "arguments": [
            {
                "argument": "names",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def close_or_unclose_purchase_orders(names, status)",
        "def_index": 15214,
        "request_types": ['GET', 'POST', 'PUT'],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 15194,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "make_purchase_receipt",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_receipt(source_name, target_doc=None)",
        "def_index": 15943,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 15923,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "make_purchase_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_invoice(source_name, target_doc=None)",
        "def_index": 17276,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17256,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "make_purchase_invoice_from_portal",
        "arguments": [
            {
                "argument": "purchase_order_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_purchase_invoice_from_portal(purchase_order_name)",
        "def_index": 17416,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17396,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "update_status",
        "arguments": [
            {
                "argument": "status",
                "type": "",
                "default": ""
            },
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_status(status, name)",
        "def_index": 20124,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20104,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "make_inter_company_sales_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_inter_company_sales_order(source_name, target_doc=None)",
        "def_index": 20292,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20272,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "make_subcontracting_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_subcontracting_order(source_name, target_doc=None)",
        "def_index": 20560,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20540,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "is_subcontracting_order_created",
        "arguments": [
            {
                "argument": "po_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def is_subcontracting_order_created(po_name) -> bool",
        "def_index": 21886,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21866,
        "file": "erpnext/erpnext/buying/doctype/purchase_order/purchase_order.py"
    },
    {
        "name": "get_supplier_group_details",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_supplier_group_details(self)",
        "def_index": 2618,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2597,
        "file": "erpnext/erpnext/buying/doctype/supplier/supplier.py"
    },
    {
        "name": "get_supplier_primary_contact",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_supplier_primary_contact(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 4756,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 4692,
        "file": "erpnext/erpnext/buying/doctype/supplier/supplier.py"
    },
    {
        "name": "get_timeline_data",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_timeline_data(doctype, name)",
        "def_index": 3275,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3255,
        "file": "erpnext/erpnext/buying/doctype/supplier_scorecard/supplier_scorecard.py"
    },
    {
        "name": "make_all_scorecards",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_all_scorecards(docname)",
        "def_index": 4500,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4480,
        "file": "erpnext/erpnext/buying/doctype/supplier_scorecard/supplier_scorecard.py"
    },
    {
        "name": "get_supplier_email_preview",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "supplier",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_supplier_email_preview(self, supplier)",
        "def_index": 2882,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2861,
        "file": "erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.py"
    },
    {
        "name": "send_supplier_emails",
        "arguments": [
            {
                "argument": "rfq_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def send_supplier_emails(rfq_name)",
        "def_index": 8701,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8681,
        "file": "erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.py"
    },
    {
        "name": "make_supplier_quotation_from_rfq",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "for_supplier",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_supplier_quotation_from_rfq(source_name, target_doc=None, for_supplier=None)",
        "def_index": 9537,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9517,
        "file": "erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.py"
    },
    {
        "name": "create_supplier_quotation",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_supplier_quotation(doc)",
        "def_index": 10619,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10599,
        "file": "erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.py"
    },
    {
        "name": "get_pdf",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_pdf(name",
        "def_index": 12209,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12189,
        "file": "erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.py"
    },
    {
        "name": "get_item_from_material_requests_based_on_supplier",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_item_from_material_requests_based_on_supplier(source_name, target_doc=None)",
        "def_index": 12659,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12639,
        "file": "erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.py"
    },
    {
        "name": "get_supplier_tag",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_supplier_tag()",
        "def_index": 14026,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 14006,
        "file": "erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.py"
    },
    {
        "name": "get_rfq_containing_supplier",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_rfq_containing_supplier(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 14281,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 14217,
        "file": "erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.py"
    },
    {
        "name": "get_product_filter_data",
        "arguments": [
            {
                "argument": "query_args",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_product_filter_data(query_args=None)",
        "def_index": 476,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 440,
        "file": "erpnext/erpnext/e_commerce/api.py"
    },
    {
        "name": "get_guest_redirect_on_action",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_guest_redirect_on_action()",
        "def_index": 2401,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 2365,
        "file": "erpnext/erpnext/e_commerce/api.py"
    },
    {
        "name": "get_attributes_and_values",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_attributes_and_values(item_code)",
        "def_index": 1661,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 1625,
        "file": "erpnext/erpnext/e_commerce/variant_selector/utils.py"
    },
    {
        "name": "get_next_attribute_and_values",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "selected_attributes",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_next_attribute_and_values(item_code, selected_attributes)",
        "def_index": 2885,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 2849,
        "file": "erpnext/erpnext/e_commerce/variant_selector/utils.py"
    },
    {
        "name": "get_cart_quotation",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_cart_quotation(doc=None)",
        "def_index": 1092,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1072,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "get_shipping_addresses",
        "arguments": [
            {
                "argument": "party",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_shipping_addresses(party=None)",
        "def_index": 1694,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1674,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "get_billing_addresses",
        "arguments": [
            {
                "argument": "party",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_billing_addresses(party=None)",
        "def_index": 2001,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1981,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "place_order",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def place_order()",
        "def_index": 2306,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2286,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "request_for_quotation",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def request_for_quotation()",
        "def_index": 3977,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3957,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "update_cart",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "qty",
                "type": "",
                "default": ""
            },
            {
                "argument": "additional_notes",
                "type": "",
                "default": "None"
            },
            {
                "argument": "with_items",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def update_cart(item_code, qty, additional_notes=None, with_items=False)",
        "def_index": 4236,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4216,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "get_shopping_cart_menu",
        "arguments": [
            {
                "argument": "context",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_shopping_cart_menu(context=None)",
        "def_index": 5620,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5600,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "add_new_address",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_new_address(doc)",
        "def_index": 5821,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5801,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "create_lead_for_item_inquiry",
        "arguments": [
            {
                "argument": "lead",
                "type": "",
                "default": ""
            },
            {
                "argument": "subject",
                "type": "",
                "default": ""
            },
            {
                "argument": "message",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_lead_for_item_inquiry(lead, subject, message)",
        "def_index": 6038,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 6002,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "get_terms_and_conditions",
        "arguments": [
            {
                "argument": "terms_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_terms_and_conditions(terms_name)",
        "def_index": 6929,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6909,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "update_cart_address",
        "arguments": [
            {
                "argument": "address_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "address_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_cart_address(address_type, address_name)",
        "def_index": 7066,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7046,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "apply_shipping_rule",
        "arguments": [
            {
                "argument": "shipping_rule",
                "type": "",
                "default": ""
            }
        ],
        "def": "def apply_shipping_rule(shipping_rule)",
        "def_index": 16923,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 16903,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "apply_coupon_code",
        "arguments": [
            {
                "argument": "applied_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "applied_referral_sales_partner",
                "type": "",
                "default": ""
            }
        ],
        "def": "def apply_coupon_code(applied_code, applied_referral_sales_partner)",
        "def_index": 19129,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 19093,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/cart.py"
    },
    {
        "name": "get_product_info_for_website",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "skip_quotation_creation",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_product_info_for_website(item_code, skip_quotation_creation=False)",
        "def_index": 517,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 481,
        "file": "erpnext/erpnext/e_commerce/shopping_cart/product_info.py"
    },
    {
        "name": "get_offer_details",
        "arguments": [
            {
                "argument": "offer_id",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_offer_details(offer_id)",
        "def_index": 277,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 241,
        "file": "erpnext/erpnext/e_commerce/doctype/website_offer/website_offer.py"
    },
    {
        "name": "get_item_reviews",
        "arguments": [
            {
                "argument": "web_item",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": "0"
            },
            {
                "argument": "end",
                "type": "",
                "default": "10"
            },
            {
                "argument": "data",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_item_reviews(web_item, start=0, end=10, data=None)",
        "def_index": 935,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 915,
        "file": "erpnext/erpnext/e_commerce/doctype/item_review/item_review.py"
    },
    {
        "name": "add_item_review",
        "arguments": [
            {
                "argument": "web_item",
                "type": "",
                "default": ""
            },
            {
                "argument": "title",
                "type": "",
                "default": ""
            },
            {
                "argument": "rating",
                "type": "",
                "default": ""
            },
            {
                "argument": "comment",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def add_item_review(web_item, title, rating, comment=None)",
        "def_index": 2895,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2875,
        "file": "erpnext/erpnext/e_commerce/doctype/item_review/item_review.py"
    },
    {
        "name": "copy_specification_from_item_group",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def copy_specification_from_item_group(self)",
        "def_index": 9505,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9484,
        "file": "erpnext/erpnext/e_commerce/doctype/website_item/website_item.py"
    },
    {
        "name": "make_website_item",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_website_item(doc",
        "def_index": 12748,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12728,
        "file": "erpnext/erpnext/e_commerce/doctype/website_item/website_item.py"
    },
    {
        "name": "is_cart_enabled",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def is_cart_enabled()",
        "def_index": 5826,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 5790,
        "file": "erpnext/erpnext/e_commerce/doctype/e_commerce_settings/e_commerce_settings.py"
    },
    {
        "name": "add_to_wishlist",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_to_wishlist(item_code)",
        "def_index": 257,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 237,
        "file": "erpnext/erpnext/e_commerce/doctype/wishlist/wishlist.py"
    },
    {
        "name": "remove_from_wishlist",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            }
        ],
        "def": "def remove_from_wishlist(item_code)",
        "def_index": 1597,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1577,
        "file": "erpnext/erpnext/e_commerce/doctype/wishlist/wishlist.py"
    },
    {
        "name": "get_funnel_data",
        "arguments": [
            {
                "argument": "from_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "to_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_funnel_data(from_date, to_date, company)",
        "def_index": 526,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 506,
        "file": "erpnext/erpnext/selling/page/sales_funnel/sales_funnel.py"
    },
    {
        "name": "get_opp_by_lead_source",
        "arguments": [
            {
                "argument": "from_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "to_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_opp_by_lead_source(from_date, to_date, company)",
        "def_index": 1841,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1821,
        "file": "erpnext/erpnext/selling/page/sales_funnel/sales_funnel.py"
    },
    {
        "name": "get_pipeline_data",
        "arguments": [
            {
                "argument": "from_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "to_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_pipeline_data(from_date, to_date, company)",
        "def_index": 3287,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3267,
        "file": "erpnext/erpnext/selling/page/sales_funnel/sales_funnel.py"
    },
    {
        "name": "get_items",
        "arguments": [
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_length",
                "type": "",
                "default": ""
            },
            {
                "argument": "price_list",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_group",
                "type": "",
                "default": ""
            },
            {
                "argument": "pos_profile",
                "type": "",
                "default": ""
            },
            {
                "argument": "search_term",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_items(start, page_length, price_list, item_group, pos_profile, search_term=\"\")",
        "def_index": 2445,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2425,
        "file": "erpnext/erpnext/selling/page/point_of_sale/point_of_sale.py"
    },
    {
        "name": "search_for_serial_or_batch_or_barcode_number",
        "arguments": [
            {
                "argument": "search_value",
                "type": "",
                "default": ""
            }
        ],
        "def": "def search_for_serial_or_batch_or_barcode_number(search_value",
        "def_index": 5132,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5112,
        "file": "erpnext/erpnext/selling/page/point_of_sale/point_of_sale.py"
    },
    {
        "name": "item_group_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def item_group_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 6195,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 6131,
        "file": "erpnext/erpnext/selling/page/point_of_sale/point_of_sale.py"
    },
    {
        "name": "check_opening_entry",
        "arguments": [
            {
                "argument": "user",
                "type": "",
                "default": ""
            }
        ],
        "def": "def check_opening_entry(user)",
        "def_index": 6795,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6775,
        "file": "erpnext/erpnext/selling/page/point_of_sale/point_of_sale.py"
    },
    {
        "name": "create_opening_voucher",
        "arguments": [
            {
                "argument": "pos_profile",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "balance_details",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_opening_voucher(pos_profile, company, balance_details)",
        "def_index": 7119,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7099,
        "file": "erpnext/erpnext/selling/page/point_of_sale/point_of_sale.py"
    },
    {
        "name": "get_past_order_list",
        "arguments": [
            {
                "argument": "search_term",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            },
            {
                "argument": "limit",
                "type": "",
                "default": "20"
            }
        ],
        "def": "def get_past_order_list(search_term, status, limit=20)",
        "def_index": 7637,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7617,
        "file": "erpnext/erpnext/selling/page/point_of_sale/point_of_sale.py"
    },
    {
        "name": "set_customer_info",
        "arguments": [
            {
                "argument": "fieldname",
                "type": "",
                "default": ""
            },
            {
                "argument": "customer",
                "type": "",
                "default": ""
            },
            {
                "argument": "value",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_customer_info(fieldname, customer, value=\"\")",
        "def_index": 8432,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8412,
        "file": "erpnext/erpnext/selling/page/point_of_sale/point_of_sale.py"
    },
    {
        "name": "get_pos_profile_data",
        "arguments": [
            {
                "argument": "pos_profile",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_pos_profile_data(pos_profile)",
        "def_index": 9767,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9747,
        "file": "erpnext/erpnext/selling/page/point_of_sale/point_of_sale.py"
    },
    {
        "name": "get_customers_or_items",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_customers_or_items(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 2100,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 2036,
        "file": "erpnext/erpnext/selling/report/payment_terms_status_for_sales_order/payment_terms_status_for_sales_order.py"
    },
    {
        "name": "declare_enquiry_lost",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "lost_reasons_list",
                "type": "",
                "default": ""
            },
            {
                "argument": "competitors",
                "type": "",
                "default": ""
            },
            {
                "argument": "detailed_reason",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def declare_enquiry_lost(self, lost_reasons_list, competitors, detailed_reason=None)",
        "def_index": 4693,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4672,
        "file": "erpnext/erpnext/selling/doctype/quotation/quotation.py"
    },
    {
        "name": "make_sales_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_sales_order(source_name",
        "def_index": 7127,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7107,
        "file": "erpnext/erpnext/selling/doctype/quotation/quotation.py"
    },
    {
        "name": "make_sales_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_sales_invoice(source_name, target_doc=None)",
        "def_index": 11747,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11727,
        "file": "erpnext/erpnext/selling/doctype/quotation/quotation.py"
    },
    {
        "name": "get_new_item_code",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_new_item_code(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 2028,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 1964,
        "file": "erpnext/erpnext/selling/doctype/product_bundle/product_bundle.py"
    },
    {
        "name": "create_stock_reservation_entries",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "items_details",
                "type": "",
                "default": "None"
            },
            {
                "argument": "notify",
                "type": "",
                "default": "True"
            }
        ],
        "def": "def create_stock_reservation_entries(self, items_details=None, notify=True)",
        "def_index": 17691,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17670,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "close_or_unclose_sales_orders",
        "arguments": [
            {
                "argument": "names",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def close_or_unclose_sales_orders(names, status)",
        "def_index": 22753,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22733,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_material_request",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_material_request(source_name, target_doc=None)",
        "def_index": 23615,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 23595,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_project",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_project(source_name, target_doc=None)",
        "def_index": 25281,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 25261,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_delivery_note",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "skip_item_mapping",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def make_delivery_note(source_name, target_doc=None, skip_item_mapping=False)",
        "def_index": 25792,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 25772,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_sales_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "ignore_permissions",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def make_sales_invoice(source_name, target_doc=None, ignore_permissions=False)",
        "def_index": 28114,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28094,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_maintenance_schedule",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_maintenance_schedule(source_name, target_doc=None)",
        "def_index": 31117,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 31097,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_maintenance_visit",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_maintenance_visit(source_name, target_doc=None)",
        "def_index": 31766,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 31746,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "get_events",
        "arguments": [
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "end",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_events(start, end, filters=None)",
        "def_index": 32474,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 32454,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_purchase_order_for_default_supplier",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "selected_items",
                "type": "",
                "default": "None"
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_order_for_default_supplier(source_name, selected_items=None, target_doc=None)",
        "def_index": 33551,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 33531,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_purchase_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "selected_items",
                "type": "",
                "default": "None"
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_order(source_name, selected_items=None, target_doc=None)",
        "def_index": 37388,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 37368,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_work_orders",
        "arguments": [
            {
                "argument": "items",
                "type": "",
                "default": ""
            },
            {
                "argument": "sales_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "project",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_work_orders(items, sales_order, company, project=None)",
        "def_index": 41296,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 41276,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "update_status",
        "arguments": [
            {
                "argument": "status",
                "type": "",
                "default": ""
            },
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_status(status, name)",
        "def_index": 42263,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 42243,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_raw_material_request",
        "arguments": [
            {
                "argument": "items",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "sales_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "project",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_raw_material_request(items, company, sales_order, project=None)",
        "def_index": 42386,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 42366,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "make_inter_company_purchase_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_inter_company_purchase_order(source_name, target_doc=None)",
        "def_index": 44201,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 44181,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "create_pick_list",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def create_pick_list(source_name, target_doc=None)",
        "def_index": 44469,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 44449,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "get_work_order_items",
        "arguments": [
            {
                "argument": "sales_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "for_raw_material_request",
                "type": "",
                "default": "0"
            }
        ],
        "def": "def get_work_order_items(sales_order, for_raw_material_request=0)",
        "def_index": 46837,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 46817,
        "file": "erpnext/erpnext/selling/doctype/sales_order/sales_order.py"
    },
    {
        "name": "create_receiver_list",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_receiver_list(self)",
        "def_index": 365,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 344,
        "file": "erpnext/erpnext/selling/doctype/sms_center/sms_center.py"
    },
    {
        "name": "send_sms",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def send_sms(self)",
        "def_index": 3074,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3053,
        "file": "erpnext/erpnext/selling/doctype/sms_center/sms_center.py"
    },
    {
        "name": "get_customer_group_details",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_customer_group_details(self)",
        "def_index": 3225,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3204,
        "file": "erpnext/erpnext/selling/doctype/customer/customer.py"
    },
    {
        "name": "make_quotation",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_quotation(source_name, target_doc=None)",
        "def_index": 10102,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10082,
        "file": "erpnext/erpnext/selling/doctype/customer/customer.py"
    },
    {
        "name": "make_opportunity",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_opportunity(source_name, target_doc=None)",
        "def_index": 10869,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10849,
        "file": "erpnext/erpnext/selling/doctype/customer/customer.py"
    },
    {
        "name": "get_loyalty_programs",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_loyalty_programs(doc)",
        "def_index": 11801,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11781,
        "file": "erpnext/erpnext/selling/doctype/customer/customer.py"
    },
    {
        "name": "send_emails",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def send_emails(args)",
        "def_index": 15068,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 15048,
        "file": "erpnext/erpnext/selling/doctype/customer/customer.py"
    },
    {
        "name": "get_customer_primary_contact",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_customer_primary_contact(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 20428,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 20364,
        "file": "erpnext/erpnext/selling/doctype/customer/customer.py"
    },
    {
        "name": "set_parameters",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_parameters(self)",
        "def_index": 235,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 214,
        "file": "erpnext/erpnext/quality_management/doctype/quality_feedback/quality_feedback.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": "None"
            },
            {
                "argument": "parent_quality_procedure",
                "type": "",
                "default": "None"
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_children(doctype, parent=None, parent_quality_procedure=None, is_root=False)",
        "def_index": 2006,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1986,
        "file": "erpnext/erpnext/quality_management/doctype/quality_procedure/quality_procedure.py"
    },
    {
        "name": "add_node",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_node()",
        "def_index": 2668,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2648,
        "file": "erpnext/erpnext/quality_management/doctype/quality_procedure/quality_procedure.py"
    },
    {
        "name": "query_task",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def query_task(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 260,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 196,
        "file": "erpnext/erpnext/projects/utils.py"
    },
    {
        "name": "daily_reminder",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def daily_reminder()",
        "def_index": 239,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 219,
        "file": "erpnext/erpnext/projects/doctype/project_update/project_update.py"
    },
    {
        "name": "get_users_for_project",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_users_for_project(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 11550,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 11486,
        "file": "erpnext/erpnext/projects/doctype/project/project.py"
    },
    {
        "name": "get_cost_center_name",
        "arguments": [
            {
                "argument": "project",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_cost_center_name(project)",
        "def_index": 12431,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12411,
        "file": "erpnext/erpnext/projects/doctype/project/project.py"
    },
    {
        "name": "create_duplicate_project",
        "arguments": [
            {
                "argument": "prev_doc",
                "type": "",
                "default": ""
            },
            {
                "argument": "project_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_duplicate_project(prev_doc, project_name)",
        "def_index": 14407,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 14387,
        "file": "erpnext/erpnext/projects/doctype/project/project.py"
    },
    {
        "name": "create_kanban_board_if_not_exists",
        "arguments": [
            {
                "argument": "project",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_kanban_board_if_not_exists(project)",
        "def_index": 19045,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 19025,
        "file": "erpnext/erpnext/projects/doctype/project/project.py"
    },
    {
        "name": "set_project_status",
        "arguments": [
            {
                "argument": "project",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_project_status(project, status)",
        "def_index": 19393,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 19373,
        "file": "erpnext/erpnext/projects/doctype/project/project.py"
    },
    {
        "name": "check_if_child_exists",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def check_if_child_exists(name)",
        "def_index": 8128,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8108,
        "file": "erpnext/erpnext/projects/doctype/task/task.py"
    },
    {
        "name": "get_project",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_project(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 8393,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 8329,
        "file": "erpnext/erpnext/projects/doctype/task/task.py"
    },
    {
        "name": "set_multiple_status",
        "arguments": [
            {
                "argument": "names",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_multiple_status(names, status)",
        "def_index": 9193,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9173,
        "file": "erpnext/erpnext/projects/doctype/task/task.py"
    },
    {
        "name": "make_timesheet",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "ignore_permissions",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def make_timesheet(source_name, target_doc=None, ignore_permissions=False)",
        "def_index": 9726,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9706,
        "file": "erpnext/erpnext/projects/doctype/task/task.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": ""
            },
            {
                "argument": "task",
                "type": "",
                "default": "None"
            },
            {
                "argument": "project",
                "type": "",
                "default": "None"
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_children(doctype, parent, task=None, project=None, is_root=False)",
        "def_index": 10290,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10270,
        "file": "erpnext/erpnext/projects/doctype/task/task.py"
    },
    {
        "name": "add_node",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_node()",
        "def_index": 10885,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10865,
        "file": "erpnext/erpnext/projects/doctype/task/task.py"
    },
    {
        "name": "add_multiple_tasks",
        "arguments": [
            {
                "argument": "data",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_multiple_tasks(data, parent)",
        "def_index": 11201,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11181,
        "file": "erpnext/erpnext/projects/doctype/task/task.py"
    },
    {
        "name": "get_projectwise_timesheet_data",
        "arguments": [
            {
                "argument": "project",
                "type": "",
                "default": "None"
            },
            {
                "argument": "parent",
                "type": "",
                "default": "None"
            },
            {
                "argument": "from_time",
                "type": "",
                "default": "None"
            },
            {
                "argument": "to_time",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_projectwise_timesheet_data(project=None, parent=None, from_time=None, to_time=None)",
        "def_index": 8202,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8182,
        "file": "erpnext/erpnext/projects/doctype/timesheet/timesheet.py"
    },
    {
        "name": "get_timesheet_detail_rate",
        "arguments": [
            {
                "argument": "timelog",
                "type": "",
                "default": ""
            },
            {
                "argument": "currency",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_timesheet_detail_rate(timelog, currency)",
        "def_index": 9327,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9307,
        "file": "erpnext/erpnext/projects/doctype/timesheet/timesheet.py"
    },
    {
        "name": "get_timesheet",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_timesheet(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 9902,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 9838,
        "file": "erpnext/erpnext/projects/doctype/timesheet/timesheet.py"
    },
    {
        "name": "get_timesheet_data",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "project",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_timesheet_data(name, project)",
        "def_index": 10620,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10600,
        "file": "erpnext/erpnext/projects/doctype/timesheet/timesheet.py"
    },
    {
        "name": "make_sales_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_code",
                "type": "",
                "default": "None"
            },
            {
                "argument": "customer",
                "type": "",
                "default": "None"
            },
            {
                "argument": "currency",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_sales_invoice(source_name, item_code=None, customer=None, currency=None)",
        "def_index": 11206,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11186,
        "file": "erpnext/erpnext/projects/doctype/timesheet/timesheet.py"
    },
    {
        "name": "get_activity_cost",
        "arguments": [
            {
                "argument": "employee",
                "type": "",
                "default": "None"
            },
            {
                "argument": "activity_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "currency",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_activity_cost(employee=None, activity_type=None, currency=None)",
        "def_index": 12744,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12724,
        "file": "erpnext/erpnext/projects/doctype/timesheet/timesheet.py"
    },
    {
        "name": "get_events",
        "arguments": [
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "end",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_events(start, end, filters=None)",
        "def_index": 13512,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 13492,
        "file": "erpnext/erpnext/projects/doctype/timesheet/timesheet.py"
    },
    {
        "name": "get_open_activities",
        "arguments": [
            {
                "argument": "ref_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "ref_docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_open_activities(ref_doctype, ref_docname)",
        "def_index": 4038,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4018,
        "file": "erpnext/erpnext/crm/utils.py"
    },
    {
        "name": "add_note",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "note",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_note(self, note)",
        "def_index": 5701,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5680,
        "file": "erpnext/erpnext/crm/utils.py"
    },
    {
        "name": "edit_note",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "note",
                "type": "",
                "default": ""
            },
            {
                "argument": "row_id",
                "type": "",
                "default": ""
            }
        ],
        "def": "def edit_note(self, note, row_id)",
        "def_index": 5904,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5883,
        "file": "erpnext/erpnext/crm/utils.py"
    },
    {
        "name": "delete_note",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "row_id",
                "type": "",
                "default": ""
            }
        ],
        "def": "def delete_note(self, row_id)",
        "def_index": 6051,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6030,
        "file": "erpnext/erpnext/crm/utils.py"
    },
    {
        "name": "get_last_interaction",
        "arguments": [
            {
                "argument": "contact",
                "type": "",
                "default": "None"
            },
            {
                "argument": "lead",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_last_interaction(contact=None, lead=None)",
        "def_index": 36,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 16,
        "file": "erpnext/erpnext/crm/doctype/utils.py"
    },
    {
        "name": "get_contract_template",
        "arguments": [
            {
                "argument": "template_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "doc",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_contract_template(template_name, doc)",
        "def_index": 387,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 367,
        "file": "erpnext/erpnext/crm/doctype/contract_template/contract_template.py"
    },
    {
        "name": "declare_enquiry_lost",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "lost_reasons_list",
                "type": "",
                "default": ""
            },
            {
                "argument": "competitors",
                "type": "",
                "default": ""
            },
            {
                "argument": "detailed_reason",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def declare_enquiry_lost(self, lost_reasons_list, competitors, detailed_reason=None)",
        "def_index": 5433,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5412,
        "file": "erpnext/erpnext/crm/doctype/opportunity/opportunity.py"
    },
    {
        "name": "get_item_details",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_item_details(item_code)",
        "def_index": 8188,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8168,
        "file": "erpnext/erpnext/crm/doctype/opportunity/opportunity.py"
    },
    {
        "name": "make_quotation",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_quotation(source_name, target_doc=None)",
        "def_index": 8713,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8693,
        "file": "erpnext/erpnext/crm/doctype/opportunity/opportunity.py"
    },
    {
        "name": "make_request_for_quotation",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_request_for_quotation(source_name, target_doc=None)",
        "def_index": 10118,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10098,
        "file": "erpnext/erpnext/crm/doctype/opportunity/opportunity.py"
    },
    {
        "name": "make_customer",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_customer(source_name, target_doc=None)",
        "def_index": 10640,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10620,
        "file": "erpnext/erpnext/crm/doctype/opportunity/opportunity.py"
    },
    {
        "name": "make_supplier_quotation",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_supplier_quotation(source_name, target_doc=None)",
        "def_index": 11135,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11115,
        "file": "erpnext/erpnext/crm/doctype/opportunity/opportunity.py"
    },
    {
        "name": "set_multiple_status",
        "arguments": [
            {
                "argument": "names",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_multiple_status(names, status)",
        "def_index": 11507,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11487,
        "file": "erpnext/erpnext/crm/doctype/opportunity/opportunity.py"
    },
    {
        "name": "make_opportunity_from_communication",
        "arguments": [
            {
                "argument": "communication",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "ignore_communication_links",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def make_opportunity_from_communication(communication, company, ignore_communication_links=False)",
        "def_index": 12338,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12318,
        "file": "erpnext/erpnext/crm/doctype/opportunity/opportunity.py"
    },
    {
        "name": "make_customer",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_customer(source_name, target_doc=None)",
        "def_index": 1885,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1865,
        "file": "erpnext/erpnext/crm/doctype/prospect/prospect.py"
    },
    {
        "name": "make_opportunity",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_opportunity(source_name, target_doc=None)",
        "def_index": 2456,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2436,
        "file": "erpnext/erpnext/crm/doctype/prospect/prospect.py"
    },
    {
        "name": "get_opportunities",
        "arguments": [
            {
                "argument": "prospect",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_opportunities(prospect)",
        "def_index": 3028,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3008,
        "file": "erpnext/erpnext/crm/doctype/prospect/prospect.py"
    },
    {
        "name": "get_authorization_url",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_authorization_url(self)",
        "def_index": 402,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 381,
        "file": "erpnext/erpnext/crm/doctype/linkedin_settings/linkedin_settings.py"
    },
    {
        "name": "callback",
        "arguments": [
            {
                "argument": "code",
                "type": "",
                "default": "None"
            },
            {
                "argument": "error",
                "type": "",
                "default": "None"
            },
            {
                "argument": "error_description",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def callback(code=None, error=None, error_description=None)",
        "def_index": 6225,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 6189,
        "file": "erpnext/erpnext/crm/doctype/linkedin_settings/linkedin_settings.py"
    },
    {
        "name": "create_prospect_and_contact",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "data",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_prospect_and_contact(self, data)",
        "def_index": 4981,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4960,
        "file": "erpnext/erpnext/crm/doctype/lead/lead.py"
    },
    {
        "name": "make_customer",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_customer(source_name, target_doc=None)",
        "def_index": 7029,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7009,
        "file": "erpnext/erpnext/crm/doctype/lead/lead.py"
    },
    {
        "name": "make_opportunity",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_opportunity(source_name, target_doc=None)",
        "def_index": 7911,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7891,
        "file": "erpnext/erpnext/crm/doctype/lead/lead.py"
    },
    {
        "name": "make_quotation",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_quotation(source_name, target_doc=None)",
        "def_index": 8567,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8547,
        "file": "erpnext/erpnext/crm/doctype/lead/lead.py"
    },
    {
        "name": "get_lead_details",
        "arguments": [
            {
                "argument": "lead",
                "type": "",
                "default": ""
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_lead_details(lead, posting_date=None, company=None)",
        "def_index": 9595,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9575,
        "file": "erpnext/erpnext/crm/doctype/lead/lead.py"
    },
    {
        "name": "make_lead_from_communication",
        "arguments": [
            {
                "argument": "communication",
                "type": "",
                "default": ""
            },
            {
                "argument": "ignore_communication_links",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def make_lead_from_communication(communication, ignore_communication_links=False)",
        "def_index": 10430,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10410,
        "file": "erpnext/erpnext/crm/doctype/lead/lead.py"
    },
    {
        "name": "add_lead_to_prospect",
        "arguments": [
            {
                "argument": "lead",
                "type": "",
                "default": ""
            },
            {
                "argument": "prospect",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_lead_to_prospect(lead, prospect)",
        "def_index": 11593,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11573,
        "file": "erpnext/erpnext/crm/doctype/lead/lead.py"
    },
    {
        "name": "delete_post",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def delete_post(self)",
        "def_index": 939,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 918,
        "file": "erpnext/erpnext/crm/doctype/social_media_post/social_media_post.py"
    },
    {
        "name": "get_post",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_post(self)",
        "def_index": 1308,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1287,
        "file": "erpnext/erpnext/crm/doctype/social_media_post/social_media_post.py"
    },
    {
        "name": "post",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def post(self)",
        "def_index": 1706,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1685,
        "file": "erpnext/erpnext/crm/doctype/social_media_post/social_media_post.py"
    },
    {
        "name": "get_authorize_url",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_authorize_url(self)",
        "def_index": 412,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 391,
        "file": "erpnext/erpnext/crm/doctype/twitter_settings/twitter_settings.py"
    },
    {
        "name": "callback",
        "arguments": [
            {
                "argument": "oauth_token",
                "type": "",
                "default": "None"
            },
            {
                "argument": "oauth_verifier",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def callback(oauth_token=None, oauth_verifier=None)",
        "def_index": 3726,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 3690,
        "file": "erpnext/erpnext/crm/doctype/twitter_settings/twitter_settings.py"
    },
    {
        "name": "get_exchange_rate",
        "arguments": [
            {
                "argument": "from_currency",
                "type": "",
                "default": ""
            },
            {
                "argument": "to_currency",
                "type": "",
                "default": ""
            },
            {
                "argument": "transaction_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "args",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_exchange_rate(from_currency, to_currency, transaction_date=None, args=None)",
        "def_index": 1255,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1235,
        "file": "erpnext/erpnext/setup/utils.py"
    },
    {
        "name": "get_weekly_off_dates",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_weekly_off_dates(self)",
        "def_index": 478,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 457,
        "file": "erpnext/erpnext/setup/doctype/holiday_list/holiday_list.py"
    },
    {
        "name": "clear_table",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def clear_table(self)",
        "def_index": 2067,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2046,
        "file": "erpnext/erpnext/setup/doctype/holiday_list/holiday_list.py"
    },
    {
        "name": "get_events",
        "arguments": [
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "end",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_events(start, end, filters=None)",
        "def_index": 2139,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2119,
        "file": "erpnext/erpnext/setup/doctype/holiday_list/holiday_list.py"
    },
    {
        "name": "get_terms_and_conditions",
        "arguments": [
            {
                "argument": "template_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "doc",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_terms_and_conditions(template_name, doc)",
        "def_index": 633,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 613,
        "file": "erpnext/erpnext/setup/doctype/terms_and_conditions/terms_and_conditions.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_children(doctype, parent=None, company=None, is_root=False)",
        "def_index": 1424,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1404,
        "file": "erpnext/erpnext/setup/doctype/department/department.py"
    },
    {
        "name": "add_node",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_node()",
        "def_index": 1873,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1853,
        "file": "erpnext/erpnext/setup/doctype/department/department.py"
    },
    {
        "name": "get_party_type",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_party_type(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 269,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 205,
        "file": "erpnext/erpnext/setup/doctype/party_type/party_type.py"
    },
    {
        "name": "get_users",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_users(self)",
        "def_index": 1014,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 993,
        "file": "erpnext/erpnext/setup/doctype/email_digest/email_digest.py"
    },
    {
        "name": "send",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def send(self)",
        "def_index": 1584,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1563,
        "file": "erpnext/erpnext/setup/doctype/email_digest/email_digest.py"
    },
    {
        "name": "get_digest_msg",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_digest_msg(name)",
        "def_index": 27384,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 27364,
        "file": "erpnext/erpnext/setup/doctype/email_digest/email_digest.py"
    },
    {
        "name": "deactivate_sales_person",
        "arguments": [
            {
                "argument": "status",
                "type": "",
                "default": "None"
            },
            {
                "argument": "employee",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def deactivate_sales_person(status=None, employee=None)",
        "def_index": 9443,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9423,
        "file": "erpnext/erpnext/setup/doctype/employee/employee.py"
    },
    {
        "name": "create_user",
        "arguments": [
            {
                "argument": "employee",
                "type": "",
                "default": ""
            },
            {
                "argument": "user",
                "type": "",
                "default": "None"
            },
            {
                "argument": "email",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def create_user(employee, user=None, email=None)",
        "def_index": 9707,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9687,
        "file": "erpnext/erpnext/setup/doctype/employee/employee.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            },
            {
                "argument": "is_tree",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_children(doctype, parent=None, company=None, is_root=False, is_tree=False)",
        "def_index": 11562,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11542,
        "file": "erpnext/erpnext/setup/doctype/employee/employee.py"
    },
    {
        "name": "get_doctypes_to_be_ignored",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_doctypes_to_be_ignored()",
        "def_index": 7215,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7195,
        "file": "erpnext/erpnext/setup/doctype/transaction_deletion_record/transaction_deletion_record.py"
    },
    {
        "name": "get_defaults",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_defaults(self)",
        "def_index": 1641,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1620,
        "file": "erpnext/erpnext/setup/doctype/global_defaults/global_defaults.py"
    },
    {
        "name": "check_if_transactions_exist",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def check_if_transactions_exist(self)",
        "def_index": 918,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 897,
        "file": "erpnext/erpnext/setup/doctype/company/company.py"
    },
    {
        "name": "create_default_tax_template",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_default_tax_template(self)",
        "def_index": 2237,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2216,
        "file": "erpnext/erpnext/setup/doctype/company/company.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_children(doctype, parent=None, company=None, is_root=False)",
        "def_index": 21222,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21202,
        "file": "erpnext/erpnext/setup/doctype/company/company.py"
    },
    {
        "name": "add_node",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_node()",
        "def_index": 21604,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21584,
        "file": "erpnext/erpnext/setup/doctype/company/company.py"
    },
    {
        "name": "get_default_company_address",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "sort_key",
                "type": "",
                "default": "is_primary_address"
            },
            {
                "argument": "existing_address",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_default_company_address(name, sort_key=\"is_primary_address\", existing_address=None)",
        "def_index": 23438,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 23418,
        "file": "erpnext/erpnext/setup/doctype/company/company.py"
    },
    {
        "name": "create_transaction_deletion_request",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_transaction_deletion_request(company)",
        "def_index": 24107,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 24087,
        "file": "erpnext/erpnext/setup/doctype/company/company.py"
    },
    {
        "name": "get_work_orders",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_work_orders(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 2230,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 2166,
        "file": "erpnext/erpnext/manufacturing/report/bom_variance_report/bom_variance_report.py"
    },
    {
        "name": "set_data_based_on_workstation_type",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_data_based_on_workstation_type(self)",
        "def_index": 902,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 881,
        "file": "erpnext/erpnext/manufacturing/doctype/workstation/workstation.py"
    },
    {
        "name": "get_default_holiday_list",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_default_holiday_list()",
        "def_index": 3056,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3036,
        "file": "erpnext/erpnext/manufacturing/doctype/workstation/workstation.py"
    },
    {
        "name": "get_routing",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_routing(self)",
        "def_index": 6963,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6942,
        "file": "erpnext/erpnext/manufacturing/doctype/bom/bom.py"
    },
    {
        "name": "get_bom_material_detail",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_bom_material_detail(self, args=None)",
        "def_index": 8699,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8678,
        "file": "erpnext/erpnext/manufacturing/doctype/bom/bom.py"
    },
    {
        "name": "update_cost",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "update_parent",
                "type": "",
                "default": "True"
            },
            {
                "argument": "from_child_bom",
                "type": "",
                "default": "False"
            },
            {
                "argument": "update_hour_rate",
                "type": "",
                "default": "True"
            },
            {
                "argument": "save",
                "type": "",
                "default": "True"
            }
        ],
        "def": "def update_cost(self, update_parent=True, from_child_bom=False, update_hour_rate=True, save=True)",
        "def_index": 11528,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11507,
        "file": "erpnext/erpnext/manufacturing/doctype/bom/bom.py"
    },
    {
        "name": "get_bom_items",
        "arguments": [
            {
                "argument": "bom",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "qty",
                "type": "",
                "default": "1"
            },
            {
                "argument": "fetch_exploded",
                "type": "",
                "default": "1"
            }
        ],
        "def": "def get_bom_items(bom, company, qty=1, fetch_exploded=1)",
        "def_index": 35286,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 35266,
        "file": "erpnext/erpnext/manufacturing/doctype/bom/bom.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "parent",
                "type": "",
                "default": "None"
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            },
            {
                "argument": "**filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_children(parent=None, is_root=False, **filters)",
        "def_index": 36429,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 36409,
        "file": "erpnext/erpnext/manufacturing/doctype/bom/bom.py"
    },
    {
        "name": "get_bom_diff",
        "arguments": [
            {
                "argument": "bom1",
                "type": "",
                "default": ""
            },
            {
                "argument": "bom2",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_bom_diff(bom1, bom2)",
        "def_index": 39941,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 39921,
        "file": "erpnext/erpnext/manufacturing/doctype/bom/bom.py"
    },
    {
        "name": "item_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def item_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 41469,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 41405,
        "file": "erpnext/erpnext/manufacturing/doctype/bom/bom.py"
    },
    {
        "name": "make_variant_bom",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "bom_no",
                "type": "",
                "default": ""
            },
            {
                "argument": "item",
                "type": "",
                "default": ""
            },
            {
                "argument": "variant_items",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_variant_bom(source_name, bom_no, item, variant_items, target_doc=None)",
        "def_index": 42965,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 42945,
        "file": "erpnext/erpnext/manufacturing/doctype/bom/bom.py"
    },
    {
        "name": "get_required_items",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_required_items(self)",
        "def_index": 14647,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 14626,
        "file": "erpnext/erpnext/manufacturing/doctype/job_card/job_card.py"
    },
    {
        "name": "make_time_log",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_time_log(args)",
        "def_index": 28413,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28393,
        "file": "erpnext/erpnext/manufacturing/doctype/job_card/job_card.py"
    },
    {
        "name": "get_operation_details",
        "arguments": [
            {
                "argument": "work_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "operation",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_operation_details(work_order, operation)",
        "def_index": 28645,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28625,
        "file": "erpnext/erpnext/manufacturing/doctype/job_card/job_card.py"
    },
    {
        "name": "get_operations",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_operations(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 28889,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28869,
        "file": "erpnext/erpnext/manufacturing/doctype/job_card/job_card.py"
    },
    {
        "name": "make_material_request",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_material_request(source_name, target_doc=None)",
        "def_index": 29398,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 29378,
        "file": "erpnext/erpnext/manufacturing/doctype/job_card/job_card.py"
    },
    {
        "name": "make_stock_entry",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_stock_entry(source_name, target_doc=None)",
        "def_index": 30085,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 30065,
        "file": "erpnext/erpnext/manufacturing/doctype/job_card/job_card.py"
    },
    {
        "name": "get_job_details",
        "arguments": [
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "end",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_job_details(start, end, filters=None)",
        "def_index": 31792,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 31772,
        "file": "erpnext/erpnext/manufacturing/doctype/job_card/job_card.py"
    },
    {
        "name": "make_corrective_job_card",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "operation",
                "type": "",
                "default": "None"
            },
            {
                "argument": "for_operation",
                "type": "",
                "default": "None"
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_corrective_job_card(source_name, operation=None, for_operation=None, target_doc=None)",
        "def_index": 32975,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 32955,
        "file": "erpnext/erpnext/manufacturing/doctype/job_card/job_card.py"
    },
    {
        "name": "get_items_and_operations_from_bom",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_items_and_operations_from_bom(self)",
        "def_index": 27175,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 27154,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "make_bom",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_bom(self)",
        "def_index": 31536,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 31515,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "get_bom_operations",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_bom_operations(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 32308,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 32244,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "get_item_details",
        "arguments": [
            {
                "argument": "item",
                "type": "",
                "default": ""
            },
            {
                "argument": "project",
                "type": "",
                "default": "None"
            },
            {
                "argument": "skip_bom_info",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_item_details(item, project=None, skip_bom_info=False)",
        "def_index": 32557,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 32537,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "make_work_order",
        "arguments": [
            {
                "argument": "bom_no",
                "type": "",
                "default": ""
            },
            {
                "argument": "item",
                "type": "",
                "default": ""
            },
            {
                "argument": "qty",
                "type": "",
                "default": "0"
            },
            {
                "argument": "project",
                "type": "",
                "default": "None"
            },
            {
                "argument": "variant_items",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_work_order(bom_no, item, qty=0, project=None, variant_items=None)",
        "def_index": 33966,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 33946,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "check_if_scrap_warehouse_mandatory",
        "arguments": [
            {
                "argument": "bom_no",
                "type": "",
                "default": ""
            }
        ],
        "def": "def check_if_scrap_warehouse_mandatory(bom_no)",
        "def_index": 35696,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 35676,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "set_work_order_ops",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_work_order_ops(name)",
        "def_index": 35942,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 35922,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "make_stock_entry",
        "arguments": [
            {
                "argument": "work_order_id",
                "type": "",
                "default": ""
            },
            {
                "argument": "purpose",
                "type": "",
                "default": ""
            },
            {
                "argument": "qty",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_stock_entry(work_order_id, purpose, qty=None)",
        "def_index": 36078,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 36058,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "get_default_warehouse",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_default_warehouse()",
        "def_index": 37370,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 37350,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "stop_unstop",
        "arguments": [
            {
                "argument": "work_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def stop_unstop(work_order, status)",
        "def_index": 37630,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 37610,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "query_sales_order",
        "arguments": [
            {
                "argument": "production_item",
                "type": "",
                "default": ""
            }
        ],
        "def": "def query_sales_order(production_item)",
        "def_index": 38197,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 38177,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "make_job_card",
        "arguments": [
            {
                "argument": "work_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "operations",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_job_card(work_order, operations)",
        "def_index": 38668,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 38648,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "close_work_order",
        "arguments": [
            {
                "argument": "work_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def close_work_order(work_order, status)",
        "def_index": 39125,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 39105,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "create_pick_list",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "for_qty",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def create_pick_list(source_name, target_doc=None, for_qty=None)",
        "def_index": 43011,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 42991,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "make_stock_return_entry",
        "arguments": [
            {
                "argument": "work_order",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_stock_return_entry(work_order)",
        "def_index": 45185,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 45165,
        "file": "erpnext/erpnext/manufacturing/doctype/work_order/work_order.py"
    },
    {
        "name": "enqueue_replace_bom",
        "arguments": [
            {
                "argument": "boms",
                "type": "",
                "default": ""
            }
        ],
        "def": "def enqueue_replace_bom(boms",
        "def_index": 421,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 401,
        "file": "erpnext/erpnext/manufacturing/doctype/bom_update_tool/bom_update_tool.py"
    },
    {
        "name": "enqueue_update_cost",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def enqueue_update_cost() -> \"BOMUpdateLog\"",
        "def_index": 785,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 765,
        "file": "erpnext/erpnext/manufacturing/doctype/bom_update_tool/bom_update_tool.py"
    },
    {
        "name": "is_material_consumption_enabled",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def is_material_consumption_enabled()",
        "def_index": 510,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 490,
        "file": "erpnext/erpnext/manufacturing/doctype/manufacturing_settings/manufacturing_settings.py"
    },
    {
        "name": "make_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_order(source_name)",
        "def_index": 1628,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1608,
        "file": "erpnext/erpnext/manufacturing/doctype/blanket_order/blanket_order.py"
    },
    {
        "name": "get_open_sales_orders",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_open_sales_orders(self)",
        "def_index": 2642,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2621,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "get_pending_material_requests",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_pending_material_requests(self)",
        "def_index": 3282,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3261,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "get_items",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_items(self)",
        "def_index": 4868,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4847,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "set_status",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "close",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def set_status(self, close=None)",
        "def_index": 12520,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12499,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "make_work_order",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_work_order(self)",
        "def_index": 14811,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 14790,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "make_material_request",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_material_request(self)",
        "def_index": 18805,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 18784,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "get_sub_assembly_items",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "manufacturing_type",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_sub_assembly_items(self, manufacturing_type=None)",
        "def_index": 21049,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21028,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "download_raw_materials",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouses",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def download_raw_materials(doc, warehouses=None)",
        "def_index": 24733,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 24713,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "get_bin_details",
        "arguments": [
            {
                "argument": "row",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "for_warehouse",
                "type": "",
                "default": "None"
            },
            {
                "argument": "all_warehouse",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_bin_details(row, company, for_warehouse=None, all_warehouse=False)",
        "def_index": 34762,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 34742,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "get_so_details",
        "arguments": [
            {
                "argument": "sales_order",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_so_details(sales_order)",
        "def_index": 35917,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 35897,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "get_items_for_material_requests",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouses",
                "type": "",
                "default": "None"
            },
            {
                "argument": "get_parent_warehouse_data",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_items_for_material_requests(doc, warehouses=None, get_parent_warehouse_data=None)",
        "def_index": 36476,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 36456,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "get_item_data",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_item_data(item_code)",
        "def_index": 43956,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 43936,
        "file": "erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.py"
    },
    {
        "name": "get_appointment_settings",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_appointment_settings()",
        "def_index": 645,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 609,
        "file": "erpnext/erpnext/www/book_appointment/index.py"
    },
    {
        "name": "get_timezones",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_timezones()",
        "def_index": 906,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 870,
        "file": "erpnext/erpnext/www/book_appointment/index.py"
    },
    {
        "name": "get_appointment_slots",
        "arguments": [
            {
                "argument": "date",
                "type": "",
                "default": ""
            },
            {
                "argument": "timezone",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_appointment_slots(date, timezone)",
        "def_index": 1006,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 970,
        "file": "erpnext/erpnext/www/book_appointment/index.py"
    },
    {
        "name": "create_appointment",
        "arguments": [
            {
                "argument": "date",
                "type": "",
                "default": ""
            },
            {
                "argument": "time",
                "type": "",
                "default": ""
            },
            {
                "argument": "tz",
                "type": "",
                "default": ""
            },
            {
                "argument": "contact",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_appointment(date, time, tz, contact)",
        "def_index": 3339,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 3303,
        "file": "erpnext/erpnext/www/book_appointment/index.py"
    },
    {
        "name": "handle_incoming_call",
        "arguments": [
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def handle_incoming_call(**kwargs)",
        "def_index": 308,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 272,
        "file": "erpnext/erpnext/erpnext_integrations/exotel_integration.py"
    },
    {
        "name": "handle_end_call",
        "arguments": [
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def handle_end_call(**kwargs)",
        "def_index": 852,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 816,
        "file": "erpnext/erpnext/erpnext_integrations/exotel_integration.py"
    },
    {
        "name": "handle_missed_call",
        "arguments": [
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def handle_missed_call(**kwargs)",
        "def_index": 959,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 923,
        "file": "erpnext/erpnext/erpnext_integrations/exotel_integration.py"
    },
    {
        "name": "get_call_status",
        "arguments": [
            {
                "argument": "call_id",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_call_status(call_id)",
        "def_index": 3002,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2982,
        "file": "erpnext/erpnext/erpnext_integrations/exotel_integration.py"
    },
    {
        "name": "make_a_call",
        "arguments": [
            {
                "argument": "from_number",
                "type": "",
                "default": ""
            },
            {
                "argument": "to_number",
                "type": "",
                "default": ""
            },
            {
                "argument": "caller_id",
                "type": "",
                "default": ""
            },
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_a_call(from_number, to_number, caller_id, **kwargs)",
        "def_index": 3240,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3220,
        "file": "erpnext/erpnext/erpnext_integrations/exotel_integration.py"
    },
    {
        "name": "order",
        "arguments": [
            {
                "argument": "*args",
                "type": "",
                "default": ""
            },
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def order(*args, **kwargs)",
        "def_index": 593,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 557,
        "file": "erpnext/erpnext/erpnext_integrations/connectors/woocommerce_connection.py"
    },
    {
        "name": "generate_secret",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def generate_secret()",
        "def_index": 2074,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2054,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/woocommerce_settings/woocommerce_settings.py"
    },
    {
        "name": "get_series",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_series()",
        "def_index": 2265,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2245,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/woocommerce_settings/woocommerce_settings.py"
    },
    {
        "name": "webhooks",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def webhooks()",
        "def_index": 203,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 167,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/gocardless_settings/__init__.py"
    },
    {
        "name": "get_account_balance_info",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_account_balance_info(self)",
        "def_index": 2896,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2875,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/mpesa_settings/mpesa_settings.py"
    },
    {
        "name": "verify_transaction",
        "arguments": [
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def verify_transaction(**kwargs)",
        "def_index": 5629,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 5593,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/mpesa_settings/mpesa_settings.py"
    },
    {
        "name": "process_balance_info",
        "arguments": [
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def process_balance_info(**kwargs)",
        "def_index": 9718,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 9682,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/mpesa_settings/mpesa_settings.py"
    },
    {
        "name": "new_doc",
        "arguments": [
            {
                "argument": "document",
                "type": "",
                "default": ""
            }
        ],
        "def": "def new_doc(document)",
        "def_index": 816,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 796,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/tally_migration/tally_migration.py"
    },
    {
        "name": "process_master_data",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def process_master_data(self)",
        "def_index": 22212,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22191,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/tally_migration/tally_migration.py"
    },
    {
        "name": "import_master_data",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def import_master_data(self)",
        "def_index": 22408,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22387,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/tally_migration/tally_migration.py"
    },
    {
        "name": "process_day_book_data",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def process_day_book_data(self)",
        "def_index": 22601,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22580,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/tally_migration/tally_migration.py"
    },
    {
        "name": "import_day_book_data",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def import_day_book_data(self)",
        "def_index": 22803,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22782,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/tally_migration/tally_migration.py"
    },
    {
        "name": "get_link_token",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_link_token()",
        "def_index": 619,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 598,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/plaid_settings/plaid_settings.py"
    },
    {
        "name": "get_plaid_configuration",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_plaid_configuration()",
        "def_index": 722,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 702,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/plaid_settings/plaid_settings.py"
    },
    {
        "name": "add_institution",
        "arguments": [
            {
                "argument": "token",
                "type": "",
                "default": ""
            },
            {
                "argument": "response",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_institution(token, response)",
        "def_index": 1055,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1035,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/plaid_settings/plaid_settings.py"
    },
    {
        "name": "add_bank_accounts",
        "arguments": [
            {
                "argument": "response",
                "type": "",
                "default": ""
            },
            {
                "argument": "bank",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_bank_accounts(response, bank, company)",
        "def_index": 1686,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1666,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/plaid_settings/plaid_settings.py"
    },
    {
        "name": "enqueue_synchronization",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def enqueue_synchronization()",
        "def_index": 8515,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8495,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/plaid_settings/plaid_settings.py"
    },
    {
        "name": "get_link_token_for_update",
        "arguments": [
            {
                "argument": "access_token",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_link_token_for_update(access_token)",
        "def_index": 8903,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8883,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/plaid_settings/plaid_settings.py"
    },
    {
        "name": "update_bank_account_ids",
        "arguments": [
            {
                "argument": "response",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_bank_account_ids(response)",
        "def_index": 9556,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9536,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/plaid_settings/plaid_settings.py"
    },
    {
        "name": "callback",
        "arguments": [
            {
                "argument": "*args",
                "type": "",
                "default": ""
            },
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def callback(*args, **kwargs)",
        "def_index": 662,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 642,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/quickbooks_migrator/quickbooks_migrator.py"
    },
    {
        "name": "migrate",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def migrate(self)",
        "def_index": 2096,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2075,
        "file": "erpnext/erpnext/erpnext_integrations/doctype/quickbooks_migrator/quickbooks_migrator.py"
    },
    {
        "name": "transaction_processing",
        "arguments": [
            {
                "argument": "data",
                "type": "",
                "default": ""
            },
            {
                "argument": "from_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "to_doctype",
                "type": "",
                "default": ""
            }
        ],
        "def": "def transaction_processing(data, from_doctype, to_doctype)",
        "def_index": 106,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 86,
        "file": "erpnext/erpnext/utilities/bulk_transaction.py"
    },
    {
        "name": "get_id_from_url",
        "arguments": [
            {
                "argument": "url",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_id_from_url(url)",
        "def_index": 2345,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2325,
        "file": "erpnext/erpnext/utilities/doctype/video/video.py"
    },
    {
        "name": "batch_update_youtube_data",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def batch_update_youtube_data()",
        "def_index": 2724,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2704,
        "file": "erpnext/erpnext/utilities/doctype/video/video.py"
    },
    {
        "name": "get_doctypes",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_doctypes()",
        "def_index": 343,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 323,
        "file": "erpnext/erpnext/utilities/doctype/rename_tool/rename_tool.py"
    },
    {
        "name": "upload",
        "arguments": [
            {
                "argument": "select_doctype",
                "type": "",
                "default": "None"
            },
            {
                "argument": "rows",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def upload(select_doctype=None, rows=None)",
        "def_index": 508,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 488,
        "file": "erpnext/erpnext/utilities/doctype/rename_tool/rename_tool.py"
    },
    {
        "name": "add_call_summary_and_call_type",
        "arguments": [
            {
                "argument": "call_log",
                "type": "",
                "default": ""
            },
            {
                "argument": "summary",
                "type": "",
                "default": ""
            },
            {
                "argument": "call_type",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_call_summary_and_call_type(call_log, summary, call_type)",
        "def_index": 3381,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3361,
        "file": "erpnext/erpnext/telephony/doctype/call_log/call_log.py"
    },
    {
        "name": "get_fiscal_year",
        "arguments": [
            {
                "argument": "date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "fiscal_year",
                "type": "",
                "default": "None"
            },
            {
                "argument": "label",
                "type": "",
                "default": "Date"
            },
            {
                "argument": "verbose",
                "type": "",
                "default": "1"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "as_dict",
                "type": "",
                "default": "False"
            },
            {
                "argument": "boolean",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_fiscal_year(date=None, fiscal_year=None, label=\"Date\", verbose=1, company=None, as_dict=False, boolean=False)",
        "def_index": 1326,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1306,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "get_fiscal_year_filter_field",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_fiscal_year_filter_field(company=None)",
        "def_index": 3533,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3513,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "get_balance_on",
        "arguments": [
            {
                "argument": "account",
                "type": "",
                "default": "None"
            },
            {
                "argument": "date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "in_account_currency",
                "type": "",
                "default": "True"
            },
            {
                "argument": "cost_center",
                "type": "",
                "default": "None"
            },
            {
                "argument": "ignore_account_permission",
                "type": "",
                "default": "False"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_balance_on(account=None,date=None,party_type=None,party=None,company=None,in_account_currency=True,cost_center=None,ignore_account_permission=False,)",
        "def_index": 4364,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4344,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "add_ac",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def add_ac(args=None)",
        "def_index": 10515,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10495,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "add_cc",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def add_cc(args=None)",
        "def_index": 11110,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11090,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "get_company_default",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "fieldname",
                "type": "",
                "default": ""
            },
            {
                "argument": "ignore_validation",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_company_default(company, fieldname, ignore_validation=False)",
        "def_index": 22647,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22627,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "get_companies",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_companies()",
        "def_index": 28525,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28505,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_children(doctype, parent, company, is_root=False)",
        "def_index": 28706,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28686,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "get_account_balances",
        "arguments": [
            {
                "argument": "accounts",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_account_balances(accounts, company)",
        "def_index": 29542,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 29522,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "update_cost_center",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            },
            {
                "argument": "cost_center_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "cost_center_number",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "merge",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_cost_center(docname, cost_center_name, cost_center_number, company, merge)",
        "def_index": 31761,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 31741,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "get_coa",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": ""
            },
            {
                "argument": "is_root",
                "type": "",
                "default": ""
            },
            {
                "argument": "chart",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_coa(doctype, parent, is_root, chart=None)",
        "def_index": 33551,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 33531,
        "file": "erpnext/erpnext/accounts/utils.py"
    },
    {
        "name": "get_party_details",
        "arguments": [
            {
                "argument": "party",
                "type": "",
                "default": "None"
            },
            {
                "argument": "account",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party_type",
                "type": "",
                "default": "Customer"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "bill_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "price_list",
                "type": "",
                "default": "None"
            },
            {
                "argument": "currency",
                "type": "",
                "default": "None"
            },
            {
                "argument": "doctype",
                "type": "",
                "default": "None"
            },
            {
                "argument": "ignore_permissions",
                "type": "",
                "default": "False"
            },
            {
                "argument": "fetch_payment_terms_template",
                "type": "",
                "default": "True"
            },
            {
                "argument": "party_address",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company_address",
                "type": "",
                "default": "None"
            },
            {
                "argument": "shipping_address",
                "type": "",
                "default": "None"
            },
            {
                "argument": "pos_profile",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_party_details(party=None,account=None,party_type=\"Customer\",company=None,posting_date=None,bill_date=None,price_list=None,currency=None,doctype=None,ignore_permissions=False,fetch_payment_terms_template=True,party_address=None,company_address=None,shipping_address=None,pos_profile=None,)",
        "def_index": 1253,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1233,
        "file": "erpnext/erpnext/accounts/party.py"
    },
    {
        "name": "get_party_account",
        "arguments": [
            {
                "argument": "party_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "party",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "include_advance",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_party_account(party_type, party=None, company=None, include_advance=False)",
        "def_index": 10188,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10168,
        "file": "erpnext/erpnext/accounts/party.py"
    },
    {
        "name": "get_party_bank_account",
        "arguments": [
            {
                "argument": "party_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "party",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_party_bank_account(party_type, party)",
        "def_index": 12966,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12946,
        "file": "erpnext/erpnext/accounts/party.py"
    },
    {
        "name": "get_due_date",
        "arguments": [
            {
                "argument": "posting_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "party",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "bill_date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_due_date(posting_date, party_type, party, company=None, bill_date=None)",
        "def_index": 16775,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 16755,
        "file": "erpnext/erpnext/accounts/party.py"
    },
    {
        "name": "get_address_tax_category",
        "arguments": [
            {
                "argument": "tax_category",
                "type": "",
                "default": "None"
            },
            {
                "argument": "billing_address",
                "type": "",
                "default": "None"
            },
            {
                "argument": "shipping_address",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_address_tax_category(tax_category=None, billing_address=None, shipping_address=None)",
        "def_index": 19606,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 19586,
        "file": "erpnext/erpnext/accounts/party.py"
    },
    {
        "name": "set_taxes",
        "arguments": [
            {
                "argument": "party",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "customer_group",
                "type": "",
                "default": "None"
            },
            {
                "argument": "supplier_group",
                "type": "",
                "default": "None"
            },
            {
                "argument": "tax_category",
                "type": "",
                "default": "None"
            },
            {
                "argument": "billing_address",
                "type": "",
                "default": "None"
            },
            {
                "argument": "shipping_address",
                "type": "",
                "default": "None"
            },
            {
                "argument": "use_for_shopping_cart",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_taxes(party,party_type,posting_date,company,customer_group=None,supplier_group=None,tax_category=None,billing_address=None,shipping_address=None,use_for_shopping_cart=None,)",
        "def_index": 20167,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20147,
        "file": "erpnext/erpnext/accounts/party.py"
    },
    {
        "name": "get_payment_terms_template",
        "arguments": [
            {
                "argument": "party_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_payment_terms_template(party_name, party_type, company=None)",
        "def_index": 21352,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21332,
        "file": "erpnext/erpnext/accounts/party.py"
    },
    {
        "name": "get",
        "arguments": [
            {
                "argument": "chart_name",
                "type": "",
                "default": "None"
            },
            {
                "argument": "chart",
                "type": "",
                "default": "None"
            },
            {
                "argument": "no_cache",
                "type": "",
                "default": "None"
            },
            {
                "argument": "filters",
                "type": "",
                "default": "None"
            },
            {
                "argument": "from_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "to_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "timespan",
                "type": "",
                "default": "None"
            },
            {
                "argument": "time_interval",
                "type": "",
                "default": "None"
            },
            {
                "argument": "heatmap_year",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get(chart_name=None,chart=None,no_cache=None,filters=None,from_date=None,to_date=None,timespan=None,time_interval=None,heatmap_year=None,)",
        "def_index": 469,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@cache_source"
        ],
        "index": 435,
        "file": "erpnext/erpnext/accounts/dashboard_chart_source/account_balance_timeline/account_balance_timeline.py"
    },
    {
        "name": "get_invoiced_item_gross_margin",
        "arguments": [
            {
                "argument": "sales_invoice",
                "type": "",
                "default": "None"
            },
            {
                "argument": "item_code",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "with_item_data",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_invoiced_item_gross_margin(sales_invoice=None, item_code=None, company=None, with_item_data=False)",
        "def_index": 4203,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4183,
        "file": "erpnext/erpnext/accounts/report/utils.py"
    },
    {
        "name": "get_shipping_address",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "address",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_shipping_address(company, address=None)",
        "def_index": 1347,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1327,
        "file": "erpnext/erpnext/accounts/custom/address.py"
    },
    {
        "name": "pos_profile_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def pos_profile_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 4660,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 4596,
        "file": "erpnext/erpnext/accounts/doctype/pos_profile/pos_profile.py"
    },
    {
        "name": "set_default_profile",
        "arguments": [
            {
                "argument": "pos_profile",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_default_profile(pos_profile, company)",
        "def_index": 5642,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5622,
        "file": "erpnext/erpnext/accounts/doctype/pos_profile/pos_profile.py"
    },
    {
        "name": "make_jv_entry",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "account",
                "type": "",
                "default": ""
            },
            {
                "argument": "amount",
                "type": "",
                "default": ""
            },
            {
                "argument": "payment_account",
                "type": "",
                "default": ""
            },
            {
                "argument": "credit_applicant_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "credit_applicant",
                "type": "",
                "default": ""
            },
            {
                "argument": "debit_applicant_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "debit_applicant",
                "type": "",
                "default": ""
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_jv_entry(company,account,amount,payment_account,credit_applicant_type,credit_applicant,debit_applicant_type,debit_applicant,)",
        "def_index": 9820,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9800,
        "file": "erpnext/erpnext/accounts/doctype/share_transfer/share_transfer.py"
    },
    {
        "name": "make_invoices",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_invoices(self)",
        "def_index": 6488,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6467,
        "file": "erpnext/erpnext/accounts/doctype/opening_invoice_creation_tool/opening_invoice_creation_tool.py"
    },
    {
        "name": "get_temporary_opening_account",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_temporary_opening_account(company=None)",
        "def_index": 8274,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8254,
        "file": "erpnext/erpnext/accounts/doctype/opening_invoice_creation_tool/opening_invoice_creation_tool.py"
    },
    {
        "name": "upload_bank_statement",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def upload_bank_statement()",
        "def_index": 249,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 229,
        "file": "erpnext/erpnext/accounts/doctype/bank_transaction/bank_transaction_upload.py"
    },
    {
        "name": "create_bank_entries",
        "arguments": [
            {
                "argument": "columns",
                "type": "",
                "default": ""
            },
            {
                "argument": "data",
                "type": "",
                "default": ""
            },
            {
                "argument": "bank_account",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_bank_entries(columns, data, bank_account)",
        "def_index": 978,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 958,
        "file": "erpnext/erpnext/accounts/doctype/bank_transaction/bank_transaction_upload.py"
    },
    {
        "name": "remove_payment_entries",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def remove_payment_entries(self)",
        "def_index": 4395,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4374,
        "file": "erpnext/erpnext/accounts/doctype/bank_transaction/bank_transaction.py"
    },
    {
        "name": "get_doctypes_for_bank_reconciliation",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_doctypes_for_bank_reconciliation()",
        "def_index": 5799,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5779,
        "file": "erpnext/erpnext/accounts/doctype/bank_transaction/bank_transaction.py"
    },
    {
        "name": "unclear_reference_payment",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "docname",
                "type": "",
                "default": ""
            },
            {
                "argument": "bt_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def unclear_reference_payment(doctype, docname, bt_name)",
        "def_index": 12637,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12617,
        "file": "erpnext/erpnext/accounts/doctype/bank_transaction/bank_transaction.py"
    },
    {
        "name": "get_payment_entries",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_payment_entries(self)",
        "def_index": 433,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 412,
        "file": "erpnext/erpnext/accounts/doctype/bank_clearance/bank_clearance.py"
    },
    {
        "name": "update_clearance_date",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_clearance_date(self)",
        "def_index": 1688,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1667,
        "file": "erpnext/erpnext/accounts/doctype/bank_clearance/bank_clearance.py"
    },
    {
        "name": "make_payment_request",
        "arguments": [
            {
                "argument": "**args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_payment_request(**args)",
        "def_index": 12178,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 12142,
        "file": "erpnext/erpnext/accounts/doctype/payment_request/payment_request.py"
    },
    {
        "name": "get_print_format_list",
        "arguments": [
            {
                "argument": "ref_doctype",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_print_format_list(ref_doctype)",
        "def_index": 17513,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17493,
        "file": "erpnext/erpnext/accounts/doctype/payment_request/payment_request.py"
    },
    {
        "name": "resend_payment_email",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def resend_payment_email(docname)",
        "def_index": 17787,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 17751,
        "file": "erpnext/erpnext/accounts/doctype/payment_request/payment_request.py"
    },
    {
        "name": "make_payment_entry",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_payment_entry(docname)",
        "def_index": 17908,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17888,
        "file": "erpnext/erpnext/accounts/doctype/payment_request/payment_request.py"
    },
    {
        "name": "get_subscription_details",
        "arguments": [
            {
                "argument": "reference_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_subscription_details(reference_doctype, reference_name)",
        "def_index": 19696,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 19676,
        "file": "erpnext/erpnext/accounts/doctype/payment_request/payment_request.py"
    },
    {
        "name": "make_payment_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_payment_order(source_name, target_doc=None)",
        "def_index": 20199,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20179,
        "file": "erpnext/erpnext/accounts/doctype/payment_request/payment_request.py"
    },
    {
        "name": "validate_company",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def validate_company(company)",
        "def_index": 1126,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1106,
        "file": "erpnext/erpnext/accounts/doctype/chart_of_accounts_importer/chart_of_accounts_importer.py"
    },
    {
        "name": "import_coa",
        "arguments": [
            {
                "argument": "file_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def import_coa(file_name, company)",
        "def_index": 1813,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1793,
        "file": "erpnext/erpnext/accounts/doctype/chart_of_accounts_importer/chart_of_accounts_importer.py"
    },
    {
        "name": "get_coa",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": ""
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            },
            {
                "argument": "file_name",
                "type": "",
                "default": "None"
            },
            {
                "argument": "for_validate",
                "type": "",
                "default": "0"
            }
        ],
        "def": "def get_coa(doctype, parent, is_root=False, file_name=None, for_validate=0)",
        "def_index": 3898,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3878,
        "file": "erpnext/erpnext/accounts/doctype/chart_of_accounts_importer/chart_of_accounts_importer.py"
    },
    {
        "name": "download_template",
        "arguments": [
            {
                "argument": "file_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "template_type",
                "type": "",
                "default": ""
            }
        ],
        "def": "def download_template(file_type, template_type)",
        "def_index": 7946,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7926,
        "file": "erpnext/erpnext/accounts/doctype/chart_of_accounts_importer/chart_of_accounts_importer.py"
    },
    {
        "name": "validate_accounts",
        "arguments": [
            {
                "argument": "file_doc",
                "type": "",
                "default": ""
            },
            {
                "argument": "extension",
                "type": "",
                "default": ""
            }
        ],
        "def": "def validate_accounts(file_doc, extension)",
        "def_index": 10369,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10349,
        "file": "erpnext/erpnext/accounts/doctype/chart_of_accounts_importer/chart_of_accounts_importer.py"
    },
    {
        "name": "check_journal_entry_condition",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def check_journal_entry_condition(self)",
        "def_index": 1941,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1920,
        "file": "erpnext/erpnext/accounts/doctype/exchange_rate_revaluation/exchange_rate_revaluation.py"
    },
    {
        "name": "get_accounts_data",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_accounts_data(self)",
        "def_index": 2973,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2952,
        "file": "erpnext/erpnext/accounts/doctype/exchange_rate_revaluation/exchange_rate_revaluation.py"
    },
    {
        "name": "make_jv_entries",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_jv_entries(self)",
        "def_index": 9856,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9835,
        "file": "erpnext/erpnext/accounts/doctype/exchange_rate_revaluation/exchange_rate_revaluation.py"
    },
    {
        "name": "get_account_details",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "account",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party",
                "type": "",
                "default": "None"
            },
            {
                "argument": "rounding_loss_allowance",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_account_details(company, posting_date, account, party_type=None, party=None, rounding_loss_allowance",
        "def_index": 18520,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 18500,
        "file": "erpnext/erpnext/accounts/doctype/exchange_rate_revaluation/exchange_rate_revaluation.py"
    },
    {
        "name": "get_reconciled_count",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_reconciled_count(docname",
        "def_index": 1598,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1578,
        "file": "erpnext/erpnext/accounts/doctype/process_payment_reconciliation/process_payment_reconciliation.py"
    },
    {
        "name": "pause_job_for_doc",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def pause_job_for_doc(docname",
        "def_index": 2850,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2830,
        "file": "erpnext/erpnext/accounts/doctype/process_payment_reconciliation/process_payment_reconciliation.py"
    },
    {
        "name": "trigger_job_for_doc",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def trigger_job_for_doc(docname",
        "def_index": 3216,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3196,
        "file": "erpnext/erpnext/accounts/doctype/process_payment_reconciliation/process_payment_reconciliation.py"
    },
    {
        "name": "is_any_doc_running",
        "arguments": [
            {
                "argument": "for_filter",
                "type": "",
                "default": ""
            }
        ],
        "def": "def is_any_doc_running(for_filter",
        "def_index": 15143,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 15123,
        "file": "erpnext/erpnext/accounts/doctype/process_payment_reconciliation/process_payment_reconciliation.py"
    },
    {
        "name": "create_disbursement_entry",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_disbursement_entry(self)",
        "def_index": 5122,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5101,
        "file": "erpnext/erpnext/accounts/doctype/invoice_discounting/invoice_discounting.py"
    },
    {
        "name": "close_loan",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def close_loan(self)",
        "def_index": 6886,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6865,
        "file": "erpnext/erpnext/accounts/doctype/invoice_discounting/invoice_discounting.py"
    },
    {
        "name": "get_invoices",
        "arguments": [
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_invoices(filters)",
        "def_index": 8615,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8595,
        "file": "erpnext/erpnext/accounts/doctype/invoice_discounting/invoice_discounting.py"
    },
    {
        "name": "get_unreconciled_entries",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_unreconciled_entries(self)",
        "def_index": 965,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 944,
        "file": "erpnext/erpnext/accounts/doctype/payment_reconciliation/payment_reconciliation.py"
    },
    {
        "name": "is_auto_process_enabled",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def is_auto_process_enabled(self)",
        "def_index": 8945,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8924,
        "file": "erpnext/erpnext/accounts/doctype/payment_reconciliation/payment_reconciliation.py"
    },
    {
        "name": "calculate_difference_on_allocation_change",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "payment_entry",
                "type": "",
                "default": ""
            },
            {
                "argument": "invoice",
                "type": "",
                "default": ""
            },
            {
                "argument": "allocated_amount",
                "type": "",
                "default": ""
            }
        ],
        "def": "def calculate_difference_on_allocation_change(self, payment_entry, invoice, allocated_amount)",
        "def_index": 9087,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9066,
        "file": "erpnext/erpnext/accounts/doctype/payment_reconciliation/payment_reconciliation.py"
    },
    {
        "name": "allocate_entries",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def allocate_entries(self, args)",
        "def_index": 9514,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9493,
        "file": "erpnext/erpnext/accounts/doctype/payment_reconciliation/payment_reconciliation.py"
    },
    {
        "name": "reconcile",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def reconcile(self)",
        "def_index": 12719,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12698,
        "file": "erpnext/erpnext/accounts/doctype/payment_reconciliation/payment_reconciliation.py"
    },
    {
        "name": "get_voucher_details",
        "arguments": [
            {
                "argument": "bank_guarantee_type",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_voucher_details(bank_guarantee_type",
        "def_index": 730,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 710,
        "file": "erpnext/erpnext/accounts/doctype/bank_guarantee/bank_guarantee.py"
    },
    {
        "name": "set_missing_values",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "for_validate",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def set_missing_values(self, for_validate=False)",
        "def_index": 16177,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 16156,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "repost_accounting_entries",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def repost_accounting_entries(self)",
        "def_index": 20367,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20346,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "add_timesheet_data",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_timesheet_data(self)",
        "def_index": 32131,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 32110,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "get_bank_cash_account",
        "arguments": [
            {
                "argument": "mode_of_payment",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_bank_cash_account(mode_of_payment, company)",
        "def_index": 63331,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 63311,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "make_maintenance_schedule",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_maintenance_schedule(source_name, target_doc=None)",
        "def_index": 63776,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 63756,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "make_delivery_note",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_delivery_note(source_name, target_doc=None)",
        "def_index": 64136,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 64116,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "make_sales_return",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_sales_return(source_name, target_doc=None)",
        "def_index": 65592,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 65572,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "make_inter_company_purchase_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_inter_company_purchase_invoice(source_name, target_doc=None)",
        "def_index": 68695,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 68675,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "get_loyalty_programs",
        "arguments": [
            {
                "argument": "customer",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_loyalty_programs(customer)",
        "def_index": 78564,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 78544,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "create_invoice_discounting",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def create_invoice_discounting(source_name, target_doc=None)",
        "def_index": 79192,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 79172,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "create_dunning",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def create_dunning(source_name, target_doc=None)",
        "def_index": 81867,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 81847,
        "file": "erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.py"
    },
    {
        "name": "disable_dimension",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": ""
            }
        ],
        "def": "def disable_dimension(doc)",
        "def_index": 4859,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4839,
        "file": "erpnext/erpnext/accounts/doctype/accounting_dimension/accounting_dimension.py"
    },
    {
        "name": "get_dimensions",
        "arguments": [
            {
                "argument": "with_cost_center_and_project",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_dimensions(with_cost_center_and_project=False)",
        "def_index": 6770,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6750,
        "file": "erpnext/erpnext/accounts/doctype/accounting_dimension/accounting_dimension.py"
    },
    {
        "name": "set_missing_values",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "for_validate",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def set_missing_values(self, for_validate=False)",
        "def_index": 14893,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 14872,
        "file": "erpnext/erpnext/accounts/doctype/pos_invoice/pos_invoice.py"
    },
    {
        "name": "reset_mode_of_payments",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def reset_mode_of_payments(self)",
        "def_index": 15798,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 15777,
        "file": "erpnext/erpnext/accounts/doctype/pos_invoice/pos_invoice.py"
    },
    {
        "name": "create_payment_request",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_payment_request(self)",
        "def_index": 16207,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 16186,
        "file": "erpnext/erpnext/accounts/doctype/pos_invoice/pos_invoice.py"
    },
    {
        "name": "get_stock_availability",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_stock_availability(item_code, warehouse)",
        "def_index": 17748,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17728,
        "file": "erpnext/erpnext/accounts/doctype/pos_invoice/pos_invoice.py"
    },
    {
        "name": "make_sales_return",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_sales_return(source_name, target_doc=None)",
        "def_index": 19807,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 19787,
        "file": "erpnext/erpnext/accounts/doctype/pos_invoice/pos_invoice.py"
    },
    {
        "name": "make_merge_log",
        "arguments": [
            {
                "argument": "invoices",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_merge_log(invoices)",
        "def_index": 20022,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20002,
        "file": "erpnext/erpnext/accounts/doctype/pos_invoice/pos_invoice.py"
    },
    {
        "name": "convert_group_to_ledger",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def convert_group_to_ledger(self)",
        "def_index": 1258,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1237,
        "file": "erpnext/erpnext/accounts/doctype/cost_center/cost_center.py"
    },
    {
        "name": "convert_ledger_to_group",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def convert_ledger_to_group(self)",
        "def_index": 1612,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1591,
        "file": "erpnext/erpnext/accounts/doctype/cost_center/cost_center.py"
    },
    {
        "name": "cancel_subscription",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def cancel_subscription(name)",
        "def_index": 22755,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22735,
        "file": "erpnext/erpnext/accounts/doctype/subscription/subscription.py"
    },
    {
        "name": "restart_subscription",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def restart_subscription(name)",
        "def_index": 23068,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 23048,
        "file": "erpnext/erpnext/accounts/doctype/subscription/subscription.py"
    },
    {
        "name": "get_subscription_updates",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_subscription_updates(name)",
        "def_index": 23339,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 23319,
        "file": "erpnext/erpnext/accounts/doctype/subscription/subscription.py"
    },
    {
        "name": "start_payment_ledger_repost",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def start_payment_ledger_repost(docname=None)",
        "def_index": 676,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 656,
        "file": "erpnext/erpnext/accounts/doctype/repost_payment_ledger/repost_payment_ledger.py"
    },
    {
        "name": "execute_repost_payment_ledger",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def execute_repost_payment_ledger(docname)",
        "def_index": 3043,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3023,
        "file": "erpnext/erpnext/accounts/doctype/repost_payment_ledger/repost_payment_ledger.py"
    },
    {
        "name": "get_party_details",
        "arguments": [
            {
                "argument": "party",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_party_details(party, party_type, args=None)",
        "def_index": 3818,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3798,
        "file": "erpnext/erpnext/accounts/doctype/tax_rule/tax_rule.py"
    },
    {
        "name": "fetch_customers",
        "arguments": [
            {
                "argument": "customer_collection",
                "type": "",
                "default": ""
            },
            {
                "argument": "collection_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "primary_mandatory",
                "type": "",
                "default": ""
            }
        ],
        "def": "def fetch_customers(customer_collection, collection_name, primary_mandatory)",
        "def_index": 8119,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8099,
        "file": "erpnext/erpnext/accounts/doctype/process_statement_of_accounts/process_statement_of_accounts.py"
    },
    {
        "name": "get_customer_emails",
        "arguments": [
            {
                "argument": "customer_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "primary_mandatory",
                "type": "",
                "default": ""
            },
            {
                "argument": "billing_and_primary",
                "type": "",
                "default": "True"
            }
        ],
        "def": "def get_customer_emails(customer_name, primary_mandatory, billing_and_primary=True)",
        "def_index": 9231,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9211,
        "file": "erpnext/erpnext/accounts/doctype/process_statement_of_accounts/process_statement_of_accounts.py"
    },
    {
        "name": "download_statements",
        "arguments": [
            {
                "argument": "document_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def download_statements(document_name)",
        "def_index": 10483,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10463,
        "file": "erpnext/erpnext/accounts/doctype/process_statement_of_accounts/process_statement_of_accounts.py"
    },
    {
        "name": "send_emails",
        "arguments": [
            {
                "argument": "document_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "from_scheduler",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def send_emails(document_name, from_scheduler=False)",
        "def_index": 10797,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10777,
        "file": "erpnext/erpnext/accounts/doctype/process_statement_of_accounts/process_statement_of_accounts.py"
    },
    {
        "name": "send_auto_email",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def send_auto_email()",
        "def_index": 12270,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12250,
        "file": "erpnext/erpnext/accounts/doctype/process_statement_of_accounts/process_statement_of_accounts.py"
    },
    {
        "name": "create_party_link",
        "arguments": [
            {
                "argument": "primary_role",
                "type": "",
                "default": ""
            },
            {
                "argument": "primary_party",
                "type": "",
                "default": ""
            },
            {
                "argument": "secondary_party",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_party_link(primary_role, primary_party, secondary_party)",
        "def_index": 1486,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1466,
        "file": "erpnext/erpnext/accounts/doctype/party_link/party_link.py"
    },
    {
        "name": "get_loyalty_program_details_with_points",
        "arguments": [
            {
                "argument": "customer",
                "type": "",
                "default": ""
            },
            {
                "argument": "loyalty_program",
                "type": "",
                "default": "None"
            },
            {
                "argument": "expiry_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "silent",
                "type": "",
                "default": "False"
            },
            {
                "argument": "include_expired_entry",
                "type": "",
                "default": "False"
            },
            {
                "argument": "current_transaction_amount",
                "type": "",
                "default": "0"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_loyalty_program_details_with_points(customer,loyalty_program=None,expiry_date=None,company=None,silent=False,include_expired_entry=False,current_transaction_amount=0,)",
        "def_index": 1114,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1094,
        "file": "erpnext/erpnext/accounts/doctype/loyalty_program/loyalty_program.py"
    },
    {
        "name": "get_loyalty_program_details",
        "arguments": [
            {
                "argument": "customer",
                "type": "",
                "default": ""
            },
            {
                "argument": "loyalty_program",
                "type": "",
                "default": "None"
            },
            {
                "argument": "expiry_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "silent",
                "type": "",
                "default": "False"
            },
            {
                "argument": "include_expired_entry",
                "type": "",
                "default": "False"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_loyalty_program_details(customer,loyalty_program=None,expiry_date=None,company=None,silent=False,include_expired_entry=False,)",
        "def_index": 2024,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2004,
        "file": "erpnext/erpnext/accounts/doctype/loyalty_program/loyalty_program.py"
    },
    {
        "name": "get_redeemption_factor",
        "arguments": [
            {
                "argument": "loyalty_program",
                "type": "",
                "default": "None"
            },
            {
                "argument": "customer",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_redeemption_factor(loyalty_program=None, customer=None)",
        "def_index": 2830,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2810,
        "file": "erpnext/erpnext/accounts/doctype/loyalty_program/loyalty_program.py"
    },
    {
        "name": "get_mop_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_mop_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 950,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 886,
        "file": "erpnext/erpnext/accounts/doctype/payment_order/payment_order.py"
    },
    {
        "name": "get_supplier_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_supplier_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 1378,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 1314,
        "file": "erpnext/erpnext/accounts/doctype/payment_order/payment_order.py"
    },
    {
        "name": "make_payment_records",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "supplier",
                "type": "",
                "default": ""
            },
            {
                "argument": "mode_of_payment",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_payment_records(name, supplier, mode_of_payment=None)",
        "def_index": 1811,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1791,
        "file": "erpnext/erpnext/accounts/doctype/payment_order/payment_order.py"
    },
    {
        "name": "get_dunning_letter_text",
        "arguments": [
            {
                "argument": "dunning_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "doc",
                "type": "",
                "default": ""
            },
            {
                "argument": "language",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_dunning_letter_text(dunning_type, doc, language=None)",
        "def_index": 4280,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4260,
        "file": "erpnext/erpnext/accounts/doctype/dunning/dunning.py"
    },
    {
        "name": "make_bank_account",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_bank_account(doctype, docname)",
        "def_index": 1633,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1613,
        "file": "erpnext/erpnext/accounts/doctype/bank_account/bank_account.py"
    },
    {
        "name": "get_bank_account_details",
        "arguments": [
            {
                "argument": "bank_account",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_bank_account_details(bank_account)",
        "def_index": 1934,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1914,
        "file": "erpnext/erpnext/accounts/doctype/bank_account/bank_account.py"
    },
    {
        "name": "create_or_update_cheque_print_format",
        "arguments": [
            {
                "argument": "template_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_or_update_cheque_print_format(template_name)",
        "def_index": 266,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 246,
        "file": "erpnext/erpnext/accounts/doctype/cheque_print_template/cheque_print_template.py"
    },
    {
        "name": "get_plan_rate",
        "arguments": [
            {
                "argument": "plan",
                "type": "",
                "default": ""
            },
            {
                "argument": "quantity",
                "type": "",
                "default": "1"
            },
            {
                "argument": "customer",
                "type": "",
                "default": "None"
            },
            {
                "argument": "start_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "end_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "prorate_factor",
                "type": "",
                "default": "1"
            }
        ],
        "def": "def get_plan_rate(plan, quantity=1, customer=None, start_date=None, end_date=None, prorate_factor=1)",
        "def_index": 615,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 595,
        "file": "erpnext/erpnext/accounts/doctype/subscription_plan/subscription_plan.py"
    },
    {
        "name": "form_start_merge",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def form_start_merge(docname)",
        "def_index": 981,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 961,
        "file": "erpnext/erpnext/accounts/doctype/ledger_merge/ledger_merge.py"
    },
    {
        "name": "make_debit_note",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_debit_note(source_name, target_doc=None)",
        "def_index": 59614,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 59594,
        "file": "erpnext/erpnext/accounts/doctype/purchase_invoice/purchase_invoice.py"
    },
    {
        "name": "make_stock_entry",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_stock_entry(source_name, target_doc=None)",
        "def_index": 59832,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 59812,
        "file": "erpnext/erpnext/accounts/doctype/purchase_invoice/purchase_invoice.py"
    },
    {
        "name": "change_release_date",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "release_date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def change_release_date(name, release_date=None)",
        "def_index": 60240,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 60220,
        "file": "erpnext/erpnext/accounts/doctype/purchase_invoice/purchase_invoice.py"
    },
    {
        "name": "unblock_invoice",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def unblock_invoice(name)",
        "def_index": 60450,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 60430,
        "file": "erpnext/erpnext/accounts/doctype/purchase_invoice/purchase_invoice.py"
    },
    {
        "name": "block_invoice",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "release_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "hold_comment",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def block_invoice(name, release_date, hold_comment=None)",
        "def_index": 60618,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 60598,
        "file": "erpnext/erpnext/accounts/doctype/purchase_invoice/purchase_invoice.py"
    },
    {
        "name": "make_inter_company_sales_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_inter_company_sales_invoice(source_name, target_doc=None)",
        "def_index": 60841,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 60821,
        "file": "erpnext/erpnext/accounts/doctype/purchase_invoice/purchase_invoice.py"
    },
    {
        "name": "make_purchase_receipt",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_receipt(source_name, target_doc=None)",
        "def_index": 61226,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 61206,
        "file": "erpnext/erpnext/accounts/doctype/purchase_invoice/purchase_invoice.py"
    },
    {
        "name": "get_naming_series",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_naming_series()",
        "def_index": 246,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 226,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry_template/journal_entry_template.py"
    },
    {
        "name": "get_preview_from_template",
        "arguments": [
            {
                "argument": "data_import",
                "type": "",
                "default": ""
            },
            {
                "argument": "import_file",
                "type": "",
                "default": "None"
            },
            {
                "argument": "google_sheets_url",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_preview_from_template(data_import, import_file=None, google_sheets_url=None)",
        "def_index": 2525,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2505,
        "file": "erpnext/erpnext/accounts/doctype/bank_statement_import/bank_statement_import.py"
    },
    {
        "name": "form_start_import",
        "arguments": [
            {
                "argument": "data_import",
                "type": "",
                "default": ""
            }
        ],
        "def": "def form_start_import(data_import)",
        "def_index": 2757,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2737,
        "file": "erpnext/erpnext/accounts/doctype/bank_statement_import/bank_statement_import.py"
    },
    {
        "name": "download_errored_template",
        "arguments": [
            {
                "argument": "data_import_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def download_errored_template(data_import_name)",
        "def_index": 2891,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2871,
        "file": "erpnext/erpnext/accounts/doctype/bank_statement_import/bank_statement_import.py"
    },
    {
        "name": "upload_bank_statement",
        "arguments": [
            {
                "argument": "**args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def upload_bank_statement(**args)",
        "def_index": 6248,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6228,
        "file": "erpnext/erpnext/accounts/doctype/bank_statement_import/bank_statement_import.py"
    },
    {
        "name": "convert_group_to_ledger",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def convert_group_to_ledger(self)",
        "def_index": 9812,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9791,
        "file": "erpnext/erpnext/accounts/doctype/account/account.py"
    },
    {
        "name": "convert_ledger_to_group",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def convert_ledger_to_group(self)",
        "def_index": 10142,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10121,
        "file": "erpnext/erpnext/accounts/doctype/account/account.py"
    },
    {
        "name": "get_parent_account",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_parent_account(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 11218,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 11154,
        "file": "erpnext/erpnext/accounts/doctype/account/account.py"
    },
    {
        "name": "update_account_number",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "account_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "account_number",
                "type": "",
                "default": "None"
            },
            {
                "argument": "from_descendant",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def update_account_number(name, account_name, account_number=None, from_descendant=False)",
        "def_index": 12947,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12927,
        "file": "erpnext/erpnext/accounts/doctype/account/account.py"
    },
    {
        "name": "merge_account",
        "arguments": [
            {
                "argument": "old",
                "type": "",
                "default": ""
            },
            {
                "argument": "new",
                "type": "",
                "default": ""
            },
            {
                "argument": "is_group",
                "type": "",
                "default": ""
            },
            {
                "argument": "root_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def merge_account(old, new, is_group, root_type, company)",
        "def_index": 15136,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 15116,
        "file": "erpnext/erpnext/accounts/doctype/account/account.py"
    },
    {
        "name": "get_root_company",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_root_company(company)",
        "def_index": 15867,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 15847,
        "file": "erpnext/erpnext/accounts/doctype/account/account.py"
    },
    {
        "name": "get_charts_for_country",
        "arguments": [
            {
                "argument": "country",
                "type": "",
                "default": ""
            },
            {
                "argument": "with_standard",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_charts_for_country(country, with_standard=False)",
        "def_index": 4240,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4220,
        "file": "erpnext/erpnext/accounts/doctype/account/chart_of_accounts/chart_of_accounts.py"
    },
    {
        "name": "validate_bank_account",
        "arguments": [
            {
                "argument": "coa",
                "type": "",
                "default": ""
            },
            {
                "argument": "bank_account",
                "type": "",
                "default": ""
            }
        ],
        "def": "def validate_bank_account(coa, bank_account)",
        "def_index": 6824,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6804,
        "file": "erpnext/erpnext/accounts/doctype/account/chart_of_accounts/chart_of_accounts.py"
    },
    {
        "name": "build_tree_from_json",
        "arguments": [
            {
                "argument": "chart_template",
                "type": "",
                "default": ""
            },
            {
                "argument": "chart_data",
                "type": "",
                "default": "None"
            },
            {
                "argument": "from_coa_importer",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def build_tree_from_json(chart_template, chart_data=None, from_coa_importer=False)",
        "def_index": 7270,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7250,
        "file": "erpnext/erpnext/accounts/doctype/account/chart_of_accounts/chart_of_accounts.py"
    },
    {
        "name": "get_balance",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "difference_account",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_balance(self, difference_account=None)",
        "def_index": 30776,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 30755,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_outstanding_invoices",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_outstanding_invoices(self)",
        "def_index": 31808,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 31787,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_default_bank_cash_account",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "account_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "mode_of_payment",
                "type": "",
                "default": "None"
            },
            {
                "argument": "account",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_default_bank_cash_account(company, account_type=None, mode_of_payment=None, account=None)",
        "def_index": 34916,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 34896,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_payment_entry_against_order",
        "arguments": [
            {
                "argument": "dt",
                "type": "",
                "default": ""
            },
            {
                "argument": "dn",
                "type": "",
                "default": ""
            },
            {
                "argument": "amount",
                "type": "",
                "default": "None"
            },
            {
                "argument": "debit_in_account_currency",
                "type": "",
                "default": "None"
            },
            {
                "argument": "journal_entry",
                "type": "",
                "default": "False"
            },
            {
                "argument": "bank_account",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_payment_entry_against_order(dt, dn, amount=None, debit_in_account_currency=None, journal_entry=False, bank_account=None)",
        "def_index": 36510,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 36490,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_payment_entry_against_invoice",
        "arguments": [
            {
                "argument": "dt",
                "type": "",
                "default": ""
            },
            {
                "argument": "dn",
                "type": "",
                "default": ""
            },
            {
                "argument": "amount",
                "type": "",
                "default": "None"
            },
            {
                "argument": "debit_in_account_currency",
                "type": "",
                "default": "None"
            },
            {
                "argument": "journal_entry",
                "type": "",
                "default": "False"
            },
            {
                "argument": "bank_account",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_payment_entry_against_invoice(dt, dn, amount=None, debit_in_account_currency=None, journal_entry=False, bank_account=None)",
        "def_index": 37978,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 37958,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_against_jv",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_against_jv(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 42064,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 42000,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_outstanding",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_outstanding(args)",
        "def_index": 42886,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 42866,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_party_account_and_balance",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "party",
                "type": "",
                "default": ""
            },
            {
                "argument": "cost_center",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_party_account_and_balance(company, party_type, party, cost_center=None)",
        "def_index": 44846,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 44826,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_account_balance_and_party_type",
        "arguments": [
            {
                "argument": "account",
                "type": "",
                "default": ""
            },
            {
                "argument": "date",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "debit",
                "type": "",
                "default": "None"
            },
            {
                "argument": "credit",
                "type": "",
                "default": "None"
            },
            {
                "argument": "exchange_rate",
                "type": "",
                "default": "None"
            },
            {
                "argument": "cost_center",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_account_balance_and_party_type(account, date, company, debit=None, credit=None, exchange_rate=None, cost_center=None)",
        "def_index": 45485,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 45465,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_exchange_rate",
        "arguments": [
            {
                "argument": "posting_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "account",
                "type": "",
                "default": "None"
            },
            {
                "argument": "account_currency",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "reference_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "reference_name",
                "type": "",
                "default": "None"
            },
            {
                "argument": "debit",
                "type": "",
                "default": "None"
            },
            {
                "argument": "credit",
                "type": "",
                "default": "None"
            },
            {
                "argument": "exchange_rate",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_exchange_rate(posting_date,account=None,account_currency=None,company=None,reference_type=None,reference_name=None,debit=None,credit=None,exchange_rate=None,)",
        "def_index": 46927,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 46907,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "get_average_exchange_rate",
        "arguments": [
            {
                "argument": "account",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_average_exchange_rate(account)",
        "def_index": 48249,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 48229,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "make_inter_company_journal_entry",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "voucher_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_inter_company_journal_entry(name, voucher_type, company)",
        "def_index": 48625,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 48605,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "make_reverse_journal_entry",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_reverse_journal_entry(source_name, target_doc=None)",
        "def_index": 48971,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 48951,
        "file": "erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.py"
    },
    {
        "name": "apply_pricing_rule",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            },
            {
                "argument": "doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def apply_pricing_rule(args, doc=None)",
        "def_index": 6728,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6708,
        "file": "erpnext/erpnext/accounts/doctype/pricing_rule/pricing_rule.py"
    },
    {
        "name": "remove_pricing_rules",
        "arguments": [
            {
                "argument": "item_list",
                "type": "",
                "default": ""
            }
        ],
        "def": "def remove_pricing_rules(item_list)",
        "def_index": 16390,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 16370,
        "file": "erpnext/erpnext/accounts/doctype/pricing_rule/pricing_rule.py"
    },
    {
        "name": "make_pricing_rule",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_pricing_rule(doctype, docname)",
        "def_index": 17244,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17224,
        "file": "erpnext/erpnext/accounts/doctype/pricing_rule/pricing_rule.py"
    },
    {
        "name": "get_item_uoms",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_item_uoms(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 17570,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 17506,
        "file": "erpnext/erpnext/accounts/doctype/pricing_rule/pricing_rule.py"
    },
    {
        "name": "get_bank_transactions",
        "arguments": [
            {
                "argument": "bank_account",
                "type": "",
                "default": ""
            },
            {
                "argument": "from_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "to_date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_bank_transactions(bank_account, from_date=None, to_date=None)",
        "def_index": 662,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 642,
        "file": "erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.py"
    },
    {
        "name": "get_account_balance",
        "arguments": [
            {
                "argument": "bank_account",
                "type": "",
                "default": ""
            },
            {
                "argument": "till_date",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_account_balance(bank_account, till_date)",
        "def_index": 1401,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1381,
        "file": "erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.py"
    },
    {
        "name": "update_bank_transaction",
        "arguments": [
            {
                "argument": "bank_transaction_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_number",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def update_bank_transaction(bank_transaction_name, reference_number, party_type=None, party=None)",
        "def_index": 2160,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2140,
        "file": "erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.py"
    },
    {
        "name": "create_journal_entry_bts",
        "arguments": [
            {
                "argument": "bank_transaction_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_number",
                "type": "",
                "default": "None"
            },
            {
                "argument": "reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "entry_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "second_account",
                "type": "",
                "default": "None"
            },
            {
                "argument": "mode_of_payment",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party",
                "type": "",
                "default": "None"
            },
            {
                "argument": "allow_edit",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_journal_entry_bts(bank_transaction_name,reference_number=None,reference_date=None,posting_date=None,entry_type=None,second_account=None,mode_of_payment=None,party_type=None,party=None,allow_edit=None,)",
        "def_index": 2913,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2893,
        "file": "erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.py"
    },
    {
        "name": "create_payment_entry_bts",
        "arguments": [
            {
                "argument": "bank_transaction_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_number",
                "type": "",
                "default": "None"
            },
            {
                "argument": "reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party",
                "type": "",
                "default": "None"
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "mode_of_payment",
                "type": "",
                "default": "None"
            },
            {
                "argument": "project",
                "type": "",
                "default": "None"
            },
            {
                "argument": "cost_center",
                "type": "",
                "default": "None"
            },
            {
                "argument": "allow_edit",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_payment_entry_bts(bank_transaction_name,reference_number=None,reference_date=None,party_type=None,party=None,posting_date=None,mode_of_payment=None,project=None,cost_center=None,allow_edit=None,)",
        "def_index": 5237,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5217,
        "file": "erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.py"
    },
    {
        "name": "auto_reconcile_vouchers",
        "arguments": [
            {
                "argument": "bank_account",
                "type": "",
                "default": ""
            },
            {
                "argument": "from_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "to_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "filter_by_reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "from_reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "to_reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def auto_reconcile_vouchers(bank_account,from_date=None,to_date=None,filter_by_reference_date=None,from_reference_date=None,to_reference_date=None,)",
        "def_index": 7032,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7012,
        "file": "erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.py"
    },
    {
        "name": "reconcile_vouchers",
        "arguments": [
            {
                "argument": "bank_transaction_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "vouchers",
                "type": "",
                "default": ""
            }
        ],
        "def": "def reconcile_vouchers(bank_transaction_name, vouchers)",
        "def_index": 9259,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9239,
        "file": "erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.py"
    },
    {
        "name": "get_linked_payments",
        "arguments": [
            {
                "argument": "bank_transaction_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "document_types",
                "type": "",
                "default": "None"
            },
            {
                "argument": "from_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "to_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "filter_by_reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "from_reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "to_reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_linked_payments(bank_transaction_name,document_types=None,from_date=None,to_date=None,filter_by_reference_date=None,from_reference_date=None,to_reference_date=None,)",
        "def_index": 9625,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9605,
        "file": "erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.py"
    },
    {
        "name": "get_months",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_months(self)",
        "def_index": 309,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 288,
        "file": "erpnext/erpnext/accounts/doctype/monthly_distribution/monthly_distribution.py"
    },
    {
        "name": "get_outstanding_reference_documents",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            },
            {
                "argument": "validate",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_outstanding_reference_documents(args, validate=False)",
        "def_index": 47871,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 47851,
        "file": "erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.py"
    },
    {
        "name": "get_party_details",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "party",
                "type": "",
                "default": ""
            },
            {
                "argument": "date",
                "type": "",
                "default": ""
            },
            {
                "argument": "cost_center",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_party_details(company, party_type, party, date, cost_center=None)",
        "def_index": 58795,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 58775,
        "file": "erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.py"
    },
    {
        "name": "get_account_details",
        "arguments": [
            {
                "argument": "account",
                "type": "",
                "default": ""
            },
            {
                "argument": "date",
                "type": "",
                "default": ""
            },
            {
                "argument": "cost_center",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_account_details(account, date, cost_center=None)",
        "def_index": 59805,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 59785,
        "file": "erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.py"
    },
    {
        "name": "get_company_defaults",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_company_defaults(company)",
        "def_index": 60732,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 60712,
        "file": "erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.py"
    },
    {
        "name": "get_reference_details",
        "arguments": [
            {
                "argument": "reference_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_account_currency",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_reference_details(reference_doctype, reference_name, party_account_currency)",
        "def_index": 61511,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 61491,
        "file": "erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.py"
    },
    {
        "name": "get_payment_entry",
        "arguments": [
            {
                "argument": "dt",
                "type": "",
                "default": ""
            },
            {
                "argument": "dn",
                "type": "",
                "default": ""
            },
            {
                "argument": "party_amount",
                "type": "",
                "default": "None"
            },
            {
                "argument": "bank_account",
                "type": "",
                "default": "None"
            },
            {
                "argument": "bank_amount",
                "type": "",
                "default": "None"
            },
            {
                "argument": "party_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "payment_type",
                "type": "",
                "default": "None"
            },
            {
                "argument": "reference_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_payment_entry(dt,dn,party_amount=None,bank_account=None,bank_amount=None,party_type=None,payment_type=None,reference_date=None,)",
        "def_index": 63763,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 63743,
        "file": "erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.py"
    },
    {
        "name": "get_party_and_account_balance",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "date",
                "type": "",
                "default": ""
            },
            {
                "argument": "paid_from",
                "type": "",
                "default": "None"
            },
            {
                "argument": "paid_to",
                "type": "",
                "default": "None"
            },
            {
                "argument": "ptype",
                "type": "",
                "default": "None"
            },
            {
                "argument": "pty",
                "type": "",
                "default": "None"
            },
            {
                "argument": "cost_center",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_party_and_account_balance(company, date, paid_from=None, paid_to=None, ptype=None, pty=None, cost_center=None)",
        "def_index": 80837,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 80817,
        "file": "erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.py"
    },
    {
        "name": "make_payment_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_payment_order(source_name, target_doc=None)",
        "def_index": 81286,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 81266,
        "file": "erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.py"
    },
    {
        "name": "set_as_default",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_as_default(self)",
        "def_index": 378,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 357,
        "file": "erpnext/erpnext/accounts/doctype/fiscal_year/fiscal_year.py"
    },
    {
        "name": "check_duplicate_fiscal_year",
        "arguments": [
            {
                "argument": "doc",
                "type": "",
                "default": ""
            }
        ],
        "def": "def check_duplicate_fiscal_year(doc)",
        "def_index": 3573,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3553,
        "file": "erpnext/erpnext/accounts/doctype/fiscal_year/fiscal_year.py"
    },
    {
        "name": "auto_create_fiscal_year",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def auto_create_fiscal_year()",
        "def_index": 4096,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4076,
        "file": "erpnext/erpnext/accounts/doctype/fiscal_year/fiscal_year.py"
    },
    {
        "name": "get_doctypes_for_closing",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_doctypes_for_closing(self)",
        "def_index": 1318,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1297,
        "file": "erpnext/erpnext/accounts/doctype/accounting_period/accounting_period.py"
    },
    {
        "name": "get_payment_reconciliation_details",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_payment_reconciliation_details(self)",
        "def_index": 2700,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2679,
        "file": "erpnext/erpnext/accounts/doctype/pos_closing_entry/pos_closing_entry.py"
    },
    {
        "name": "retry",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def retry(self)",
        "def_index": 3149,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3128,
        "file": "erpnext/erpnext/accounts/doctype/pos_closing_entry/pos_closing_entry.py"
    },
    {
        "name": "get_cashiers",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_cashiers(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 3535,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 3471,
        "file": "erpnext/erpnext/accounts/doctype/pos_closing_entry/pos_closing_entry.py"
    },
    {
        "name": "get_pos_invoices",
        "arguments": [
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "end",
                "type": "",
                "default": ""
            },
            {
                "argument": "pos_profile",
                "type": "",
                "default": ""
            },
            {
                "argument": "user",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_pos_invoices(start, end, pos_profile, user)",
        "def_index": 3760,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3740,
        "file": "erpnext/erpnext/accounts/doctype/pos_closing_entry/pos_closing_entry.py"
    },
    {
        "name": "make_maintenance_visit",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_maintenance_visit(source_name, target_doc=None)",
        "def_index": 1107,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1087,
        "file": "erpnext/erpnext/support/doctype/warranty_claim/warranty_claim.py"
    },
    {
        "name": "split_issue",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "subject",
                "type": "",
                "default": ""
            },
            {
                "argument": "communication_id",
                "type": "",
                "default": ""
            }
        ],
        "def": "def split_issue(self, subject, communication_id)",
        "def_index": 2263,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2242,
        "file": "erpnext/erpnext/support/doctype/issue/issue.py"
    },
    {
        "name": "set_multiple_status",
        "arguments": [
            {
                "argument": "names",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_multiple_status(names, status)",
        "def_index": 5082,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5062,
        "file": "erpnext/erpnext/support/doctype/issue/issue.py"
    },
    {
        "name": "set_status",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_status(name, status)",
        "def_index": 5232,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5212,
        "file": "erpnext/erpnext/support/doctype/issue/issue.py"
    },
    {
        "name": "make_task",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_task(source_name, target_doc=None)",
        "def_index": 6396,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6376,
        "file": "erpnext/erpnext/support/doctype/issue/issue.py"
    },
    {
        "name": "make_issue_from_communication",
        "arguments": [
            {
                "argument": "communication",
                "type": "",
                "default": ""
            },
            {
                "argument": "ignore_communication_links",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def make_issue_from_communication(communication, ignore_communication_links=False)",
        "def_index": 6552,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6532,
        "file": "erpnext/erpnext/support/doctype/issue/issue.py"
    },
    {
        "name": "get_service_level_agreement_filters",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "customer",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_service_level_agreement_filters(doctype, name, customer=None)",
        "def_index": 12085,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12065,
        "file": "erpnext/erpnext/support/doctype/service_level_agreement/service_level_agreement.py"
    },
    {
        "name": "get_user_time",
        "arguments": [
            {
                "argument": "user",
                "type": "",
                "default": ""
            },
            {
                "argument": "to_string",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_user_time(user, to_string=False)",
        "def_index": 30861,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 30841,
        "file": "erpnext/erpnext/support/doctype/service_level_agreement/service_level_agreement.py"
    },
    {
        "name": "get_sla_doctypes",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_sla_doctypes()",
        "def_index": 31007,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 30987,
        "file": "erpnext/erpnext/support/doctype/service_level_agreement/service_level_agreement.py"
    },
    {
        "name": "make_subcontracting_receipt",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_subcontracting_receipt(source_name, target_doc=None)",
        "def_index": 6451,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6431,
        "file": "erpnext/erpnext/subcontracting/doctype/subcontracting_order/subcontracting_order.py"
    },
    {
        "name": "update_subcontracting_order_status",
        "arguments": [
            {
                "argument": "sco",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_subcontracting_order_status(sco)",
        "def_index": 7468,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7448,
        "file": "erpnext/erpnext/subcontracting/doctype/subcontracting_order/subcontracting_order.py"
    },
    {
        "name": "set_missing_values",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_missing_values(self)",
        "def_index": 3907,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3886,
        "file": "erpnext/erpnext/subcontracting/doctype/subcontracting_receipt/subcontracting_receipt.py"
    },
    {
        "name": "make_subcontract_return",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_subcontract_return(source_name, target_doc=None)",
        "def_index": 13421,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 13401,
        "file": "erpnext/erpnext/subcontracting/doctype/subcontracting_receipt/subcontracting_receipt.py"
    },
    {
        "name": "send_message",
        "arguments": [
            {
                "argument": "sender",
                "type": "",
                "default": ""
            },
            {
                "argument": "message",
                "type": "",
                "default": ""
            },
            {
                "argument": "subject",
                "type": "",
                "default": "Website Query"
            }
        ],
        "def": "def send_message(sender, message, subject=\"Website Query\")",
        "def_index": 181,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 145,
        "file": "erpnext/erpnext/templates/utils.py"
    },
    {
        "name": "get_product_list",
        "arguments": [
            {
                "argument": "search",
                "type": "",
                "default": "None"
            },
            {
                "argument": "start",
                "type": "",
                "default": "0"
            },
            {
                "argument": "limit",
                "type": "",
                "default": "12"
            }
        ],
        "def": "def get_product_list(search=None, start=0, limit=12)",
        "def_index": 682,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 646,
        "file": "erpnext/erpnext/templates/pages/product_search.py"
    },
    {
        "name": "search",
        "arguments": [
            {
                "argument": "query",
                "type": "",
                "default": ""
            }
        ],
        "def": "def search(query)",
        "def_index": 1750,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 1714,
        "file": "erpnext/erpnext/templates/pages/product_search.py"
    },
    {
        "name": "product_search",
        "arguments": [
            {
                "argument": "query",
                "type": "",
                "default": ""
            },
            {
                "argument": "limit",
                "type": "",
                "default": "10"
            },
            {
                "argument": "fuzzy_search",
                "type": "",
                "default": "True"
            }
        ],
        "def": "def product_search(query, limit=10, fuzzy_search=True)",
        "def_index": 2034,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 1998,
        "file": "erpnext/erpnext/templates/pages/product_search.py"
    },
    {
        "name": "get_category_suggestions",
        "arguments": [
            {
                "argument": "query",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_category_suggestions(query)",
        "def_index": 3350,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 3314,
        "file": "erpnext/erpnext/templates/pages/product_search.py"
    },
    {
        "name": "get_help_results_sections",
        "arguments": [
            {
                "argument": "text",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_help_results_sections(text)",
        "def_index": 613,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 577,
        "file": "erpnext/erpnext/templates/pages/search_help.py"
    },
    {
        "name": "get_task_html",
        "arguments": [
            {
                "argument": "project",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": "0"
            },
            {
                "argument": "item_status",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_task_html(project, start=0, item_status=None)",
        "def_index": 1671,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1651,
        "file": "erpnext/erpnext/templates/pages/projects.py"
    },
    {
        "name": "get_timesheet_html",
        "arguments": [
            {
                "argument": "project",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": "0"
            }
        ],
        "def": "def get_timesheet_html(project, start=0)",
        "def_index": 2634,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2614,
        "file": "erpnext/erpnext/templates/pages/projects.py"
    },
    {
        "name": "check_mandate",
        "arguments": [
            {
                "argument": "data",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def check_mandate(data, reference_doctype, reference_docname)",
        "def_index": 1286,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 1250,
        "file": "erpnext/erpnext/templates/pages/integrations/gocardless_checkout.py"
    },
    {
        "name": "confirm_payment",
        "arguments": [
            {
                "argument": "redirect_flow_id",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def confirm_payment(redirect_flow_id, reference_doctype, reference_docname)",
        "def_index": 926,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 890,
        "file": "erpnext/erpnext/templates/pages/integrations/gocardless_confirmation.py"
    },
    {
        "name": "generate_schedule",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def generate_schedule(self)",
        "def_index": 546,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 525,
        "file": "erpnext/erpnext/maintenance/doctype/maintenance_schedule/maintenance_schedule.py"
    },
    {
        "name": "validate_end_date_visits",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def validate_end_date_visits(self)",
        "def_index": 1264,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1243,
        "file": "erpnext/erpnext/maintenance/doctype/maintenance_schedule/maintenance_schedule.py"
    },
    {
        "name": "get_pending_data",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "data_type",
                "type": "",
                "default": ""
            },
            {
                "argument": "s_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "item_name",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_pending_data(self, data_type, s_date=None, item_name=None)",
        "def_index": 11833,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11812,
        "file": "erpnext/erpnext/maintenance/doctype/maintenance_schedule/maintenance_schedule.py"
    },
    {
        "name": "get_serial_nos_from_schedule",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "schedule",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_serial_nos_from_schedule(item_code, schedule=None)",
        "def_index": 12646,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12626,
        "file": "erpnext/erpnext/maintenance/doctype/maintenance_schedule/maintenance_schedule.py"
    },
    {
        "name": "make_maintenance_visit",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "item_name",
                "type": "",
                "default": "None"
            },
            {
                "argument": "s_id",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_maintenance_visit(source_name, target_doc=None, item_name=None, s_id=None)",
        "def_index": 12968,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12948,
        "file": "erpnext/erpnext/maintenance/doctype/maintenance_schedule/maintenance_schedule.py"
    },
    {
        "name": "export_invoices",
        "arguments": [
            {
                "argument": "filters",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def export_invoices(filters=None)",
        "def_index": 852,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 832,
        "file": "erpnext/erpnext/regional/italy/utils.py"
    },
    {
        "name": "generate_single_invoice",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def generate_single_invoice(docname)",
        "def_index": 12129,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12109,
        "file": "erpnext/erpnext/regional/italy/utils.py"
    },
    {
        "name": "irs_1099_print",
        "arguments": [
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def irs_1099_print(filters)",
        "def_index": 2220,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2200,
        "file": "erpnext/erpnext/regional/report/irs_1099/irs_1099.py"
    },
    {
        "name": "process_file_data",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def process_file_data(self)",
        "def_index": 4483,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4462,
        "file": "erpnext/erpnext/regional/doctype/import_supplier_invoice/import_supplier_invoice.py"
    },
    {
        "name": "get_item_details",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            },
            {
                "argument": "doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "for_validate",
                "type": "",
                "default": "False"
            },
            {
                "argument": "overwrite_warehouse",
                "type": "",
                "default": "True"
            }
        ],
        "def": "def get_item_details(args, doc=None, for_validate=False, overwrite_warehouse=True)",
        "def_index": 1285,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1265,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_item_tax_info",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "tax_category",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_codes",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_rates",
                "type": "",
                "default": "None"
            },
            {
                "argument": "item_tax_templates",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_item_tax_info(company, tax_category, item_codes, item_rates=None, item_tax_templates=None)",
        "def_index": 16465,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 16445,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_item_tax_map",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_tax_template",
                "type": "",
                "default": ""
            },
            {
                "argument": "as_json",
                "type": "",
                "default": "True"
            }
        ],
        "def": "def get_item_tax_map(company, item_tax_template, as_json=True)",
        "def_index": 20022,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20002,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "calculate_service_end_date",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            },
            {
                "argument": "item",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def calculate_service_end_date(args, item=None)",
        "def_index": 20433,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20413,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_pos_profile",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "pos_profile",
                "type": "",
                "default": "None"
            },
            {
                "argument": "user",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_pos_profile(company, pos_profile=None, user=None)",
        "def_index": 33768,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 33748,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_conversion_factor",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "uom",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_conversion_factor(item_code, uom)",
        "def_index": 34579,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 34559,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_projected_qty",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_projected_qty(item_code, warehouse)",
        "def_index": 35143,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 35123,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_bin_details",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "include_child_warehouses",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_bin_details(item_code, warehouse, company=None, include_child_warehouses=False)",
        "def_index": 35343,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 35323,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_batch_qty",
        "arguments": [
            {
                "argument": "batch_no",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_batch_qty(batch_no, warehouse, item_code)",
        "def_index": 36576,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 36556,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "apply_price_list",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            },
            {
                "argument": "as_doc",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def apply_price_list(args, as_doc=False)",
        "def_index": 36783,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 36763,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_default_bom",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_default_bom(item_code=None)",
        "def_index": 40112,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 40092,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_valuation_rate",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_valuation_rate(item_code, company, warehouse=None)",
        "def_index": 40563,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 40543,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_serial_no",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            },
            {
                "argument": "serial_nos",
                "type": "",
                "default": "None"
            },
            {
                "argument": "sales_order",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_serial_no(args, serial_nos=None, sales_order=None)",
        "def_index": 41768,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 41748,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_blanket_order_details",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_blanket_order_details(args)",
        "def_index": 42102,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 42082,
        "file": "erpnext/erpnext/stock/get_item_details.py"
    },
    {
        "name": "get_stock_balance",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "posting_time",
                "type": "",
                "default": "None"
            },
            {
                "argument": "with_valuation_rate",
                "type": "",
                "default": "False"
            },
            {
                "argument": "with_serial_no",
                "type": "",
                "default": "False"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_stock_balance(item_code,warehouse,posting_date=None,posting_time=None,with_valuation_rate=False,with_serial_no=False,)",
        "def_index": 2410,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2390,
        "file": "erpnext/erpnext/stock/utils.py"
    },
    {
        "name": "get_latest_stock_qty",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_latest_stock_qty(item_code, warehouse=None)",
        "def_index": 4509,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4489,
        "file": "erpnext/erpnext/stock/utils.py"
    },
    {
        "name": "get_incoming_rate",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            },
            {
                "argument": "raise_error_if_no_rate",
                "type": "",
                "default": "True"
            }
        ],
        "def": "def get_incoming_rate(args, raise_error_if_no_rate=True)",
        "def_index": 6565,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6545,
        "file": "erpnext/erpnext/stock/utils.py"
    },
    {
        "name": "scan_barcode",
        "arguments": [
            {
                "argument": "search_value",
                "type": "",
                "default": ""
            }
        ],
        "def": "def scan_barcode(search_value",
        "def_index": 15889,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 15869,
        "file": "erpnext/erpnext/stock/utils.py"
    },
    {
        "name": "get",
        "arguments": [
            {
                "argument": "chart_name",
                "type": "",
                "default": "None"
            },
            {
                "argument": "chart",
                "type": "",
                "default": "None"
            },
            {
                "argument": "no_cache",
                "type": "",
                "default": "None"
            },
            {
                "argument": "filters",
                "type": "",
                "default": "None"
            },
            {
                "argument": "from_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "to_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "timespan",
                "type": "",
                "default": "None"
            },
            {
                "argument": "time_interval",
                "type": "",
                "default": "None"
            },
            {
                "argument": "heatmap_year",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get(chart_name=None,chart=None,no_cache=None,filters=None,from_date=None,to_date=None,timespan=None,time_interval=None,heatmap_year=None,)",
        "def_index": 248,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@cache_source"
        ],
        "index": 214,
        "file": "erpnext/erpnext/stock/dashboard_chart_source/warehouse_wise_stock_value/warehouse_wise_stock_value.py"
    },
    {
        "name": "get_data",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": "None"
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": "None"
            },
            {
                "argument": "item_group",
                "type": "",
                "default": "None"
            },
            {
                "argument": "start",
                "type": "",
                "default": "0"
            },
            {
                "argument": "sort_by",
                "type": "",
                "default": "actual_qty"
            },
            {
                "argument": "sort_order",
                "type": "",
                "default": "desc"
            }
        ],
        "def": "def get_data(item_code=None, warehouse=None, item_group=None, start=0, sort_by=\"actual_qty\", sort_order=\"desc\")",
        "def_index": 119,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 99,
        "file": "erpnext/erpnext/stock/dashboard/item_dashboard.py"
    },
    {
        "name": "get_data",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": "None"
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": "None"
            },
            {
                "argument": "parent_warehouse",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "start",
                "type": "",
                "default": "0"
            },
            {
                "argument": "sort_by",
                "type": "",
                "default": "stock_capacity"
            },
            {
                "argument": "sort_order",
                "type": "",
                "default": "desc"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_data(item_code=None,warehouse=None,parent_warehouse=None,company=None,start=0,sort_by=\"stock_capacity\",sort_order=\"desc\",)",
        "def_index": 173,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 153,
        "file": "erpnext/erpnext/stock/dashboard/warehouse_capacity_dashboard.py"
    },
    {
        "name": "create_reposting_entries",
        "arguments": [
            {
                "argument": "rows",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_reposting_entries(rows, company)",
        "def_index": 3530,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 3510,
        "file": "erpnext/erpnext/stock/report/stock_and_account_value_comparison/stock_and_account_value_comparison.py"
    },
    {
        "name": "restart_reposting",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def restart_reposting(self)",
        "def_index": 6031,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6010,
        "file": "erpnext/erpnext/stock/doctype/repost_item_valuation/repost_item_valuation.py"
    },
    {
        "name": "execute_repost_item_valuation",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def execute_repost_item_valuation()",
        "def_index": 12309,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12289,
        "file": "erpnext/erpnext/stock/doctype/repost_item_valuation/repost_item_valuation.py"
    },
    {
        "name": "enqueue_job",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def enqueue_job(self)",
        "def_index": 1961,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1940,
        "file": "erpnext/erpnext/stock/doctype/closing_stock_balance/closing_stock_balance.py"
    },
    {
        "name": "regenerate_closing_balance",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def regenerate_closing_balance(self)",
        "def_index": 2157,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2136,
        "file": "erpnext/erpnext/stock/doctype/closing_stock_balance/closing_stock_balance.py"
    },
    {
        "name": "get_inventory_documents",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": "None"
            },
            {
                "argument": "txt",
                "type": "",
                "default": "None"
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": "None"
            },
            {
                "argument": "start",
                "type": "",
                "default": "None"
            },
            {
                "argument": "page_len",
                "type": "",
                "default": "None"
            },
            {
                "argument": "filters",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_inventory_documents(doctype=None, txt=None, searchfield=None, start=None, page_len=None, filters=None)",
        "def_index": 7184,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7164,
        "file": "erpnext/erpnext/stock/doctype/inventory_dimension/inventory_dimension.py"
    },
    {
        "name": "get_inventory_dimensions",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_inventory_dimensions()",
        "def_index": 9259,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9239,
        "file": "erpnext/erpnext/stock/doctype/inventory_dimension/inventory_dimension.py"
    },
    {
        "name": "delete_dimension",
        "arguments": [
            {
                "argument": "dimension",
                "type": "",
                "default": ""
            }
        ],
        "def": "def delete_dimension(dimension)",
        "def_index": 9736,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9716,
        "file": "erpnext/erpnext/stock/doctype/inventory_dimension/inventory_dimension.py"
    },
    {
        "name": "get_parent_fields",
        "arguments": [
            {
                "argument": "child_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "dimension_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_parent_fields(child_doctype, dimension_name)",
        "def_index": 9861,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9841,
        "file": "erpnext/erpnext/stock/doctype/inventory_dimension/inventory_dimension.py"
    },
    {
        "name": "get_item_manufacturer_part_no",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "manufacturer",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_item_manufacturer_part_no(item_code, manufacturer)",
        "def_index": 2045,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2025,
        "file": "erpnext/erpnext/stock/doctype/item_manufacturer/item_manufacturer.py"
    },
    {
        "name": "set_item_locations",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "save",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def set_item_locations(self, save=False)",
        "def_index": 6026,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6005,
        "file": "erpnext/erpnext/stock/doctype/pick_list/pick_list.py"
    },
    {
        "name": "create_delivery_note",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def create_delivery_note(source_name, target_doc=None)",
        "def_index": 21437,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21417,
        "file": "erpnext/erpnext/stock/doctype/pick_list/pick_list.py"
    },
    {
        "name": "create_stock_entry",
        "arguments": [
            {
                "argument": "pick_list",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_stock_entry(pick_list)",
        "def_index": 26323,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 26303,
        "file": "erpnext/erpnext/stock/doctype/pick_list/pick_list.py"
    },
    {
        "name": "get_pending_work_orders",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_length",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            },
            {
                "argument": "as_dict",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_pending_work_orders(doctype, txt, searchfield, start, page_length, filters, as_dict)",
        "def_index": 27178,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 27158,
        "file": "erpnext/erpnext/stock/doctype/pick_list/pick_list.py"
    },
    {
        "name": "target_document_exists",
        "arguments": [
            {
                "argument": "pick_list_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "purpose",
                "type": "",
                "default": ""
            }
        ],
        "def": "def target_document_exists(pick_list_name, purpose)",
        "def_index": 27821,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 27801,
        "file": "erpnext/erpnext/stock/doctype/pick_list/pick_list.py"
    },
    {
        "name": "get_item_details",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "uom",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_item_details(item_code, uom=None)",
        "def_index": 28041,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28021,
        "file": "erpnext/erpnext/stock/doctype/pick_list/pick_list.py"
    },
    {
        "name": "auto_fetch_serial_number",
        "arguments": [
            {
                "argument": "qty",
                "type": "",
                "default": ""
            }
        ],
        "def": "def auto_fetch_serial_number(qty",
        "def_index": 4773,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4753,
        "file": "erpnext/erpnext/stock/doctype/serial_no/serial_no.py"
    },
    {
        "name": "get_pos_reserved_serial_nos",
        "arguments": [
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_pos_reserved_serial_nos(filters)",
        "def_index": 6364,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6344,
        "file": "erpnext/erpnext/stock/doctype/serial_no/serial_no.py"
    },
    {
        "name": "process_route",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "optimize",
                "type": "",
                "default": ""
            }
        ],
        "def": "def process_route(self, optimize)",
        "def_index": 2837,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2816,
        "file": "erpnext/erpnext/stock/doctype/delivery_trip/delivery_trip.py"
    },
    {
        "name": "get_contact_and_address",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_contact_and_address(name)",
        "def_index": 7949,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7929,
        "file": "erpnext/erpnext/stock/doctype/delivery_trip/delivery_trip.py"
    },
    {
        "name": "get_contact_display",
        "arguments": [
            {
                "argument": "contact",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_contact_display(contact)",
        "def_index": 9271,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9251,
        "file": "erpnext/erpnext/stock/doctype/delivery_trip/delivery_trip.py"
    },
    {
        "name": "notify_customers",
        "arguments": [
            {
                "argument": "delivery_trip",
                "type": "",
                "default": ""
            }
        ],
        "def": "def notify_customers(delivery_trip)",
        "def_index": 10087,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10067,
        "file": "erpnext/erpnext/stock/doctype/delivery_trip/delivery_trip.py"
    },
    {
        "name": "get_driver_email",
        "arguments": [
            {
                "argument": "driver",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_driver_email(driver)",
        "def_index": 12053,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12033,
        "file": "erpnext/erpnext/stock/doctype/delivery_trip/delivery_trip.py"
    },
    {
        "name": "get_alternative_items",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_alternative_items(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 2298,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 2234,
        "file": "erpnext/erpnext/stock/doctype/item_alternative/item_alternative.py"
    },
    {
        "name": "get_items",
        "arguments": [
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "posting_time",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_code",
                "type": "",
                "default": "None"
            },
            {
                "argument": "ignore_empty_stock",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_items(warehouse, posting_date, posting_time, company, item_code=None, ignore_empty_stock=False)",
        "def_index": 23509,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 23489,
        "file": "erpnext/erpnext/stock/doctype/stock_reconciliation/stock_reconciliation.py"
    },
    {
        "name": "get_stock_balance_for",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_stock_balance_for(item_code",
        "def_index": 27210,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 27190,
        "file": "erpnext/erpnext/stock/doctype/stock_reconciliation/stock_reconciliation.py"
    },
    {
        "name": "get_difference_account",
        "arguments": [
            {
                "argument": "purpose",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_difference_account(purpose, company)",
        "def_index": 28476,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28456,
        "file": "erpnext/erpnext/stock/doctype/stock_reconciliation/stock_reconciliation.py"
    },
    {
        "name": "cancel_stock_reservation_entries",
        "arguments": [
            {
                "argument": "voucher_type",
                "type": "",
                "default": ""
            }
        ],
        "def": "def cancel_stock_reservation_entries(voucher_type",
        "def_index": 8379,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8359,
        "file": "erpnext/erpnext/stock/doctype/stock_reservation_entry/stock_reservation_entry.py"
    },
    {
        "name": "update_status",
        "arguments": [
            {
                "argument": "name",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_status(name, status)",
        "def_index": 11212,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11192,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "make_purchase_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "args",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_order(source_name, target_doc=None, args=None)",
        "def_index": 11412,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11392,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "make_request_for_quotation",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_request_for_quotation(source_name, target_doc=None)",
        "def_index": 12896,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12876,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "make_purchase_order_based_on_supplier",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            },
            {
                "argument": "args",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_order_based_on_supplier(source_name, target_doc=None, args=None)",
        "def_index": 13450,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 13430,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "get_items_based_on_default_supplier",
        "arguments": [
            {
                "argument": "supplier",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_items_based_on_default_supplier(supplier)",
        "def_index": 14515,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 14495,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "get_material_requests_based_on_supplier",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_material_requests_based_on_supplier(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 14806,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 14742,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "get_default_supplier_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_default_supplier_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 16074,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 16010,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "make_supplier_quotation",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_supplier_quotation(source_name, target_doc=None)",
        "def_index": 16529,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 16509,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "make_stock_entry",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_stock_entry(source_name, target_doc=None)",
        "def_index": 17179,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17159,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "raise_work_orders",
        "arguments": [
            {
                "argument": "material_request",
                "type": "",
                "default": ""
            }
        ],
        "def": "def raise_work_orders(material_request)",
        "def_index": 19575,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 19555,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "create_pick_list",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def create_pick_list(source_name, target_doc=None)",
        "def_index": 21441,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21421,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "make_in_transit_stock_entry",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "in_transit_warehouse",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_in_transit_stock_entry(source_name, in_transit_warehouse)",
        "def_index": 21939,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21919,
        "file": "erpnext/erpnext/stock/doctype/material_request/material_request.py"
    },
    {
        "name": "item_details",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def item_details(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 5322,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 5258,
        "file": "erpnext/erpnext/stock/doctype/packing_slip/packing_slip.py"
    },
    {
        "name": "get_batch_qty",
        "arguments": [
            {
                "argument": "batch_no",
                "type": "",
                "default": "None"
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": "None"
            },
            {
                "argument": "item_code",
                "type": "",
                "default": "None"
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "posting_time",
                "type": "",
                "default": "None"
            },
            {
                "argument": "ignore_voucher_nos",
                "type": "",
                "default": "None"
            },
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_batch_qty(batch_no=None,warehouse=None,item_code=None,posting_date=None,posting_time=None,ignore_voucher_nos=None,)",
        "def_index": 4631,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4611,
        "file": "erpnext/erpnext/stock/doctype/batch/batch.py"
    },
    {
        "name": "get_batches_by_oldest",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_batches_by_oldest(item_code, warehouse)",
        "def_index": 5747,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5727,
        "file": "erpnext/erpnext/stock/doctype/batch/batch.py"
    },
    {
        "name": "split_batch",
        "arguments": [
            {
                "argument": "batch_no",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            },
            {
                "argument": "qty",
                "type": "",
                "default": ""
            },
            {
                "argument": "new_batch_id",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def split_batch(batch_no, item_code, warehouse, qty, new_batch_id=None)",
        "def_index": 6140,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6120,
        "file": "erpnext/erpnext/stock/doctype/batch/batch.py"
    },
    {
        "name": "get_pos_reserved_batch_qty",
        "arguments": [
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_pos_reserved_batch_qty(filters)",
        "def_index": 9814,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9794,
        "file": "erpnext/erpnext/stock/doctype/batch/batch.py"
    },
    {
        "name": "get_items_from_product_bundle",
        "arguments": [
            {
                "argument": "row",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_items_from_product_bundle(row)",
        "def_index": 8955,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8935,
        "file": "erpnext/erpnext/stock/doctype/packed_item/packed_item.py"
    },
    {
        "name": "get_item_details",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_item_details(item_code, company=None)",
        "def_index": 38912,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 38892,
        "file": "erpnext/erpnext/stock/doctype/item/item.py"
    },
    {
        "name": "get_uom_conv_factor",
        "arguments": [
            {
                "argument": "uom",
                "type": "",
                "default": ""
            },
            {
                "argument": "stock_uom",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_uom_conv_factor(uom, stock_uom)",
        "def_index": 39169,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 39149,
        "file": "erpnext/erpnext/stock/doctype/item/item.py"
    },
    {
        "name": "get_item_attribute",
        "arguments": [
            {
                "argument": "parent",
                "type": "",
                "default": ""
            },
            {
                "argument": "attribute_value",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_item_attribute(parent, attribute_value=\"\")",
        "def_index": 40406,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 40386,
        "file": "erpnext/erpnext/stock/doctype/item/item.py"
    },
    {
        "name": "get_asset_naming_series",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_asset_naming_series()",
        "def_index": 41976,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 41956,
        "file": "erpnext/erpnext/stock/doctype/item/item.py"
    },
    {
        "name": "get_available_putaway_capacity",
        "arguments": [
            {
                "argument": "rule",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_available_putaway_capacity(rule)",
        "def_index": 2142,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2122,
        "file": "erpnext/erpnext/stock/doctype/putaway_rule/putaway_rule.py"
    },
    {
        "name": "apply_putaway_rule",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "items",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "sync",
                "type": "",
                "default": "None"
            },
            {
                "argument": "purpose",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def apply_putaway_rule(doctype, items, company, sync=None, purpose=None)",
        "def_index": 2502,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2482,
        "file": "erpnext/erpnext/stock/doctype/putaway_rule/putaway_rule.py"
    },
    {
        "name": "make_sales_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_sales_invoice(source_name, target_doc=None)",
        "def_index": 20238,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20218,
        "file": "erpnext/erpnext/stock/doctype/delivery_note/delivery_note.py"
    },
    {
        "name": "make_delivery_trip",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_delivery_trip(source_name, target_doc=None)",
        "def_index": 23147,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 23127,
        "file": "erpnext/erpnext/stock/doctype/delivery_note/delivery_note.py"
    },
    {
        "name": "make_installation_note",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_installation_note(source_name, target_doc=None)",
        "def_index": 24157,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 24137,
        "file": "erpnext/erpnext/stock/doctype/delivery_note/delivery_note.py"
    },
    {
        "name": "make_packing_slip",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_packing_slip(source_name, target_doc=None)",
        "def_index": 24870,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 24850,
        "file": "erpnext/erpnext/stock/doctype/delivery_note/delivery_note.py"
    },
    {
        "name": "make_shipment",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_shipment(source_name, target_doc=None)",
        "def_index": 26282,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 26262,
        "file": "erpnext/erpnext/stock/doctype/delivery_note/delivery_note.py"
    },
    {
        "name": "make_sales_return",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_sales_return(source_name, target_doc=None)",
        "def_index": 28667,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28647,
        "file": "erpnext/erpnext/stock/doctype/delivery_note/delivery_note.py"
    },
    {
        "name": "update_delivery_note_status",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_delivery_note_status(docname, status)",
        "def_index": 28884,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28864,
        "file": "erpnext/erpnext/stock/doctype/delivery_note/delivery_note.py"
    },
    {
        "name": "make_inter_company_purchase_receipt",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_inter_company_purchase_receipt(source_name, target_doc=None)",
        "def_index": 29029,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 29009,
        "file": "erpnext/erpnext/stock/doctype/delivery_note/delivery_note.py"
    },
    {
        "name": "get_address_name",
        "arguments": [
            {
                "argument": "ref_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_address_name(ref_doctype, docname)",
        "def_index": 1467,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1447,
        "file": "erpnext/erpnext/stock/doctype/shipment/shipment.py"
    },
    {
        "name": "get_contact_name",
        "arguments": [
            {
                "argument": "ref_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_contact_name(ref_doctype, docname)",
        "def_index": 1613,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1593,
        "file": "erpnext/erpnext/stock/doctype/shipment/shipment.py"
    },
    {
        "name": "get_company_contact",
        "arguments": [
            {
                "argument": "user",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_company_contact(user)",
        "def_index": 1752,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1732,
        "file": "erpnext/erpnext/stock/doctype/shipment/shipment.py"
    },
    {
        "name": "make_purchase_invoice",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_invoice(source_name, target_doc=None)",
        "def_index": 34430,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 34410,
        "file": "erpnext/erpnext/stock/doctype/purchase_receipt/purchase_receipt.py"
    },
    {
        "name": "make_purchase_return_against_rejected_warehouse",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_purchase_return_against_rejected_warehouse(source_name)",
        "def_index": 38057,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 38037,
        "file": "erpnext/erpnext/stock/doctype/purchase_receipt/purchase_receipt.py"
    },
    {
        "name": "make_purchase_return",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_purchase_return(source_name, target_doc=None)",
        "def_index": 38312,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 38292,
        "file": "erpnext/erpnext/stock/doctype/purchase_receipt/purchase_receipt.py"
    },
    {
        "name": "update_purchase_receipt_status",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            }
        ],
        "def": "def update_purchase_receipt_status(docname, status)",
        "def_index": 38535,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 38515,
        "file": "erpnext/erpnext/stock/doctype/purchase_receipt/purchase_receipt.py"
    },
    {
        "name": "make_stock_entry",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_stock_entry(source_name, target_doc=None)",
        "def_index": 38686,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 38666,
        "file": "erpnext/erpnext/stock/doctype/purchase_receipt/purchase_receipt.py"
    },
    {
        "name": "make_inter_company_delivery_note",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_inter_company_delivery_note(source_name, target_doc=None)",
        "def_index": 39315,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 39295,
        "file": "erpnext/erpnext/stock/doctype/purchase_receipt/purchase_receipt.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_children(doctype, parent=None, company=None, is_root=False)",
        "def_index": 4574,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4554,
        "file": "erpnext/erpnext/stock/doctype/warehouse/warehouse.py"
    },
    {
        "name": "add_node",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_node()",
        "def_index": 4939,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4919,
        "file": "erpnext/erpnext/stock/doctype/warehouse/warehouse.py"
    },
    {
        "name": "convert_to_group_or_ledger",
        "arguments": [
            {
                "argument": "docname",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def convert_to_group_or_ledger(docname=None)",
        "def_index": 5158,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5138,
        "file": "erpnext/erpnext/stock/doctype/warehouse/warehouse.py"
    },
    {
        "name": "get_items_from_purchase_receipts",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_items_from_purchase_receipts(self)",
        "def_index": 500,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 479,
        "file": "erpnext/erpnext/stock/doctype/landed_cost_voucher/landed_cost_voucher.py"
    },
    {
        "name": "get_item_specification_details",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_item_specification_details(self)",
        "def_index": 1127,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1106,
        "file": "erpnext/erpnext/stock/doctype/quality_inspection/quality_inspection.py"
    },
    {
        "name": "get_quality_inspection_template",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_quality_inspection_template(self)",
        "def_index": 1619,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1598,
        "file": "erpnext/erpnext/stock/doctype/quality_inspection/quality_inspection.py"
    },
    {
        "name": "item_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def item_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 6714,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 6650,
        "file": "erpnext/erpnext/stock/doctype/quality_inspection/quality_inspection.py"
    },
    {
        "name": "quality_inspection_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def quality_inspection_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 8829,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 8765,
        "file": "erpnext/erpnext/stock/doctype/quality_inspection/quality_inspection.py"
    },
    {
        "name": "make_quality_inspection",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_quality_inspection(source_name, target_doc=None)",
        "def_index": 9234,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 9214,
        "file": "erpnext/erpnext/stock/doctype/quality_inspection/quality_inspection.py"
    },
    {
        "name": "get_stock_item_details",
        "arguments": [
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            },
            {
                "argument": "date",
                "type": "",
                "default": ""
            },
            {
                "argument": "item",
                "type": "",
                "default": "None"
            },
            {
                "argument": "barcode",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_stock_item_details(warehouse, date, item=None, barcode=None)",
        "def_index": 335,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 315,
        "file": "erpnext/erpnext/stock/doctype/quick_stock_balance/quick_stock_balance.py"
    },
    {
        "name": "convert_to_item_wh_reposting",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def convert_to_item_wh_reposting(self)",
        "def_index": 906,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 885,
        "file": "erpnext/erpnext/stock/doctype/stock_reposting_settings/stock_reposting_settings.py"
    },
    {
        "name": "make_stock_entry",
        "arguments": [
            {
                "argument": "**args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_stock_entry(**args)",
        "def_index": 817,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 797,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry_utils.py"
    },
    {
        "name": "get_stock_and_rate",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_stock_and_rate(self)",
        "def_index": 21665,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21644,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "get_item_details",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": "None"
            },
            {
                "argument": "for_update",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_item_details(self, args=None, for_update=False)",
        "def_index": 45551,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 45530,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "set_items_for_stock_in",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_items_for_stock_in(self)",
        "def_index": 48477,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 48456,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "get_items",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_items(self)",
        "def_index": 49154,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 49133,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "move_sample_to_retention_warehouse",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "items",
                "type": "",
                "default": ""
            }
        ],
        "def": "def move_sample_to_retention_warehouse(company, items)",
        "def_index": 78944,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 78924,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "make_stock_in_entry",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_stock_in_entry(source_name, target_doc=None)",
        "def_index": 80667,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 80647,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "get_work_order_details",
        "arguments": [
            {
                "argument": "work_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_work_order_details(work_order, company)",
        "def_index": 82058,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 82038,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "get_uom_details",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "uom",
                "type": "",
                "default": ""
            },
            {
                "argument": "qty",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_uom_details(item_code, uom, qty)",
        "def_index": 85001,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 84981,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "get_expired_batch_items",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_expired_batch_items()",
        "def_index": 85580,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 85560,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "get_warehouse_details",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_warehouse_details(args)",
        "def_index": 85998,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 85978,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "validate_sample_quantity",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "sample_quantity",
                "type": "",
                "default": ""
            },
            {
                "argument": "qty",
                "type": "",
                "default": ""
            },
            {
                "argument": "batch_no",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def validate_sample_quantity(item_code, sample_quantity, qty, batch_no=None)",
        "def_index": 86434,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 86414,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "get_items_from_subcontract_order",
        "arguments": [
            {
                "argument": "source_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_items_from_subcontract_order(source_name, target_doc=None)",
        "def_index": 88642,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 88622,
        "file": "erpnext/erpnext/stock/doctype/stock_entry/stock_entry.py"
    },
    {
        "name": "set_warehouse",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_warehouse(self)",
        "def_index": 12387,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 12366,
        "file": "erpnext/erpnext/stock/doctype/serial_and_batch_bundle/serial_and_batch_bundle.py"
    },
    {
        "name": "add_serial_batch",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "data",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_serial_batch(self, data)",
        "def_index": 20370,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20349,
        "file": "erpnext/erpnext/stock/doctype/serial_and_batch_bundle/serial_and_batch_bundle.py"
    },
    {
        "name": "download_blank_csv_template",
        "arguments": [
            {
                "argument": "content",
                "type": "",
                "default": ""
            }
        ],
        "def": "def download_blank_csv_template(content)",
        "def_index": 20872,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20852,
        "file": "erpnext/erpnext/stock/doctype/serial_and_batch_bundle/serial_and_batch_bundle.py"
    },
    {
        "name": "upload_csv_file",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "file_path",
                "type": "",
                "default": ""
            }
        ],
        "def": "def upload_csv_file(item_code, file_path)",
        "def_index": 21161,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21141,
        "file": "erpnext/erpnext/stock/doctype/serial_and_batch_bundle/serial_and_batch_bundle.py"
    },
    {
        "name": "item_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            },
            {
                "argument": "as_dict",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def item_query(doctype, txt, searchfield, start, page_len, filters, as_dict=False)",
        "def_index": 24548,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 24484,
        "file": "erpnext/erpnext/stock/doctype/serial_and_batch_bundle/serial_and_batch_bundle.py"
    },
    {
        "name": "get_serial_batch_ledgers",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "docstatus",
                "type": "",
                "default": "None"
            },
            {
                "argument": "voucher_no",
                "type": "",
                "default": "None"
            },
            {
                "argument": "name",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_serial_batch_ledgers(item_code, docstatus=None, voucher_no=None, name=None)",
        "def_index": 24902,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 24882,
        "file": "erpnext/erpnext/stock/doctype/serial_and_batch_bundle/serial_and_batch_bundle.py"
    },
    {
        "name": "add_serial_batch_ledgers",
        "arguments": [
            {
                "argument": "entries",
                "type": "",
                "default": ""
            },
            {
                "argument": "child_row",
                "type": "",
                "default": ""
            },
            {
                "argument": "doc",
                "type": "",
                "default": ""
            },
            {
                "argument": "warehouse",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_serial_batch_ledgers(entries, child_row, doc, warehouse) -> object",
        "def_index": 26211,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 26191,
        "file": "erpnext/erpnext/stock/doctype/serial_and_batch_bundle/serial_and_batch_bundle.py"
    },
    {
        "name": "get_auto_data",
        "arguments": [
            {
                "argument": "**kwargs",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_auto_data(**kwargs)",
        "def_index": 29842,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 29822,
        "file": "erpnext/erpnext/stock/doctype/serial_and_batch_bundle/serial_and_batch_bundle.py"
    },
    {
        "name": "get_all_customers",
        "arguments": [
            {
                "argument": "date_range",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "field",
                "type": "",
                "default": ""
            },
            {
                "argument": "limit",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_all_customers(date_range, company, field, limit=None)",
        "def_index": 1549,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 1529,
        "file": "erpnext/erpnext/startup/leaderboard.py"
    },
    {
        "name": "get_all_items",
        "arguments": [
            {
                "argument": "date_range",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "field",
                "type": "",
                "default": ""
            },
            {
                "argument": "limit",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_all_items(date_range, company, field, limit=None)",
        "def_index": 2715,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2695,
        "file": "erpnext/erpnext/startup/leaderboard.py"
    },
    {
        "name": "get_all_suppliers",
        "arguments": [
            {
                "argument": "date_range",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "field",
                "type": "",
                "default": ""
            },
            {
                "argument": "limit",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_all_suppliers(date_range, company, field, limit=None)",
        "def_index": 4163,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4143,
        "file": "erpnext/erpnext/startup/leaderboard.py"
    },
    {
        "name": "get_all_sales_partner",
        "arguments": [
            {
                "argument": "date_range",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "field",
                "type": "",
                "default": ""
            },
            {
                "argument": "limit",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_all_sales_partner(date_range, company, field, limit=None)",
        "def_index": 5488,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5468,
        "file": "erpnext/erpnext/startup/leaderboard.py"
    },
    {
        "name": "get_all_sales_person",
        "arguments": [
            {
                "argument": "date_range",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "field",
                "type": "",
                "default": "None"
            },
            {
                "argument": "limit",
                "type": "",
                "default": "0"
            }
        ],
        "def": "def get_all_sales_person(date_range, company, field=None, limit=0)",
        "def_index": 6164,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6144,
        "file": "erpnext/erpnext/startup/leaderboard.py"
    },
    {
        "name": "get_round_off_applicable_accounts",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "account_list",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_round_off_applicable_accounts(company, account_list)",
        "def_index": 33275,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 33255,
        "file": "erpnext/erpnext/controllers/taxes_and_totals.py"
    },
    {
        "name": "apply_shipping_rule",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def apply_shipping_rule(self)",
        "def_index": 26765,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 26744,
        "file": "erpnext/erpnext/controllers/accounts_controller.py"
    },
    {
        "name": "set_advances",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_advances(self)",
        "def_index": 27479,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 27458,
        "file": "erpnext/erpnext/controllers/accounts_controller.py"
    },
    {
        "name": "get_tax_rate",
        "arguments": [
            {
                "argument": "account_head",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_tax_rate(account_head)",
        "def_index": 64725,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 64705,
        "file": "erpnext/erpnext/controllers/accounts_controller.py"
    },
    {
        "name": "get_default_taxes_and_charges",
        "arguments": [
            {
                "argument": "master_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "tax_template",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_default_taxes_and_charges(master_doctype, tax_template=None, company=None)",
        "def_index": 64885,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 64865,
        "file": "erpnext/erpnext/controllers/accounts_controller.py"
    },
    {
        "name": "get_taxes_and_charges",
        "arguments": [
            {
                "argument": "master_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "master_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_taxes_and_charges(master_doctype, master_name)",
        "def_index": 65393,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 65373,
        "file": "erpnext/erpnext/controllers/accounts_controller.py"
    },
    {
        "name": "get_payment_terms",
        "arguments": [
            {
                "argument": "terms_template",
                "type": "",
                "default": ""
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "grand_total",
                "type": "",
                "default": "None"
            },
            {
                "argument": "base_grand_total",
                "type": "",
                "default": "None"
            },
            {
                "argument": "bill_date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_payment_terms(terms_template, posting_date=None, grand_total=None, base_grand_total=None, bill_date=None)",
        "def_index": 76710,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 76690,
        "file": "erpnext/erpnext/controllers/accounts_controller.py"
    },
    {
        "name": "get_payment_term_details",
        "arguments": [
            {
                "argument": "term",
                "type": "",
                "default": ""
            },
            {
                "argument": "posting_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "grand_total",
                "type": "",
                "default": "None"
            },
            {
                "argument": "base_grand_total",
                "type": "",
                "default": "None"
            },
            {
                "argument": "bill_date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_payment_term_details(term, posting_date=None, grand_total=None, base_grand_total=None, bill_date=None)",
        "def_index": 77162,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 77142,
        "file": "erpnext/erpnext/controllers/accounts_controller.py"
    },
    {
        "name": "update_child_qty_rate",
        "arguments": [
            {
                "argument": "parent_doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "trans_items",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent_doctype_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "child_docname",
                "type": "",
                "default": "items"
            }
        ],
        "def": "def update_child_qty_rate(parent_doctype, trans_items, parent_doctype_name, child_docname=\"items\")",
        "def_index": 85170,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 85150,
        "file": "erpnext/erpnext/controllers/accounts_controller.py"
    },
    {
        "name": "get_current_stock",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_current_stock(self)",
        "def_index": 29708,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 29687,
        "file": "erpnext/erpnext/controllers/subcontracting_controller.py"
    },
    {
        "name": "make_rm_stock_entry",
        "arguments": [
            {
                "argument": "subcontract_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "rm_items",
                "type": "",
                "default": "None"
            },
            {
                "argument": "order_doctype",
                "type": "",
                "default": "Subcontracting Order"
            },
            {
                "argument": "target_doc",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_rm_stock_entry(subcontract_order, rm_items=None, order_doctype=\"Subcontracting Order\", target_doc=None)",
        "def_index": 30887,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 30867,
        "file": "erpnext/erpnext/controllers/subcontracting_controller.py"
    },
    {
        "name": "get_materials_from_supplier",
        "arguments": [
            {
                "argument": "subcontract_order",
                "type": "",
                "default": ""
            },
            {
                "argument": "rm_details",
                "type": "",
                "default": ""
            },
            {
                "argument": "order_doctype",
                "type": "",
                "default": "Subcontracting Order"
            }
        ],
        "def": "def get_materials_from_supplier(subcontract_order, rm_details, order_doctype=\"Subcontracting Order\")",
        "def_index": 35540,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 35520,
        "file": "erpnext/erpnext/controllers/subcontracting_controller.py"
    },
    {
        "name": "employee_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def employee_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 581,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 517,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "lead_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def lead_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 1626,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 1562,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "customer_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            },
            {
                "argument": "as_dict",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def customer_query(doctype, txt, searchfield, start, page_len, filters, as_dict=False)",
        "def_index": 2868,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 2804,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "supplier_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            },
            {
                "argument": "as_dict",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def supplier_query(doctype, txt, searchfield, start, page_len, filters, as_dict=False)",
        "def_index": 4166,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 4102,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "tax_account_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def tax_account_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 5286,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 5222,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "item_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            },
            {
                "argument": "as_dict",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def item_query(doctype, txt, searchfield, start, page_len, filters, as_dict=False)",
        "def_index": 6636,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 6572,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "bom",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def bom(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 9679,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 9615,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_project_name",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_project_name(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 10537,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 10473,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_delivery_notes_to_be_billed",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            },
            {
                "argument": "as_dict",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_delivery_notes_to_be_billed(doctype, txt, searchfield, start, page_len, filters, as_dict)",
        "def_index": 11746,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 11682,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_batch_no",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_batch_no(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 12956,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 12892,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_account_list",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_account_list(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 16880,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 16816,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_blanket_orders",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_blanket_orders(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 17726,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 17662,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_income_account",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_income_account(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 18369,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 18305,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_filtered_dimensions",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            },
            {
                "argument": "reference_doctype",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_filtered_dimensions(doctype, txt, searchfield, start, page_len, filters, reference_doctype=None)",
        "def_index": 19391,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 19327,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_expense_account",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_expense_account(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 20934,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 20870,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "warehouse_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def warehouse_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 21850,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 21786,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_batch_numbers",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_batch_numbers(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 23108,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 23044,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "item_manufacturer_query",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def item_manufacturer_query(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 23617,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 23553,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_purchase_receipts",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_purchase_receipts(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 24110,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 24046,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_purchase_invoices",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_purchase_invoices(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 24688,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 24624,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_tax_template",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_tax_template(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 25266,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 25202,
        "file": "erpnext/erpnext/controllers/queries.py"
    },
    {
        "name": "get_variant",
        "arguments": [
            {
                "argument": "template",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": "None"
            },
            {
                "argument": "variant",
                "type": "",
                "default": "None"
            },
            {
                "argument": "manufacturer",
                "type": "",
                "default": "None"
            },
            {
                "argument": "manufacturer_part_no",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_variant(template, args=None, variant=None, manufacturer=None, manufacturer_part_no=None)",
        "def_index": 445,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 425,
        "file": "erpnext/erpnext/controllers/item_variant.py"
    },
    {
        "name": "create_variant",
        "arguments": [
            {
                "argument": "item",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_variant(item, args)",
        "def_index": 6065,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6045,
        "file": "erpnext/erpnext/controllers/item_variant.py"
    },
    {
        "name": "enqueue_multiple_variant_creation",
        "arguments": [
            {
                "argument": "item",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def enqueue_multiple_variant_creation(item, args)",
        "def_index": 6633,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 6613,
        "file": "erpnext/erpnext/controllers/item_variant.py"
    },
    {
        "name": "create_variant_doc_for_quick_entry",
        "arguments": [
            {
                "argument": "template",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_variant_doc_for_quick_entry(template, args)",
        "def_index": 11924,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 11904,
        "file": "erpnext/erpnext/controllers/item_variant.py"
    },
    {
        "name": "get_period_date_ranges",
        "arguments": [
            {
                "argument": "period",
                "type": "",
                "default": ""
            },
            {
                "argument": "fiscal_year",
                "type": "",
                "default": "None"
            },
            {
                "argument": "year_start_date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_period_date_ranges(period, fiscal_year=None, year_start_date=None)",
        "def_index": 7835,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": true,
        "other_decorators": [],
        "index": 7799,
        "file": "erpnext/erpnext/controllers/trends.py"
    },
    {
        "name": "show_accounting_ledger_preview",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def show_accounting_ledger_preview(company, doctype, docname)",
        "def_index": 28076,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28056,
        "file": "erpnext/erpnext/controllers/stock_controller.py"
    },
    {
        "name": "show_stock_ledger_preview",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "docname",
                "type": "",
                "default": ""
            }
        ],
        "def": "def show_stock_ledger_preview(company, doctype, docname)",
        "def_index": 28405,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 28385,
        "file": "erpnext/erpnext/controllers/stock_controller.py"
    },
    {
        "name": "make_quality_inspections",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "docname",
                "type": "",
                "default": ""
            },
            {
                "argument": "items",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_quality_inspections(doctype, docname, items)",
        "def_index": 32214,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 32194,
        "file": "erpnext/erpnext/controllers/stock_controller.py"
    },
    {
        "name": "get_depr_schedule",
        "arguments": [
            {
                "argument": "asset_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "status",
                "type": "",
                "default": ""
            },
            {
                "argument": "finance_book",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_depr_schedule(asset_name, status, finance_book=None)",
        "def_index": 21913,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21893,
        "file": "erpnext/erpnext/assets/doctype/asset_depreciation_schedule/asset_depreciation_schedule.py"
    },
    {
        "name": "calculate_next_due_date",
        "arguments": [
            {
                "argument": "periodicity",
                "type": "",
                "default": ""
            },
            {
                "argument": "start_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "end_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "last_completion_date",
                "type": "",
                "default": "None"
            },
            {
                "argument": "next_due_date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def calculate_next_due_date(periodicity, start_date=None, end_date=None, last_completion_date=None, next_due_date=None)",
        "def_index": 2329,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2309,
        "file": "erpnext/erpnext/assets/doctype/asset_maintenance/asset_maintenance.py"
    },
    {
        "name": "get_team_members",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_team_members(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 4747,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 4683,
        "file": "erpnext/erpnext/assets/doctype/asset_maintenance/asset_maintenance.py"
    },
    {
        "name": "get_maintenance_log",
        "arguments": [
            {
                "argument": "asset_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_maintenance_log(asset_name)",
        "def_index": 4965,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 4945,
        "file": "erpnext/erpnext/assets/doctype/asset_maintenance/asset_maintenance.py"
    },
    {
        "name": "set_warehouse_details",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_warehouse_details(self)",
        "def_index": 7619,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7598,
        "file": "erpnext/erpnext/assets/doctype/asset_capitalization/asset_capitalization.py"
    },
    {
        "name": "set_asset_values",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def set_asset_values(self)",
        "def_index": 7876,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 7855,
        "file": "erpnext/erpnext/assets/doctype/asset_capitalization/asset_capitalization.py"
    },
    {
        "name": "get_target_item_details",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": "None"
            },
            {
                "argument": "company",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_target_item_details(item_code=None, company=None)",
        "def_index": 18014,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17994,
        "file": "erpnext/erpnext/assets/doctype/asset_capitalization/asset_capitalization.py"
    },
    {
        "name": "get_consumed_stock_item_details",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_consumed_stock_item_details(args)",
        "def_index": 19100,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 19080,
        "file": "erpnext/erpnext/assets/doctype/asset_capitalization/asset_capitalization.py"
    },
    {
        "name": "get_warehouse_details",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_warehouse_details(args)",
        "def_index": 20472,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20452,
        "file": "erpnext/erpnext/assets/doctype/asset_capitalization/asset_capitalization.py"
    },
    {
        "name": "get_consumed_asset_details",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_consumed_asset_details(args)",
        "def_index": 20835,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 20815,
        "file": "erpnext/erpnext/assets/doctype/asset_capitalization/asset_capitalization.py"
    },
    {
        "name": "get_service_item_details",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_service_item_details(args)",
        "def_index": 22359,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22339,
        "file": "erpnext/erpnext/assets/doctype/asset_capitalization/asset_capitalization.py"
    },
    {
        "name": "get_manual_depreciation_entries",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_manual_depreciation_entries(self)",
        "def_index": 14324,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 14303,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "get_depreciation_rate",
        "arguments": [
            {
                "argument": "self",
                "type": "",
                "default": ""
            },
            {
                "argument": "args",
                "type": "",
                "default": ""
            },
            {
                "argument": "on_validate",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_depreciation_rate(self, args, on_validate=False)",
        "def_index": 18818,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 18797,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "make_sales_invoice",
        "arguments": [
            {
                "argument": "asset",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            },
            {
                "argument": "serial_no",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_sales_invoice(asset, item_code, company, serial_no=None)",
        "def_index": 21211,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21191,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "create_asset_maintenance",
        "arguments": [
            {
                "argument": "asset",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "item_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "asset_category",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_asset_maintenance(asset, item_code, item_name, asset_category, company)",
        "def_index": 21795,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 21775,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "create_asset_repair",
        "arguments": [
            {
                "argument": "asset",
                "type": "",
                "default": ""
            },
            {
                "argument": "asset_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_asset_repair(asset, asset_name)",
        "def_index": 22160,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22140,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "create_asset_value_adjustment",
        "arguments": [
            {
                "argument": "asset",
                "type": "",
                "default": ""
            },
            {
                "argument": "asset_category",
                "type": "",
                "default": ""
            },
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def create_asset_value_adjustment(asset, asset_category, company)",
        "def_index": 22359,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22339,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "transfer_asset",
        "arguments": [
            {
                "argument": "args",
                "type": "",
                "default": ""
            }
        ],
        "def": "def transfer_asset(args)",
        "def_index": 22654,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 22634,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "get_item_details",
        "arguments": [
            {
                "argument": "item_code",
                "type": "",
                "default": ""
            },
            {
                "argument": "asset_category",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_item_details(item_code, asset_category)",
        "def_index": 23121,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 23101,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "make_journal_entry",
        "arguments": [
            {
                "argument": "asset_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def make_journal_entry(asset_name)",
        "def_index": 24410,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 24390,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "make_asset_movement",
        "arguments": [
            {
                "argument": "assets",
                "type": "",
                "default": ""
            },
            {
                "argument": "purpose",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_asset_movement(assets, purpose=None)",
        "def_index": 25460,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 25440,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "get_asset_value_after_depreciation",
        "arguments": [
            {
                "argument": "asset_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "finance_book",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_asset_value_after_depreciation(asset_name, finance_book=None)",
        "def_index": 26287,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 26267,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "split_asset",
        "arguments": [
            {
                "argument": "asset_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "split_qty",
                "type": "",
                "default": ""
            }
        ],
        "def": "def split_asset(asset_name, split_qty)",
        "def_index": 26483,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 26463,
        "file": "erpnext/erpnext/assets/doctype/asset/asset.py"
    },
    {
        "name": "make_depreciation_entry",
        "arguments": [
            {
                "argument": "asset_depr_schedule_name",
                "type": "",
                "default": ""
            },
            {
                "argument": "date",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def make_depreciation_entry(asset_depr_schedule_name, date=None)",
        "def_index": 2445,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 2425,
        "file": "erpnext/erpnext/assets/doctype/asset/depreciation.py"
    },
    {
        "name": "scrap_asset",
        "arguments": [
            {
                "argument": "asset_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def scrap_asset(asset_name)",
        "def_index": 8631,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 8611,
        "file": "erpnext/erpnext/assets/doctype/asset/depreciation.py"
    },
    {
        "name": "restore_asset",
        "arguments": [
            {
                "argument": "asset_name",
                "type": "",
                "default": ""
            }
        ],
        "def": "def restore_asset(asset_name)",
        "def_index": 10028,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 10008,
        "file": "erpnext/erpnext/assets/doctype/asset/depreciation.py"
    },
    {
        "name": "get_disposal_account_and_cost_center",
        "arguments": [
            {
                "argument": "company",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_disposal_account_and_cost_center(company)",
        "def_index": 17509,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 17489,
        "file": "erpnext/erpnext/assets/doctype/asset/depreciation.py"
    },
    {
        "name": "get_value_after_depreciation_on_disposal_date",
        "arguments": [
            {
                "argument": "asset",
                "type": "",
                "default": ""
            },
            {
                "argument": "disposal_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "finance_book",
                "type": "",
                "default": "None"
            }
        ],
        "def": "def get_value_after_depreciation_on_disposal_date(asset, disposal_date, finance_book=None)",
        "def_index": 18044,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 18024,
        "file": "erpnext/erpnext/assets/doctype/asset/depreciation.py"
    },
    {
        "name": "get_children",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "parent",
                "type": "",
                "default": "None"
            },
            {
                "argument": "location",
                "type": "",
                "default": "None"
            },
            {
                "argument": "is_root",
                "type": "",
                "default": "False"
            }
        ],
        "def": "def get_children(doctype, parent=None, location=None, is_root=False)",
        "def_index": 5387,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5367,
        "file": "erpnext/erpnext/assets/doctype/location/location.py"
    },
    {
        "name": "add_node",
        "arguments": [
            {
                "argument": "",
                "type": "",
                "default": ""
            }
        ],
        "def": "def add_node()",
        "def_index": 5772,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 5752,
        "file": "erpnext/erpnext/assets/doctype/location/location.py"
    },
    {
        "name": "get_downtime",
        "arguments": [
            {
                "argument": "failure_date",
                "type": "",
                "default": ""
            },
            {
                "argument": "completion_date",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_downtime(failure_date, completion_date)",
        "def_index": 13046,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [],
        "index": 13026,
        "file": "erpnext/erpnext/assets/doctype/asset_repair/asset_repair.py"
    },
    {
        "name": "get_maintenance_tasks",
        "arguments": [
            {
                "argument": "doctype",
                "type": "",
                "default": ""
            },
            {
                "argument": "txt",
                "type": "",
                "default": ""
            },
            {
                "argument": "searchfield",
                "type": "",
                "default": ""
            },
            {
                "argument": "start",
                "type": "",
                "default": ""
            },
            {
                "argument": "page_len",
                "type": "",
                "default": ""
            },
            {
                "argument": "filters",
                "type": "",
                "default": ""
            }
        ],
        "def": "def get_maintenance_tasks(doctype, txt, searchfield, start, page_len, filters)",
        "def_index": 1987,
        "request_types": [],
        "xss_safe": false,
        "allow_guest": false,
        "other_decorators": [
            "@frappe.validate_and_sanitize_search_inputs"
        ],
        "index": 1923,
        "file": "erpnext/erpnext/assets/doctype/asset_maintenance_log/asset_maintenance_log.py"
    }
]