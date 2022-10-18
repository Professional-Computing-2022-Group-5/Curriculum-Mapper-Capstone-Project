from app import app, neo4jDB, sqliteDB, mail
from app.models import UserModel
from flask import render_template, request, jsonify, Response
from flask_login import current_user
from flask_mail import Message
from config import MAIL_USERNAME,RECIPIENT

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

# return textbox page
@app.route('/textbox.html')
def textBox_page():
    return render_template('textBox.html')
    
# register user
@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        data = request.get_json()

        result = sqliteDB.register(data['username'],data['email'], data['password'])
        return result
    else:
        return {'status': 'request_error'}

# login user
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        # print(data['email'], data['password'])
        result = sqliteDB.login(data['email'], data['password'])
        return result
    else:
        return {'status': 'request_error'}

@app.route('/logout', methods=['POST', 'GET'])
def logout():
    return sqliteDB.logout()

@app.route("/@me")
def get_current_user():
   # if current_user is None:
    if current_user.is_authenticated:
        user = UserModel.query.filter_by(id = current_user.id).first()
        return jsonify({
            "loggedIn": True,
            "id": user.id,
            "username": user.username,
            "isCoordinator": user.UnitCoordinator,
            'isAdmin': user.admin
        })
    else:
        return jsonify({"loggedIn": False, "isCoordinator": False})

   # if not current_user.is_authenticated:
    #    return jsonify({"loggedIn": False, "isCoordinator": False})
    #if  current_user.is_authenticated:
  
        

# query the database(Neo4j) by user input and return json data to frontend
@app.route('/query', methods=['POST', 'GET'])
def query_by_user():
    if request.method == 'POST':
        data = request.get_json()
        result = neo4jDB.search_by_query(data['query'])
        return result
    else:
        return {'status': 'request_error'}

# create new nodes and new relationships by user
@app.route('/user_create', methods=['POST', 'GET'])
def create_by_user():
    if request.method == 'POST':
        data = request.get_json()
        result = neo4jDB.create_by_user(data['inputs'])
        return result
    else:
        return {'status': 'request_error'}

# delete nodes and relationships by user
@app.route('/delete_entity', methods=['POST', 'GET'])
def delete_entity():
    if request.method == 'POST':
        data = request.get_json()
        result = neo4jDB.delete_entity(data['id'], data['type'])
        return result
    else:
        return {'status': 'request_error'}

# create single node by user
@app.route('/create_node', methods=['POST', 'GET'])
def create_node():
    if request.method == 'POST':
        data = request.get_json()
        result = neo4jDB.create_node(data['inputs'])
        return result
    else:
        return {'status': 'request_error'}

# create relationship by selecting nodes and relationships
@app.route('/linkCreate', methods=['POST', 'GET'])
def create_relationship():
    if request.method == 'POST':
        data = request.get_json()
        result = neo4jDB.create_relationship(data['inputs'])
        return result
    else:
        return {'status': 'request_error'}

# update node attributes
@app.route('/nodeUpdate', methods=['POST', 'GET'])
def Update_node():
    if request.method == 'POST':
        data = request.get_json()
        result = neo4jDB.update_node(data['id'], data['inputs'])
        return result
    else:
        return {'status': 'request_error'}

# update relationship attributes
@app.route('/linkUpdate', methods=['POST', 'GET'])
def Update_link():
    if request.method == 'POST':
        data = request.get_json()
        result = neo4jDB.update_relationship(data['id'], data['link'])
        return result
    else:
        return {'status': 'request_error'}

# get all labels and properties of the labels
@app.route('/get_label', methods=['POST', 'GET'])
def get_label():
    if request.method == 'GET':
        data = neo4jDB.get_labels()
        return data
    else:
        return {'status': 'request_error'}

# get all relationship types
@app.route('/get_relationship', methods=['POST', 'GET'])
def get_relationship():
    if request.method == 'GET':
        data = neo4jDB.get_relationships()
        return data
    else:
        return {'status': 'request_error'}

# download a csv file according to the query
@app.route('/csv', methods=['POST', 'GET'])
def csv():
    if request.method == 'POST':
        data = request.get_json()
        csvFile = neo4jDB.downloadCsv(data['query'])
        return Response(
            csvFile,
            mimetype="text/csv",
            headers={"Content-disposition":
                        "attachment; filename=curriculum_mapper.csv"},
            status=200
            )
    else:
        return {'status': 'request_error'}

# upgrade user to unit coordinator
@app.route('/upgrade', methods=['POST', 'GET'])
def upgrade_user():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        result = sqliteDB.upgrade_to_coordinator(data['email'], data['whitelist'])
        return result
    else:
        return {'status': 'request_error'}

# send email to admin
@app.route("/send_mail", methods=['POST', 'GET'])
def send_mail():
    if request.method == 'POST':
        data = request.get_json()
        message = data['message']
        title = 'CITS3200 Notification'
        msg = Message(title, sender=MAIL_USERNAME, recipients=[RECIPIENT])
        msg.body = "Hello Flask message sent from Flask-Mail, this is a test. " + message
        try:
            mail.send(msg)
            return {'status': 'send_success'}
        except:
            return {'status': 'send_failed'}
    else:
        return {'status': 'request_error'}

# add an email address to the whitelist
@app.route("/add_whitelist", methods=['POST', 'GET'])
def add_whitelist():
    if request.method == 'POST':
        data = request.get_json()
        result = sqliteDB.add_whiteList(data['email'])
        return result
    else:
        return {'status': 'request_error'}