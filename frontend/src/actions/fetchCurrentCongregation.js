import { config } from '../constants';

export function fetchCurrentCongregation(id) {
    return (dispatch) => {
        fetch(`${config.url.API_URL}/congregations/${id}`)
            .then(r => r.json())
            .then(d => {
                dispatch({type: "GET_CURRENT_CONGREGATION", congregation: d}) 
            })
    }
}