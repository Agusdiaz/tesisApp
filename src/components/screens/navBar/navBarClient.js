import React, { Component } from 'react';
import { BottomNavigation, Text, } from 'react-native-paper';
import { appStyles, colors } from '../../../../src/index.styles';
import HomeClient from '../home/homeClient'
import ProfileClient from '../profile/profileClient'
import SearchShops from '../shopView/searchShops'
import PendingOrdersClient from '../orderView/pendingOrdersClient'

const HomeRoute = () => <HomeClient />;

const ShopRoute = () => <SearchShops />;

const NotificationRoute = () => <PendingOrdersClient/>;

const ProfileRoute = () => <ProfileClient />;

export default class NavigationBarScreen extends Component {
  state = {
      index: (this.props.page != null) ? this.props.page : 0 ,
      routes: [
        { key: 'home', title: 'Principal', icon: 'food', color: colors.APP_BACKGR },
        { key: 'shops', title: 'Buscar', icon: 'magnify', color: colors.APP_BACKGR },
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


  _hideBadge = index => this.state.routes[this.state.index].badge

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        shifting={true}
        activeColor={colors.APP_MAIN}
        inactiveColor={colors.APP_INACTIVE}
        //getBadge={this._hideBadge}
        barStyle={{ paddingBottom: 20 }}
        style={{ alignSelf: 'stretch' }}
      >
      </BottomNavigation>
    );
  }
}