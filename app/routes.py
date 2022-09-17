from app import app, neo4jDB
from flask import render_template, request, redirect, url_for

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

# return textbox page
@app.route('/textbox.html')
def textBox_page():
    return render_template('textBox.html')

# query the database(Neo4j) by user input and return json data to frontend
@app.route('/user_query', methods=['POST', 'GET'])
def query_by_user():
    if request.method == 'POST':
        user_input = request.form['user_query']
        data = neo4jDB.search_by_query(user_input)
        return data
    else:
        return redirect(url_for('textBox_page')) 

# create new nodes and new relationships by user
@app.route('/user_create', methods=['POST', 'GET'])
def create_by_user():
    if request.method == 'POST':
        user_input = request.get_json()
        try:
            neo4jDB.create_by_user(user_input)
            return {'status': 'success'}
        except:
            return {'status': 'error'}
    else:
        return redirect(url_for('user_create'))