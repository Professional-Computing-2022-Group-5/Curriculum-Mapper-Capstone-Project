from app import db
from flask_login import login_user, logout_user, current_user
from app.models import UserModel

def register(username,email,password):
    try:
        user = UserModel.query.filter_by(email=email).first()
        if user:
            return {'status': 'user_exist'}
        else:
            new_user = UserModel(username=username, email=email)
            # check if the email is in the white list
            if whiteList(email):
                new_user.UnitCoordinator = True
            new_user.encode_password(password)
            db.session.add(new_user)
            db.session.commit()
            return {'status': 'register_success'}
    except:
        return {'status': 'register_failed'}

def login(email, password):
    try:
        user = UserModel.query.filter_by(email=email).first()
        if user:
            if user.decode_password(password) and user.admin==False and user.UnitCoordinator==False:
                login_user(user)
                return {'status': 'basic_user'}
            elif user.decode_password(password) and user.admin==True and user.UnitCoordinator==True:
                login_user(user)
                return {'status': 'admin_user'}
            elif user.decode_password(password) and user.admin==False and user.UnitCoordinator==True:
                login_user(user)
                return {'status': 'coordinator_user'}
            else:
                return {'status': 'password_error'}
        else:
            return {'status': 'user_not_exist'}
    except:
        return {'status': 'login_error'}

def logout():
    try:
        logout_user()
        return {'status': 'lougout_success'}
    except:
        return {'status': 'logout_failed'}

# upgrade an existing user to unit coordinator
def upgrade_to_coordinator(email):
    try:
        user = UserModel.query.filter_by(email=email).first()
        if user:
            user.UnitCoordinator = True
            db.session.commit()
            return {'status': 'upgrade_success'}
        else:
            return {'status': 'user_not_exist'}
    except:
        return {'status': 'upgrade_failed'}

# check if the email is exist in the white list file
def whiteList(email):
    try:
        with open('app/static/whiteList.txt', 'r') as f:
            content = f.readlines()
        for line in content:
            line = line.strip()
            if email == line:
                return True
        return False
    except:
        return {'status': 'file_not_found'}

# add the email to the white list file
def add_whiteList(email):
    try:
        if whiteList(email):
            return {'status': 'email_exist'}
        else:
            with open('app/static/whiteList.txt', 'a') as f:
                f.write(email + '\n')
            return {'status': 'add_success'}
    except:
        return {'status': 'file_not_found'}