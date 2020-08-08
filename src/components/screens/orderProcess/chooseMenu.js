import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Tabs, Tab, } from 'material-bread';
import MenuProcess from '../orderProcess/menuProcess'
import SalesProcess from '../orderProcess/salesProcess'
import { Actions } from 'react-native-router-flux';

class ChooseMenuScreen extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 0,
        };
    }

    updateScroll = () => {
        this.props.updateScrollFromParent();
    }

    render() {

        return (
            <View style={[appStyles.container, { top: sizes.hp('9%') }]}>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => {
                        this.updateScroll();
                        this.setState({ selectedTab: index });
                    }}
                    backgroundColor={colors.APP_BACKGR}
                    underlineColor={colors.APP_MAIN}

                    actionItems={[
                        <Tab key={1} icon='restaurant-menu' label='Menú' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 0) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                        <Tab key={2} icon='new-releases' label='Promociones' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 1) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                    ]}
                />

                {(this.state.selectedTab === 0) ?
                    <MenuProcess onScroll={this.props.onScroll} />
                    :
                    <SalesProcess onScroll={this.props.onScroll} />
                            
                }

                <TouchableHighlight activeOpacity={0.6}  onPress={() => {Actions.cartorder()}}>
                <Image source={require('../../../icons/cartShop.png')} style={styles.imageFab} />
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    appBar: {
        position: 'absolute',
        width: sizes.wp('100%'),
        //left: sizes.wp('0%'),
        //right: 0,
        top: sizes.hp('-7%'),
        borderTopWidth: 2,
        borderColor: colors.APP_MAIN,
    },
    buttonOrder: {
        width: sizes.wp('52%'),
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    imageFab:{
        width: sizes.wp('27%'),
        height: sizes.hp('12%'),
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: sizes.wp('50%'),
        right: sizes.wp('18.5%'),
        bottom: sizes.hp('18%'),
        resizeMode: 'stretch',
    }
});

export default ChooseMenuScreen;