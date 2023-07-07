import frappe
import requests


def prepare_headers(access_token, type="bearer", accept="application/vnd.github+json"):
    return {
        "Authorization": type + " " + access_token,
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


def get_file_in_repo(access_token, organization, repo, path):
    '''
    Get file in a repository from Github
    '''
    headers = prepare_headers(access_token, accept="application/vnd.github.raw")
    response = requests.get(f"https://api.github.com/repos/{organization}/{repo}/contents/{path}", headers=headers)
    return response.text

def get_all_files_in_repo(access_token, organization, repo, path=''):
    '''
    Get all files in a repository from Github
    '''
    headers = prepare_headers(access_token)
    response = requests.get(f"https://api.github.com/repos/{organization}/{repo}/contents/{path}", headers=headers)
    return response.json()