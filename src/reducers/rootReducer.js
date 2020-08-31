import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { congregationReducer } from './congregationReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    congregations: congregationReducer
})

export default rootReducer;