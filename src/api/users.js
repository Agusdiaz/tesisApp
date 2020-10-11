import { APIURL } from '../../assets/constants'

export const login = async (mail, pass) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.contraseña = pass
    const response = await fetch(`${APIURL}login`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const verifyToken = async (token) => {
    let requestBody = {};
    requestBody.token = token
    const response = await fetch(`${APIURL}verifyToken`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const updateClient = async (mail, name, lastName, token) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.nombre = name
    requestBody.apellido = lastName
    const response = await fetch(`${APIURL}updateClient`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const insertClient = async (mail, name, lastName, password) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.nombre = name
    requestBody.apellido = lastName
    requestBody.contraseña = password
    const response = await fetch(`${APIURL}insertClient`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const insertShop = async (cuit, name, address, phone, legalName, mail, password) => {
    let requestBody = {};
    requestBody.cuit = cuit
    requestBody.nombre = name
    requestBody.direccion = address
    requestBody.telefono = phone
    requestBody.razonSocial = legalName
    requestBody.mail = mail
    requestBody.contraseña = password
    const response = await fetch(`${APIURL}insertShop`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const changePassword = async (mail, password, token) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.contraseña = password
    const response = await fetch(`${APIURL}changePassword`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const setClientDevice = async (mail, id) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.device = id
    const response = await fetch(`${APIURL}insertClientDeviceId`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const setShopDevice = async (cuit, id) => {
    let requestBody = {};
    requestBody.cuit = cuit
    requestBody.device = id
    const response = await fetch(`${APIURL}insertShopDeviceId`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}