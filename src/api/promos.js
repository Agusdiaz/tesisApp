import { APIURL } from '../../assets/constants'

export const getAllShopPromos = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getShopPromos`, {
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

export const updatePromoHours = async (body, token) => {
    const response = await fetch(`${APIURL}updatePromoHours`, {
        method: 'POST',
        body: JSON.stringify(body),
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