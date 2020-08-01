import { APIURL } from '../../assets/constants'

export const login = async (mail, pass) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.contraseña = pass
    const response = await fetch(`${APIURL}login`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
        })
    }).then(r => r.json()
        .then(data => ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}