import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import LogIn from './screens/login/login'
import SignUpClient from './screens/signup/signUpClient'
import SignUpShop from './screens/signup/signUpShop'
import NavBarClient from './screens/navBar/navBarClient'
import NavBarShop from './screens/navBar/navBarShop'
import LogSign from './screens/log-sign/log-sign'
import MakeOrder from './screens/orderProcess/stepIndicator'
import ShopInformation from './screens/shopView/shopInformation'
import OrdersClients from './screens/orderView/ordersClient'
import SearchShopByName from './screens/shopView/searchShopByName'
import SearchShopByAddress from './screens/shopView/searchShopByAddress'
import SearchShopBySale from './screens/shopView/searchShopBySale'
import FavouritesShops from './screens/shopView/favouritesShops'
import SignUpShopFeatures from './screens/signup/signUpShopFeatures'
import SignUpShopSchedule from './screens/signup/signUpShopSchedule'
import SignUpShopMenu from './screens/signup/signUpShopMenu'
import InitialMenu from './screens/menuShop/selectMenu'
import CreateProduct from './screens/signup/createProduct'
import OrdersShop from './screens/orderView/ordersShop'
import CartOrder from './screens/orderProcess/cartOrder'

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key="logsign" component={LogSign} title="LogSign" initial/>
                    <Scene key="login" component={LogIn} title="LogIn" />
                    <Scene key="signupclient" component={SignUpClient} title="SignUpClient" />
                    <Scene key="signupshop" component={SignUpShop} title="SignUpShop" />
                    <Scene key="signupshopfeatures" component={SignUpShopFeatures} title="SignUpShopFeatures" />
                    <Scene key="signupshopschedule" component={SignUpShopSchedule} title="SignUpShopSchedule" />
                    <Scene key="signupshopmenu" component={SignUpShopMenu} title="SignUpShopMenu" />
                    <Scene key="initialmenu" component={InitialMenu} title="InitialMenu" />
                    <Scene key="createproduct" component={CreateProduct} title="CreateProduct" />

                    <Scene key="navbarclient" component={NavBarClient} title="NavBarClient"  />
                    <Scene key="makeorder" component={MakeOrder} title="MakeOrder" />
                    <Scene key="cartorder" component={CartOrder} title="CartOrder" />
                    <Scene key="ordersclient" component={OrdersClients} title="OrdersClients" />
                    <Scene key="favouritesshops" component={FavouritesShops} title="FavouritesShops" />
                    <Scene key="searchshopname" component={SearchShopByName} title="SearchShopByName" />
                    <Scene key="searchshopaddress" component={SearchShopByAddress} title="SearchShopByAddress" />
                    <Scene key="searchshopsale" component={SearchShopBySale} title="SearchShopBySale" />
                    <Scene key="shopinformation" component={ShopInformation} title="ShopInformation" />

                    <Scene key="navbarshop" component={NavBarShop} title="NavBarShop" />
                    <Scene key="ordersshop" component={OrdersShop} title="OrdersShop" />
                </Scene>
            </Router>
        )
    }
}
