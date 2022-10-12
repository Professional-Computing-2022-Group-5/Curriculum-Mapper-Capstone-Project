from flask import Flask, request, jsonify, session
from app import app,  bcrypt, server_session
from app.models import User, db
from flask_bcrypt import Bcrypt

# If logged in, return information about the current user
@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"loggedIn": False, "isCoordinator": False})
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "loggedIn": True,
        "id": user.id,
        "email": user.email,
        "isCoordinator": user.isUnitCoordinator
    }) 

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

@app.route("/linkDelete", methods=["POST"])
def delete_link():
    link_Data = request.json["id"]

    print("\n\n\n--------request ID -------------\n\n\n")
    print(link_Data)
    response = "RECEIVED THE DELETE LINK COMMAND FOR NODE:"+ str(link_Data)

    return jsonify(response)

@app.route("/linkUpdate", methods=["POST"])
def update_link():
    link_Source = request.json["source"]
    link_Target = request.json["target"]
    link_Id = request.json["id"]

    print("\n\n\n--------request ID -------------\n\n\n")

    print(link_Id)
    response = "RECEIVED THE UPDATE LINK COMMAND FOR LINK:"+ str(link_Id)

    return jsonify(response)

@app.route("/linkCreate", methods=["POST"])
def create_link():
    source_data = request.json["source"]
    target_data = request.json["target"]

    print("\n\n\n--------request  -------------\n\n\n")
    print(source_data)
    print(target_data)
    response = "RECEIVED THE CREATE LINK COMMAND FOR SOURCE:"+ str(source_data["unitCode"]) + "TARGET:" + str(target_data["unitCode"])

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)