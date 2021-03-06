from flask import current_app
from flask_login import UserMixin
from _datetime import datetime
from flask_mongoengine import Document
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from mongoengine import IntField, ListField, BooleanField, DateTimeField, \
    EmbeddedDocument, EmbeddedDocumentField, DictField, EmailField, \
    EmbeddedDocumentListField, StringField, ReferenceField
from marshmallow import fields, Schema
from Main import login_manager
from Main.Congregation.models import CongregationSchema


class Meta(EmbeddedDocument):
    date_added = DateTimeField(default=datetime.utcnow)
    timestamps = ListField(DateTimeField())


class User(Document, UserMixin):
    user_meta = EmbeddedDocumentField(Meta, default=Meta)
    name = StringField(required=True, max_length=50)
    email = EmailField(required=True, unique=True)
    role = StringField(default="volunteer")
    confirmed = BooleanField(default=False)
    password = StringField(min_length=8, required=True)
    congregation = ReferenceField("Congregation")
    isActive = BooleanField(default=True)
    requested_shifts = ListField(ReferenceField('Shift'), default=[])
    assigned_shifts = ListField(ReferenceField('Shift'), default=[])

    def get_auth_token(self):
        s = Serializer(current_app.config['SECRET_KEY'])
        return (s.dumps({'user_id': str(self.id), 'email': self.email})
                .decode('utf-8'))

    @login_manager.user_loader
    def load_user(id):
        return User.objects(id=id).first()

    # User mixin methods
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)


class UserShiftSchema(Schema):
    id = fields.Str()


class UserSchema(Schema):
    id = fields.Str()
    name = fields.Str()
    email = fields.Email()
    confirmed = fields.Boolean()
    role = fields.Str()
    congregation = fields.Nested(CongregationSchema)
    assigned_shifts = fields.List(
        fields.Nested(UserShiftSchema)
    )
    requested_shifts = fields.List(
        fields.Nested(UserShiftSchema)
    )
