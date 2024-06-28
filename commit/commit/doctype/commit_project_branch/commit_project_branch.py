# Copyright (c) 2023, The Commit Company and contributors
# For license information, please see license.txt

import frappe
import git
import os
import shutil
import json
from frappe.model.document import Document
from commit.commit.code_analysis.apis import find_all_occurrences_of_whitelist
from commit.commit.code_analysis.doctypes import get_doctypes_in_module, get_doctype_json
from frappe.utils import now
from frappe.app import handle_exception
from commit.api.api_explorer import get_file_content_from_path
from commit.api.generate_documentation import generate_docs_for_apis

class CommitProjectBranch(Document):

    def before_insert(self):
        self.path_to_folder = self.get_path_to_folder()
        self.create_branch_folder()
    
    def after_insert(self):
        frappe.enqueue(
            method = background_fetch_process,
            is_async = True,
            job_name="Fetch Project Branch",
            enqueue_after_commit = True,
            at_front = True,
            project_branch = self.name
        )

    def on_update(self):
        old_doc = self.get_doc_before_save()
        if type(self.whitelisted_apis) == str:
            apis = json.loads(self.whitelisted_apis if self.whitelisted_apis else '').get("apis", [])
        else:
            apis = self.whitelisted_apis.get("apis", []) if self.whitelisted_apis else []
        if old_doc and old_doc.whitelisted_apis != self.whitelisted_apis and len(apis) > 0:
            frappe.enqueue(
                method = generate_branch_documentation,
                is_async = True,
                job_name="Generate Branch Documentation",
                enqueue_after_commit = True,
                at_front = True,
                queue="long",
                project_branch = self.name
            )            

    def create_branch_folder(self):
        if not os.path.exists(self.path_to_folder):
            os.mkdir(self.path_to_folder)

    def get_path_to_folder(self):
        project = frappe.get_doc("Commit Project", self.project)
        return project.path_to_folder + "/" + self.branch_name

    def clone_repo(self):
        project = frappe.get_doc("Commit Project", self.project)
        self.app_name = project.app_name
        repo_url = "https://github.com/{}/{}".format(
            project.org, project.repo_name)

        folder_path = self.path_to_folder
        # print("Folder path", folder_path)
        # print("Repo url", repo_url)
        # print("Branch name", self.branch_name)
        repo = git.Repo.clone_from(repo_url, folder_path, branch=self.branch_name, single_branch=True)
        # print("Cloned repo")
        self.last_fetched = frappe.utils.now_datetime()
        self.commit_hash = repo.head.object.hexsha

    def fetch_repo(self):
        repo = git.Repo(self.path_to_folder)
        repo.remotes.origin.fetch()

        # Pull the latest changes from the remote
        repo.remotes.origin.pull()
        self.last_fetched = now()
        self.commit_hash = repo.head.object.hexsha

        self.get_modules()
        self.find_all_apis()
        # self.save()

        pass

    def get_modules(self):
        # print("Getting modules")
        modules_path = os.path.join(
            self.path_to_folder, self.app_name, 'modules.txt')
        if os.path.isfile(modules_path):
            modules_file = open(modules_path, 'r')
            modules = modules_file.read().splitlines()
            self.modules = ",".join(modules)

            module_doctypes_map = {}
            doctype_module_map = {}
            for module in modules:
                module_doctypes_map[module] = get_doctypes_in_module(
                    self.path_to_folder, self.app_name, module)
                for doctype in module_doctypes_map[module].get("doctype_names", []):
                    doctype_module_map[doctype] = module

            self.module_doctypes_map = module_doctypes_map
            self.doctype_module_map = doctype_module_map
        # print("Modules", self.modules)

    def find_all_apis(self):
        apis = find_all_occurrences_of_whitelist(
            self.path_to_folder, self.app_name)
        # print(apis)
        # Convert list to string and save to database
        self.whitelisted_apis = {
            "apis": apis
        }
        return apis

    def get_whitelisted_apis_code(self):
        apis = []
        apis_code = []
        
        if self.whitelisted_apis:
            if type(self.whitelisted_apis) == str:
                apis = json.loads(self.whitelisted_apis if self.whitelisted_apis else '').get("apis", [])
            else:
                apis = self.whitelisted_apis.get("apis", []) if self.whitelisted_apis else []
        
        for api in apis:
            # file_content =  get_file_content_from_path(self.name, api['file'], api['block_start'], api['block_end'], "project")
            file_content = get_code_from_file(api['file'], api['block_start'], api['block_end'])

            content = file_content.get("file_content", [])
            content = "".join(content)
            apis_code.append({
                'file': api['file'],
                'path': api['api_path'],
                'function_name': api['name'],
                'code': content
            })

        documentation = generate_docs_for_apis(apis_code)

        self.documentation= {
            "apis": documentation
        }

    def get_doctype_json(self, doctype_name):
        if self.doctype_module_map:
            doctype_module_map = json.loads(self.doctype_module_map)
            module = doctype_module_map.get(doctype_name)
            # print("Module", module)
            if module:
                return get_doctype_json(self.path_to_folder, self.app_name, module, doctype_name)
        return None

    def get_doctypes_in_module(self, module):
        if self.module_doctypes_map:
            module_doctypes_map = json.loads(self.module_doctypes_map)
            return module_doctypes_map.get(module, {}).get("doctype_names", [])

    def on_trash(self):
        # Delete the folder
        if self.path_to_folder and os.path.exists(self.path_to_folder):
            shutil.rmtree(self.path_to_folder)

