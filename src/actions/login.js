import { config } from '../constants';

export function login(credentials, history) {
    return (dispatch) => {
        dispatch({ type: 'START_LOGGING_IN' });
        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": 'application/json'
            },
            body: JSON.stringify(credentials)
        }
        fetch(`${config.url.API_URL}/login`, configObject)
            .then(response => {
                if (!response.ok){ throw response }
                return response.json()
            })
            .then(json => {
                const user = JSON.parse(json.user)
                dispatch({type: 'ASSIGN_CURRENT_USER', user: user})
                history.push(`/`)
            })
            .catch(error => {
                error.json().then(data => {
                    dispatch({type: 'ADD_ERROR', errorMessage: data.error})
                })
                history.push('/login')
            })
    };
  }