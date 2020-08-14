import { combineReducers } from 'redux';
import authStateReducer from './authState/reducer'
import shopReducer from './shops/reducer'
import orderReducer from './orders/reducer'

export default combineReducers({
  authState: authStateReducer,
  shops: shopReducer,
  order: orderReducer,
});