const initialState = {
    total: 0,
    takeAway: false,
    propina: 0,
    comentario: undefined,
    promociones: [],
    productos: [],
    selectedProduct: {},
    comentario: undefined,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_PRODUCT':
            return { ...state, productos: [...state.productos, payload.product] }
        case 'UPDATE_PRODUCT_AMOUNT':
            return {
                ...state, productos: state.productos.map(obj =>
                    (obj.idProducto === payload.id) ? { ...obj, cantidad: payload.amount } : obj),
                selectedProduct: { ...state.selectedProduct, cantidad: payload.amount }
            }
        case 'REMOVE_PRODUCT':
            return { ...state, productos: [...state.productos.filter(obj => obj !== payload.product)] }
        case 'SET_SELECTED_PRODUCT':
            return { ...state, ...payload }
        case 'SET_PROMO':
            return { ...state, promociones: [...state.promociones, payload.promo] }
        case 'UPDATE_TOTAL':
            return { ...state, total: payload.total }
        case 'UPDATE_TAKEAWAY':
            return { ...state, takeAway: payload.takeAway }
        case 'UPDATE_TIPS':
            return { ...state, propina: payload.tips }
        case 'SET_COMENTS':
            return { ...state, comentario: payload.coment }
        case 'DELETE_ORDER':
            return initialState
        default:
            return state
    }
}