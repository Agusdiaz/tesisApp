import * as React from 'react';
import { BottomNavigation, Text, } from 'react-native-paper';
import { appStyles, colors } from '../../../../src/index.styles';
import HomeShop from '../../screens/home/homeShop'


const HomeRoute = () => <HomeShop/>;

const StatisticsRoute = () => <Text>Estadísticas</Text>;

const MenuRoute = () => <Text>Perfil</Text>;

export default class NavigationBarScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'orders', title: 'Pedidos', icon: 'receipt', color: colors.APP_BACKGR },
      { key: 'statistics', title: 'Estadísticas', icon: 'chart-bar', color: colors.APP_BACKGR },
      { key: 'profile', title: 'Perfil', icon: 'chef-hat', color: colors.APP_BACKGR }, //icon:'book'
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    orders: HomeRoute, 
    statistics: StatisticsRoute,
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