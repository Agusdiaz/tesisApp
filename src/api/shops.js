import { APIURL } from '../../assets/constants'

export const getAllShopsAZ = () => {
    return fetch(`${APIURL}getAllShopsAZ`)
        .then((response) => {
            Promise.all([response.json()])
        }).catch(e => {
            console.error(e)
        })
}

export const getAllShopsOpenClose = () => {
    return fetch(`${APIURL}getAllShopsOpenClose`)
        .then((response) => Promise.all([response.json()])).catch(e => {
            console.error(e)
        })
}

export const getAllOpenShops = async () => {
    try {
        const response = await fetch(`${APIURL}getAllOpenShops`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        if (response.status == 204)
            return null
        return response.json()
    } catch (error) {
        console.error(e)
    }
}

export const getClientFavourites = async (mail) => {
    try {
        let requestBody = {};
        requestBody.mail = mail
        const response = await fetch(`${APIURL}getFavourites`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        if (response.status == 204)
            return null
        return response.json()
    } catch (error) {
        console.error(e)
    }
}

/*
export const fetchPeople =  () => {
    return fetch(URL_PEOPLE)
    .then(Response =>{
        return Promise.all([Response, Response.json()])
    })
}*/