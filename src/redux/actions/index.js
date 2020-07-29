/*
import axios from 'axios';
import { API_LOGIN } from '../../../assets/constants';

import {
	SET_SESSION
} from '../ActionTypes';

export const login = ({ email, password }) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		axios.post(API_LOGIN,{
				email,
				password
			})
			.then((respJson) => {
				//si todo sale bien guardamos el user y token en localstore
				dispatch({
					type: SET_SESSION,
					user: respJson.data.user,
					token: respJson.data.token
				})
				return resolve(respJson.data)
			})
			.catch( (err) => {
				console.warn(err);
				if(err.response && err.response.data)
					return reject(err.response.data)
				else
					return reject({ error : true, message : "Ocurrio un error por favor intenta más tarde."});
			});
	});
}*/

import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE} from '../../../assets/constants'

export const getData = () => {
    return {type: FETCHING_DATA}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS, data}
}

export const getDateFailure = (error) => {
    return {type: FETCHING_DATA_FAILURE, error}
}