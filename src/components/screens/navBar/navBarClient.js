import * as React from 'react';
import { BottomNavigation, Text, } from 'react-native-paper';
import { appStyles, colors } from '../../../../src/index.styles';
import HomeClient from '../home/homeClient'
import ProfileClient from '../profile/profileClient'
import LastOrdersClient from '../orderView/lastordersClient'

const HomeRoute = () => <HomeClient/>;

const NotificationRoute = () => <Text>Notificaciones</Text>;

const OrderRoute = () => <LastOrdersClient/>;

const ProfileRoute = () => <ProfileClient/>;

export default class NavigationBarScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'food', color: colors.APP_BACKGR },
      { key: 'notifications', title: 'Notificaciones', icon: 'bell-ring-outline', badge: 2, color: colors.APP_BACKGR },
      { key: 'orders', title: 'Pedidos', icon: 'room-service-outline', color: colors.APP_BACKGR },
      { key: 'profile', title: 'Perfil', icon: 'face-outline', color: colors.APP_BACKGR },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    notifications: NotificationRoute, 
    orders: OrderRoute,
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