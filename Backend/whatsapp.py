from flask import Flask, request
from selenium import webdriver
import time
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


# select browser
print('''
    key      name
     1       Firefox
     2       Chrome
''')
brw = int(input("type browser key :"))

# Use selected browser
if brw == 1:
    driver = webdriver.Firefox()
elif brw == 2:
    driver = webdriver.Chrome()
else:
    print("⚠️ Please select a browser")
    exit()

# Navigate to the web.whatsapp website and scan the QR code

driver.get('https://web.whatsapp.com')
input('Scan the QR code and press Enter to continue...')

# Send a WhatsApp message with image


def send_message_with_image(phone_number, message, image_path):
    # Navigate to the chat window
    driver.get('https://web.whatsapp.com/send?phone=' + phone_number)
    time.sleep(10)

    # Click on the attachment button to upload the image
    attachment_button = driver.find_element_by_xpath("//div[@title='Attach']")
    attachment_button.click()
    image_input = driver.find_element_by_xpath(
        "//input[@accept='image/*,video/*']")
    image_input.send_keys(image_path)
    time.sleep(5)

    # Send the message and the image
    message_input = driver.find_element_by_xpath(
        "//div[@contenteditable='true']")
    message_input.send_keys(message)
    send_button = driver.find_element_by_xpath("//span[@data-testid='send']")
    send_button.click()
    time.sleep(5)

    return {'status': 'success'}

# API endpoint to send a WhatsApp message with image


@app.route('/send_message', methods=['POST','GET'])
def send_message():
    data = request.form
    print(data)
    phone_number = data['phone_number']
    message = data['message']
    image_path = data['image']
    response = send_message_with_image(phone_number, message, image_path)
    return response


if __name__ == '__main__':
    app.run()
