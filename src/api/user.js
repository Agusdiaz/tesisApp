import { APIURL } from '../../assets/constants'

export const login = async (mail, pass) => {

    try {
        let requestBody = {};
        requestBody.mail = mail
        requestBody.contraseña = pass
        const response = await fetch(`${APIURL}login`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        if (response.status == 200)
            return response.json()
        if (response.status == 401)
            throw ('Contraseña inválida')
        if (response.status == 404){
            throw ('Usuario no encontrado')
        }
    } catch (error) {
        //console.error(error)
        throw error
    }
}