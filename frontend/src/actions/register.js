import { config } from '../constants';

export function register(credentials) {
    return (dispatch) => {
        dispatch({type: "REGISTERING"})
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": 'application/json'
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        }
        if (credentials["password"] === credentials["passwordConfirm"]){
            fetch(`${config.url.API_URL}/register`, configObj)
                .then(r => r.json())
                .then(d => console.log(d))
                .catch(e => console.log(e))
        }
    }
}