export function userReducer(state={}, action){
    switch(action.type){
        case 'ASSIGN_CURRENT_USER':
            return {
                ...action.user,
                recipes: action.user.recipes.map(recipe => recipe.id)
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}