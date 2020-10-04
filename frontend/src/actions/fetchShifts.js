import { config } from '../constants';

export function fetchShifts(id) {
    return (dispatch) => {
        fetch(`${config.url.API_URL}/congregations/${id}/shifts`)
            .then(r => r.json())
            .then(d => {
                dispatch({type: "GET_SHIFTS", shifts: d}) 
            })
    }
}