# Copyright (c) 2024, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json
from commit.api.preview import save_preview_screenshot
from bs4 import BeautifulSoup
import re

class CommitDocsPage(Document):
	
	def before_insert(self):
		# Set the route for the page based on the title
		self.route = f'{self.commit_docs.lower().replace(" ", "-")}-{self.title.lower().replace(" ", "-")}'
	
	def before_save(self):
		# Check if this document is first item of commit docs sidebar child table
		if self.commit_docs:
			commit_docs = frappe.get_cached_doc('Commit Docs', self.commit_docs)
			if commit_docs.sidebar:
				first = commit_docs.sidebar[0]
				if first.docs_page == self.name:
					domain = frappe.utils.get_url()
					docs_url = f'{domain}/commit-docs/{commit_docs.route}/{self.name}'
					frappe.enqueue(method=save_preview_screenshot, url=docs_url,doctype="Commit Docs",docname=commit_docs.name,field='preview_image')


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

@frappe.whitelist(allow_guest=True)
def get_commit_docs_page(name):
	'''
		Get the Commit Docs Page
	'''
	user = frappe.session.user
	
	doc = frappe.get_cached_doc('Commit Docs Page', name)

	if user == "Guest" and not doc.allow_guest and not doc.published:
		frappe.throw("You are not allowed to view this page")

	def lowercase_codeblock_lang(md):
		# Matches ```LangName\n ... \n```
		def repl(match):
			lang = match.group(1)
			code = match.group(2)
			return f"```{lang.lower()}\n{code}```"
		return re.sub(r"```(\w+)\n(.*?)```", repl, md, flags=re.DOTALL)

	doc.content = lowercase_codeblock_lang(doc.content)

	# Get the content as HTML
	html = frappe.utils.md_to_html(doc.content)

	# Calculate the Table of Contents
	toc_obj = calculate_toc_object(html)

	return {
		'doc': doc,
		'toc_obj': toc_obj
	}


def calculate_toc_object(html):
    from bs4 import BeautifulSoup
    import re

    soup = BeautifulSoup(html, "html.parser")
    headings = soup.find_all(["h2", "h3", "h4", "h5", "h6"])

    toc = {}
    stack = []  # To keep track of the current hierarchy

    def add_to_toc(toc, level, heading_id, title):
        # Ensure the stack is consistent with the current level
        while stack and stack[-1]["level"] >= level:
            stack.pop()

        # Create the new heading entry
        new_entry = {"id": heading_id, "name": title, "children": {}}

        if not stack:
            # Top-level heading
            toc[heading_id] = new_entry
            stack.append({"level": level, "children": toc[heading_id]["children"]})
        else:
            # Nested heading
            parent = stack[-1]["children"]
            parent[heading_id] = new_entry
            stack.append({"level": level, "children": parent[heading_id]["children"]})

    for heading in headings:
        title = heading.get_text().strip()
        heading_id = re.sub(r"[^\u00C0-\u1FFF\u2C00-\uD7FF\w\- ]", "", title).replace(" ", "-").lower()
        heading["id"] = heading_id
        level = int(heading.name[1])  # Extract the level from the tag name (e.g., h2 -> 2)
        add_to_toc(toc, level, heading_id, title)

    return toc

@frappe.whitelist()
def get_commit_docs_page_list(commit_doc):
	'''
		Get the list of Commit Docs Page
	'''
	user_info = {}
	users = []
	page = frappe.get_all('Commit Docs Page', filters={'commit_docs': commit_doc}, fields=['*'], order_by='creation desc')
	for p in page:
		users.append(p.owner)
		users.append(p.modified_by)
	users = list(set(users))
	frappe.utils.add_user_info(users, user_info)

	return {
		'pages': page,
		'user_info': user_info
	}

@frappe.whitelist()
def create_commit_docs_page(data):
	'''
		Create a new Commit Docs Page
	'''
	if isinstance(data, str):
		data = json.loads(data)
	
	# create a new Commit Docs Page
	commit_docs_page = frappe.get_doc({
		'doctype': 'Commit Docs Page',
		'title': data.get('title'),
		'commit_docs': data.get('commit_docs'),
	})

	commit_docs_page.insert()
	
	if data.get('sidebar_label'):
		commit_doc = frappe.get_doc('Commit Docs', data.get('commit_docs'))
		commit_doc.append('sidebar', {
			'parent_label': data.get('sidebar_label'),
			'docs_page': commit_docs_page.name
		})
		commit_doc.save()
	return commit_docs_page