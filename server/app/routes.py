
from app import app, neo4jDB, sqliteDB, mail
from app.models import UserModel
from flask import Flask, render_template, request, jsonify, Response
from flask_login import current_user
from flask_mail import Message
from config import MAIL_USERNAME,RECIPIENT

# If logged in, return information about the current user
@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")


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
        #user = UserModel.query.filter_by(id = current_user.id).first()
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
  


@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    isCoordinator = request.json["isCoordinator"]
    print("---------------EMAIL:")
    print(email)
    print("---------------PW:")
    print(password)
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, isUnitCoordinator=isCoordinator)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "isCoordinator": new_user.isUnitCoordinator
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    print("---------------ELOGIN MAIL:")
    print(email)
    print("---------------LOGIN PW:")
    print(password)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route("/query", methods=["POST"])
def execute_query():
    query = request.json["query"]

    response = "THE RECEIVED QUERY IS:"+ query
    returnData = {'nodes': [{'availabilities': 'Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-RE) [Contact hours: n/a];', 'unitCode': 'CITS5206', 'programmingBased': False, 'title': 'Professional Computing', 'credit': 6, 'id': 9, 'type': 'node', 'deleted': False, 'labels': ['Unit'], 'displayName': 'Professional Computing', 'color': 'brown'}, {'id': 318, 'type': 'node', 'unit': 'CITS5206 Professional Computing', 'activity': 'Lectures', 'unitCode': 'CITS5206', 'labels': ['Activity'], 'displayName': 'Lectures', 'color': 'grey'}, {'id': 439, 'type': 'node', 'area': 'Systems development', 'labels': ['End', 'CBoK'], 'displayName': 'Systems development', 'color': 'orange'}, {'id': 426, 'type': 'node', 'area': 'Abstraction', 'labels': ['End', 'CBoK'], 'displayName': 'Abstraction', 'color': 'orange'}, {'id': 429, 'type': 'node', 'area': 'Professional expectations', 'labels': ['End', 'CBoK'], 'displayName': 'Professional expectations', 'color': 'orange'}, {'id': 432, 'type': 'node', 'area': 'Societal issues / legal issues / privacy', 'labels': ['End', 'CBoK'], 'displayName': 'Societal issues / legal issues / privacy', 'color': 'orange'}, {'id': 428, 'type': 'node', 'area': 'Ethics', 'labels': ['End', 'CBoK'], 'displayName': 'Ethics', 'color': 'orange'}, {'id': 440, 'type': 'node', 'area': 'Systems acquisition', 'labels': ['End', 'CBoK'], 'displayName': 'Systems acquisition', 'color': 'orange'}, {'id': 431, 'type': 'node', 'area': 'Interpersonal communications', 'labels': ['End', 'CBoK'], 'displayName': 'Interpersonal communications', 'color': 'orange'}, {'id': 433, 'type': 'node', 'area': 'Understanding the ICT profession', 'labels': ['End', 'CBoK'], 'displayName': 'Understanding the ICT profession', 'color': 'orange'}, {'id': 427, 'type': 'node', 'area': 'Design', 'labels': ['End', 'CBoK'], 'displayName': 'Design', 'color': 'orange'}, {'id': 430, 'type': 'node', 'area': 'Teamwork concepts and issues', 'labels': ['End', 'CBoK'], 'displayName': 'Teamwork concepts and issues', 'color': 'orange'}, {'id': 320, 'type': 'node', 'unit': 'CITS5206 Professional Computing', 'activity': 'Group Project', 'unitCode': 'CITS5206', 'labels': ['Activity'], 'displayName': 'Group Project', 'color': 'grey'}, {'id': 441, 'type': 'node', 'area': 'testsetset 0000', 'vx': 0.6904194497973651, 'vy': -0.07357504809665089, 'color': 'orange', 'displayName': 'testsetset 0000', 'index': 9, 'labels': ['End', 'CBoK'], 'deleted': False, '__indexColor': '#38000a', 'x': 886.8554580691609, 'y': -122.89935839084742}, {'id': 436, 'type': 'node', 'area': 'Networking', 'labels': ['End', 'CBoK'], 'displayName': 'Networking', 'color': 'orange'}, {'id': 437, 'type': 'node', 'area': 'Programming', 'labels': ['End', 'CBoK'], 'displayName': 'Programming', 'color': 'orange'}, {'id': 438, 'type': 'node', 'area': 'Human factors', 'labels': ['End', 'CBoK'], 'displayName': 'Human factors', 'color': 'orange'}, {'id': 435, 'type': 'node', 'area': 'Data & information management', 'labels': ['End', 'CBoK'], 'displayName': 'Data & information management', 'color': 'orange'}, {'id': 434, 'type': 'node', 'area': 'Hardware & software fundamentals', 'labels': ['End', 'CBoK'], 'displayName': 'Hardware & software fundamentals', 'color': 'orange'}, {'id': 319, 'type': 'node', 'unit': 'CITS5206 Professional Computing', 'activity': 'Individual Essay', 'unitCode': 'CITS5206', 'labels': ['Activity'], 'displayName': 'Individual Essay', 'color': 'grey'}], 'links': [{'property': {'id': 354, 'type': 'relationship', 'deleted': False}, 'source': 318, 'target': 9, 'labels': 'ACTIVITY_OF', 'displayName': 'ACTIVITY_OF'}, {'property': {'taxonomy': 'X', 'id': 1109, 'type': 'relationship', 'deleted': False}, 'source': 439, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1101, 'type': 'relationship', 'deleted': False}, 'source': 426, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1104, 'type': 'relationship', 'deleted': False}, 'source': 429, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1107, 'type': 'relationship', 'deleted': False}, 'source': 432, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1103, 'type': 'relationship', 'deleted': False}, 'source': 428, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1110, 'type': 'relationship', 'deleted': False}, 'source': 440, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1106, 'type': 'relationship', 'deleted': False}, 'source': 431, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1108, 'type': 'relationship', 'deleted': False}, 'source': 433, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1102, 'type': 'relationship', 'deleted': False}, 'source': 427, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': 'X', 'id': 1105, 'type': 'relationship', 'deleted': False}, 'source': 430, 'target': 318, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'id': 356, 'type': 'relationship', 'deleted': False}, 'source': 320, 'target': 9, 'labels': 'ACTIVITY_OF', 'displayName': 'ACTIVITY_OF'}, {'property': {'taxonomy': '4', 'id': 1122, 'type': 'relationship', 'deleted': False}, 'source': 431, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '3', 'id': 1129, 'type': 'relationship', 'deleted': False}, 'source': 439, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '3', 'id': 1131, 'type': 'relationship', 'deleted': False}, 'source': 441, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '3', 'id': 1130, 'type': 'relationship', 'deleted': False}, 'source': 440, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '3', 'id': 1126, 'type': 'relationship', 'deleted': False}, 'source': 436, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1127, 'type': 'relationship', 'deleted': False}, 'source': 437, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '3', 'id': 1128, 'type': 'relationship', 'deleted': False}, 'source': 438, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1123, 'type': 'relationship', 'deleted': False}, 'source': 433, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '3', 'id': 1125, 'type': 'relationship', 'deleted': False}, 'source': 435, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '3', 'id': 1124, 'type': 'relationship', 'deleted': False}, 'source': 434, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1117, 'type': 'relationship', 'deleted': False}, 'source': 426, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1119, 'type': 'relationship', 'deleted': False}, 'source': 428, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1121, 'type': 'relationship', 'deleted': False}, 'source': 430, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1118, 'type': 'relationship', 'deleted': False}, 'source': 427, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1120, 'type': 'relationship', 'deleted': False}, 'source': 429, 'target': 320, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'id': 355, 'type': 'relationship', 'deleted': False}, 'source': 319, 'target': 9, 'labels': 'ACTIVITY_OF', 'displayName': 'ACTIVITY_OF'}, {'property': {'taxonomy': '4', 'id': 1115, 'type': 'relationship', 'deleted': False}, 'source': 432, 'target': 319, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1116, 'type': 'relationship', 'deleted': False}, 'source': 433, 'target': 319, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1113, 'type': 'relationship', 'deleted': False}, 'source': 428, 'target': 319, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}, {'property': {'taxonomy': '4', 'id': 1114, 'type': 'relationship', 'deleted': False}, 'source': 429, 'target': 319, 'labels': 'MAPS_TO', 'displayName': 'MAPS_TO'}]}

    return jsonify(returnData)

@app.route("/nodeUpdate", methods=["POST"])
def update_node():
    node_Data = request.json["inputs"]

    print("\n\n\n--------request ID -------------\n\n\n")
    print(node_Data["id"])
    response = "RECEIVED THE UPDATE NODE COMMAND FOR NODE:"+ str(node_Data["id"])

    return jsonify(response)

@app.route("/nodeDelete", methods=["POST"])
def delete_node():
    node_Data = request.json["id"]

    print("\n\n\n--------request ID -------------\n\n\n")
    print(node_Data)
    response = "RECEIVED THE DELETE NODE COMMAND FOR NODE:"+ str(node_Data)

    return jsonify(response)

@app.route("/nodeCreate", methods=["POST"])
def create_node():
    new_Data = request.json["data"]

    print("\n\n\n--------request  -------------\n\n\n")
    print(new_Data)
    response = "RECEIVED THE CREATE NODE COMMAND FOR NODE:"+ str(new_Data["unitCode"])

    return jsonify(response)

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