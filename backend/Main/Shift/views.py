from datetime import datetime
from flask import Blueprint, request, jsonify
from .models import Shift, ShiftSchema
from Main.User.models import User
from Main.utils import *
from IPython import embed

shifts = Blueprint('shifts', __name__)


@shifts.route('/<id>', methods=['GET'])
def get_shift(cong_id, id):
    congregation = set_congregation(cong_id)
    shift = set_shift(id)
    if shift.congregation.id != congregation.id:
        return (jsonify({"message":
                         "shift does not belong to this congregation"}),
                401)
    else:
        shift_json = ShiftSchema().dump(shift)
        return shift_json, 200


@shifts.route('/<id>', methods=['PUT'])
def update_shift(cong_id, id):
    congregation = set_congregation(cong_id)
    body = request.get_json()
    Shift.objects().get(id=id).update(**body)
    shift = set_shift(id)
    shift_json = ShiftSchema().dump(shift)
    return shift_json, 200


@shifts.route('/<id>/request', methods=['PUT'])
def request_shift(cong_id, id):
    shift = set_shift(id)
    user_id = request.get_json()["userId"]
    user = set_user(user_id)
    user.requested_shifts.append(shift.to_dbref())
    user.save()
    shift.requested_by.append(user.to_dbref())
    shift.save()
    shift_json = ShiftSchema().dump(shift)
    return shift_json, 200


@shifts.route('/<id>', methods=['DELETE'])
def delete_shift(cong_id, id):
    congregation = set_congregation(cong_id)
    shift = set_shift(id)
    congregation.update(pull__shifts=shift)
    shift.delete()
    return jsonify({"message": "deleted shift"}), 200


@shifts.route('/', methods=['GET'])
def get_shifts(cong_id):
    congregation = set_congregation(cong_id)
    shifts = Shift.objects(congregation=congregation)
    shift_json = ShiftSchema().dump(shifts, many=True)
    return jsonify(shift_json), 200


@shifts.route('/', methods=['POST'])
def create_shift(cong_id):
    congregation = set_congregation(cong_id)
    body = request.get_json()
    shift = Shift(
        location=body["location"],
        start_time=datetime.strptime(f'{body["date"]} {body["startTime"]}',
                                     '%Y-%m-%d %H:%M'),
        end_time=datetime.strptime(f'{body["date"]} {body["endTime"]}',
                                   '%Y-%m-%d %H:%M'),
        congregation=congregation.to_dbref()
    )
    shift.save()
    shift_json = ShiftSchema().dump(shift)
    return shift_json, 200
