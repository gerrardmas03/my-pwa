from flask import Flask, jsonify, render_template_string, request, session
from flask_cors import CORS
import random
import logging

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

symbols = ['紅色', '橙色', '黃色', '綠色', '藍色', '靛色', '紫色', 'A', 'B', 'C', 'D']
scores = {
    '紅色': {5: 300, 4: 75, 3: 30},
    '橙色': {5: 200, 4: 50, 3: 25},
    '黃色': {5: 150, 4: 40, 3: 20},
    '綠色': {5: 125, 4: 30, 3: 15},
    '藍色': {5: 75, 4: 20, 3: 10},
    '靛色': {3: 120},
    'ABCD': {5: 20, 4: 10, 3: 5}
}

@app.route('/')
def index():
    return render_template_string('<h1>Torture poets Departmently</h1>')

@app.route('/hello')
def hello_world():
    return jsonify(message='Hey')

@app.route('/spin', methods=['POST'])
def spin():
    if 'chips' not in session:
        session['chips'] = 600  # Initialize chips if not already in session
    if 'total_score' not in session:
        session['total_score'] = 0  # Initialize total score if not already in session

    session['chips'] -= 10  # Deduct 10 chips for each spin

    if session['chips'] < 0:
        session['chips'] = 0  # Prevent negative chips

    logging.debug(f'Chips after deduction: {session["chips"]}')

    reels = generate_reels()
    score = calculate_score(reels)
    session['total_score'] += score  # Accumulate score

    logging.debug(f'Total score after spin: {session["total_score"]}')

    return jsonify(reels=reels, score=score, total_score=session['total_score'], chips=session['chips'])

def generate_reels():
    return [[random.choice(symbols) for _ in range(5)] for _ in range(3)]

def calculate_score(reels):
    total_score = 0
    for col in range(5):
        symbol_count = {}
        for row in range(3):
            symbol = reels[row][col]
            if symbol in symbol_count:
                symbol_count[symbol] += 1
            else:
                symbol_count[symbol] = 1
        for symbol, count in symbol_count.items():
            if symbol in scores and count in scores[symbol]:
                total_score += scores[symbol][count]
    return total_score

if __name__ == '__main__':
    app.run(debug=True, port=3001)
