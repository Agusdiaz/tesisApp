import { APIURL } from '../../assets/constants'

export const getAllShopsAZ = async (mail, token) => {
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
}

export const getAllShopsOpenClose = async (mail, token) => {
    let requestBody = {};
    requestBody.mail = mail
    const response = await fetch(`${APIURL}getAllShopsOpenClose`, {
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

export const setShopAsFavourite = async (mail, cuit, token) => {
    let requestBody = {};
    requestBody.mail = mail
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}setShopAsFavourite`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
            'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
        })
    }).then(r => r.json()
        .then(data => 
            ({ status: r.status, body: data })))
        .then(obj => {return obj});
    return response
}