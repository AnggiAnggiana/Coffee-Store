#Install midtransclient(https://github.com/Midtrans/midtrans-python-client) PIP package
#pip install midtransclient

#SAMPLE REQUEST START HERE
import random
from flask import Flask, request, jsonify
import midtransclient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/create_transaction', methods=['POST'])
def create_transaction():
    # Data sent from Javascript(app.js)
    data = request.json
    
    # Generate random order_id
    order_id = random.randint(1000, 9999)

    # Create Snap API instance
    snap = midtransclient.Snap(
        # Set to true if you want Production Environment (accept real transaction).
        is_production=False,
        server_key='YOUR_SECRET_ID_KEY'
    )
    
    # Build API parameter
    param = {
        "transaction_details" : {
            "order_id": order_id,
            "gross_amount": data['totalPrice']
        },
        "credit_card" : {
            "secure" : True
        },
        "item_details" : data['items'],
        "customer_details" : {
            "first_name": data['name'],
            "phone": data['phone'],
            "note": data['note'],
        }
    }
    
    # print(param)

    transaction = snap.create_transaction(param)

    transaction_token = transaction['token']
    
    return jsonify({'transaction_token': transaction_token})

if __name__ == '__main__':
    app.run(debug=True)