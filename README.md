# Curriculum-Mapper-Capstone-Project

This Project is based on MacOS.

## Getting Started

### Start Backend Server

Before running the following commands you must ensure the database is configured (see installing below)

Activate the python virtual environment:

`$ . venv/bin/activate`

To run the app:

`$ flask run`

To stop the app:

`$ ^C`

To exit the virtual environment:

`$ deactivate`

### Start Frontend Server

Before running the following commands you must ensure the React App is configured (see installing below)

To run the React App:

`$ cd client`

`$ npm start`

## Prerequisites

Requires Python3, Flask, venv, SQLite, Neo4j and Node.js

## Installing

### Backend Server

Install Python3: [Click here](https://realpython.com/installing-python/)

Setting up environment:

1. create the virtual environment: `$ cd server`

   * Mac/Linux: `$ python3 -m venv venv`
   * Windows: `> py -3 -m venv venv`
2. activate the environemnt:

   * Mac/Linux: `$ . venv/bin/activate`
   * Windows: `> venv/Scripts/activate`
3. install dependency:
   `$ pip install -r requirements.txt `

Install SQLite: [Click here](https://www.servermania.com/kb/articles/install-sqlite/ "sqlite") 

Build the database: 

`$ flask db init`

`$ flask db migrate`

`$ flask db upgrade`

Install Neo4j: [https://github.com/weiliu2k/accreditation-Explorer]()

 Run the Flask server:

`$ flask run`

### Frontend Server

Install Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Setting up environment:

1. `$ cd client`
2. only for Linux (if you are not a Linux user skip this step)
   * `$ sudo apt install npm -y`
3. `$ npm build`

Run the React App:

`$ npm start`

## Running the tests

To run the unit test:

`$ python -m test`

To run the selenium test:

`$ python -m test`

### Break down into end to end tests

more to come ......

## Deployment

* Running on [LocalHost](https://en.wikipedia.org/wiki/Localhost#:~:text=In%20computer%20networking%2C%20localhost%20is,any%20local%20network%20interface%20hardware.)

## Built With

* [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/) - The web framework used
* VSCode & Git
* React

## Git Log

## Versioning

1.0

## Authors

* A - 123
* B - 123
* C - 123

## License

## Acknowledgments
