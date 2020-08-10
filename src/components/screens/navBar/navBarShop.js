import * as React from 'react';
import { BottomNavigation, Text, } from 'react-native-paper';
import { appStyles, colors } from '../../../index.styles'
import HomeShop from '../home/homeShop'
import ProfileShop from '../profile/profileShop'
import DisabledProductsShop from '../menuShop/disabledMenu'
import MenuShop from '../menuShop/selectMenu'

const HomeRoute = () => <HomeShop/>;
const MenuRoute = () => <MenuShop/>;
const DisabledProductsRoute = () => <DisabledProductsShop/>
const ProfileRoute = () => <ProfileShop/>;

export default class NavigationBarScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'orders', title: 'Pedidos', icon: 'receipt', badge: null, color: colors.APP_BACKGR },
      { key: 'menu', title: 'Menú', icon: 'food-fork-drink', color: colors.APP_BACKGR },
      { key: 'disabledProducts', title: 'Deshabilitados', icon: 'close-outline', color: colors.APP_BACKGR },
      { key: 'profile', title: 'Perfil', icon: 'chef-hat', color: colors.APP_BACKGR },
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
    menu: MenuRoute,
    disabledProducts: DisabledProductsRoute,
    profile: ProfileRoute,
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