import configureStore from '../../store/configureStore'
import AsyncStorage from '@react-native-community/async-storage'

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

const updateShopSchedule = (hours, id) => {
    return {
        type: 'UPDATE_SHOP_SCHEDULE',
        payload: {
            hours: hours,
            id: id,
        },
    }
}

const updateShopOpen = (open) => {
    return {
        type: 'UPDATE_SHOP_OPEN',
        payload: {
            open: open,
        },
    }
}

const logout = () => {
    return async () => {
        configureStore.dispatch({ type: 'LOGOUT' })
        try {
            await AsyncStorage.removeItem('id_token');
            await AsyncStorage.removeItem('profile');
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
}

export default {
    setLoginClientData,
    setLoginShopData,
    logout,
    updateClientData,
    updateShopFeatures,
    updateShopSchedule,
    updateShopOpen,
}