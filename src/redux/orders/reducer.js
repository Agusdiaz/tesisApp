const initialState = {
    mail: undefined,
    cuit: undefined,
    total: 0,
    takeAway: false,
    propina: 0,
    promociones: [],
    productos: [],
    comentario: null,
    selectedProduct: {},
    selectedPromo: {},
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
        case 'UPDATE_PROMO_AMOUNT':
            return {
                ...state, promociones: state.promociones.map(obj =>
                    (obj.idPromo === payload.id) ? { ...obj, cantidad: payload.amount } : obj),
                selectedPromo: { ...state.selectedPromo, cantidad: payload.amount }
            }
        case 'REMOVE_PROMO':
            return { ...state, promociones: [...state.promociones.filter(obj => obj !== payload.promo)] }
        case 'SET_SELECTED_PROMO':
            return { ...state, ...payload }
        case 'UPDATE_TOTAL':
            return { ...state, total: payload.total }
        case 'UPDATE_TAKEAWAY':
            return { ...state, takeAway: payload.takeAway }
        case 'UPDATE_TIPS':
            return { ...state, propina: payload.tips }
        case 'SET_COMENTS':
            return { ...state, comentario: payload.coment }
        case 'SET_CUITMAIL':
            console.log('aca')
            return { ...state, mail: payload.mail, cuit: payload.cuit }
        case 'DELETE_ORDER':
            return initialState
        default:
            return state
    }
}