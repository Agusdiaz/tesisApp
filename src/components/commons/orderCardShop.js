import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { Button, Card, Portal, Dialog, Modal, Divider } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import OrderDetailsShop from './orderDetailsShop'
import { setOrderReadyByShop } from '../../api/orders'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../redux/authState/action'
import { refundOrder, aceptOrder } from '../../api/orders'

class OrderCardShop extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {
            loading: false,
            visibleDialogReady: false,
            visbleDialogCancel: false,
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

    async makeRefund() {
        if (this._isMounted) {
            this._hideDialogCancel()
            this.props.updateLoading(true)
            const data = await refundOrder(this.props.data.numero, this.props.shop.token)
            if (data.status === 500 && data.body.error) {
                this.props.updateLoading(false)
                this.props.logout()
                Actions.logsign({ visible: true })
            } else if (data.status === 500) {
                this.props.updateLoading(false)
                this.props.showDialogResponse(data.body)
            } else {
                this.props.updateLoading(false)
                this.props.refreshParent()
                this.props.showDialogResponse(data.body)
            }
        }
    }

    async aceptOrder() {
        if (this._isMounted) {
            this._hideDialogCancel()
            this.props.updateLoading(true)
            const data = await aceptOrder(this.props.data.numero, this.props.shop.token)
            if (data.status === 500 && data.body.error) {
                this.props.updateLoading(false)
                this.props.logout()
                Actions.logsign({ visible: true })
            } else if (data.status === 500) {
                this.props.updateLoading(false)
                this.props.showDialogResponse(data.body)
            } else {
                this.props.updateLoading(false)
                this.props.refreshParent()
                this.props.showDialogResponse(data.body)
            }
        }
    }

    async orderReady() {
        if (this._isMounted) {
            this._hideDialogReady()
            this.props.updateLoading(true)
            const data = await setOrderReadyByShop(this.props.data.numero, this.props.shop.token)
            this._hideDialogReady()
            if (data.status === 500 && data.body.error) {
                this.props.updateLoading(false)
                this.props.logout()
                Actions.logsign({ visible: true })
            } else if (data.status === 404 || data.status === 500) {
                this.props.updateLoading(false)
                this.props.showDialogResponse('Error al actualizar pedido')
            } else {
                this.props.updateLoading(false)
                this.props.refreshParent()
                this.props.showDialogResponse('Pedido actualizado')
            }
        }
    }

    _showDialogReady = () => (this._isMounted) ? this.setState({ visibleDialogReady: true }) : null;
    _hideDialogReady = () => (this._isMounted) ? this.setState({ visibleDialogReady: false }) : null;

    _showModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: true }) : null;
    _hideModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: false }) : null;

    _showDialogCancel = () => (this._isMounted) ? this.setState({ visibleDialogCancel: true }) : null;
    _hideDialogCancel = () => (this._isMounted) ? this.setState({ visibleDialogCancel: false }) : null;

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
                            <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} rightStyle={styles.rightSide} />
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
                                        icon={(this.props.data.aceptado === 1) ? "cart-arrow-right" : "check"}
                                        mode="contained"
                                        dark
                                        color={(this.props.data.aceptado === 1) ? colors.APP_MAIN : colors.APP_GREEN}
                                        onPress={() => {
                                            if (this.props.data.aceptado === 1) this._showDialogReady()
                                            else this._showDialogCancel()
                                        }}>
                                        {(this.props.data.aceptado === 1) ? 'Entregar' : '¿Aceptar?'}
                                    </Button>
                                </View>
                            }
                        </Card.Actions>
                    </ImageBackground>
                </Card>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogReady}
                        onDismiss={this._hideDialogReady}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Esta seguro que desea entregar el pedido?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogReady}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => this.orderReady()}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={this.state.visibleDialogCancel}
                        onDismiss={this._hideDialogCancel}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Desea aceptar o cancelar el pedido?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('5%') }} color={colors.APP_RED} onPress={() => this.makeRefund()}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => this.aceptOrder()}>Aceptar</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <OrderDetailsShop hideModalFromChild={this._hideModalDetails} data={this.props.data} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCardShop);