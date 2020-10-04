export function shiftReducer(state=[], action){
    switch(action.type){
        case 'GET_SHIFTS':
            return action.shifts
        case 'ADD_SHIFT':
            return [...state, action.shift]
        default:
            return state
    }
}