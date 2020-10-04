from flask_mongoengine import Document
from mongoengine import StringField, DateTimeField, ListField, \
    ReferenceField, EmbeddedDocument
from marshmallow import fields, Schema


class Shift(Document):
    location = StringField(required=True)
    start_time = DateTimeField(required=True)
    end_time = DateTimeField(required=True)
    congregation = ReferenceField("Congregation")
    volunteers = ListField(ReferenceField("User"), max_length=2, default=[])
    requested_by = ListField(ReferenceField("User"), default=[])


class ShiftSchema(Schema):
    id = fields.Str()
    location = fields.Str()
    start_time = fields.DateTime()
    end_time = fields.DateTime()
    congregation = fields.Str()
    volunteers = fields.List(
        fields.Str()
    )
    requested_by = fields.List(
        fields.Str()
    )
