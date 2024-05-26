# Copyright (c) 2023, The Commit Company and contributors
# For license information, please see license.txt

import frappe
import os
import io
from pathlib import Path
from frappe.model.document import Document
from commit.api.code_analysis import get_name_of_app

class CommitProject(Document):

	def before_insert(self):
		self.app_name = get_name_of_app(self.org, self.repo_name)
		self.create_project_folder()

	def create_project_folder(self):
		'''
			Need to create a project folder when a project is created
			The folder needs to be created in the site folder in public
		'''
		# Create folder for the org in the sites folder if it does not exist
		main_folder_path = frappe.get_site_path("public", "organizations")
		if not os.path.exists(main_folder_path):
			os.mkdir(main_folder_path)
		org_path = frappe.get_site_path("public", "organizations", self.org)
		if not os.path.exists(org_path):
			os.mkdir(org_path)
		
		# Create a folder for the project in the org folder if it does not exist
		project_path = org_path + "/" + self.repo_name

		if not os.path.exists(project_path):
			os.mkdir(project_path)
		
		self.path_to_folder = project_path


		return 

	def on_trash(self):
		# find all branches which are linked with this project 
		# delete all branches
		branches = frappe.get_all("Commit Project Branch", filters={
			'project' : self.name
		}, pluck='name')
		for branch in branches:
			frappe.db.delete("Commit Project Branch", branch)
