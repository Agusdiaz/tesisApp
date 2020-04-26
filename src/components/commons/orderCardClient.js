import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, Title, Dialog, IconButton, Divider } from 'react-native-paper';

const orderNumber = props => <Text style={styles.rightText}> 10 </Text>

const total = props => <Text style={styles.rightText}> $10 </Text>

const time = props => <Text style={styles.rightText}> 20 min </Text>

class OrderCardShop extends Component {
    constructor() {
        super();
        this.state = { //PONER METODO PARA SABER EL ESTADO
            orderNumber: 7856,
            isReady: true,
            total: '$1500',
            time: '20 min',
            visibleDialog: false,  
        };
    }

    _showDialog = () => this.setState({ visibleDialog: true });

    _hideDialog = () => this.setState({ visibleDialog: false });

    render() {

        const orderNumber = props => <Text style={styles.rightText}> {this.state.orderNumber} </Text>

        const stateOrder = props => (this.state.isReady) ? <Button style={{ borderRadius: 20, width: sizes.wp('30%'), marginRight: sizes.wp('2%') }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
            Listo </Button> : <Button style={{ borderRadius: 20, width: sizes.wp('30%'), marginRight: sizes.wp('2%') }} mode="contained" color={colors.APP_PENDING} labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
                En proceso </Button>

        const total = props => <Text style={styles.rightText}> {this.state.total} </Text>

        const time = props => <Text style={styles.rightText}> {this.state.time} </Text>

        return (

            <Card style={styles.cardContent}>
                <ImageBackground source={require('../../icons/ticket.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del pedido:" right={orderNumber} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Estado:" right={stateOrder} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Tiempo desde creación:" right={time} />
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
                            disabled={!this.state.isReady}
                            color={colors.APP_MAIN}
                            onPress={this._showDialog}>
                            Retirado
                </Button>
                    </Card.Actions>
                </ImageBackground>

                <Dialog
                    visible={this.state.visibleDialog}
                    onDismiss={this._hideDialog}>
                    <Dialog.Title style={{ alignSelf: 'center' }}>¿Ya tenés tu pedido?</Dialog.Title>
                    <Dialog.Actions>
                        <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialog}>No</Button>
                        <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Sí</Button>
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
        margin: -5
    },
    divider: {

    },
    rightText: {
        fontSize: 16,
        right: sizes.wp('3%'),
    },
    leftText: {
        fontSize: 18,
    },
    imageOutside: {
        resizeMode: 'contain',
    },
    imageInside: {
        opacity: 0.3,
        borderRadius: 15
    },
});

export default OrderCardShop;