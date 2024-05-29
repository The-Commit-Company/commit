# Copyright (c) 2023, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CommitOrganization(Document):
	def on_trash(self):
		# find all project which are linked with this organisation 
		# delete all projects
		projects = frappe.get_all('Commit Project',filters={
			'org':self.name
		},pluck='name')
		for project in projects:
			frappe.db.delete('Commit Project',project)
