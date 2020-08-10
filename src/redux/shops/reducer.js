const initialState = {
    allShops: [],
    selected: {},
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_SHOPS':
            return { ...state, ...payload}
        case 'UPDATE_FAVOURITE':
            return {
                ...state, allShops: state.allShops.map(obj => 
                    (obj.cuit === payload.cuit) ? { ...obj, favorito: payload.favourite } : obj),
                    selected: {...state.selected, favorito: payload.favourite }
            }
        case 'SET_SELECTED':
            return {...state, ...payload}
        default:
            return state
    }
}