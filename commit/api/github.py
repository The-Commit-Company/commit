import frappe
import requests


def prepare_headers(access_token, type="bearer", accept="application/vnd.github+json"):
    return {
        # "Authorization": type + " " + access_token,
        "Accept": accept,
        "X-GitHub-Api-Version": "2022-11-28"
    }
def get_user(access_token):
    '''
    Get user details from github
    '''
    headers = prepare_headers(access_token)
    response = requests.get("https://api.github.com/user", headers=headers)
    return response.json()

def get_user_organizations(access_token):
    '''
    Get user organizations from github
    '''
    headers = prepare_headers(access_token)
    response = requests.get("https://api.github.com/user/orgs", headers=headers)
    return response.json()


def get_organization_repos(access_token, organization):
    '''
    Get repositories in an organization from Github
    '''
    headers = prepare_headers(access_token)
    response = requests.get(f"https://api.github.com/orgs/{organization}/repos", headers=headers)
    return response.json()


def get_file_in_repo(access_token:str, organization:str, repo:str, path: str):
    '''
    Get file in a repository from Github
    '''
    headers = prepare_headers(access_token, accept="application/vnd.github.raw")
    response = requests.get(f"https://api.github.com/repos/{organization}/{repo}/contents/{path}", headers=headers)
    return response.text

def get_all_files_in_repo(access_token:str, organization:str, repo:str, path:str=''):
    '''
    Get all files in a repository from Github
    '''

    # TODO: For every file, we need to store it in the database with the commit hash so that we do not need to call this API again to fetch the same result
    headers = prepare_headers(access_token)
    response = requests.get(f"https://api.github.com/repos/{organization}/{repo}/contents/{path}", headers=headers)
    return response.json()


def search_for_file_in_repo(access_token:str, organization:str, repo:str, query:str | None =None, extension: str | None=None, page:int=1, per_page:int=100, accept=None):
    '''
    Search for a file in a repository from Github
    query examples:
    1. "CRM in:file" - searches for keyword CRM in all files
    2. "path:erpnext/crm.doctype" - searches for all files in path erpnext/crm.doctype
    3. Combined query: "path:erpnext/crm.doctype+CRM in:file" - searches for keyword CRM in all files in path erpnext/crm.doctype

    Extension and repo will be added to search query automatically
    '''

    # TODO: This API is expensive to use. We need to store the result based on commit hash and return from our own database
    headers = prepare_headers(access_token, accept=accept)
    if query:
        query = f"{query}+repo:{organization}/{repo}"
    if extension:
        query = f"{query}+extension:{extension}"
    response = requests.get(f"https://api.github.com/search/code?q={query}+repo:{organization}/{repo}&page={page}&per_page={per_page}", headers=headers)
    return response.json()