from flask import Flask, render_template, request
from mnist import get_image, get_model_initial_prints
import base64
import os

# Define the path to the images folder
IMAGE_FOLDER = "/opt/render/project/images"

# Create the directory if it doesn't exist
os.makedirs(IMAGE_FOLDER, exist_ok=True)

app = Flask(__name__, static_folder='static', static_url_path='/static')

@app.route("/")
def render_home():
    model_initial = get_model_initial_prints().split("\n")
  
    return render_template("index.html", items={
        "title": "Hand Writing Recognition",
        "model_initial": model_initial
    })

@app.get("/test")
def test():
    return "Hello from Flask"


@app.post("/process_image")
def process_image():
    image = request.get_json().get("image")
    if image:
        # removing the header of image
        image_data = base64.b64decode(image.split("base64,")[1])
        # write to file
        path = os.path.join(IMAGE_FOLDER, "image.png")
        with open(path, "wb") as f:
            f.write(image_data)
            f.close()

        return {
            "output": get_image(path)
        }
    return {
        "output": "Error, unable to save image"
    }



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
