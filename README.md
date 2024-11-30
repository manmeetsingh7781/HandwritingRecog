# README

Created: November 29, 2024 12:11 PM

# Step by Step how to Run this Project

Make sure you have python version ≤ 3.11  installed on your system if not then follow the link below

[https://www.python.org/downloads/](https://www.python.org/downloads/)

Once you have Python Installed run the follow commands in project folder

1. Open Terminal or Command Prompt 

1. Create Python Virtual Env
    - python -m venv .env

1. Activate the Virtual Environment we just created
    - MacOS/Linux - bash/zsh → $ `source .env/bin/activate`
    - Windows - CMD → > `source .env/Scripts/activate.bat`
    - Windows - PowerShell → > `source .env/Scripts/activate.ps1`

1. Install libraries by running this
    - pip install -r requirements.txt

1. Run the app 
    - > `python -m flask run`

# Adjust Script.js file in static/script.js 
* Line 34 the fetch should request a URL that is being hosted by a server, for this app the server is render.com/process_image.
* For local hosts, you must change it to your host address for example: https://127.0.1.0:5000
