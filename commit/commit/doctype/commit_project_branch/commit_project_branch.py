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


class CommitProjectBranch(Document):

    def before_insert(self):
        self.path_to_folder = self.get_path_to_folder()
        self.create_branch_folder()
        self.clone_repo()
        self.get_modules()
        self.find_all_apis()

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
        repo = git.Repo.clone_from(
            repo_url, folder_path, branch=self.branch_name, single_branch=True)
        # print("Cloned repo")
        self.last_fetched = frappe.utils.now_datetime()
        self.commit_hash = repo.head.object.hexsha
        pass

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
        if os.path.exists(self.path_to_folder):
            shutil.rmtree(self.path_to_folder)
    pass


@frappe.whitelist(allow_guest=True)
def fetch_repo(doc):
    doc = json.loads(doc)
    project_branch = frappe.get_doc("Commit Project Branch", doc.get("name"))
    project_branch.fetch_repo()
    project_branch.save()
    return "Hello"

@frappe.whitelist(allow_guest=True)
def get_module_doctype_map_for_branches(branches: str):
    branches = json.loads(branches)
    module_doctypes_map = {}
    for branch in branches:
        project_branch = frappe.get_doc("Commit Project Branch", branch)
        module_doctypes_map[branch] = json.loads(project_branch.module_doctypes_map)
    return module_doctypes_map