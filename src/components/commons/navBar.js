import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
//import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image, ColorPropType } from 'react-native';
import { appStyles, colors } from '../../../src/index.styles';

const HomeRoute = () => <Text>Home</Text>;

const OrderRoute = () => <Text>Pedidos</Text>;

const ProfileRoute = () => <Text>Perfil</Text>;

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'food', color: colors.APP_BACKGR },
      { key: 'orders', title: 'Pedidos', icon: 'room-service-outline', color: colors.APP_BACKGR },
      { key: 'profile', title: 'Perfil', icon: 'face-outline', color: colors.APP_BACKGR },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
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
        />
    );
  }
}