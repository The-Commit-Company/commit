import asyncio
import io
from pyppeteer import launch
import frappe
from frappe.utils.file_manager import save_file
from commit.api.convert_to_webp import convert_to_webp

async def capture_screenshot(url, width=1366, height=800, delay=3):
    browser = await launch(
        headless=True,
        handleSIGINT=False,
        handleSIGTERM=False,
        handleSIGHUP=False
    )
    page = await browser.newPage()
    
    await page.setViewport({"width": width, "height": height})
    await page.goto(url, {"waitUntil": "load"})
    await asyncio.sleep(delay)  # Ensure page loads fully
    
    # ✅ Explicitly return bytes and ensure no file is saved
    screenshot_bytes = await page.screenshot({"fullPage": False, "encoding": "binary"}) 
    
    await browser.close()
    
    return screenshot_bytes  # Return raw image data

def save_preview_screenshot(url, doctype, docname, field):
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        screenshot_bytes = loop.run_until_complete(capture_screenshot(url))
    else:
        screenshot_bytes = loop.run_until_complete(capture_screenshot(url))

    # ✅ Correct way: Wrap bytes in BytesIO
    screenshot_io = io.BytesIO(screenshot_bytes)

    file_doc = frappe.get_doc({
        "doctype": "File",
        "file_name": docname + "_" + "preview.png",
        "attached_to_doctype": doctype,
        "attached_to_name": docname,
        "attached_to_field": field,
        "is_private": 1,
        "content": screenshot_io.getvalue()
    })
    file_doc.save()

    # Convert to WebP
    file_url = convert_to_webp(file_doc.file_url, file_doc)
    # Update the document with the preview file URL
    doc = frappe.get_doc(doctype, docname)
    doc.set(field, file_url)
    doc.save()

    frappe.db.commit()
