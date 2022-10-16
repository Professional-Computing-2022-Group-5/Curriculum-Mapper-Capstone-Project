from app import db
from flask_login import login_user, logout_user, current_user
from app.models import UserModel

def register(username,email,password,coordinator):
    try:
        user = UserModel.query.filter_by(email=email).first()
        if user:
            return {'status': 'user_exist'}
        else:
            new_user = UserModel(username=username, email=email, UnitCoordinator=coordinator)
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
            elif user.decode_password(password) and user.admin==True and user.UnitCoordinator==False:
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