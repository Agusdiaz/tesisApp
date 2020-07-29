import {getData, getDataSuccess, getDateFailure} from '../actions/index'

export default fetchData = () => {
    return dispatch => {
        dispatch(getData())
        fetch('http://192.168.0.251:8080/getAllShopsAZ')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error)
            }
            dispatch(getDataSuccess(res))
            return res
        })
        .catch(error => {
            dispatch(getDateFailure(error))
        })
    }
}