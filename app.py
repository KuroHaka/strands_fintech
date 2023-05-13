from flask import Flask
from flask import request
from OCR import *

import base64
import io
from PIL import Image
import json

app = Flask(__name__)

@app.route("/entry_recipet", methods = ['POST'])
def hello_world():
    # path_img = request.get_json()
    img = request.json["image"]
    img_path_tmp = "imatge.jpg"
    decode_base64_to_image(img, img_path_tmp)
    img = img_preprocessing(img_path_tmp)
    return extract_text_preprocess(img), 200

def decode_base64_to_image(base64_data, img_path):
    image_data = base64.b64decode(base64_data)

    # Create a PIL image from the image data
    image = Image.open(io.BytesIO(image_data))
    image.save(img_path)