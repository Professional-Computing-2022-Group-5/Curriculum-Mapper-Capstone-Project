from flask import Flask, request, jsonify, session
from models import db, User
from flask_session import Session
from flask_cors import CORS
from config import ApplicationConfig
from flask_bcrypt import Bcrypt

#Create an Application
app = Flask (__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials = True)
server_session = Session(app)
db.init_app(app)

with app.app_context(): 
    db.create_all()

'''# If logged in, return information about the current user
@app.route("/",methods=["GET"] )
def index():
    return jsonify("Hello World!")'''


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/query", methods=["POST"])
def execute_query():
    query = request.json["query"]

    response = "THE RECEIVED QUERY IS:"+ query
    returnData = {"links":[
                    {"property":{"deleted":False,"id":241,"type":"relationship"},"source":183,"target":292},
                    {"property":{"deleted":False,"id":238,"type":"relationship"},"source":183,"target":289},
                    {"property":{"deleted":False,"id":240,"type":"relationship"},"source":183,"target":291}],
                "nodes":
                    [{"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":False,"id":183,"programmingBased":True,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":False,"id":183,"programmingBased":True,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"deleted":False,"describe":"present and defend opinions by making judgments about information. validity of ideas, or quality of work based on a set of criteria.","id":292,"level":"IV.Analyzing","outcome":"(5) communicate effectively with stakeholders.","outcomeId":"5","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":False,"id":183,"programmingBased":True,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":False,"id":183,"programmingBased":True,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"deleted":False,"describe":"Exhibit memory of previously learned material by recalling facts, terms,basic concepts, and answers.","id":289,"level":"I.Remembering","outcome":"(2) select appropriate data visualisation options; ","outcomeId":"2","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":False,"id":183,"programmingBased":True,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"availabilities":"Semester 2 2021, Crawley (Face to face); Semester 2 2021, Crawley (Online-TT) [Contact hours: n/a];","credit":6,"deleted":False,"id":183,"programmingBased":True,"title":"Computational Data Analysis","type":"node","unitCode":"CITS4009"},
                    {"deleted":False,"describe":"Present and defend opinions by making judgments about information, validity of ideas, or quality of work based on a set of criteria.","id":291,"level":"V. Evaluating","outcome":"(4) critically assess the outcomes of a data analysis; ","outcomeId":"4","type":"node","unitCode":"CITS4009"}]
                }

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

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    response = email + password


    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()



    session["user_id"] = new_user.id

    

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

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

if __name__ == '__main__':
    app.run(debug=True)


'''
User inputs and what fdunction their doing

{User inputs --> JSON} --> 


https:lovalhost:5000/query

https:lovalhost:5000/node
type: delete or 
https:lovalhost:5000/linkUpdate
https:lovalhost:5000/nodeDelete

'''