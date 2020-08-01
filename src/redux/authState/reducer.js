const initialState = {
    name: undefined,
    lastName: undefined,
    mail: undefined,
    token: undefined,
}

/*
const initialState = {
    client: undefined,
    shop: undefine,
    token: undefined,
}
*/

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'LOGIN_USER':
            return { ...state, ...payload }
        case 'LOGOUT':
            return initialState
        case 'UPDATE_CLIENT':
            return {...state, name:payload.name, lastName: payload.lastName}
        default:
            return state
    }
}

