import json
import re
from commit.commit.doctype.open_ai_settings.open_ai_settings import open_ai_call
import frappe
from commit.api.api_explorer import get_file_content_from_path


def generate_docs_for_apis(api_definitions):

    max_tokens_per_request = 1800  # This is a safe limit to avoid hitting the max token limit
    chunks = chunk_data(api_definitions, max_tokens_per_request)
    all_docs = []

    for chunk in chunks:
        chunk_docs = generate_docs_for_chunk(chunk)
        if chunk_docs:
            all_docs.extend(chunk_docs)
        else:
            print("No docs generated for this chunk, check raw response.")

    return all_docs


def estimate_tokens(text):
    # Estimate tokens based on average character count
    return len(text) // 4

def chunk_data(data, max_tokens):
    chunks = []
    current_chunk = []
    current_tokens = 0

    for item in data:
        item_text = f"Function: {item['function_name']}\nPath: {item['path']}\nCode:\n{item['code']}\n\n"
        item_tokens = estimate_tokens(item_text)

        if current_tokens + item_tokens > max_tokens:
            chunks.append(current_chunk)
            current_chunk = []
            current_tokens = 0

        current_chunk.append(item)
        current_tokens += item_tokens

    if current_chunk:
        chunks.append(current_chunk)

    return chunks

def clean_response(response_text):
    # Remove non-JSON parts using regex
    cleaned_text = re.sub(r"```json|```", "", response_text.strip())
    return cleaned_text


def generate_docs_for_chunk(api_chunk):

    messages = [
        {
            "role": "system",
            "content": (
                "You are an expert documentation generator. Create detailed and comprehensive documentation "
                "for the code provided below in Markdown format. Each function should have the following sections:\n\n"
                "- # [Function Name] (as heading 1)\n"
                "- ## Description: Detailed description of what the function does and what it is used for \n"
                "- ## Parameters: List of parameters with their types, descriptions, and indicate which are mandatory or optional\n"
                "- ## Return Type: Type and description of the return value\n"
                "- ## Examples\n Provide code examples demonstrating how to use the function, enclosed in triple backticks (``````).\n\n"
                "The response should be a valid JSON list of objects formatted as follows: "
                "{function_name: <function_name>, path: <path>, last_updated:<last_updated>, documentation: <documentation in Markdown>}.\n"
                "Ensure the response is in valid JSON format only, enclosed in triple backticks, and does not include `---`."
            )
        }
    ]
    last_updated = frappe.utils.now()
    for api in api_chunk:
        user_message = f"function name: {api['function_name']}, path: {api['path']}, last_updated:{last_updated} ,code:\n{api['code']}"
        messages.append({"role": "user", "content": user_message})

    response_text = open_ai_call(messages)

    cleaned_response = clean_response(response_text)

    try:
        # Check if cleaned_response is already a list (or the expected type)
        if isinstance(cleaned_response, list):
            return cleaned_response
        # If cleaned_response is a string, attempt to decode it as JSON
        elif isinstance(cleaned_response, str):
            return json.loads(cleaned_response, strict=False)
        else:
            # Handle other unexpected types if necessary
            print("Unexpected type of cleaned_response:", type(cleaned_response))
            return []
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", e)
        print("Cleaned Response:\n", cleaned_response)
        try:
            # Attempt to fix common issues like single quotes or trailing commas
            cleaned_response = cleaned_response.replace("'", '"')
            return json.loads(cleaned_response, strict=False)
        except json.JSONDecodeError as e:
            print("Second JSON Decode Error:", e)
            return []
    # return cleaned_response

def generate_documentation_for_api_snippet(api_path:str,code_snippet:str):
    messages = [
        {
            "role": "system",
            "content": (
                "You are an expert documentation generator. Create detailed and comprehensive documentation "
                "for the code provided below in Markdown format. Each function should have the following sections:\n\n"
                "- # [Function Name] (as heading 1)\n"
                "- ## Description\n Provide a detailed description of what the function does and what it is used for.\n"
                "- ## Parameters\n List of parameters with their types, descriptions, and indicate which are mandatory or optional.\n"
                "- ## Return Type\n Specify the type and description of the return value.\n"
                "- ## Examples\n Provide code examples demonstrating how to use the function, enclosed in triple backticks (``````).\n\n"
                "The response should be a valid JSON formatted as follows: "
                "{function_name: <function_name>, path: <path>, last_updated:<last_updated>, documentation: <documentation in Markdown>}.\n"
                "Ensure the response is in valid JSON format only, and does not include `---`."
            )
        }
    ]
    
    user_message = f"api path: {api_path}, last_updated:{frappe.utils.now()}, code:\n{code_snippet}"
    if not code_snippet:
        return []
    messages.append({"role": "user", "content": user_message})

    response_text = open_ai_call(messages)

    cleaned_response = response_text

    try:
        # Check if cleaned_response is already a list (or the expected type)
        if isinstance(cleaned_response, list):
            return cleaned_response
        # If cleaned_response is a string, attempt to decode it as JSON
        elif isinstance(cleaned_response, str):
            return json.loads(cleaned_response, strict=False)
        else:
            # Handle other unexpected types if necessary
            print("Unexpected type of cleaned_response:", type(cleaned_response))
            return []
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", e)
        print("Cleaned Response:\n", cleaned_response)
        try:
            # Attempt to fix common issues like single quotes or trailing commas
            cleaned_response = cleaned_response.replace("'", '"')
            return json.loads(cleaned_response, strict=False)
        except json.JSONDecodeError as e:
            print("Second JSON Decode Error:", e)
            return []

