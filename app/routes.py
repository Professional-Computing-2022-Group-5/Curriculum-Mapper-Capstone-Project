from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
    index = True
    return render_template('index.html', index = index)

@app.route('/query')
def query():
    query = True
    return render_template('query.html', query = query)


@app.route('/report_gen')
def report_gen():
    report_gen = True
    return render_template('report_gen.html',  report_gen = report_gen)
