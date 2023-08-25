# Copyright (c) 2023, The Commit Company and contributors
# For license information, please see license.txt

import frappe
import git
import os
import shutil
import json
from frappe.model.document import Document


class CommitProjectBranch(Document):

	def before_insert(self):
		self.path_to_folder = self.get_path_to_folder()
		self.create_branch_folder()
		self.clone_repo()

	def create_branch_folder(self):
		if not os.path.exists(self.path_to_folder):
			os.mkdir(self.path_to_folder)

	
	def get_path_to_folder(self):
		project = frappe.get_doc("Commit Project", self.project)
		return project.path_to_folder + "/" + self.branch_name

	def clone_repo(self):
		project = frappe.get_doc("Commit Project", self.project)
		repo_url = "https://github.com/{}/{}".format(project.org, project.repo_name)

		folder_path = self.path_to_folder
		print("Folder path", folder_path)

		repo = git.Repo.clone_from(repo_url, folder_path, branch=self.branch_name, single_branch=True)
		self.last_fetched = frappe.utils.now_datetime()
		self.commit_hash = repo.head.object.hexsha
		pass

	def fetch_repo(self):
		repo = git.Repo(self.path_to_folder)
		repo.remotes.origin.fetch()

		# Pull the latest changes from the remote
		repo.remotes.origin.pull()
		self.last_fetched = frappe.utils.now_datetime()
		self.commit_hash = repo.head.object.hexsha
		self.save()

		pass

	def on_trash(self):
		# Delete the folder
		if os.path.exists(self.path_to_folder):
			shutil.rmtree(self.path_to_folder)
	pass


@frappe.whitelist()
def fetch_repo(doc):
	doc = json.loads(doc)
	project_branch = frappe.get_doc("Commit Project Branch", doc.get("name"))
	project_branch.fetch_repo()
	return "Hello"