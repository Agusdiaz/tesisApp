import { APIURL } from '../../assets/constants'

export const getAllShopPromos = async (cuit, token) => {
    let requestBody = {};
    requestBody.cuit = cuit
    const response = await fetch(`${APIURL}getShopPromos`, {
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