import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/configureStore'; //Import the store
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import Routes from './src/components/Routes'

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PaperProvider>
                    <Routes />
                </PaperProvider>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('App', () => App)