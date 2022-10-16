# Curriculum-Mapper-Capstone-Project


## Features
- A database for representing an academic program such as the Masters of Information Technology and its associated material for accreditation.

- Interactive visualisation of an academic program and its accreditation material, enabling the user to zoom in and out and to call up specific details such as outcomes mappings.

## Requirements

The main requirements are:
-   Python3
-   Neo4J 
-   NodeJS
-   SQLite
-   Flask 

Python package requirements are listed in `requirements.txt`. NodeJS requirements are listed in `client/package.json`.

Install Python3: [Click here](https://realpython.com/installing-python/)

Install SQLite: [Click here](https://www.servermania.com/kb/articles/install-sqlite/ "sqlite")

Install Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Setup the the Neo4J Graph Database: [https://github.com/weiliu2k/accreditation-Explorer]()


## Getting Started

### Flask Server
Setting up environment:

1. Create the python virtual environment: 

   * Mac/Linux: `$ python3 -m venv venv`
   * Windows: `> py -3 -m venv venv`
2. Activate the environemnt:

   * Mac/Linux: `$ . venv/bin/activate`
   * Windows: `> venv/Scripts/activate`
3. Install packages:
   `$ pip install -r requirements.txt `
 

Build the database: 

`$ flask db init`

`$ flask db migrate`

`$ flask db upgrade`

 Run the Flask app:

`$ flask run`

To stop the app:

`$ ^C`

To exit the virtual environment:

`$ deactivate`

### React Client

Run the React App:

`$ cd client`

`$ sudo apt install npm -y` (only for Linux - if you are not a Linux user skip this step)

`$ npm build`

`$ npm start`

## Running the tests

To run the unit test:

`$ python -m test`

To run the selenium test:

`$ python -m test`

## Deployment

* Running on [LocalHost](https://en.wikipedia.org/wiki/Localhost#:~:text=In%20computer%20networking%2C%20localhost%20is,any%20local%20network%20interface%20hardware.)

## Built With

Linux, MacOS, VScode, Python3 3.6+, Flask, Github, React

## Git Log

## Versioning

1.0

## Contributors

|Name|Student Number|
|:--|:--|
|Amy Burnett|22689376|
|Grace Bowen|22706512|
|Jackie Shan|22710446|
|Richard Li|22602567|
|Michael Semaan|22710114|
|Leo Burtenshaw|21595359|

