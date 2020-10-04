from flask_mongoengine import Document
from mongoengine import StringField, DateTimeField, ListField, \
    ReferenceField, EmbeddedDocument


class Shift(Document):
    location = StringField(required=True)
    start_time = DateTimeField(required=True)
    end_time = DateTimeField(required=True)
    congregation = ReferenceField("Congregation")
    volunteers = ListField(ReferenceField("User"), max_length=2, default=[])
    requested_by = ListField(ReferenceField("User"), default=[])
