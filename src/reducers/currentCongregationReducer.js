export function currentCongregationReducer(state=null, action){
    switch(action.type){
        case 'GET_CURRENT_CONGREGATION':
            return action.congregation
        default:
            return state
    }
}