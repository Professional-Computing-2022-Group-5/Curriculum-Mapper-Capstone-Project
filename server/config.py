
import os
import redis
basedir = os.path.abspath(os.path.dirname(__file__))

class ApplicationConfig:

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'curriculum_mapper'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    # Use a secret key signer
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")