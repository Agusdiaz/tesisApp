import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Button } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Tabs, Tab, } from 'material-bread';
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
        this.setState({ isOpen: stateIsOpen})
    }

    render() {

        return (
            <View style={appStyles.container}>

                <ArrowButton rute={'navBarClientHome'} />

                <Button style={styles.buttonOrder}
                    icon="cart-outline"
                    mode="contained"
                    disabled={!this.state.isOpen}
                    color={colors.APP_MAIN}
                    onPress={() => { }}>
                    Hace tu pedido acá
                </Button>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_MAIN}

                    actionItems={[
                        <Tab key={1} icon='info' label='Información' />,
                        <Tab key={2} icon='restaurant-menu' label='Menú' />,
                        <Tab key={3} icon='new-releases' label='Promociones' />, //attach-money
                    ]}
                />

                {(this.state.selectedTab === 0) ?

                    <ShopCardClient callbackFromParent={this.setIsOpen}/>

                    : (this.state.selectedTab === 1) ?

                        <Text>Menu</Text>

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
    },
    buttonOrder: {
        width: sizes.wp('52%'),
        alignSelf: 'center',
        justifyContent: 'flex-start',
        top: 1
    },
});

export default ShopInformationScreen;