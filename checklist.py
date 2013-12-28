import os
from flask import Flask, make_response

app = Flask(__name__, template_folder=os.path.dirname(os.path.abspath(__file__)))
app.config['DEBUG'] = True


@app.route('/')
def hello():
    return make_response(open('index.html').read())


@app.route('/list/<list_id>')
def list(list_id):
    # let angular handle routing and firebase
    return make_response(open('index.html').read())

