export function userReducer(state=null, action){

    switch(action.type){
        case 'ASSIGN_CURRENT_USER':
            return {
                ...action.user,
            }
        case 'LOGOUT':
            return null
        default:
            return state
    }
}