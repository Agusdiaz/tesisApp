import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducers from '../redux/index'; //Import the reducer

var configureStore = () => {
    let store = createStore(Reducers, applyMiddleware(thunk));
    return store
}

const store = configureStore()
export default store