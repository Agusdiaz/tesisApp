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
                    (obj.index === payload.product.index) ? { ...obj, cantidad: payload.amount } : obj),
                selectedProduct: { ...state.selectedProduct, cantidad: payload.amount }
            }
        case 'REMOVE_PRODUCT':
              return {...state, productos: [...state.productos.slice(0, payload.index), ...state.productos.slice(payload.index + 1)]}
            /* state.productos.filter(obj => console.log(obj), console.log(payload.product)) //...state.productos.filter(obj => obj !== payload.product)
            return { ...state, productos: [...state.productos.filter(obj => obj !== state.selectedProduct)]} */
        case 'SET_SELECTED_PRODUCT':
            return { ...state, ...payload }
        case 'SET_PROMO':
            return { ...state, promociones: [...state.promociones, payload.promo] }
        case 'UPDATE_PROMO_AMOUNT':
            return {
                ...state, promociones: state.promociones.map(obj =>
                    (obj.index === payload.promo.index) ? { ...obj, cantidad: payload.amount } : obj),
                selectedPromo: { ...state.selectedPromo, cantidad: payload.amount }
            }
        case 'REMOVE_PROMO':
            var index = payload.index - state.productos.length
            return {...state, promociones: [...state.promociones.slice(0, index), ...state.promociones.slice(index + 1)]}
        case 'SET_SELECTED_PROMO':
            return { ...state, ...payload }
        case 'UPDATE_TOTAL':
            return { ...state, total: (payload.total >= 0) ? payload.total : 0 }
        case 'UPDATE_TAKEAWAY':
            return { ...state, takeAway: payload.takeAway }
        case 'UPDATE_TIPS':
            return { ...state, propina: payload.tips }
        case 'SET_COMENTS':
            return { ...state, comentario: payload.coment }
        case 'SET_CUITMAIL':
            return { ...state, mail: payload.mail, cuit: payload.cuit }
        case 'DELETE_ORDER':
            return initialState
        case 'REMOVE_DISABLED_PRODUCT':
           return { ...state, productos: [...state.productos.filter(obj => obj.idProducto !== payload.id)]}
        case 'REMOVE_DISABLED_PRODUCT_INGREDIENT':
            return {...state, productos: state.productos.map(obj => 
                (obj.ingredientes.length > 0) ? { ...obj, ingredientes: obj.ingredientes.filter(x => x.idIngrediente !== payload.id) } : obj) }
        case 'REMOVE_DISABLED_PROMO':
            return { ...state, promociones: [...state.promociones.filter(obj => obj.idPromo !== payload.id)]}
        case 'REMOVE_DISABLED_PROMO_INGREDIENT':
            return {...state, promociones: state.promociones.map(promo =>
                (promo.productos.length > 0) ? {...promo, 
                    productos: promo.productos.map(prod => 
                     (prod.ingredientes.length > 0) ? { ...prod, ingredientes: prod.ingredientes.filter(x => x.idIngrediente !== payload.id) } : prod  
                     ) } : promo) }
        default:
            return state
    }
}