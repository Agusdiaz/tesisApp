import configureStore from '../../store/configureStore'

const setLoginData = (mail, name, lastName, token) => {
    return {
        type: 'LOGIN_USER',
        payload: {
            name: name,
            lastName: lastName,
            mail: mail,
            token: token
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

export default {
    setLoginData,
    logout,
    updateClientData,
}