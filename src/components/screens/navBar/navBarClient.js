import * as React from 'react';
import { BottomNavigation, Text, } from 'react-native-paper';
import { appStyles, colors } from '../../../../src/index.styles';
import HomeClient from '../home/homeClient'
import ProfileClient from '../profile/profileClient'
import SearchOrder from '../orderView/searchShop'

const HomeRoute = () => <HomeClient/>;

const ShopRoute = () => <SearchOrder/>;

const NotificationRoute = () => <Text>Notificaciones</Text>;

const ProfileRoute = () => <ProfileClient/>;

export default class NavigationBarScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Principal', icon: 'food', color: colors.APP_BACKGR },
      { key: 'shops', title: 'Locales', icon: 'store', color: colors.APP_BACKGR },
      { key: 'notifications', title: 'Notificaciones', icon: 'bell-ring-outline', badge: 2, color: colors.APP_BACKGR },
      { key: 'profile', title: 'Perfil', icon: 'face', color: colors.APP_BACKGR },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute, 
    shops: ShopRoute,
    notifications: NotificationRoute,
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