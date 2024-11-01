# Copyright (c) 2024, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CommitDocs(Document):
	pass


@frappe.whitelist()
def get_docs_sidebar_parent_labels(id:str):
	'''
		Get the Parent Labels List of the Sidebar from Commit Docs
	'''

	# Get the Commit Docs Document
	commit_docs = frappe.get_doc('Commit Docs', id)

	parent_labels = []

	for sidebar in commit_docs.sidebar:
		parent_labels.append(sidebar.parent_label)

	parent_labels = list(set(parent_labels))

	parent_labels_obj = []
	for label in parent_labels:
		parent_labels_obj.append({
			'label': label,
			'value': label
		})

	return parent_labels_obj