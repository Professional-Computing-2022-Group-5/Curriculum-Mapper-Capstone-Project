from flask import Flask
from flask_cors import CORS

# create the application object
app = Flask(__name__)
# enable CORS
CORS(app,supports_credentials=True)

from app import routes, neo4jDB, api