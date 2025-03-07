# Copyright (c) 2024, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


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
def get_commit_docs_details(route:str):
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

			return parse_commit_docs(commit_docs)
		
	else:
		return frappe.throw('Docs Not Found')


def parse_commit_docs(commit_docs):

	# Get the Sidebar Items
	sidebar_items = get_sidebar_items(commit_docs.sidebar)

	# Get the Footer Items
	footer_items = get_footer_items(commit_docs.footer)

	# Get the Navbar Items
	navbar_items = get_navbar_items(commit_docs.navbar_items)
	
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

def get_footer_items(footer):
	'''
		Get the Footer Items
		# 1. Loop Over the Footer Items Which have Parent Label URL and Label
		# 2. Check if the Footer Item is Hide on Footer
		# 3. Return the Footer Items
	'''
	footer_obj = {}
	for footer_item in footer:
		if footer_item.hide_on_footer:
			continue

		if footer_item.parent_label not in footer_obj:
			footer_obj[footer_item.parent_label] = [
				{
					'label': footer_item.label,
					'url': footer_item.url
				}
			]
		else:
			footer_obj[footer_item.parent_label].append({
				'label': footer_item.label,
				'url': footer_item.url
			})
	
	return footer_obj

def get_navbar_items(navbar):
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
		if navbar_item.hide_on_navbar:
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
					'is_primary_button': navbar_item.is_primary_button
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
					'is_primary_button': navbar_item.is_primary_button
				}
	
	# Remove that Object whose type is Button and Key is in Parent Labels
	button_type_keys = [key for key in navbar_obj if navbar_obj[key]['type'] == 'Button' and key in parent_labels]
	for key in button_type_keys:
		navbar_obj.pop(key)

	return navbar_obj

def get_sidebar_items(sidebar):
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
    for sidebar_item in sorted(sidebar, key=lambda x: x.idx):
        if sidebar_item.hide_on_sidebar:
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
            'idx': commit_docs_page.idx
        }

        # Add sidebar entry to the parent label
        if sidebar_item.parent_label not in sidebar_obj:
            sidebar_obj[sidebar_item.parent_label] = [sidebar_entry]
        else:
            sidebar_obj[sidebar_item.parent_label].append(sidebar_entry)

    # Sort each group in the sidebar_obj by idx
    for key in sidebar_obj:
        sidebar_obj[key] = sorted(sidebar_obj[key], key=lambda x: x['idx'])

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