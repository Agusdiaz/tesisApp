import * as React from 'react';
import { BottomNavigation, Text, } from 'react-native-paper';
import { appStyles, colors } from '../../../index.styles'
import HomeShop from '../home/homeShop'
import ProfileShop from '../profile/profileShop'
import StatsShop from '../statistics/statsShop'
import DisabledProductsShop from '../disabled/disabledProductsShop'


const HomeRoute = () => <HomeShop/>;
const StatisticsRoute = () => <StatsShop/>;
const DisabledProductsRoute = () => <DisabledProductsShop/>
const MenuRoute = () => <ProfileShop/>;

export default class NavigationBarScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'orders', title: 'Pedidos', icon: 'receipt', badge: null, color: colors.APP_BACKGR },
      { key: 'disabledProducts', title: 'Deshabilitados', icon: 'cart-remove', color: colors.APP_BACKGR },
      { key: 'statistics', title: 'Estadísticas', icon: 'chart-bar', color: colors.APP_BACKGR },
      { key: 'profile', title: 'Perfil', icon: 'chef-hat', color: colors.APP_BACKGR }, //icon:'book'
    ],
  };

  _setNotifications = (value) => { 
    const newBadge = [...this.state.routes]
    newBadge[0].badge = value
    this.setState( {routes: newBadge} )
    }

  _handleNotifications = () => {
      this._setNotifications(null)
    }

  _handleIndexChange = index => {
    this.setState({ index })
    if(index === 0)
      this._handleNotifications()
  };

  _renderScene = BottomNavigation.SceneMap({
    orders: HomeRoute, 
    statistics: StatisticsRoute,
    disabledProducts: DisabledProductsRoute,
    profile: MenuRoute,
  });

  render() {
    return (
      
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        shifting= {true}
        activeColor= {colors.APP_MAIN}
        inactiveColor= {colors.APP_INACTIVE}
        barStyle={{ paddingBottom: 20 }}
        >
        </BottomNavigation>
    );
  }
}