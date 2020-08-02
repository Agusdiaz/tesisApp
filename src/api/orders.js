import { APIURL } from '../../assets/constants'

export const getPendingOrdersByClient = async (mail, token) => {
    let requestBody = {};
    requestBody.mail = mail
    const response = await fetch(`${APIURL}getPendingOrdersByClient`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const getAllOrdersByClient = async (mail, token) => {
    let requestBody = {};
    requestBody.mail = mail
    const response = await fetch(`${APIURL}getAllOrdersByClient`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const shareOrder = async (mail, num, token) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.numero = num
    const response = await fetch(`${APIURL}shareOrder`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const setOrderDeliveredByClient = async (num, token) => {
    let requestBody = {};
    requestBody.numero = num
    const response = await fetch(`${APIURL}setOrderDeliveredByClient`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}