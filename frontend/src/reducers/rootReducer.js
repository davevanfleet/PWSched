import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { congregationReducer } from './congregationReducer';
import { currentCongregationReducer } from './currentCongregationReducer';
import { shiftReducer } from './shiftReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    congregations: congregationReducer,
    currentCongregation: currentCongregationReducer,
    shifts: shiftReducer
})

export default rootReducer;