import { APIURL } from '../../assets/constants'

export const getMenu = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getShopMenu`, {
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

export const getIngredients = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getAllIngredientsByShop`, {
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

export const getMenuDisabled = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getAllDisabledByShop`, {
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

export const updateProductStatus = async (status, id, token) => {
    let requestBody = {};
    requestBody.disponible = status
    requestBody.id = id
    const response = await fetch(`${APIURL}updateProductStatus`, {
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

export const updateIngredientStatus = async (status, id, token) => {
    let requestBody = {};
    requestBody.disponible = status
    requestBody.id = id
    const response = await fetch(`${APIURL}updateIngredientStatus`, {
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

export const createProduct = async (body, token) => {
    const response = await fetch(`${APIURL}insertProductWithIngredients`, {
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

export const validateIngredientName = async (name, cuit, token) => {
    let requestBody = {};
    requestBody.nombre = name
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}validateIngredientName`, {
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

export const createPromo = async (body, token) => {
    const response = await fetch(`${APIURL}insertPromoWithProducts`, {
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

export const updateProductPrice = async (id, price, cuit, token) => {
    let requestBody = {};
    requestBody.id = id
    requestBody.precio = price
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}updateProductPrice`, {
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

export const deleteProduct = async (id, cuit, token) => {
    let requestBody = {};
    requestBody.id = id
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}deleteProduct`, {
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

export const deleteIngredient = async (id, cuit, token) => {
    let requestBody = {};
    requestBody.id = id
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}deleteIngredient`, {
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