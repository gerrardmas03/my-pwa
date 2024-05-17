from flask import Flask, jsonify, render_template_string
from flask_cors import CORS
import boto3
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def index():
    return render_template_string('<h1>Torture poets Departmently</h1>')

@app.route('/hello')
def hello_world():
    return jsonify(message='Hey')

@app.route('/aws-example')
def aws_example():
    s3 = boto3.client('s3')
    buckets = s3.list_buckets()
    return jsonify(buckets=buckets['Buckets'])

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port)
