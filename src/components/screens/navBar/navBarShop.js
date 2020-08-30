import * as React from 'react';
import { connect } from 'react-redux';
import { BottomNavigation, Text, } from 'react-native-paper';
import { appStyles, colors } from '../../../index.styles'
import HomeShop from '../home/homeShop'
import ProfileShop from '../profile/profileShop'
import BadgeActions from '../../../redux/notifications/action'
import DisabledProductsShop from '../menuShop/disabledMenu'
import MenuShop from '../menuShop/selectMenu'

const HomeRoute = () => <HomeShop />;
const MenuRoute = () => <MenuShop />;
const DisabledProductsRoute = () => <DisabledProductsShop />
const ProfileRoute = () => <ProfileShop />;

class NavigationBarScreen extends React.Component {
  state = {
    index: 0,
    routes: this.props.badge.routesShop,
  };

  _handleIndexChange = index => {
    this.setState({ index })
    if (index === 0)
      this.props.updateBadgeShop(null)
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
        shifting={true}
        activeColor={colors.APP_MAIN}
        inactiveColor={colors.APP_INACTIVE}
        barStyle={{ paddingBottom: 20 }}
      >
      </BottomNavigation>
    );
  }
}

function mapStateToProps(state) {
  return {
    badge: state.badge
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBadgeShop: (action) => dispatch(BadgeActions.updateBadgeShop(action)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarScreen)