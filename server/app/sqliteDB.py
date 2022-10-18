from app import db
from flask_login import login_user, logout_user, current_user
from app.models import UserModel
from flask_mail import Message
from config import MAIL_USERNAME,RECIPIENT

def register(username,email,password):
    try:
        user = UserModel.query.filter_by(email=email).first()
        if user:
            login_user(user)
            return {'status': 'user_exist'}
        else:
            new_user = UserModel(username=username, email=email)
            # check if the email is in the white list
            print("ksdjnsdvhshkv")
            if whiteList(email):
                new_user.UnitCoordinator = True
            # else: 
            #     print("ksdjnsdvhshkv")
            #     send_mail(email)
            #     print("ksdjnsdvhshkv")
   
            new_user.encode_password(password)
            login_user(new_user)
            db.session.add(new_user)
            db.session.commit()
            if new_user.UnitCoordinator:
                return {'status': 'register_WHITELIST_success'}

            
            return {'status': 'register_success'}
    except:
        return {'status': 'register_failed'}

# send email to admin
# @app.route("/send_mail", methods=['POST', 'GET'])
# def send_mail(email):
#     #if request.method == 'POST':
#         print("--------------")
#         #data = email
#         #message = data['message']
#         message = email
#         title = 'CITS3200 Notification'
#         msg = Message(title, sender=MAIL_USERNAME, recipients=[RECIPIENT])
#         msg.body = "Hello Flask message sent from Flask-Mail, this is a test. " + message
#         print(msg)
#         try:
#             mail.send(msg)

#             return {'status': 'send_success'}
#         except:
#             return {'status': 'send_failed'}
#     #else:
#      #   return {'status': 'request_error'}

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
def upgrade_to_coordinator(email, whiteList):
    try:
        user = UserModel.query.filter_by(email=email).first()
        if user:
            user.UnitCoordinator = True
            db.session.commit()
            return {'status': 'upgrade_success'}
        else:
            if whiteList:
                return add_whiteList(email)
    except:
        return {'status': 'upgrade_failed'}

# check if the email is exist in the white list file
def whiteList(email):
    try:
        with open('app/static/whiteList.txt', 'r') as f:
            content = f.readlines()
            print("INWHITELIST")
        for line in content:
            line = line.strip()
            if email == line:
                print("FOUND MATCH")
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