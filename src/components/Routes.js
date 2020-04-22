import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import LogIn from './screens/login/login'
import SignUp from './screens/signup/signupClient'
import NavBarClient from './screens/navBar/navBarClient'
import NavBarShop from './screens/navBar/navBarShop'
import LogSign from './screens/log-sign/log-sign'
import MakeOrder from './screens/orderProcess/stepIndicator'

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key="logsign" component={LogSign} title="LogSign" />
                    <Scene key="login" component={LogIn} title="LogIn" />
                    <Scene key="signup" component={SignUp} title="SignUp" />
                    <Scene key="navbarclient" component={NavBarClient} title="NavBarClient" />
                    <Scene key="makeorder" component={MakeOrder} title="MakeOrder" />
                    <Scene key="navbarshop" component={NavBarShop} title="NavBarShop" initial/>
                </Scene>
            </Router>
        )
    }
}
