import { APIURL } from '../../assets/constants'

export const getPendingOrdersByClient = async (mail, token) => {
    let requestBody = {};
    requestBody.mail = mail
    const response = await fetch(`${APIURL}getPendingOrdersByClient`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
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
            'Content-Type': 'application/json',
            'Authorization': token
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
            'Content-Type': 'application/json',
            'Authorization': token
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
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const getPendingOrdersByShopInOrder = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getPendingOrdersInOrderByShop`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const getPendingOrdersByShopMoreProducts = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getPendingOrdersMoreProductsByShop`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const getDeliveredOrdersByShop = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getDeliveredOrdersByShop`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const setOrderReadyByShop = async (num, token) => {
    let requestBody = {};
    requestBody.numero = num
    const response = await fetch(`${APIURL}setOrderReadyByShop`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const insertOrder = async (body, token) => {
    const response = await fetch(`${APIURL}insertClientOrder`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const deleteOrder = async (num, token) => {
    let requestBody = {};
    requestBody.numero = num
    const response = await fetch(`${APIURL}deleteClientOrder`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const refundOrder = async (num, token) => {
    const response = await fetch(`${APIURL}payments/refund/${num}`, {
        headers: {
            'Authorization': token
        }
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}

export const aceptOrder = async (num, token) => {
    let requestBody = {};
    requestBody.numero = num
    const response = await fetch(`${APIURL}aceptClientOrder`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => (r.status === 204) ? r : r.json()
        .then(data =>
            ({ status: r.status, body: data })))
        .then(obj => { return obj });
    return response
}