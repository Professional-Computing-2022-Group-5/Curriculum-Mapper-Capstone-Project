import os

# Neo4j database configuration
NEO4j_URI = "bolt://localhost:7687"
NEO4j_USER = "neo4j"
NEO4j_PASSWORD = "test"

# Jolt API configuration
JOLT_URL = "http://localhost:7474/db/data/transaction/commit"

# set secret key
SECRET_KEY = os.environ.get('SECRET_KEY') or 'sshh!'

# get absolute path
basedir = os.path.abspath(os.path.dirname(__file__))

# create database
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'sqlite.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False