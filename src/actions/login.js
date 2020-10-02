import { config } from '../constants';
import { fetchCurrentCongregation } from './fetchCurrentCongregation';

export function login(credentials, history) {
    return (dispatch) => {
        dispatch({ type: 'START_LOGGING_IN' });
        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": 'application/json'
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        }
        fetch(`${config.url.API_URL}/login`, configObject)
            .then(response => {
                if (!response.ok){ throw response }
                return response.json()
            })
            .then(json => {
                const user = json.user
                dispatch({type: 'ASSIGN_CURRENT_USER', user: user})
                dispatch(fetchCurrentCongregation(user.congregation['$oid']))
                history.push(`/`)
            })
            .catch(error => {
                console.log(error)
                history.push('/login')
            })
    };
  }