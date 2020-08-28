export function errorReducer(state={}, action){
    switch(action.type){
        case 'ADD_ERROR':
            return [...state, action.errorMessage]
        case 'CLEAR_ERRORS':
            return []
        default:
            return state
    }
}