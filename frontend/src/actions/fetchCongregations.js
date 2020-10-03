import { config } from '../constants';

export function fetchCongregations() {
    return (dispatch) => {
        fetch(`${config.url.API_URL}/congregations`)
            .then(r => r.json())
            .then(d => {
                dispatch({type: "GET_CONGREGATIONS", congregations: d}) 
            })
    }
}