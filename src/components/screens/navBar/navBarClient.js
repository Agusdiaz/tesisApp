import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BottomNavigation, Text, Badge } from 'react-native-paper';
import { appStyles, colors } from '../../../../src/index.styles';
import HomeClient from '../home/homeClient'
import ProfileClient from '../profile/profileClient'
import SearchShops from '../shopView/searchShops'
import PendingOrdersClient from '../orderView/pendingOrdersClient'
import BadgeActions from '../../../redux/notifications/action'

const HomeRoute = () => <HomeClient />;

const ShopRoute = () => <SearchShops />;

const NotificationRoute = () => <PendingOrdersClient />;

const ProfileRoute = () => <ProfileClient />;

class NavigationBarScreen extends Component {
  state = {
    index: (this.props.page != null) ? this.props.page : 0,
    routes: this.props.badge.routesClient,
  };

  _handleIndexChange = index => {
    this.setState({ index })
    if (index === 2)
      this.props.updateBadgeClient(null)
  };

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
        shifting={true}
        activeColor={colors.APP_MAIN}
        inactiveColor={colors.APP_INACTIVE}
        barStyle={{ paddingBottom: 20 }}
        style={{ alignSelf: 'stretch' }}
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
    updateBadgeClient: (action) => dispatch(BadgeActions.updateBadgeClient(action)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarScreen)