from flask import Blueprint, jsonify, request
from .models import Congregation, CongregationSchema
from IPython import embed

congregations = Blueprint('congregations', __name__)


@congregations.route('/<id>', methods=['GET'])
def get_congregation(id):
    congregation = Congregation.objects().get(id=id)
    congregation_json = CongregationSchema().dump(congregation)
    return congregation_json, 200


@congregations.route('/<id>', methods=['PUT'])
def update_congregation(id):
    body = request.get_json()
    Congregation.objects().get(id=id).update(**body)
    congregation = Congregation.objects().get(id=id)
    congregation_json = CongregationSchema().dump(congregation)
    return congregation_json, 200


@congregations.route('/<id>', methods=['DELETE'])
def delete_congregation(id):
    Congregation.objects().get(id=id).delete()
    return jsonify({"message": "congregation deleted"}), 200


@congregations.route('/', methods=['GET'])
def get_congregations():
    congregations = list(map(lambda cong: cong.name, Congregation.objects()))
    return jsonify(congregations), 200


@congregations.route('/', methods=['POST'])
def create_congregation():
    body = request.get_json()
    congregation = Congregation(name=body['name']).save()
    congregation_json = CongregationSchema().dump(congregation)
    return congregation_json, 200
