"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

    @api.route('/users', methods=['GET'])
def get_users():
   users = User.query.all()
   data = []

   for user in users:
       data.append(user.serialize())

   print(data)
   return jsonify(data), 200









@api.route('/signup', methods=['POST'])
def signup():
    
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
            return jsonify({"message": "Error, email y contraseña requeridos"}), 401
    

    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({"El usuario ya existe"}), 402

    user = User(email = email, password = password, is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({"Usuario creado con éxito"}), 200





@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Error: email y contraseña requeridos"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return("El usuario no es correcto"), 400


    token = create_access_token(identity=user.id)
    return jsonify({"token": token}), 200





@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"message": "No autorizado"}), 401

    data = user.serialize()
    return jsonify(data), 200



@api.route('/logout', methods=['POST'])
@jwt_required
def logout():
    
    return jsonify({"Sesión cerrada"}), 200