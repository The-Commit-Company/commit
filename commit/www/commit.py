import frappe
import json
import frappe.sessions
import re
from commit.api.meta_data import get_installed_apps
from commit.commit.doctype.commit_docs.commit_docs import get_all_commit_docs_detail, get_commit_docs_list

no_cache = 1

SCRIPT_TAG_PATTERN = re.compile(r"\<script[^<]*\</script\>")
CLOSING_SCRIPT_TAG_PATTERN = re.compile(r"</script\>")

def get_context(context):

    context = frappe._dict()
    context.boot = get_boot()
    context.build_version = frappe.utils.get_build_version()

    return context

@frappe.whitelist(methods=['POST'], allow_guest=True)
def get_context_for_dev():
	if not frappe.conf.developer_mode:
		frappe.throw('This method is only meant for developer mode')
	return json.loads(get_boot())

def get_boot():
    try:
        boot = frappe.sessions.get()
    except Exception as e:
        raise frappe.SessionBootFailed from e
    
    commit_settings = frappe.get_single("Commit Settings")

    show_system_apps = commit_settings.show_system_apps

    
    boot["show_system_apps"] = show_system_apps
    boot["commit_docs_header"] = commit_settings.commit_docs_header
    boot["commit_docs_description"] = commit_settings.commit_docs_description
    boot["commit_docs_header_image_url"] = commit_settings.commit_docs_header_image_url
    boot["get_installed_apps"] = get_installed_apps()
    boot["get_all_commit_docs_detail"] = get_all_commit_docs_detail()
    boot["get_commit_docs_list"] = get_commit_docs_list()

    boot_json = frappe.as_json(boot, indent=None, separators=(",", ":"))
    boot_json = SCRIPT_TAG_PATTERN.sub("", boot_json)

    boot_json = CLOSING_SCRIPT_TAG_PATTERN.sub("", boot_json)
    boot_json = json.dumps(boot_json)

    return boot_json