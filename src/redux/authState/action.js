import configureStore from '../../store/configureStore'

const setLoginClientData = (mail, name, lastName, token) => {
    return {
        type: 'LOGIN_CLIENT',
        payload: {
            name: name,
            lastName: lastName,
            mail: mail,
            token: token,
        },
    }
}

const setLoginShopData = (cuit, nombre, direccion, telefono, mail, mascotas, bebes, juegos, aireLibre, libreHumo, wifi, demora, abierto, horarios, token) => {
    return {
        type: 'LOGIN_SHOP',
        payload: {
            cuit: cuit,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            mail: mail,
            mascotas: mascotas,
            bebes: bebes,
            juegos: juegos,
            aireLibre: aireLibre,
            libreHumo: libreHumo,
            wifi: wifi,
            demora: demora,
            abierto: abierto,
            horarios: horarios,
            token: token,
        },
    }
}

const logout = () => configureStore.dispatch({ type: 'LOGOUT' })

const updateClientData = (name, lastName) => {
    return {
        type: 'UPDATE_CLIENT',
        payload: {
            name: name,
            lastName: lastName,
        },
    }
}

const updateShopFeatures = (mascotas, bebes, juegos, aireLibre, libreHumo, wifi) => {
    return {
        type: 'UPDATE_SHOP_FEATURES',
        payload: {
            mascotas: mascotas,
            bebes: bebes,
            juegos: juegos,
            aireLibre: aireLibre,
            libreHumo: libreHumo,
            wifi: wifi
        },
    }
}

export default {
    setLoginClientData,
    setLoginShopData,
    logout,
    updateClientData,
    updateShopFeatures,
}