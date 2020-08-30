import { APIURL } from '../../assets/constants'

export const getAllShopsOpenClose = async (mail, token) => {
    let requestBody = {};
    requestBody.mail = mail
    const response = await fetch(`${APIURL}getAllShopsOpenClose`, {
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

export const getAllShopsWithPromo = async (mail, token) => {
    let requestBody = {};
    requestBody.mail = mail
    const response = await fetch(`${APIURL}getShopByPromo`, {
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

export const setShopAsFavourite = async (mail, cuit, token) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}setShopAsFavourite`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const deleteShopAsFavourite = async (mail, cuit, token) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}deleteShopAsFavourite`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const updateShopFeatures = async (mascotas, bebes, juegos, aireLibre, libreHumo, wifi, cuit, token) => {
    let requestBody = {};
    requestBody.mascotas = mascotas
    requestBody.bebes = bebes
    requestBody.juegos = juegos
    requestBody.aireLibre = aireLibre
    requestBody.libreHumo = libreHumo
    requestBody.wifi = wifi
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}updateShopFeatures`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const updateShopSchedule = async (body, token) => {
    const response = await fetch(`${APIURL}updateShopSchedule`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

export const updateNewField = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}updateNewField`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        })
    }).then(r => r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}

/*export const getAllOpenShops = async (mail, token) => {
    console.log('entreOP')
    let requestBody = {};
    requestBody.mail = mail
    const response = await fetch(`${APIURL}getAllOpenShops`, {
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
}*/

/* export const getAllShopsAZ = async (mail, token) => {
    let requestBody = {};
    requestBody.mail = mail
    const response = await fetch(`${APIURL}getAllShopsAZ`, {
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
} */