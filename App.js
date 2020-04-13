import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './src/store/configureStore'; //Import the store
import LogIn from './src/screens/login' //Import the component file

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <LogIn />
            </Provider>
        );
    }
}