import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Button } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Tabs, Tab, } from 'material-bread';
import Menu from '../../commons/menu'
import ArrowButton from '../../commons/arrowButton';
import ShopCardClient from '../../commons/shopCardClient'

class ShopInformationScreen extends Component {
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

                <ArrowButton rute={'navBarClientHome'} />

                <Button style={[styles.buttonOrder, {
                    top: (this.state.selectedTab == 0) ? sizes.hp('1.2%') :
                        (this.state.selectedTab == 1) ? sizes.hp('8.2%') : sizes.hp('1.2%')
                }]}
                    icon="cart-outline"
                    mode="contained"
                    disabled={!this.state.isOpen}
                    color={colors.APP_MAIN}
                    onPress={() => { }}>
                    Hace tu pedido aca
                </Button>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_BACKGR}
                    underlineColor={colors.APP_MAIN}

                    actionItems={[
                        <Tab key={1} icon='info' label='Información' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 0) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                        <Tab key={2} icon='restaurant-menu' label='Menú' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 1) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                        <Tab key={3} icon='new-releases' label='Promociones' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 2) ? colors.APP_MAIN : colors.APP_INACTIVE }} />, //attach-money
                    ]}
                />

                {(this.state.selectedTab === 0) ?

                    <ShopCardClient callbackFromParent={this.setIsOpen} />

                    : (this.state.selectedTab === 1) ?

                        <Menu />

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
        left: 0,
        right: 0,
        top: sizes.hp('12.5%'),
        borderTopWidth: 2,
        borderColor: colors.APP_MAIN,
    },
    buttonOrder: {
        width: sizes.wp('52%'),
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
});

export default ShopInformationScreen;