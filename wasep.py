import requests
import time
import pywhatkit
import pyautogui
import warnings
import urllib3
import pyperclip

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
    """Format the JSON details into a user-friendly string."""
    return "\n".join(f"{key}: {value}" for key, value in details.items())

def send_whatsapp(phone_number, details, id):
    """Send a WhatsApp message using pywhatkit."""
    try:
        phone_number = f"+6{phone_number}"  # Add country code
        formatted_details = format_details(details)
        message = f"Kami telah menerima tempahan anda order number dengan details tersebut:\n{formatted_details}"
        
        pywhatkit.sendwhatmsg_instantly(phone_number, message)
        time.sleep(30)  # Adjust this if your system/browser is slower
        pyautogui.press("enter")
        
        # Check if the message was sent successfully
        time.sleep(1)
        pyperclip.copy('')
        time.sleep(1)
        pyautogui.write("success")
        time.sleep(1)
        pyautogui.hotkey('ctrl', 'a')
        time.sleep(1)
        pyautogui.hotkey('ctrl', 'c')
        time.sleep(1)
        if 'success' in pyperclip.paste():
            print("Successfully sent WhatsApp message")
            update_whatsapp_sent_status(id)
        else:
            print("Message sending failed")
        
        # Close the WhatsApp tab
        pyautogui.hotkey('ctrl', 'w')
        time.sleep(1)
        print("Window closed!")
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
                
                if not whatsapp_notify:
                    # Send WhatsApp message
                    send_whatsapp(customer_phone, details_customer, id_customer)

            except KeyError as e:
                print(f"Key error processing data: {e}")
            except Exception as e:
                print(f"Unexpected error processing record: {e}")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from Supabase: {e}")
    except Exception as e:
        

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

def update_whatsapp_sent_status(id_customer):
    """Update the 'whatsapp' status to True for a specific record."""
    try:
        update_data = {
            "whatsapp_sent": True
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

# Main function to monitor the database
if __name__ == "__main__":
    while True:
        print("Monitoring database for new records...")
        fetch_all_data()  # Fetch and process data
        time.sleep(5)  # Wait for a certain amount of time before checking again
