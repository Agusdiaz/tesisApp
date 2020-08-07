import { APIURL } from '../../assets/constants'

export const getMenu = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getShopMenu`, {
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

export const getMenuDisabled = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getAllDisabledByShop`, {
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

export const updateProductStatus = async (status, id, token) => {
    let requestBody = {};
    requestBody.disponible = status
    requestBody.id = id
    const response = await fetch(`${APIURL}updateProductStatus`, {
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

export const updateIngredientStatus = async (status, id, token) => {
    let requestBody = {};
    requestBody.disponible = status
    requestBody.id = id
    const response = await fetch(`${APIURL}updateIngredientStatus`, {
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