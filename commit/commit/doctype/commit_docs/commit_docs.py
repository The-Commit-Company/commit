# Copyright (c) 2024, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from commit.api.preview import save_preview_screenshot
from commit.api.convert_to_webp import save_webp_image
import json
class CommitDocs(Document):

	def before_insert(self):
		'''
		Validate the Document
		# 1. Check if the Route is Unique
		'''
		if frappe.db.exists('Commit Docs',{'route':self.route}):
			frappe.throw('Route Already Exists')
		
	def validate(self):
		# 2. Loop Over through the Navbar Items and check there should be only one is Primary Button
		primary_button_count = 0
		for navbar_item in self.navbar_items:
			if navbar_item.is_primary_button:
				primary_button_count += 1
			if primary_button_count > 1:
				frappe.throw('Only One Primary Button is Allowed')
				break
	def before_save(self):
		# This is to save the preview image of the first page of the commit docs
		# This is done to show the preview image in the commit docs dashboard
		# This is done using the async function to capture the screenshot
		# The function is called using the frappe.enqueue method
		if self.sidebar:
			first = self.sidebar[0].docs_page
			domain = frappe.utils.get_url()
			if first:
				docs_url = f'{domain}/commit-docs/{self.route}/{first}'
				frappe.enqueue(method=save_preview_screenshot, url=docs_url,doctype=self.doctype,docname=self.name,field='preview_image')
		
		old_doc = self.get_doc_before_save()
		if old_doc:
			if old_doc.light_mode_logo != self.light_mode_logo:
				frappe.enqueue(method=save_webp_image,doctype=self.doctype,docname=self.name,image_field='light_mode_logo')
			if old_doc.night_mode_logo != self.night_mode_logo:
				frappe.enqueue(method=save_webp_image,doctype=self.doctype,docname=self.name,image_field='dark_mode_logo')


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

@frappe.whitelist()
def get_all_commit_docs_detail():
	'''
	Get the All Commit Docs Details which are Published
	# 1. Get the Commit Docs Document from the route
	# 2. Check if the Commit Docs Document Published
	# 3. Return the Commit Docs Document
	# 4. Get The Sidebar Items for the Commit Docs
	# 5. Return the Sidebar Items
	'''
	
	# Get All the Commit Docs which are Published
	all_commit_docs = frappe.get_all('Commit Docs',{'published':1},'name')

	# Maintain the Commit Docs Object
	commit_docs_obj = {}

	for commit_docs in all_commit_docs:
		commit_docs = frappe.get_doc('Commit Docs',commit_docs.name).as_dict()

		parse_doc = parse_commit_docs(commit_docs)

		commit_docs_obj[commit_docs['route']] = parse_doc
	
	return commit_docs_obj


@frappe.whitelist(allow_guest=True)
def get_commit_docs_details(route:str,show_hidden_items:bool=False):
	'''
		Get the Commit Docs Details
		# 1. Get the Commit Docs Document from the route
		# 2. Check if the Commit Docs Document Published
		# 3. Return the Commit Docs Document
		# 4. Get The Sidebar Items for the Commit Docs
		# 5. Return the Sidebar Items
	'''
	user = frappe.session.user
	# Check if the Commit Docs Document Exists
	if frappe.db.exists('Commit Docs',{'route':route}):

		if user == "Guest":
			if frappe.db.get_value('Commit Docs',{'route':route},'published'):
				commit_docs = frappe.get_doc('Commit Docs',{'route':route}).as_dict()

				return parse_commit_docs(commit_docs)
			else:
				return frappe.throw('Docs Not Published')
		else:
			commit_docs = frappe.get_doc('Commit Docs',{'route':route}).as_dict()

			return parse_commit_docs(commit_docs,show_hidden_items)
		
	else:
		return frappe.throw('Docs Not Found')


def parse_commit_docs(commit_docs,show_hidden_items:bool=False):

	# Get the Sidebar Items
	sidebar_items = get_sidebar_items(commit_docs.sidebar,show_hidden_items)

	# Get the Footer Items
	footer_items = get_footer_items(commit_docs.footer,show_hidden_items)

	# Get the Navbar Items
	navbar_items = get_navbar_items(commit_docs.navbar_items,show_hidden_items)
	
	# remove the sidebar from the commit_docs as it is not needed
	commit_docs.pop('sidebar')
	commit_docs.pop('footer')
	commit_docs.pop('navbar_items')

	return {
		'commit_docs': commit_docs,
		'sidebar_items': sidebar_items,
		'footer_items': footer_items,
		'navbar_items': navbar_items,
	}

