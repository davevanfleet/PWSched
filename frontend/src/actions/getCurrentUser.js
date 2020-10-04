import { config } from '../constants';
import { fetchCurrentCongregation } from './fetchCurrentCongregation';
import { fetchShifts } from './fetchShifts';

export function getCurrentUser() {
    return (dispatch) => {
        dispatch({ type: 'START_GETTING_CURRENT_USER' });
        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": 'application/json'
            },
            body: JSON.stringify({}),
            credentials: 'include'
        }
        fetch(`${config.url.API_URL}/get_current_user`, configObject)
            .then(response => {
                if (!response.ok){ throw response }
                return response.json()
            })
            .then(json => {
                const user = json.user
                dispatch({type: 'ASSIGN_CURRENT_USER', user: user})
                dispatch(fetchCurrentCongregation(json.user.congregation.$oid))
                dispatch(fetchShifts(json.user.congregation.$oid))
            })
    };
}