@frappe.whitelist()
def get_documentation_for_api(project_branch: str, file_path: str,block_start: int, block_end: int,endpoint:str,viewer_type:str = 'app'):
    code_snippet = get_file_content_from_path(project_branch, file_path,block_start, block_end,viewer_type)
    api_path = endpoint
    return generate_documentation_for_api_snippet(api_path, code_snippet)

@frappe.whitelist()
def save_documentation(project_branch:str,endpoint:str,documentation:str,viewer_type:str = 'app'):
    # Save the documentation to the project branch
    # 1. Check for viewer_type app or project
    # 2. If viewer_type is app, then check the document is already present in Commit Branch Documentation doctype
    # 3. If document present then loop over documentation check if the function_name and path matches then update the documentation else create a new dict and append to the documentation
    # 4. If document not present then create a new document and append the documentation
    # 5. If viewer_type is project then check the document is already present in Commit Project Branch doctype
    # 6. If document present then loop over documentation check if the function_name and path matches then update the documentation else create a new dict and append to the documentation
    # 7. If document not present then create a new document and append the documentation

    if viewer_type == "app":
        # Check if the document is already present in Commit Branch Documentation doctype
        save_documentation_for_site_app(project_branch, endpoint, documentation)
    else:
        save_documentation_for_project_branch(project_branch, endpoint, documentation)

def save_documentation_for_project_branch(project_branch:str,endpoint:str,documentation:str):

    doc = frappe.get_doc("Commit Project Branch", project_branch)
    docs = json.loads(doc.documentation) if doc.documentation else {}
    apis = docs.get("apis", [])

    # apis is list of dict with keys function_name, path, last_updated, documentation
    # loop over apis and check if function_name and path matches then update the documentation else create a new dict and append to the documentation
    found = False
    for api in apis:
        if api.get("function_name") == endpoint.split(".")[-1] and api.get("path") == endpoint:
            api["documentation"] = documentation
            api["last_updated"] = frappe.utils.now()
            found = True
            break
    if not found:
        apis.append({
            "function_name": endpoint.split(".")[-1],
            "path": endpoint,
            "last_updated": frappe.utils.now(),
            "documentation": documentation
        })
    
    doc.documentation = json.dumps({"apis": apis})
    doc.save()

def save_documentation_for_site_app(project_branch:str,endpoint:str,documentation:str):

    if frappe.db.exists("Commit Branch Documentation",project_branch):
        doc = frappe.get_doc("Commit Branch Documentation", project_branch)
        docs = json.loads(doc.documentation) if doc.documentation else {}
        apis = docs.get("apis", [])

        # apis is list of dict with keys function_name, path, last_updated, documentation
        # loop over apis and check if function_name and path matches then update the documentation else create a new dict and append to the documentation
        found = False
        for api in apis:
            if api.get("function_name") == endpoint.split(".")[-1] and api.get("path") == endpoint:
                api["documentation"] = documentation
                api["last_updated"] = frappe.utils.now()
                found = True
                break
        if not found:
            apis.append({
                "function_name": endpoint.split(".")[-1],
                "path": endpoint,
                "last_updated": frappe.utils.now(), 
                "documentation": documentation
            })
        doc.documentation = json.dumps({"apis": apis})
        doc.save()
    else:
        # Create a new document and append the documentation
        doc = frappe.new_doc("Commit Branch Documentation")
        doc.app = project_branch
        doc.documentation = json.dumps({"apis": [{
            "function_name": endpoint.split(".")[-1],
            "path": endpoint,
            "last_updated": frappe.utils.now(),
            "documentation": documentation
        }]})
        doc.save()