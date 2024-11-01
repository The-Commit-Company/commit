# Copyright (c) 2024, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json


class CommitDocsPage(Document):
	
	def before_insert(self):
		# Set the route for the page based on the title
		self.route = self.title.lower().replace(' ', '-')

@frappe.whitelist(methods=['POST'])
def publish_documentation(project_branch, endpoint, viewer_type, docs_name, parent_label, title, published, allow_guest, content):
	'''
		Publish the Documentation
		# 1. Create a new Commit Docs Page Document
		# 2. Update the Commit Docs Document with the new Page by adding it to the Sidebar child table
		# 3. Based on viewer_type, update the flag is_published, published_on, published_by, publish_id
	'''

	# 1. Create a new Commit Docs Page Document
	commit_docs_page = frappe.get_doc({
		'doctype': 'Commit Docs Page',
		'title': title,
		'published': published,
		'allow_guest': allow_guest,
		'content': content
	})

	commit_docs_page.insert()

	# 2. Update the Commit Docs Document with the new Page by adding it to the Sidebar child table

	commit_docs = frappe.get_doc('Commit Docs', docs_name)

	commit_docs.append('sidebar', {
		'parent_label': parent_label,
		'docs_page': commit_docs_page.name
	})

	commit_docs.save()

	# 3. Check the viewer_type

	if viewer_type == "project":
		# Get the Project Branch Document
		project_branch_doc = frappe.get_doc('Commit Project Branch', project_branch)

		# Get the documentation JSON
		documentation = json.loads(project_branch_doc.documentation).get("apis", []) if project_branch_doc.documentation else []

		if documentation:
			# Find the API from the documentation JSON
			api = next((api for api in documentation if api.get('path') == endpoint), None)

			if api:
				# Update the API with the published_on, published_by, is_published, publish_id
				api['published_on'] = commit_docs_page.creation
				api['published_by'] = frappe.session.user
				api['is_published'] = 1
				api['publish_id'] = commit_docs_page.name
				api['published_route'] = f'{commit_docs.route}/{commit_docs_page.route}'

				project_branch_doc.documentation = json.dumps({"apis": documentation})
				project_branch_doc.save()

	else:
		commit_branch_documentation= frappe.get_doc('Commit Branch Documentation', project_branch)

		# Get the documentation JSON
		documentation = json.loads(commit_branch_documentation.documentation).get("apis", []) if commit_branch_documentation.documentation else []

		if documentation:
			# Find the API from the documentation JSON
			api = next((api for api in documentation if api.get('path') == endpoint), None)

			if api:
				# Update the API with the published_on, published_by, is_published, publish_id
				api['published_on'] = commit_docs_page.creation
				api['published_by'] = frappe.session.user
				api['is_published'] = 1
				api['publish_id'] = commit_docs_page.name
				api['published_route'] = f'{commit_docs.route}/{commit_docs_page.route}'

				commit_branch_documentation.documentation = json.dumps({"apis": documentation})
				commit_branch_documentation.save()

	return {
		'commit_docs_page': commit_docs_page.name,
		'commit_docs': commit_docs.name
	}