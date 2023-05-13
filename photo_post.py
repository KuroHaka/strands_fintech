import base64
import io
from PIL import Image
import json

def encode_image_to_base64(image_path):
    # Read the image file
    with open(image_path, 'rb') as file:
        image_data = file.read()

    # Encode the image data as base64
    encoded_image = base64.b64encode(image_data).decode('utf-8')

    return encoded_image

def decode_base64_to_image(base64_data):
    # Decode the base64 data
    image_data = base64.b64decode(base64_data)

    # Create a PIL image from the image data
    image = Image.open(io.BytesIO(image_data))

    return image

# Encode an image to base64
image_path = 'data//factura_saltbae.jpg'
encoded_image = encode_image_to_base64(image_path)

# Create the JSON payload
payload = {
    'image': encoded_image
}

# Convert the payload to JSON
json_payload = json.dumps(payload)

with open('data.json', 'w') as f:
    json.dump(payload, f)

# Print the base64-encoded image
print(encoded_image)

# Decode the base64 data back to the original image
decoded_image = decode_base64_to_image(encoded_image)

# Display the image
decoded_image.show()
