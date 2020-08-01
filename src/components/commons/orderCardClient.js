import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { Button, Card, Modal, Dialog, Portal, Divider, FAB, TextInput } from 'react-native-paper';
import OrderDetailsClient from './orderDetailsClient'
import moment from 'moment'

class OrderCardClient extends Component {
    constructor() {
        super();
        this.state = {
            mailShare: '',
            visibleDialogTake: false,
            visibleDialogShare: false,
            visibleModalDetails: false,
        }
    }

    _showDialogTake = () => this.setState({ visibleDialogTake: true });
    _hideDialogTake = () => this.setState({ visibleDialogTake: false });

    _showDialogShare = () => this.setState({ visibleDialogShare: true });
    _hideDialogShare = () => this.setState({ visibleDialogShare: false });

    _showModalDetails = () => this.setState({ visibleModalDetails: true });
    _hideModalDetails = () => this.setState({ visibleModalDetails: false });

    render() {
        const orderNumber = props => <Text style={styles.rightText}> {this.props.data.numero} </Text>

        const stageOrder = props => (this.props.data.etapa === orderStage.READY) ? <Button style={{ borderRadius: 20, width: sizes.wp('30%'), marginRight: sizes.wp('3%') }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
            Listo </Button> : (this.props.data.etapa === orderStage.PENDING) ? <Button style={{ borderRadius: 20, width: sizes.wp('30%'), marginRight: sizes.wp('3%') }} mode="contained" color={colors.APP_PENDING} labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
                En proceso </Button> : <Button style={{ borderRadius: 20, width: sizes.wp('30%'), marginRight: sizes.wp('3%') }} mode="contained" color={colors.APP_DELIVERED} labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
                    Entregado </Button>

        const total = props => <Text style={styles.rightText}> ${this.props.data.total} </Text>

        const time = props => <Text style={styles.rightText}> {this.props.data.tiempo} min </Text>

        const date = props => <Text style={styles.rightText}> {moment(this.props.data.fecha).format("YYYY/MM/DD hh:mm")}</Text>

        return (

            <View>

                <Card style={styles.cardContent}>

                    <ImageBackground source={require('../../icons/ticket.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >

                        <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del pedido:" right={orderNumber} />
                        <Divider style={styles.divider} />
                        <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Estado:" right={stageOrder} />
                        <Divider style={styles.divider} />
                        <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                        <Divider style={styles.divider} />
                        {(this.props.data.etapa === orderStage.DELIVERED) ?
                            <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} />
                            :
                            <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Tiempo desde creación:" right={time} />
                        }
                        <Divider style={styles.divider} />
                        <Card.Actions style={{ margin: 5, alignSelf: 'center' }}>
                            {(this.props.data.etapa === orderStage.DELIVERED) ?
                                <Button
                                    style={{ width: '38%' }}
                                    icon="eye"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showModalDetails}>
                                    Ver Detalle
                                </Button>
                                :
                                <View style={{flexDirection: 'row'}}>
                                    <Button
                                        style={{ width: '42%', alignSelf: 'center', marginRight: sizes.wp('5%'), }}
                                        icon="eye"
                                        mode="contained"
                                        color={colors.APP_MAIN}
                                        onPress={this._showModalDetails}>
                                        Ver Detalle
                                    </Button>

                                    <Button
                                        style={{ width: '37%', alignSelf: 'center', marginRight: sizes.wp('5%') }}
                                        icon="cart-arrow-right"
                                        mode="contained"
                                        disabled={(this.props.data.etapa === orderStage.PENDING)}
                                        color={colors.APP_MAIN}
                                        onPress={this._showDialogTake}>
                                        Lo retiré
                                    </Button>

                                    <FAB small icon='share-variant' color={'#FFFFFF'}
                                        style={{ backgroundColor: (this.props.data.etapa === orderStage.PENDING) ? colors.APP_MAIN : colors.APP_INACTIVE_FAB,  }}
                                        disabled={(this.props.data.etapa === orderStage.READY)}
                                        onPress={this._showDialogShare}
                                    />
                                </View>
                            }
                        </Card.Actions>
                    </ImageBackground>

                    <Dialog
                        visible={this.state.visibleDialogTake}
                        onDismiss={this._hideDialogTake}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¿Ya tenés tu pedido?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogTake}>No</Button>
                            <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Portal>
                        <Dialog
                            style={{ margin: 5, top: sizes.hp('-10%') }}
                            visible={this.state.visibleDialogShare}
                            onDismiss={this._hideDialogShare}>
                            <Dialog.Title style={{ alignSelf: 'center' }}>¡Podés compartir tu pedido!</Dialog.Title>
                            <Dialog.Content style={{ alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', fontSize: 14 }}>Solo tenés que ingresar el mail de alguien que también sea un usuario:</Text>
                                <TextInput
                                    style={styles.inputView}
                                    mode='outlined'
                                    label='Mail'
                                    placeholder="ejemplo@mail.com"
                                    theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                    onChangeText={(mailShare) => this.setState({ mailShare })}
                                    value={this.state.mailShare} />
                            </Dialog.Content>
                            <Dialog.Actions style={{ marginTop: sizes.hp('-2%') }}>
                                <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogShare}>Cancelar</Button>
                                <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Compartir</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>

                </Card>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <OrderDetailsClient data={this.props.data} hideModalFromChild={this._hideModalDetails} />
                    </Modal>
                </Portal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
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
    inputView: {
        marginTop: sizes.hp('1%'),
        width: "90%",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 8,
        fontSize: sizes.TEXT_INPUT,
    },
});

function mapStateToProps(state) {
    return {
        user: state.authState
    };
}

export default connect(mapStateToProps)(OrderCardClient);