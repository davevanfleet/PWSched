import { config } from '../constants';

export function requestShift(userId, shiftId, congId){
    return (dispatch) => {
        const configObj = {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify({ userId })
        }

        fetch(`${config.url.API_URL}/congregations/${congId}/shifts/${shiftId}/request`, configObj)
            .then(r => r.json())
            .then(d => {
                dispatch({type: "REQUEST_SHIFT", shiftId: shiftId})
            })
    }
}