import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import LogIn from './screens/login/login'
import SignUp from './screens/signup/signupClient'
import NavBarClient from './screens/navBar/navBarClient'
import NavBarShop from './screens/navBar/navBarShop'
import LogSign from './screens/log-sign/log-sign'
import MakeOrder from './screens/orderProcess/stepIndicator'
import HomeClient from './screens/home/homeClient'
import ShopInformation from './commons/shopInformation'
import LastOrders from './screens/orderView/lastordersClient'
import SearchShop from './screens/shopView/searchShop'

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key="logsign" component={LogSign} title="LogSign" />
                    <Scene key="login" component={LogIn} title="LogIn" />
                    <Scene key="signup" component={SignUp} title="SignUp" />
                    <Scene key="navbarclient" component={NavBarClient} title="NavBarClient" initial/>
                    <Scene key="makeorder" component={MakeOrder} title="MakeOrder" />
                    <Scene key="navbarshop" component={NavBarShop} title="NavBarShop" />
                    <Scene key="shopinformation" component={ShopInformation} title="ShopInformation" />
                    <Scene key="lastorders" component={LastOrders} title="LastOrders" />
                    <Scene key="searchshop" component={SearchShop} title="SearchShop" />
                </Scene>
            </Router>
        )
    }
}
