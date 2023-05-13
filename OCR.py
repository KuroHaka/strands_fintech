import cv2
import pytesseract
import numpy as np
import re
#from PIL import Image

def img_preprocessing(img_path):
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    dilated_img = cv2.dilate(img, np.ones((7,7), np.uint8))
    bg_img = cv2.medianBlur(dilated_img, 21)
    diff_img = 255 - cv2.absdiff(img, bg_img)
    norm_img = cv2.normalize(diff_img, None, alpha=0, beta=255,
        norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)
    #im_pil = Image.fromarray(norm_img)
    #im_pil.show()
    return norm_img


def extract_text_preprocess(img):
    text = pytesseract.image_to_string(img)
    products = []
    total = 0.0

    item_pattern  = re.compile("\d+ .+ \d+\.\d{2}")
    units_pattern = re.compile("^\d+")
    price_pattern = re.compile("\d+\.\d{2}$")

    for line in text.split("\n"):
        if not item_pattern.fullmatch(line):
            continue
        print(line)
        str_units = units_pattern.match(line).group(0)
        str_price = price_pattern.search(line).group(0)
        product_name = line[len(str_units)+1:len(line)-len(str_price)-1]
        units = int(str_units)
        price = float(str_price)
        product_instance = {
            "productName":product_name,
            "price":price,
            "currency":"$",
            "users": [],
            "units": units
        }
        products.append(product_instance)
        total += price

    return {"product_list":products, "total_price":total}