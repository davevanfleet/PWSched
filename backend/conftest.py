import os
import pytest
import json
from time import sleep
from datetime import datetime
from flask_mongoengine import MongoEngine
from flask_pymongo import PyMongo
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user
from Main import create_app
from Main.Congregation.models import Congregation
from Main.Shift.models import Shift
from Main.User.models import User


@pytest.fixture(autouse=True)
def app():
    db = MongoEngine()
    crypt = Bcrypt()
    mongo = PyMongo()
    mail = Mail()

    login_manager = LoginManager()
    login_manager.login_view = None
    login_manager.login_message_category = 'info'

    app = create_app({
        "SECRET_KEY": 'testsecret',
        "SECURITY_PASSWORD_SALT": 'testsalt',
        "SECURITY_CSRF_COOKIE": {"key": "XSRF-TOKEN"},
        "SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS": True,
        "WTF_CSRF_TIME_LIMIT": None,
        "WTF_CSRF_CHECK_DEFAULT": False,
        "MONGODB_SETTINGS": {
            'host': 'mongodb://localhost/pwsched-test'
        },
        "MONGO_URI": 'mongodb://localhost/pwsched-test',
        "TESTING": True
    })

    db.init_app(app)
    crypt.init_app(app)
    login_manager.init_app(app)
    mongo.init_app(app)
    mail.init_app(app)

    Shift.drop_collection()
    Congregation.drop_collection()
    User.drop_collection()

    congregation = Congregation(name="English - Willimantic").save()
    shift = Shift(location="UConn",
                  start_time=datetime(2021, 1, 1, 14, 0),
                  end_time=datetime(2021, 1, 1, 15, 30),
                  congregation=congregation.to_dbref()).save()
    hashed_password = crypt.generate_password_hash('password').decode('utf-8')
    User(name="Brother Service Overseer",
         email="fake@fakemail.com",
         password=hashed_password,
         congregation=(Congregation.objects().order_by('-id')
                       .first().to_dbref())).save()

    yield app

    Shift.drop_collection()
    Congregation.drop_collection()
    User.drop_collection()


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
