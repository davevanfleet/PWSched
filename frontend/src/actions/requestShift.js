import { config } from '../constants';

export function requestShift(userId, shiftId, congId){
    return (dispatch) => {
        const configObj = {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify({ userId, shiftId })
        }

        fetch(`${config.url.API_URL}/congregations/${congId}/shifts/${shiftId}`, configObj)
            .then(r => r.json())
            .then(d => {
                
            })
    }
}