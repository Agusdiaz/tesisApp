const initialState = {
    mail: undefined,
    cuit: undefined,
    total: undefined,
    takeAway: undefined,
    propina: undefined,
    promociones: [],
    productos: [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_PRODUCT':
            console.log(payload.product)
            return { ...state, productos: [...state.productos, payload.product]}
        case 'SET_PROMO':
            return { ...state, promociones: [...state.promociones, payload.promo]}
        default:
            return state
    }
}