import { combineReducers } from 'redux';
import session from './sesion.js';

export default combineReducers({
  session
});

/*
import {combineReducers} from 'redux';
import tabBarReducer from './tabBar.reducer'
import dataReducer from './data.reducer'

export default combineReducers({
    tabId: tabBarReducer,
    data: dataReducer
})
*/