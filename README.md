
You need to run the client and the server on different terminals 
These were just all the commands I used on my mac

------------------SERVER-----------------
Do this in the main directory NOT in the server or client directories
to create the virtual environment in ./combined-front&back
        $ python3 -m venv venv

open venv
        $ source venv/bin/activate

install redis:
        $ brew install redis 
        $ redis-server
        in a new terminal: $ redis-cli
        * from here it should be all good

Change to the server directory to run this
Install the requirements
        $ pip install -r ./requirements.txt 
        You may need to upgrade pip first for this to work

To run the server: 
        $ python3 app.py


------------------CLIENT-----------------

Make sure that Node.js is installed. To install Node.js download from the link below and follow the prompts:
        https://nodejs.org/en/download/ 

    Downloading & installing Node.js will install npm & npx, which will be needed to build the react app.

Install yarn
        $ npm install --global yarn

Don't think you need to create the react app, so just try running the npm start in the client directory. I just included the node modules since it wasn't working for Jackie and we can figure it out later

To create the react_app
        $ npx create-react-app client
        $ cd client
        $ npm start

Same with these i don't think you need to run them, but you might have to 
What i added to the react app
        $ yarn add react-router-dom
        $ yarn add react-force-graph-2d
        $ yarn add axios

Then when running the client, you can access it on