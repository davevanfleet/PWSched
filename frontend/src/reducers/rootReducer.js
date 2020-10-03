import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { congregationReducer } from './congregationReducer';
import { currentCongregationReducer } from './currentCongregationReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    congregations: congregationReducer,
    currentCongregation: currentCongregationReducer
})

export default rootReducer;