import { config } from '../constants';

export function logout(){
    return (dispatch) => {
        dispatch({ type: 'START_LOGGING_OUT' });
        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": 'application/json'
            },
            body: JSON.stringify({}),
            credentials: 'include'
        };
        fetch(`${config.url.API_URL}/logout`, configObject)
            .then(r => r.json())
            .then(d => dispatch({ type: "LOGOUT"}))
    }
}