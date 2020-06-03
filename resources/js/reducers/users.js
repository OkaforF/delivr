const initialState = {
    users: {},
    logout: true
}

const reducer = (state = initialState, action) => {
    if (action.type === 'USER_TOKEN') {
        return {
            ...state,
            token: action.token
        }
    }
    if (action.type === 'CURRENT_USER') {
        return {
            ...state,
            user: action.user
        }
    }
    if (action.type === 'LOGOUT_USER') {
        return {
            logout: action.logout
        }
    }
    if (action.type === 'CART_ITEMS') {
        return {
            ...state,
            cart: action.cart
        }
    }
    if (action.type === 'ITEM_ADDED') {
        return {
            ...state,
            item_added: action.item_added
        }
    }
    return state;
}

export default reducer;