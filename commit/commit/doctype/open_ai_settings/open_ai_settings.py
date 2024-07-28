# Copyright (c) 2024, The Commit Company and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from openai import OpenAI


class OpenAISettings(Document):
	pass


def open_ai_call(message):
    # 1. Get the organization ID and API key from Open API Settings
    open_ai = frappe.get_single("Open AI Settings")
    org_id = open_ai.organization
    api_key = open_ai.get_password('api_key')

    if not org_id or not api_key:
        frappe.throw("Please set the organization ID and API key in Open API Settings")

    # 2. Initialize the Open AI client
    client = OpenAI(organization=org_id, api_key=api_key)

    # 2. Make the API call to Open AI
    response =  client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=message,
			max_tokens=3900,
            temperature=0.3,  # Lower temperature for more deterministic output
            stop=["Function Name:", "\n\n"]  # Stop sequence to separate functions
    )

    return response.choices[0].message.content