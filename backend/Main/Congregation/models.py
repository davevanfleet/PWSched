from flask_mongoengine import Document
from mongoengine import StringField, ListField, ReferenceField, \
    EmbeddedDocumentListField
from marshmallow import fields, Schema
from Main.Shift.models import Shift, ShiftSchema


class Congregation(Document):
    name = StringField(required=True)
    volunteers = ListField(ReferenceField("User"), default=[])
    shifts = ListField(ReferenceField("Shift"), default=[])


class CongregationSchema(Schema):
    id = fields.Str()
    name = fields.Str()
    shifts = fields.List(
        fields.Nested(ShiftSchema)
    )
