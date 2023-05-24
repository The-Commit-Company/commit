# Copyright (c) 2023, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import requests
import json


class GithubSettings(Document):
    pass


session = requests.Session()
session.headers.update({'Accept': 'application/json'})


@frappe.whitelist()
def authenticate_user(code, state=None):
    '''API to authenticate the user with GitHub'''
    print("----- Auth Code: ", code)
    response = get_access_token(code)
    if response:
        user_data = get_user_details(response.get('access_token'))
        if user_data:
            print("Inside user data: ", user_data)
            user = create_user(user_data)
            print("----- User: ", user.as_dict())


def get_access_token(code):
    '''Get the access token from GitHub'''
    '''
    1. Make a POST request to GitHub to get the access token
    2. Return the access token
    '''
    github_settings = frappe.get_doc("Github Settings")
    client_id = github_settings.client_id
    client_secret = github_settings.get_password('client_secret')
    token_url = github_settings.token_uri
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
    }
    headers = {'Accept': 'application/json'}

    response = requests.post(token_url, data=data, headers=headers)
    print("----- Response: ", response.json())
    return response.json()


def get_user_details(access_token):
    user_response = requests.get(
        'https://api.github.com/user', headers={'Authorization': 'token ' + access_token})
    print("----- User Response: ", user_response.json())
    user_data = {}
    if user_response.status_code == 200 and user_response.json():
        email_response = requests.get(
            'https://api.github.com/user/emails', headers={'Authorization': 'token ' + access_token})
        print("----- Email Response: ", email_response.json())
        user_data = {"user_details": user_response.json(
        ), "email_details": email_response.json()}

    return user_data


def create_user(user_data):
    '''Create a user in the system'''
    '''
	1. Get the user details from GitHub
	2. Create a user in the system
	3. Return the user details
	'''

    user = frappe.new_doc("User")
    user.first_name = user_data.get('user_details').get('name').split()[0]
    user.last_name = user_data.get('user_details').get('name').split()[1]
    user.email = user_data.get('email_details')[0].get('email')
    user.username = user_data.get('user_details').get('login')
    user.user_image = user_data.get('user_details').get('avatar_url')
    user.bio = user_data.get('user_details').get('bio')
    user.location = user_data.get('user_details').get('location')
    user.new_password = frappe.generate_hash()
    user.enabled = 1
    user.user_type = 'Website User'
    user.insert(ignore_permissions=True)
    frappe.db.commit()
    return user
