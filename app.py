from flask import Flask, render_template, request
import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), "models"))
from mnist import get_image, get_model_initial_prints
import base64


app = Flask(__name__)

@app.route("/")
def render_home():
    model_initial = get_model_initial_prints().split("\n")
  
    return render_template("index.html", items={
        "title": "Hand Writing Recognition",
        "model_initial": model_initial
    })

@app.post("/process_image")
def process_image():
    image = request.get_json().get("image")
    if image:
        # removing the header of image
        image_data = base64.b64decode(image.split("base64,")[1])
        # write to file
        path = "./images/image.png"
        with open(path, "wb") as f:
            f.write(image_data)
            f.close()

        return {
            "output": get_image(path.split("/")[2])
        }
    return {
        "output": "Error, unable to save image"
    }



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
