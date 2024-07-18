import json
import re
from commit.commit.doctype.open_ai_settings.open_ai_settings import open_ai_call
import frappe


def generate_docs_for_apis(api_definitions):

    max_tokens_per_request = 1800  # This is a safe limit to avoid hitting the max token limit
    chunks = chunk_data(api_definitions, max_tokens_per_request)
    all_docs = []

    for chunk in chunks:
        chunk_docs = generate_docs_for_chunk(chunk)
        # print("Chunk Docs:", chunk_docs)
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
                "- **(api[Function Name])**\n"
                "- **Description**: Detailed description of what the function does and what it is used for \n"
                "- **Parameters**: List of parameters with their types, descriptions, and indicate which are mandatory or optional\n"
                "- **Return Type**: Type and description of the return value\n"
                "- **Examples**: Code examples demonstrating how to use the function (enclosed in triple backticks ``````).\n\n"
                "The response should be a valid JSON list of objects formatted as follows: "
                "{function_name: <function_name>, path: <path>, documentation: <documentation in Markdown>}.\n"
                "Ensure the response is in JSON format only, enclosed in triple backticks, and does not include `---`."
            )
        }
    ]

    for api in api_chunk:
        user_message = f"function name: {api['function_name']}, path: {api['path']}, code:\n{api['code']}"
        messages.append({"role": "user", "content": user_message})

    # print("Raw Response:\n", response_text)  # Log raw response for debugging

    response_text = open_ai_call(messages)

    cleaned_response = clean_response(response_text)

    try:
        # Check if cleaned_response is already a list (or the expected type)
        if isinstance(cleaned_response, list):
            return cleaned_response
        # If cleaned_response is a string, attempt to decode it as JSON
        elif isinstance(cleaned_response, str):
            return json.loads(cleaned_response)
        else:
            # Handle other unexpected types if necessary
            print("Unexpected type of cleaned_response:", type(cleaned_response))
            return []
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", e)
        print("Cleaned Response:\n", cleaned_response)
        return []

    # return cleaned_response