def get_footer_items(footer,show_hidden_items:bool=False):
	'''
		Get the Footer Items
		# 1. Loop Over the Footer Items Which have Parent Label URL and Label
		# 2. Check if the Footer Item is Hide on Footer
		# 3. Return the Footer Items
	'''
	footer_obj = {}
	for footer_item in footer:
		if footer_item.hide_on_footer and not show_hidden_items:
			# If the footer item is hidden and show_hidden_items is False, skip it
			continue

		if footer_item.parent_label not in footer_obj:
			footer_obj[footer_item.parent_label] = [
				{
					'label': footer_item.label,
					'url': footer_item.url,
					'hide_on_footer': footer_item.hide_on_footer
				}
			]
		else:
			footer_obj[footer_item.parent_label].append({
				'label': footer_item.label,
				'url': footer_item.url,
				'hide_on_footer': footer_item.hide_on_footer
			})
	
	return footer_obj

def get_navbar_items(navbar,show_hidden_items:bool=False):
	'''
		Get the Navbar Items
		# 1. Loop Over the Navbar Items Which have Label, Parent Label, URL
		# 2. Check if the Navbar Item is Hide on Navbar
		# 3. Navbar Items are Nothing But Buttons which are displayed on the Navbar
		# 4. Parent Label is not Mandatory it is nothing but Like as Menu Button which has Sub Buttons
	'''

	navbar_obj = {}
	parent_labels = []
	for navbar_item in navbar:
		if navbar_item.hide_on_navbar and not show_hidden_items:
			continue
		
		
		if navbar_item.parent_label:
			parent_labels.append(navbar_item.parent_label)
			if navbar_item.parent_label not in navbar_obj:
				navbar_obj[navbar_item.parent_label] = {
					'type':'Menu',
					'label': navbar_item.parent_label,
					'items': [{
						'label': navbar_item.label,
						'url': navbar_item.url,
						'type': 'Button',
						'icon': navbar_item.icon,
						'open_in_new_tab': navbar_item.open_in_new_tab
					}],
					'is_primary_button': navbar_item.is_primary_button,
					'hide_on_navbar': navbar_item.hide_on_navbar
				}
			else:
				navbar_obj[navbar_item.parent_label]['items'].append({
					'label': navbar_item.label,
					'url': navbar_item.url,
					'type': 'Button',
					'icon': navbar_item.icon,
					'open_in_new_tab': navbar_item.open_in_new_tab,
				})
		else:
			if navbar_item.url:
				navbar_obj[navbar_item.label] = {
					'label': navbar_item.label,
					'type': 'Button',
					'icon': navbar_item.icon,
					'open_in_new_tab': navbar_item.open_in_new_tab,
					'url': navbar_item.url,
					'is_primary_button': navbar_item.is_primary_button,
					'hide_on_navbar': navbar_item.hide_on_navbar
				}
	
	# Remove that Object whose type is Button and Key is in Parent Labels
	button_type_keys = [key for key in navbar_obj if navbar_obj[key]['type'] == 'Button' and key in parent_labels]
	for key in button_type_keys:
		navbar_obj.pop(key)

	return navbar_obj

