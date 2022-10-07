from flask import Flask
from flask_cors import CORS
from flask import Flask
from flask_session import Session
from flask_cors import CORS
from config import ApplicationConfig
from flask_bcrypt import Bcrypt

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#Create an Application
app = Flask (__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
# enable CORS
CORS(app, supports_credentials = True)
server_session = Session(app)
db.init_app(app)

with app.app_context(): 
    db.create_all()


from app import routes, models