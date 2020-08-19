import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { Button, Card, Portal, Dialog, Modal, Divider, ActivityIndicator } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import OrderDetailsShop from './orderDetailsShop'
import { setOrderReadyByShop } from '../../api/orders'
import moment from 'moment'

class OrderCardShop extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {
            loading: false,
            visibleDialogReady: false,
            visibleDialogResponse: false,
            visibleModalDetails: false,
            actionMessage: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async orderReady() {
        if (this._isMounted) {
            this.setState({ loading: true })
            const data = await setOrderReadyByShop(this.props.data.numero, this.props.shop.token)
            this._hideDialogReady()
            if(data.status === 404 || data.status === 500)
                this.setState({ actionMessage: 'Error al actualizar pedido', loading: false })
            else{
                this.setState({ actionMessage: 'Pedido actualizado', loading: false })
                this.props.refreshParent()
            }
            this._showDialogResponse()
        }
    }

    _showDialogReady = () => (this._isMounted) ? this.setState({ visibleDialogReady: true }) : null;
    _hideDialogReady = () => (this._isMounted) ? this.setState({ visibleDialogReady: false }) : null;

    _showModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: true }) : null;
    _hideModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: false }) : null;

    _showDialogResponse = () => (this._isMounted) ? this.setState({ visibleDialogResponse: true }) : null;
    _hideDialogResponse = () => (this._isMounted) ? this.setState({ visibleDialogResponse: false }) : null;

    render() {

        const orderNumber = props => <Text style={styles.rightText}> {this.props.data.numero}</Text>

        const user = props => <TextTicker style={styles.rightText}
            duration={5000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.data.cliente}</TextTicker>

        const total = props => <Text style={styles.rightText}> ${this.props.data.total}</Text>

        const time = props => <Text style={styles.rightText}> {this.props.data.tiempo} min</Text>

        const date = props => <Text style={styles.rightText}>{moment(this.props.data.fecha).format("YYYY/MM/DD HH:mm")} hs</Text>

        return (

            <View>

                <Card style={styles.cardContent}>
                    <ImageBackground source={require('../../icons/order.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                        <Button mode='outlined' style={styles.takeAwayButton} color={colors.APP_MAIN}>
                            {(this.props.data.takeAway === 1) ? 'Para Llevar' : 'Para Comer Aquí'}
                        </Button>
                        <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del pedido:" right={orderNumber} rightStyle={styles.rightSide} />
                        <Divider style={styles.divider} />
                        <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Mail del cliente:" right={user} rightStyle={styles.rightSide} />
                        <Divider style={styles.divider} />
                        <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} rightStyle={styles.rightSide} />
                        <Divider style={styles.divider} />
                        {(this.props.data.etapa !== orderStage.PENDING) ?
                            <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} rightStyle={styles.rightSide}/>
                            :
                            <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Tiempo desde creación:" right={time} rightStyle={styles.rightSide} />
                        }
                        <Divider style={styles.divider} />
                        <Card.Actions style={{ margin: 0, alignSelf: 'center' }}>
                            {(this.props.data.etapa !== orderStage.PENDING) ?
                                <Button
                                    style={{ width: '38%' }}
                                    icon="eye"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showModalDetails}>
                                    Ver Detalle
                                </Button>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <Button
                                        style={{ width: '44%', alignSelf: 'center', left: sizes.wp('0%') }}
                                        icon="eye"
                                        mode="contained"
                                        color={colors.APP_MAIN}
                                        onPress={this._showModalDetails}>
                                        Ver Detalle
                                    </Button>

                                    <Button
                                        style={{ width: '44%', alignSelf: 'center', left: sizes.wp('10%') }}
                                        icon="cart-arrow-right"
                                        mode="contained"
                                        color={colors.APP_MAIN}
                                        onPress={this._showDialogReady}>
                                        Entregar
                                    </Button>
                                </View>
                            }
                        </Card.Actions>
                    </ImageBackground>

                    <Dialog
                        visible={this.state.visibleDialogReady}
                        onDismiss={this._hideDialogReady}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¿Esta seguro que desea entregar el pedido?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogReady}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => this.orderReady()}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Card>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <OrderDetailsShop hideModalFromChild={this._hideModalDetails} data={this.props.data} />
                    </Modal>

                    <Modal dismissable={false}
                        visible={this.state.loading}
                        style={styles.modalActivityIndicator} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
                    </Modal>
                </Portal>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        minHeight: sizes.hp('86%'),
        maxHeight: sizes.hp('93%'),
        //maxHeight: sizes.hp('90%'),
        marginTop: sizes.hp('5%'),
        margin: sizes.hp('2%'),
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
    },
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
        borderRadius: 20,
        width: sizes.wp('45%'),
        alignSelf: 'center',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
        marginBottom: sizes.wp('-1%')
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

export default connect(mapStateToProps)(OrderCardShop);