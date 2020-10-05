from datetime import datetime
from Main.Congregation.models import Congregation
from Main.Shift.models import Shift
from Main.User.models import User


# Shift Endpoints
def test_get_shifts(client):
    congregation = Congregation.objects().first()
    cong_id = str(congregation.id)
    response = client.get(f'/congregations/{cong_id}/shifts/')
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]["location"] == "UConn"


def test_post_shifts(client):
    congregation = Congregation.objects().first()
    cong_id = str(congregation.id)
    payload = {
        "location": "Dam trail",
        "date": "2017-06-01",
        "startTime": "14:00",
        "endTime": "15:30"
    }
    response = client.post(f'/congregations/{cong_id}/shifts/',
                           json=payload)
    assert response.status_code == 200
    # Check that shift is created in db w appropriate associations
    shift = Shift.objects().order_by('-id').first()
    assert shift.location == "Dam trail"
    assert shift.congregation.name == "English - Willimantic"
    # Check that response contains correct shift data
    data = response.get_json()
    assert data["location"] == "Dam trail"
    assert len(data["volunteers"]) == 0
    assert len(data["requested_by"]) == 0


def test_get_shift(client):
    congregation = Congregation.objects().first()
    cong_id = str(congregation.id)
    shift = Shift.objects().first()
    shift_id = str(shift.id)
    response = client.get(f'/congregations/{cong_id}/shifts/{shift_id}')
    assert response.status_code == 200
    # Create a new congregation - should return 401
    # if shift doesn't belong to congregation
    congregation = Congregation(name="sneaky").save()
    cong_id = str(congregation.id)
    response = client.get(f'/congregations/{cong_id}/shifts/{shift_id}')
    assert response.status_code == 401


def test_put_shift(client):
    congregation = Congregation.objects().first()
    cong_id = str(congregation.id)
    shift = Shift.objects().first()
    shift_id = str(shift.id)
    response = client.put(f'/congregations/{cong_id}/shifts/{shift_id}',
                          json={"location": "Dam trail"})
    assert response.status_code == 200
    data = response.get_json()
    assert data["location"] == "Dam trail"


def test_request_shift(client):
    congregation = Congregation.objects().first()
    cong_id = str(congregation.id)
    shift = Shift.objects().first()
    shift_id = str(shift.id)
    user = User.objects().first()
    user_id = str(user.id)
    response = client.put(f'/congregations/{cong_id}/shifts/{shift_id}'
                          '/request', json={"userId": user_id})
    assert response.status_code == 200
    data = response.get_json()
    assert len(data["requested_by"]) == 1


def test_delete_shift(client):
    congregation = Congregation.objects().first()
    cong_id = str(congregation.id)
    shift = Shift.objects().first()
    assert len(Shift.objects()) == 1
    shift_id = str(shift.id)
    response = client.delete(f'/congregations/{cong_id}/shifts/{shift_id}')
    assert response.status_code == 200
    assert len(Shift.objects()) == 0
