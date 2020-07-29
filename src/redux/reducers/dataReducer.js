import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE} from '../../../assets/constants'

const initialState =  {
    data: [],
    isFeching: false,
    error: null
}

export default dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA:
            return {
                ...state,
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS:
            return {
                ...state,
                data: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE:
            return {
                ...state,
                isFeching: false,
                error: action.error
            }
        default:
        return state
    }
}