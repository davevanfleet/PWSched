export function userReducer(state={}, action){

    switch(action.type){
        case 'ASSIGN_CURRENT_USER':
            return {
                ...action.user,
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}