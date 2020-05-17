import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Button } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Tabs, Tab, } from 'material-bread';
import Animated from 'react-native-reanimated';
import MenuProcess from '../orderProcess/menuProcess'
import ShopCardClient from '../../commons/shopCardClient'

class ChooseMenuScreen extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: null,
            selectedTab: 0,
        };
    }

    setIsOpen = (stateIsOpen) => {
        this.setState({ isOpen: stateIsOpen })
    }

    render() {

        return (
            <View style={appStyles.container}>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
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

                    <Text>Promociones</Text>
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({
    appBar: {
        position: 'absolute',
        width: sizes.wp('100%'),
        //left: sizes.wp('0%'),
        right: 0,
        top: sizes.hp('-7%'),
        borderTopWidth: 2,
        borderColor: colors.APP_MAIN,
    },
    buttonOrder: {
        width: sizes.wp('52%'),
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
});

export default ChooseMenuScreen;