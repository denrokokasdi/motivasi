import requests
import time
import pywhatkit
import pyautogui
import warnings
import urllib3
import pyperclip
import os
import win32clipboard
from PIL import Image
import io
import os
from pathlib import Path


# Suppress SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Supabase project details
SUPABASE_URL = "https://vwiyafuunhttzwnzqmlc.supabase.co"  # Replace with your actual Supabase URL
SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aXlhZnV1bmh0dHp3bnpxbWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMDkyMDAsImV4cCI6MjA1MDc4NTIwMH0.nq8QpnLFswa9rhqEBG9vm6HH7hAMyyv5IyehSAZEqwU"  # Replace with your Supabase API key
TABLE_NAME = "database1"  # Replace with your table name

# Set headers for Supabase API requests
headers = {
    "apikey": SUPABASE_API_KEY,
    "Authorization": f"Bearer {SUPABASE_API_KEY}",
    "Content-Type": "application/json"
}

def format_details(details):
    """Format the JSON details into a user-friendly string with capitalized keys."""
    return "\n".join(f"*{key.capitalize()}*: {value}" for key, value in details.items())

def send_whatsapp(phone_number, details, id):
    """Send a WhatsApp message using pywhatkit."""
    try:
        phone_number = f"+6{phone_number}"  # Add country code
        formatted_details = format_details(details)
        message = f"Hi💕! Thank you for your purchase!\n\nKami telah menerima tempahan anda order number dengan details tersebut😀😘:\n\n{formatted_details}"
        pywhatkit.sendwhatmsg_instantly(phone_number, message)
        time.sleep(30)  # Adjust this if your system/browser is slower
        pyautogui.press("enter")

        time.sleep(2)
        img1 = Path.home() / 'Downloads' / 'image1.jpg'
        copy_paste_image_to_clipboard(img1)
        time.sleep(2)
        pyautogui.press("enter")

        time.sleep(5)
        message2 = f"Untuk Tracking Number, kami akan update secepat mungkin🌟 atau boleh pergi ke portal kami di https://www.aiziramalaysia.com/TrackingNumber untuk menyemak tracking number anda 📦 (Available selepas beberapa jam)"
        pyautogui.write(message2)
        time.sleep(1)
        pyautogui.press("enter")

        # Check if the message was sent successfully
        time.sleep(2)
        pyperclip.copy('')
        time.sleep(1)
        pyautogui.write("success")
        time.sleep(1)
        pyautogui.hotkey('ctrl', 'a')
        time.sleep(1)
        pyautogui.hotkey('ctrl', 'c')
        time.sleep(1)
        update_whatsapp_status(id)
        if 'success' in pyperclip.paste():
            print("Successfully sent WhatsApp message")
            update_whatsapp_sent_status(id, True)
        else:
            print("Message sending failed")
            update_whatsapp_sent_status(id, False)
        
        # Kill all Chrome processes
        #os.system("taskkill /f /im chrome.exe")  # Windows command to kill Chrome
        print("All Chrome processes killed!")
        time.sleep(1)
        pyperclip.copy('')
    except Exception as e:
        print(f"Error sending WhatsApp message: {e}")

def fetch_all_data():
    """Fetch all records where whatsapp == False."""
    try:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?whatsapp=eq.false", 
            headers=headers, 
            verify=False
        )
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        
        for each_data in data:
            try:
                whatsapp_notify = each_data['whatsapp']
                whatsapp_sent = each_data['whatsapp_sent']
                customer_phone = each_data["json"]['phone']
                details_customer = each_data["json"]
                id_customer = each_data["id"]
                
                if not whatsapp_notify and whatsapp_sent == False:
                    # Send WhatsApp message
                    send_whatsapp(customer_phone, details_customer, id_customer)
                    
            except KeyError as e:
                print(f"Key error processing data: {e}")
            except Exception as e:
                print(f"Unexpected error processing record: {e}")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from Supabase: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

def update_whatsapp_status(id_customer):
    """Update the 'whatsapp' status to True for a specific record."""
    try:
        update_data = {
            "whatsapp": True
        }
        response = requests.patch(
            f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?id=eq.{id_customer}",
            headers=headers,
            json=update_data,
            verify=False  # Disable SSL verification
        )
        return response
    except requests.exceptions.RequestException as e:
        print(f"Error updating WhatsApp status: {e}")
        return None

def update_whatsapp_sent_status(id_customer, result):
    """Update the 'whatsapp' status to True for a specific record."""
    try:
        update_data = {
            "whatsapp_sent": result
        }
        response = requests.patch(
            f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?id=eq.{id_customer}",
            headers=headers,
            json=update_data,
            verify=False  # Disable SSL verification
        )
        return response
    except requests.exceptions.RequestException as e:
        print(f"Error updating WhatsApp status: {e}")
        return None


def copy_paste_image_to_clipboard(image_path):
    if not os.path.exists(image_path):
        print(f"Error: The file '{image_path}' does not exist.")
        return

    try:
        image = Image.open(image_path)
        output = io.BytesIO()
        image.convert("RGB").save(output, "BMP")
        data = output.getvalue()[14:]
        output.close()

        win32clipboard.OpenClipboard()
        win32clipboard.EmptyClipboard()
        win32clipboard.SetClipboardData(win32clipboard.CF_DIB, data)
        win32clipboard.CloseClipboard()
        print("Image copied to clipboard successfully.")
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(1)
    except Exception as e:
        print(f"Error: {e}")

# Main function to monitor the database
if __name__ == "__main__":
    while True:
        print("Monitoring database for new records...")
        fetch_all_data()  # Fetch and process data
        time.sleep(0.5)  # Wait for a certain amount of time before checking again