def get_code_from_file(file_path: str, block_start: int, block_end: int):

    if os.path.isfile(file_path):
        file_content = open(file_path, 'r')
        file_content = file_content.readlines()
        # fetch the block
        file_content = file_content[block_start:block_end]
        return {
            "file_content": file_content
        }
    else:
        frappe.throw("File not found")

def background_fetch_process(project_branch):
    try:
        doc = frappe.get_doc("Commit Project Branch", project_branch)
        frappe.publish_realtime('commit_branch_clone_repo',
            {
                'branch_name': doc.branch_name,
                'project': doc.project,
                'text': "Cloning repository...",
                'is_completed': False
            }, user=frappe.session.user)


        doc.clone_repo()
        frappe.publish_realtime('commit_branch_get_modules',
            {
                'branch_name': doc.branch_name,
                'project': doc.project,
                'text': "Getting all modules for your app...",
                'is_completed': False
            }, user=frappe.session.user)

        doc.get_modules()

        frappe.publish_realtime('commit_branch_find_apis',
            {
                'branch_name': doc.branch_name,
                'project': doc.project,
                'text': "Finding all APIs...",
                'is_completed': False
            }, user=frappe.session.user)

        doc.find_all_apis()
            
        # doc.get_whitelisted_apis_code()
        doc.save()

        frappe.publish_realtime("commit_project_branch_created", {
                'name': doc.name,
                'branch_name': doc.branch_name,
                'project': doc.project,
                'text': "Branch created successfully.",
                'is_completed': True
            }, user=frappe.session.user)

    except Exception as e:
        # throw the error and delete the document
        messages = [json.dumps({'message' :'There was an error while fetching branch repo.'})]
        frappe.clear_messages()
        frappe.publish_realtime('commit_branch_creation_error',
            {
                'branch_name': doc.branch_name,
                'project': doc.project,
                'error':{
						"exception": frappe.get_traceback(),
						"_server_messages": json.dumps(messages),
						},
                # 'response': handle_exception(e),
                'is_completed': False
            }, user=frappe.session.user)

        frappe.delete_doc("Commit Project Branch", project_branch)
        # frappe.throw("Project Branch not found")
        frappe.log(frappe.get_traceback())
        
        # raise e
       

@frappe.whitelist(allow_guest=True)
def fetch_repo(doc, name = None):
    if name :
        project_branch = frappe.get_doc("Commit Project Branch", name)
    else:
        doc = json.loads(doc)
        project_branch = frappe.get_doc("Commit Project Branch", doc.get("name"))
    project_branch.fetch_repo()
    project_branch.save()
    return "Hello"


def generate_branch_documentation(project_branch):
    frappe.publish_realtime('commit_branch_generate_documentation',
        {
            'branch_name': project_branch,
            'text': "Generating documentation...",
            'is_completed': False
        }, user=frappe.session.user)

    doc = frappe.get_doc("Commit Project Branch", project_branch)
    doc.get_whitelisted_apis_code()
    doc.save()

    frappe.publish_realtime("commit_branch_generate_documentation", {
            'branch_name': doc.branch_name,
            'project': doc.project,
            'text': "Documentation generated successfully.",
            'is_completed': True
        }, user=frappe.session.user)
    return "Documentation generated successfully"

@frappe.whitelist(allow_guest=True)
def get_module_doctype_map_for_branches(branches: str):
    branches = json.loads(branches)
    module_doctypes_map = {}
    for branch in branches:
        project_branch = frappe.get_doc("Commit Project Branch", branch)
        module_doctypes_map[branch] = json.loads(project_branch.module_doctypes_map)
    return module_doctypes_map