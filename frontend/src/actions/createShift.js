import { config } from '../constants';

export function createShift(shift, congId){
    return (dispatch) => {
        const configObj = {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify(shift)
        }

        fetch(`${config.url.API_URL}/congregations/${congId}/shifts/`, configObj)
            .then(r => r.json())
            .then(d => {
                dispatch({type: "ADD_SHIFT", shift: d}) 
            })
    }
}