def get_sidebar_items(sidebar,show_hidden_items:bool=False):
    '''
    Get the Sidebar Items with support for nested Group Pages.
    '''
    def get_group_items(commit_docs_page):
        """
        Recursive function to fetch items for a Group Page, handling nested groups.
        """
        group_items = []
        for group_item in commit_docs_page.linked_pages:
            # Get the document for each linked page
            group_commit_docs_page = frappe.get_doc('Commit Docs Page', group_item.commit_docs_page)

            # Check permissions and publication status
            permitted = group_commit_docs_page.allow_guest or frappe.session.user != 'Guest'
            published = group_commit_docs_page.published or frappe.session.user != 'Guest'

            if not permitted or not published:
                continue
            
            # Check if the linked page is also a Group Page
            is_nested_group_page = group_commit_docs_page.is_group_page

            # If it's a nested Group Page, recursively fetch its group items
            if is_nested_group_page:
                nested_group_items = get_group_items(group_commit_docs_page)
                group_items.append({
                    'name': group_commit_docs_page.name,
                    'type': 'Docs Page',
                    'title': group_commit_docs_page.title,
                    'route': group_commit_docs_page.route,
                    'badge': group_commit_docs_page.badge,
                    'badge_color': group_commit_docs_page.badge_color,
                    'icon': group_commit_docs_page.icon,
                    'parent_name': commit_docs_page.name,
                    'is_group_page': True,
                    'group_items': nested_group_items,
                    'idx': group_commit_docs_page.idx
                })
            else:
                # If it's a regular Docs Page, add it directly
                group_items.append({
                    'name': group_commit_docs_page.name,
                    'type': 'Docs Page',
                    'title': group_commit_docs_page.title,
                    'route': group_commit_docs_page.route,
                    'badge': group_commit_docs_page.badge,
                    'badge_color': group_commit_docs_page.badge_color,
                    'icon': group_commit_docs_page.icon,
                    'parent_name': commit_docs_page.name,
                    'idx': group_commit_docs_page.idx
                })
        return sorted(group_items, key=lambda x: x['idx'])

    sidebar_obj = {}
    for sidebar_item in sidebar:  # Preserve the original order of the sidebar
        if sidebar_item.hide_on_sidebar and not show_hidden_items:
            continue

        commit_docs_page = frappe.get_doc('Commit Docs Page', sidebar_item.docs_page)

        permitted = commit_docs_page.allow_guest or frappe.session.user != 'Guest'
        published = commit_docs_page.published or frappe.session.user != 'Guest'
        is_group_page = commit_docs_page.is_group_page

        if not permitted or not published:
            continue

        # Process group items if it's a Group Page
        group_items = get_group_items(commit_docs_page) if is_group_page else []

        # Prepare sidebar entry with group items if it exists
        sidebar_entry = {
            'name': commit_docs_page.name,
            'type': 'Docs Page',
            'title': commit_docs_page.title,
            'route': commit_docs_page.route,
            'badge': commit_docs_page.badge,
            'badge_color': commit_docs_page.badge_color,
            'icon': commit_docs_page.icon,
            'group_name': sidebar_item.parent_label,
            'is_group_page': is_group_page,
            'group_items': group_items if is_group_page else None,
            'idx': commit_docs_page.idx,
			'hide_on_sidebar': sidebar_item.hide_on_sidebar
        }

        # Add sidebar entry to the parent label
        if sidebar_item.parent_label not in sidebar_obj:
            sidebar_obj[sidebar_item.parent_label] = [sidebar_entry]
        else:
            sidebar_obj[sidebar_item.parent_label].append(sidebar_entry)

    return sidebar_obj

@frappe.whitelist(allow_guest=True)
def get_first_page_route(route:str):
	'''
	Get the First Page Route from the Commit Docs
	'''
	if frappe.db.exists('Commit Docs',{'route':route}):
		commit_docs = frappe.get_doc('Commit Docs',{'route':route})
		found = False
		for sidebar in commit_docs.sidebar:
			commit_docs_page = frappe.get_doc('Commit Docs Page',sidebar.docs_page)
			if commit_docs_page.published:
				found = True
				return commit_docs_page.route
		
		if not found:
			return frappe.throw('Create and Publish the First Page')
	
	else:
		return frappe.throw('Commit Docs Not Found')

@frappe.whitelist(allow_guest=True)
def get_commit_docs_list():
	'''
	Get the List of Commit Docs
	'''
	user = frappe.session.user
	filters = {}
	if user == "Guest":
		filters['published'] = 1

	commit_docs_list = frappe.get_all('Commit Docs',
		filters=filters,
		fields=["header", "light_mode_logo", "route", "published", "description","name"],
	)

	return commit_docs_list

@frappe.whitelist(methods=["POST"])
def manage_sidebar(commit_doc:str,parent_labels,docs_page):
	'''
		This is to modify the sidebar items of the commit docs
		@param commit_doc: The Commit Docs ID
		@param parent_labels: The Parent Labels of the Sidebar List
		@param docs_page: List of Object having docs page and parent label

		# 1. Get the Commit Docs Document
		# 2. Loop Over the Parent Labels
		# 3. Look for the Parent Label in docs_page List of Object
		# 4. for loop on that filtered list append the docs_page and parent label to the sidebar
		# 5. Save the Sidebar Items
	'''
	
	# Get the Commit Docs Document
	doc = frappe.get_doc('Commit Docs',commit_doc)

	# Loop Over the Parent Labels
	if isinstance(parent_labels, str):
		parent_labels = json.loads(parent_labels)
	
	if isinstance(docs_page, str):
		docs_page = json.loads(docs_page)

	doc.sidebar = []
	for parent_label in parent_labels:
		# Filter the docs_page List of Object
		filtered_docs_page = [item for item in docs_page if item.get('columnId') == parent_label]

		# Check if there are any duplicate docs_page
		duplicate = set()
		for item in filtered_docs_page:
			if item.get('id') in duplicate:
				frappe.throw(f'You have Duplicate Docs Page {item.get("id")} in Same Parent Label {parent_label}')
			duplicate.add(item.get('id'))
		
		# sort by index field
		filtered_docs_page = sorted(filtered_docs_page, key=lambda x: x.get('index', 0))

		# Loop Over the Filtered List
		for item in filtered_docs_page:
			# Append the docs_page and parent label to the sidebar
			doc.append('sidebar',{
				'parent_label': parent_label,
				'docs_page': item.get('id'),
			})
	
	doc.save()

	return doc

