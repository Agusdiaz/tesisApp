import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Tabs, Tab, } from 'material-bread';
import { Actions } from 'react-native-router-flux';
import Menu from '../../commons/menu'
import ArrowButton from '../../commons/arrowButton';
import ShopCardClient from '../../commons/shopCardClient'
import Sales from '../../commons/salesMenu'

class ShopInformationScreen extends Component {
    constructor() {
        super();
        this.state = {
            areProducts: true, //COMO PASARLO DEL HIJO
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
                    top: (this.state.selectedTab == 0) ? sizes.hp('1.2%') : sizes.hp('8.2%')
                }]}
                    icon="cart-outline"
                    mode="contained"
                    disabled={(this.props.shop.abierto == 0) ? true : (!this.state.areProducts) ? true : false}
                    color={colors.APP_MAIN}
                    onPress={() => Actions.makeorder({ pos: 1 })}>
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

                    <ShopCardClient /> //callbackFromParent={this.setIsOpen}

                    : (this.state.selectedTab === 1) ?
                        <Menu rute={'client'} />
                        :
                        <Sales />
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
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        marginTop: sizes.hp('47.7%'),
        top: sizes.hp('-25%'),
        width: sizes.wp('80%'),
        height: sizes.hp('50%'),
    },
    image: {
        width: 170,
        height: 170,
        marginBottom: sizes.hp('2%'),
        alignSelf: 'center',
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    buttonOrder: {
        width: sizes.wp('52%'),
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
});

const mapStateToProps = state => {
    return {
        user: state.authState.client,
        shop: state.shops.selected
    }
}

export default connect(mapStateToProps)(ShopInformationScreen);