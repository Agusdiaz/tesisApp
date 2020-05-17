import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, Title, Dialog, IconButton, Divider } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class OrderCardShop extends Component {
    constructor() {
        super();
        this.state = {
            isTakeAway: true,
            orderNumber: 7856,
            mail: 'juan@mail.com',
            total: '$1500',
            time: '20 min',
            visibleDialog: false,
        };
    }

    _showDialog = () => this.setState({ visibleDialog: true });

    _hideDialog = () => this.setState({ visibleDialog: false });

    render() {
        
        const OrderNumber = props => <Text style={styles.rightText}> {this.state.orderNumber} </Text>
        const User = props => <TextTicker style={styles.rightText} 
        duration={5000}
        loop
        animationType='bounce'
        repeatSpacer={50}
        marqueeDelay={1000}>{this.state.mail}</TextTicker>
        const Total = props => <Text style={styles.rightText}> {this.state.total} </Text>
        const Time = props => <Text style={styles.rightText}> {this.state.time} </Text>

        return (

            <Card style={styles.cardContent}>
                <ImageBackground source={require('../../icons/order.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                    <Button mode='outlined' style={styles.takeAwayButton} color={colors.APP_MAIN}>
                     {(this.state.isTakeAway) ? 'Para Llevar' : 'Para Comer Aquí'}   
                    </Button>
                <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del pedido:" right={OrderNumber} rightStyle={styles.rightSide} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Mail del cliente:" right={User} rightStyle={styles.rightSide}/>
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={Total} rightStyle={styles.rightSide} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Tiempo desde creación:" right={Time} rightStyle={styles.rightSide} />
                    <Divider style={styles.divider} />
                    <Card.Actions style={{ margin: 5 }}>
                        <Button
                            style={{ alignSelf: 'center', left: sizes.wp('5%'), width: '38%' }} //ESTANDARIZAR
                            icon="eye"
                            mode="contained"
                            color={colors.APP_MAIN}
                            onPress={() => { }}>
                            Ver Detalle
                </Button>

                        <Button
                            style={{ left: sizes.wp('17%'), width: '38%' }} //ESTANDARIZAR
                            icon="cart-arrow-right"
                            mode="contained"
                            color={colors.APP_MAIN}
                            onPress={this._showDialog}>
                            Entregar
                </Button>
                    </Card.Actions>
                </ImageBackground>

                <Dialog
                    visible={this.state.visibleDialog}
                    onDismiss={this._hideDialog}>
                    <Dialog.Title style={{ alignSelf: 'center' }}>¿Esta seguro que desea entregar el pedido?</Dialog.Title>
                    <Dialog.Actions>
                        <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialog}>Cancelar</Button>
                        <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Card>

        );
    }
}

const styles = StyleSheet.create({
    cardContent: {
        padding: 7,
        borderRadius: 15,
        elevation: 5,
    },
    cardTitle: {
        margin: -9
    },
    divider: {

    },
    rightText: {
        fontSize: 16,
        textAlign: 'left'
    },
    rightSide: {
        right: sizes.wp('4%'),
        width: sizes.wp('42%'),
        alignItems: 'flex-end',
    },
    leftText: {
        fontSize: 18,
    },
    imageOutside: {
        resizeMode: 'contain',
    },
    imageInside: {
        opacity: 0.27,
        borderRadius: 15
    },
    takeAwayButton: {
        width: sizes.wp('50%'), 
        alignSelf: 'center', 
        borderColor: colors.APP_MAIN,
        borderWidth: 2
    }
});

export default OrderCardShop;