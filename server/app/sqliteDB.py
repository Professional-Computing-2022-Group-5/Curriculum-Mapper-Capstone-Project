from app import db
from flask_login import login_user, logout_user, current_user
from app.models import UserModel
import re

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

# iniliaze an admin account
def init_admin():
    try:
        # check how many admin accounts are there in the database
        admin = UserModel.query.filter_by(admin=True)
        count = admin.count()
        print('Do you want to initialize an admin account now?', 'current admin account count: ' + str(count))
        print('Please enter "y" or "n": ')
        answer = input()
        if answer == 'y' or answer == 'Y':
            print('Please enter the email address of the admin account: ')
            email = input()
            # validate the email address through regex
            if re.match(r"[^@]+@[^@]+\.[^@]+", email):
                user = UserModel.query.filter_by(email=email).first()
                if user:
                    print('\n'+'****** The email has been used, please try another one ******')
                    init_admin()
                else:
                    print('Please enter the username of the admin account: ')
                    username = input()
                    print('Please enter the password of the admin account: ')
                    print('(the password should be at least 8 characters long including one uppercase letter, one lowercase letter, one number and one special character)')
                    password = input()
                    # validate the password through regex
                    # the password should be at least 8 characters long including one uppercase letter, one lowercase letter, one number and one special character
                    if re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", password):
                        new_user = UserModel(username=username,email=email,admin=True,UnitCoordinator=True)
                        new_user.encode_password(password)
                        db.session.add(new_user)
                        db.session.commit()
                        print('Admin account has been initialized successfully!'+'\n')
                        return
                    else:
                        print('\n'+'****** The password is not valid, please try another one ******')
                        init_admin()
            else:
                print('\n'+'****** The email address is invalid, please try again ******')
                init_admin()
        elif answer == 'n' or answer == 'N':
            print('Admin account has not been initialized!'+'\n')
            return
        else:
            print('\n'+'****** Wrong inputs, please enter either "y" or "n" ******')
            init_admin()     
    except:
        print('Error occurs in sqliteDB.py when initializing admin account! Try again later! '+'\n')

init_admin()

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
