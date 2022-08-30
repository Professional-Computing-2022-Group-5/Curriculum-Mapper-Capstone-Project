from app import app
import os
from flask import render_template, redirect, url_for, request
from flask_login import current_user, login_user, logout_user
from app import app, db
from app.models import User
from datetime import date
from app.forms import LoginForm, RegistrationForm
import json

@app.route('/')
@app.route('/index')
def index():
    index = True
    return render_template('index.html', index = index)

@app.route('/query')
def query():
    query = True
    return render_template('query.html', title = 'Query', query = query)

@app.route('/report_gen')
def report_gen():
    report_gen = True
    return render_template('report_gen.html', title = 'Report Generation', report_gen = report_gen)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = RegistrationForm()

    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        
        return redirect(url_for('login'))

    return render_template('register.html', title='Register as a Program Chair', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for('index'))     
    return render_template('login.html', title='Login as Program Chair', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))