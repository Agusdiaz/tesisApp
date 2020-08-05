const initialState = {
    client: {
        name: undefined,
        lastName: undefined,
        mail: undefined,
        token: undefined,
    },
    shop: {
        cuit: undefined,
        nombre: undefined,
        direccion: undefined,
        telefono: undefined,
        mail: undefined,
        mascotas: undefined,
        bebes: undefined,
        juegos: undefined,
        aireLibre: undefined,
        libreHumo: undefined,
        wifi: undefined,
        demora: undefined,
        abierto: undefined,
        horarios: [],
        token: undefined,
    }
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'LOGIN_CLIENT':
            return { ...state, client: { ...payload } }
        case 'LOGIN_SHOP':
            return { ...state, shop: { ...payload } }
        case 'LOGOUT':
            return initialState
        case 'UPDATE_CLIENT':
            return { ...state, client: { ...state.client, name: payload.name, lastName: payload.lastName } }
        case 'UPDATE_SHOP_FEATURES':
            return { ...state, shop: { ...state.shop, mascotas: payload.mascotas, bebes: payload.bebes, juegos: payload.juegos, 
                aireLibre: payload.aireLibre, libreHumo: payload.libreHumo, wifi: payload.wifi } }
        default:
            return state
    }
}

