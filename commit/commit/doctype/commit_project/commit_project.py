# Copyright (c) 2023, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from commit.api.code_analysis import get_name_of_app

class CommitProject(Document):

	def before_insert(self):
		self.app_name = get_name_of_app(self.org, self.repo_name)
	pass
