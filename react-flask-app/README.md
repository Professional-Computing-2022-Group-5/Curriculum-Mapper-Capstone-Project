# How to run the React App 

1. Make sure that Node.js is installed. To install Node.js download from the link below and follow the prompts:
        https://nodejs.org/en/download/ 

    Downloading & installing Node.js will install npm & npx, which will be needed to build the react app.

2. Install yarn
### `npm install --global yarn`

3. Install all the dependencies (e.g. react-force-graph-2d)
### `npm install`

4. Run the react app
### `npm start`

Now the app will be running on: http://localhost:3000/

# ----- To run the Flask Server at the same time ----
Open a new terminal and do the following:

1. Make sure pip is installed: 
 <br> &nbsp;&nbsp;  <code> MacOS & Linux: $ python3 -m pip install --user --upgrade pip </code>  
 <br> &nbsp;&nbsp;  <code> Microsoft: $ py -m pip install --upgrade pip </code> <br><br>
 
2. Make sure virtualenv is installed:
 <br> &nbsp;&nbsp;  <code> MacOS & Linux: $ python3 -m pip install --user virtualenv </code>  
 <br> &nbsp;&nbsp;  <code> Microsoft: $ py -m pip install --user virtualenv </code> <br><br>
 
3. Create a virtual environment:
 <br> &nbsp;&nbsp;  <code> MacOS & Linux: $ python3 -m venv venv </code>  
 <br> &nbsp;&nbsp;  <code> Microsoft: $ py -m venv venv </code> <br><br>
 
4. Activate your virtual environment: 
 <br> &nbsp;&nbsp;  <code> MacOS & Linux: $ source venv/bin/activate </code>  
 <br> &nbsp;&nbsp;  <code> Microsoft: $ venv\Scripts\activate </code> <br><br>

5. Run our website through Flask: 
<br> &nbsp;&nbsp; <code> $ flask run </code> <br>
  Now running on http://127.0.0.1:5000/ (Press CTRL+C to quit), but you don't necessarily need to use it as it is just the server as doesn't have anything to display

6. Deactivate the virtual environment when finished
 <br> &nbsp;&nbsp; <code> $ deactivate </code> 


