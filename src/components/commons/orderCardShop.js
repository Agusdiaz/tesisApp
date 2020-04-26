import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, Title, Dialog, IconButton, Divider } from 'react-native-paper';

const orderNumber = props => <Text style={styles.rightText}> 10 </Text>
const user = props => <Text style={styles.rightText}> juan@mail.com </Text>
const total = props => <Text style={styles.rightText}> $10 </Text>
const time = props => <Text style={styles.rightText}> 20 min </Text>


class OrderCardShop extends Component {
    constructor() {
        super();
        this.state = {
            visibleDialog: false,
        };
    }

    _showDialog = () => this.setState({ visibleDialog: true });

    _hideDialog = () => this.setState({ visibleDialog: false });

    render() {
        return (

            <Card style={styles.cardContent}>
                <ImageBackground source={require('../../icons/ticket.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del pedido:" right={orderNumber} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Mail del cliente:" right={user} />
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