export function userReducer(state=null, action){

    switch(action.type){
        case 'ASSIGN_CURRENT_USER':
            return {
                ...action.user,
            }
        case 'REQUEST_SHIFT':
            return {
                ...state,
                requested_shifts: [...state.requested_shifts, {id: action.shiftId}]
            }
        case 'LOGOUT':
            return null
        default:
            return state
    }
}