@frappe.whitelist(methods=["POST"])
def manage_navbar(commit_doc:str, navbar_items, sub_navbar_items=None):
	'''
		This is to modify the navbar items of the commit docs
		@param commit_doc: The Commit Docs ID
		@param navbar_items: The Navbar Items List of Object having label, url, parent label, icon, open_in_new_tab

		# 1. Get the Commit Docs Document
		# 2. Loop Over the Navbar Items
		# 3. Append the Navbar Items to the Navbar Items Table
		# 4. Save the Navbar Items
	'''

	doc = frappe.get_doc('Commit Docs',commit_doc)

	if isinstance(navbar_items, str):
		navbar_items = json.loads(navbar_items)
	
	if isinstance(sub_navbar_items, str):
		sub_navbar_items = json.loads(sub_navbar_items)

	doc.navbar_items = []
	# sort the navbar_items by index field
	navbar_items = sorted(navbar_items, key=lambda x: x.get('index', 0))

	for item in navbar_items:
		if item.get('type') == "Menu":
			doc.append('navbar_items',{
				'label': item.get('label'),
				'hide_on_navbar': item.get('hide_on_navbar'),
			})
			if sub_navbar_items:
				# find the task in the sub_navbar_items where columnId is equal to item.get('label')
				sub_items = [sub_item for sub_item in sub_navbar_items if sub_item.get('columnId') == item.get('label')]
				# sort the sub_items by index field
				sub_items = sorted(sub_items, key=lambda x: x.get('index', 0))
				# Loop Over the Sub Items
				for sub_item in sub_items:
					doc.append('navbar_items',{
						'label': sub_item.get('label'),
						'url': sub_item.get('url'),
						'icon': sub_item.get('icon'),
						'open_in_new_tab': sub_item.get('open_in_new_tab'),
						"parent_label": item.get('label'),
					})
		
		else:
			doc.append('navbar_items',{
				'label': item.get('label'),
				'url': item.get('url'),
				'icon': item.get('icon'),
				'open_in_new_tab': item.get('open_in_new_tab'),
				'hide_on_navbar': item.get('hide_on_navbar'),
				'is_primary_button': item.get('is_primary_button')
			})

	doc.save()

	return doc

@frappe.whitelist(methods=["POST"])
def manage_footer(commit_doc:str, footer_columns, footer_items):
	'''
		This is to modify the footer items of the commit docs
		@param commit_doc: The Commit Docs ID
		@param footer_columns: The Footer Columns List of Parent Label
		@param footer_items: The Footer Items List of Object having label, url, hide_on_footer, columnId,id

		# 1. Get the Commit Docs Document
		# 2. Loop Over the Footer Columns
		# 3. Search for the Parent Label in the Footer Items
		# 4. Loop over the filtered list and append the footer items to the footer
		# 5. Save the Footer Items
	'''

	doc = frappe.get_doc('Commit Docs',commit_doc)
	if isinstance(footer_columns, str):
		footer_columns = json.loads(footer_columns)

	if isinstance(footer_items, str):
		footer_items = json.loads(footer_items)

	doc.footer = []
	for parent_label in footer_columns:
		# Filter the footer_items List of Object
		filtered_footer_items = [item for item in footer_items if item.get('columnId') == parent_label]
		
		# Check if there are any duplicate footer_items
		duplicate = set()
		for item in filtered_footer_items:
			if item.get('id') in duplicate:
				frappe.throw(f'You have Duplicate Footer Item {item.get("id")} in Same Parent Label {parent_label}')
			duplicate.add(item.get('id'))
		
		# sort by index field
		filtered_footer_items = sorted(filtered_footer_items, key=lambda x: x.get('index', 0))

		for item in filtered_footer_items:
			doc.append('footer',{
				'label': item.get('label'),
				'url': item.get('url'),
				'hide_on_footer': item.get('hide_on_footer'),
				'parent_label': parent_label,
			})
	
	doc.save()

	return doc