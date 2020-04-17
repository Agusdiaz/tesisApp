import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './src/store/configureStore'; //Import the store
import LogIn from './src/components/screens/login/login' //Import the component file
import SignUp from './src/components/screens/signup/signupClient'
import NavBar from './src/components/commons/navBar'
import LogSign from './src/components/screens/log-sign/log-sign'
import HomeClient from './src/components/screens/home/homeClient'

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HomeClient />
            </Provider>
        );
    }
}