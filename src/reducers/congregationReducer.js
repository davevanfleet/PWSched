export function congregationReducer(state=[], action){
    switch(action.type){
        case 'GET_CONGREGATIONS':
            return action.congregations
        default:
            return state
    }
}