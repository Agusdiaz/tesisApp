import { APIURL } from '../../assets/constants'

export const getTopProducts = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getTop10RequestedProductsByShop`, {
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

export const getTopHours = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getTopRequestedHoursByShop`, {
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

export const getMonthOrders = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getLast6MonthOrdersByShop`, {
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