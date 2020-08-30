import { combineReducers } from 'redux';
import authStateReducer from './authState/reducer'
import shopReducer from './shops/reducer'
import orderReducer from './orders/reducer'
import badgeReducer from './notifications/reducer'

export default combineReducers({
  authState: authStateReducer,
  shops: shopReducer,
  order: orderReducer,
  badge: badgeReducer,
});