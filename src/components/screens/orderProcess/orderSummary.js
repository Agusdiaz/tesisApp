import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { colors, sizes, orderStage, appStyles } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, Portal, Dialog, TextInput, Paragraph, Modal, ActivityIndicator } from 'react-native-paper';
import OrderActions from '../../../redux/orders/action'
import TextTicker from 'react-native-text-ticker'
import { Actions } from 'react-native-router-flux';
import { insertOrder, validateClosing } from '../../../api/orders'
import UserActions from '../../../redux/authState/action'
import Disabled from './cardDisabled'
import moment from 'moment'

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tips: '',
            coments: '',
            comentError: true,
            visibleDialogContinue: false,
            visibleDialogTip: false,
            visibleDialogComent: false,
            visibleDialogResponse: false,
            visibleModalDisabled: false,
            visibleDialogClosing: false,
            disabled: null,
            loading: false,
            actionMessage: '',
            status: null,
        }
    }

    async validateClosingShop(){
        const data = await validateClosing(this.props.shop.cuit, this.props.user.token)
        if(data.status === 200 && data.body) this._showDialogClosing()
        else this.makeOrder()
    }

    async makeOrder() {
        this.setState({ loading: true })
        //setTimeout(() => { this.setState({ loading: false }) }, 1500);
        this.props.order.cuit = this.props.shop.cuit
        this.props.order.mail = this.props.user.mail
        const data = await insertOrder(this.props.order, this.props.user.token)
        if (data.status === 500 && data.body.error) {
            this.setState({ loading: false })
            this.props.deleteOrder()
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500) {
            this.setState({ loading: false, actionMessage: 'Error al crear pedido. Inténtalo nuevamente.' })
            this._showDialogResponse()
        } else if (data.status === 405) {
            this.setState({ loading: false, actionMessage: 'El local ha cerrado. ¿Desea realizar otro pedido?', status: data.status })
            this._showDialogResponse()
        } else if (data.status === 401) {
            this.setState({ loading: false })
            var disabled = {
                promociones: [],
                productos: [],
                ingredientes: [],
                total: this.props.order.total,
            }
            if (data.body.productos) {
                disabled.productos = data.body.productos.map(id => {
                    return {
                        id: id,
                        nombre: null,
                        cantidad: 0,
                        total: 0,
                    }
                })
                if (data.body.ingredientes) {
                    disabled.ingredientes = data.body.ingredientes.map(id => {
                        return {
                            id: id,
                            nombre: null,
                            cantidad: 0,
                            total: 0,
                        }
                    })
                }
                disabled.productos.map(prod1 => {
                    this.props.order.productos.map(prod2 => {
                        var eliminado = false
                        if (prod1.id === prod2.idProducto) {
                            eliminado = true
                            prod1.nombre = prod2.nombre
                            prod1.cantidad = prod1.cantidad + prod2.cantidad
                            prod1.total = prod1.total + prod2.cantidad * prod2.precio
                            disabled.total = disabled.total - prod2.cantidad * prod2.precio
                        }
                        if (data.body.ingredientes && !eliminado) {
                            disabled.ingredientes.map(ing1 => {
                                prod2.ingredientes.map(ing2 => {
                                    if (ing1.id === ing2.idIngrediente) {
                                        if (prod2.selectivo === 1 && prod2.ingredientes.length - 1 === 0) {
                                            prod1.nombre = prod2.nombre
                                            prod1.cantidad = prod1.cantidad + prod2.cantidad
                                            prod1.total = prod1.total + prod2.cantidad * prod2.precio
                                            disabled.total = disabled.total - prod2.cantidad * prod2.precio
                                        } else {
                                            ing1.nombre = ing2.nombre
                                            if (ing2.cantidad !== null && ing2.precio !== null) {
                                                ing1.cantidad = ing1.cantidad + ing2.cantidad
                                                ing1.total = ing1.total + ing2.cantidad * ing2.precio
                                                disabled.total = disabled.total - ing2.cantidad * ing2.precio
                                            }
                                        }
                                    }
                                })
                            })
                        }
                    })
                })
                disabled.productos = disabled.productos.filter(obj => obj.nombre !== null)
            } else if (data.body.ingredientes) {
                disabled.ingredientes = data.body.ingredientes.map(id => {
                    return {
                        id: id,
                        nombre: null,
                        cantidad: 0,
                        total: 0,
                    }
                })
                disabled.ingredientes.map(ing1 => {
                    if (this.props.order.productos.length > 0) {
                        this.props.order.productos.map(prod => {
                            prod.ingredientes.map(ing2 => {
                                if (ing1.id === ing2.idIngrediente) {
                                    if (prod.selectivo === 1 && prod.ingredientes.length - 1 === 0) {
                                        var i = disabled.productos.findIndex(x => x.id === prod.idProducto)
                                        if (i === -1) {
                                            disabled.productos.push({
                                                id: prod.idProducto, nombre: prod.nombre, cantidad: prod.cantidad,
                                                total: prod.cantidad * prod.precio
                                            })
                                        } else {
                                            disabled.productos[i].cantidad = disabled.productos[i].cantidad + prod.cantidad
                                            disabled.productos[i].total = disabled.productos[i].total + prod.cantidad * prod.precio
                                        }
                                        disabled.total = disabled.total - prod.cantidad * prod.precio
                                    }
                                    ing1.nombre = ing2.nombre
                                    if (ing2.cantidad !== null && ing2.precio !== null) {
                                        ing1.cantidad = ing1.cantidad + ing2.cantidad
                                        ing1.total = ing1.total + ing2.cantidad * ing2.precio
                                        disabled.total = disabled.total - ing2.cantidad * ing2.precio
                                    }
                                }
                            })
                        })
                    } else {
                        this.props.order.promociones.map(promo => {
                            promo.productos.map(prod => {
                                prod.ingredientes.map(ing2 => {
                                    if (ing1.id === ing2.idIngrediente) {
                                        if (prod.selectivo === 1 && prod.ingredientes.length - 1 === 0) {
                                            var i = disabled.productos.findIndex(x => x.id === prod.idProducto)
                                            if (i === -1) {
                                                disabled.productos.push({
                                                    id: prod.idProducto, nombre: prod.nombre, cantidad: prod.cantidad,
                                                    total: prod.cantidad * prod.precio
                                                })
                                            } else {
                                                disabled.productos[i].cantidad = disabled.productos[i].cantidad + prod.cantidad
                                                disabled.productos[i].total = disabled.productos[i].total + prod.cantidad * prod.precio
                                            }
                                            disabled.total = disabled.total - prod.cantidad * prod.precio
                                        }
                                        ing1.nombre = ing2.nombre
                                        if (ing2.cantidad !== null && ing2.precio !== null) {
                                            ing1.cantidad = ing1.cantidad + ing2.cantidad
                                            ing1.total = ing1.total + ing2.cantidad * ing2.precio
                                            disabled.total = disabled.total - ing2.cantidad * ing2.precio
                                        }
                                    }
                                })
                            })
                        })
                    }

                })
                disabled.ingredientes = disabled.ingredientes.filter(obj => obj.nombre !== null)
            }
            if (this.props.order.promociones.length > 0 && disabled.productos.length > 0) {
                disabled.productos.map(prod => {
                    this.props.order.promociones.map(prom => {
                        if (prom.productos.findIndex(x => x.idProducto === prod.id) !== -1) {
                            disabled.promociones.push({
                                id: prom.idPromo,
                                nombre: null,
                                cantidad: 0,
                                total: 0,
                            })
                        }
                    })
                })
            }
            if (data.body.promociones || disabled.promociones.length > 0) {
                if (data.body.promociones) {
                    disabled.promociones = data.body.promociones.map(id => {
                        return {
                            id: id,
                            nombre: null,
                            cantidad: 0,
                            total: 0,
                        }
                    })
                }
                disabled.promociones.map(prom1 => {
                    this.props.order.promociones.map(prom2 => {
                        if (prom1.id === prom2.idPromo) {
                            prom1.nombre = prom2.nombre
                            prom1.cantidad = prom1.cantidad + prom2.cantidad
                            prom1.total = prom1.total + prom2.cantidad * prom2.precio
                            disabled.total = disabled.total - prom2.cantidad * prom2.precio
                        }
                    })
                })
            }
            this.setState({ disabled: disabled })
            this._showModalDisabled()
        } else {
            this.setState({ loading: false })
            this.props.setOrderNumber(data.body)
            this.nextStepParent()
        }
    }

    onChangeTip = (tip) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < tip.length; i++) {
            if (numbers.indexOf(tip[i]) > -1) {
                newText = newText + tip[i]
                //if (i === tip.length - 1)
                this.setState({ tips: tip })
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if (tip.length === 0)
            this.setState({ tips: '' })
    }

    validateComent(text) {
        if (text.length > 300)
            Alert.alert('Texto demasiado largo')
        else if (text.trim() === "") {
            this.setState(() => ({ comentError: true, coments: text }));
        } else {
            this.setState(() => ({ comentError: false, coments: text }));
        }
    }

    _showDialogContinue = () => this.setState({ visibleDialogContinue: true });
    _hideDialogContinue = () => this.setState({ visibleDialogContinue: false });

    _showDialogClosing = () => this.setState({ visibleDialogClosing: true });
    _hideDialogClosing = () => this.setState({ visibleDialogClosing: false });

    _showDialogComent = () => this.setState({ visibleDialogComent: true });
    _hideDialogComent = () => this.setState({ visibleDialogComent: false });

    _showDialogTip = () => this.setState({ visibleDialogTip: true });
    _hideDialogTip = () => this.setState({ visibleDialogTip: false });

    _showDialogResponse = () => this.setState({ visibleDialogResponse: true });
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false });

    _showModalDisabled = () => this.setState({ visibleModalDisabled: true });
    _hideModalDisabled = () => this.setState({ visibleModalDisabled: false });

    nextStepParent = () => {
        this.props.nextStepParent();
    }

    render() {
        const Name = props => <TextTicker style={{ fontSize: 16 }}
            duration={6000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.shop.nombre}</TextTicker>

        const tips = props => <View><Text style={{ fontSize: 16, right: sizes.wp('12%'), }}> ${this.props.order.propina} </Text>
            <FAB style={styles.fabTips}
                color={colors.APP_BACKGR}
                small
                icon="plus"
                onPress={this._showDialogTip}
            />
        </View>

        const total = props => <Text style={styles.rightText}> ${this.props.order.total} </Text>

        const date = props => <Text style={styles.rightText}> {moment(new Date()).format("YYYY/MM/DD HH:mm")} hs</Text>

        return (
            <View style={[appStyles.container, { top: sizes.hp('7%'), }]} >
                <Card style={styles.orderCard}>
                    <Card.Actions style={styles.actionsTakeAway}>
                        <Button
                            style={styles.takeAwayButtons}
                            dark
                            color={colors.APP_MAIN}
                            mode={(!this.props.order.takeAway) ? 'contained' : 'text'}
                            onPress={() => this.props.updateTakeAway(false)}>
                            Para comer acá
                    </Button>
                        <Button
                            style={styles.takeAwayButtons}
                            dark
                            color={colors.APP_MAIN}
                            mode={(this.props.order.takeAway) ? 'contained' : 'text'}
                            onPress={() => this.props.updateTakeAway(true)}>
                            Para llevar
                    </Button>
                    </Card.Actions>
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Local:" right={Name} rightStyle={{ width: sizes.wp('54%'), right: sizes.wp('3%'), alignItems: 'flex-end', }} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} />
                    <Divider style={styles.divider} />
                    <Card.Content style={{ alignItems: 'center', width: sizes.wp('97%'), marginLeft: sizes.wp('-6%') }}>
                        <DataTable style={{ width: sizes.wp('100%') }}>
                            <DataTableHeader
                                title={'¿Qué es lo que pediste?'}
                                style={{ right: sizes.wp('-17%') }}
                            />
                            <ScrollView style={{ height: sizes.hp('31%') }}>
                                {(this.props.order.productos.length > 0) ?
                                    <View>
                                        <DataTableRow style={{}}>
                                            <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                            <DataTableCell text={'Precio Unit'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={100} />
                                            <DataTableCell text={'Precio Total'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={105} />
                                        </DataTableRow>

                                        {this.props.order.productos
                                            .map((row, i) => (
                                                <DataTableRow key={i}>
                                                    <DataTableCell text={(!row.modificado) ? row.nombre : '(*) ' + row.nombre} borderRight textStyle={{ textAlign: 'center', color: (row.modificado) ? colors.APP_MAIN : null }} style={{ maxWidth: '30%' }} />
                                                    <DataTableCell text={(row.cantidad).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={'$' + (row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={100} />
                                                    <DataTableCell text={'$' + (row.cantidad * row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={105} />
                                                </DataTableRow>
                                            ))}
                                    </View>
                                    : null}

                                {(this.props.order.promociones.length > 0) ?
                                    <View>
                                        <DataTableRow style={{}}>
                                            <DataTableCell text={'PROMOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                            <DataTableCell text={'Precio Unit'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={100} />
                                            <DataTableCell text={'Precio Total'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={105} />
                                        </DataTableRow>
                                        {this.props.order.promociones
                                            .map((row, i) => (
                                                <DataTableRow key={i}>
                                                    <DataTableCell text={(!row.modificado) ? row.nombre : '(*) ' + row.nombre} borderRight textStyle={{ textAlign: 'center', color: (row.modificado) ? colors.APP_MAIN : null }} style={{ maxWidth: '30%' }} />
                                                    <DataTableCell text={(row.cantidad).toString()} textStyle={{ textAlign: 'center', }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={'$' + (row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={100} />
                                                    <DataTableCell text={'$' + (row.cantidad * row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={105} />
                                                </DataTableRow>
                                            ))}
                                    </View>
                                    : null}
                                <Divider style={styles.divider} />
                                <Text style={{ color: colors.APP_MAIN, fontWeight: 'bold', marginTop: sizes.hp('3%'), marginBottom: sizes.hp('1%'), left: 10 }}>(*) modificaste este producto</Text>
                            </ScrollView>
                        </DataTable>
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Propina:" right={tips} />
                    <Divider style={styles.divider} />
                    <Card.Actions style={{ alignSelf: 'center', alignItems: 'center' }}>
                        <Button
                            style={{}}
                            dark
                            color={colors.APP_MAIN}
                            mode={'contained'}
                            onPress={this._showDialogComent} >
                            Dejá un comentario
                    </Button>
                    </Card.Actions>
                </Card>

                <Button
                    style={{ top: sizes.hp('-6%'), right: sizes.wp('-23%'), width: '50%' }}
                    icon="arrow-right-bold-outline"
                    mode="contained"
                    disabled={this.props.order.productos.length === 0 && this.props.order.promociones.length === 0}
                    color={colors.APP_MAIN}
                    onPress={() => this._showDialogContinue()}>
                    Continuar
 				</Button>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogContinue}
                        onDismiss={this._hideDialogContinue}>
                        <Dialog.Title style={{ alignSelf: 'center', fontWeight: 'bold' }}>El total es ${this.props.order.total + this.props.order.propina}</Dialog.Title>
                        <Dialog.Content style={{ alignSelf: 'center' }}><Paragraph style={{ fontSize: 18, textAlign: 'center' }}>
                            Una vez que comience con el pago no podrá modificar el pedido</Paragraph></Dialog.Content>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogContinue}>Modificar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialogContinue()
                                this.validateClosingShop()
                            }}>Continuar</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={this.state.visibleDialogClosing}
                        onDismiss={this._hideDialogClosing}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center'}}>Es posible que el local este próximo a cerrar, ¿qué desea hacer?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={() => {this.props.deleteOrder()
                            this._hideDialogClosing()
                            Actions.navbarclient()}}>Cancelar pedido</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialogClosing()
                                this.makeOrder()
                            }}>Pedir igualmente</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        style={{ margin: 5 }}
                        visible={this.state.visibleDialogTip}
                        onDismiss={this._hideDialogTip}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¡Dejá tu propina!</Dialog.Title>
                        <Dialog.Content style={{ alignItems: 'center' }}>
                            <TextInput
                                style={styles.inputView}
                                mode='outlined'
                                label='Cantidad'
                                placeholder='$'
                                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                onChangeText={(tip) => this.onChangeTip(tip)}
                                value={this.state.tips} />
                        </Dialog.Content>
                        <Dialog.Actions style={{ marginTop: sizes.hp('-2%') }}>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogTip}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} disabled={this.state.tips === ''} onPress={() => {
                                this.props.updateTips(parseFloat(this.state.tips))
                                this._hideDialogTip()
                            }}>Agregar</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        style={{ margin: 5, marginBottom: sizes.hp('5%') }}
                        visible={this.state.visibleDialogComent}
                        onDismiss={this._hideDialogComent}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>Podés dejar un comentario acerca de tu pedido</Dialog.Title>
                        <Dialog.Content style={{ alignItems: 'center' }}>
                            <TextInput
                                style={[styles.inputView, { height: sizes.hp('10%'), margin: -5 }]}
                                mode='outlined'
                                label='Comentá'
                                multiline
                                numberOfLines={5}
                                placeholder='Comentá'
                                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                onChangeText={(text) => this.validateComent(text)}
                                value={this.state.coments} />
                        </Dialog.Content>
                        <Dialog.Actions style={{ marginTop: sizes.hp('-2%') }}>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogComent}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} disabled={this.state.comentError} onPress={() => {
                                this.props.setComents(this.state.coments)
                                this._hideDialogComent()
                            }}>Aceptar</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            {(this.state.status !== 405) ?
                                <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={() => {
                                        Actions.navbarclient()
                                        this.props.deleteOrder()
                                        this._hideDialogResponse()
                                    }}>No</Button>
                                    <Button color={colors.APP_GREEN} onPress={() => {
                                        Actions.makeorder()
                                        this.props.deleteOrder()
                                        this._hideDialogResponse()
                                    }}>Sí</Button>
                                </View>
                            }
                        </Dialog.Actions>
                    </Dialog>

                    <Modal dismissable={false}
                        visible={this.state.loading}
                        style={styles.modalActivityIndicator} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
                    </Modal>

                    <Modal contentContainerStyle={{}} visible={this.state.visibleModalDisabled} dismissable={false}>
                        <Disabled hideModalFromChild={this._hideModalDisabled} data={this.state.disabled} />
                    </Modal>

                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        height: sizes.hp('74%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 2,
        top: sizes.hp('-8%'),
    },
    modalView: {
        marginTop: sizes.hp('0%'),
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
    actionsTakeAway: {
        margin: -2
    },
    takeAwayButtons: {
        width: sizes.wp('44%'),
        top: sizes.hp('-0.5%'),
        right: sizes.wp('2.7%')
    },
    cardTitle: {
        marginTop: -11,
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
    fabTips: {
        position: 'absolute',
        alignSelf: 'center',
        margin: 10,
        right: sizes.wp('-1%'),
        top: sizes.hp('-2.2%'),
        backgroundColor: colors.APP_MAIN,
        alignItems: 'center'
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
        user: state.authState.client,
        shop: state.shops.selected,
        order: state.order
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProductOrder: (product) => dispatch(OrderActions.setProductOrder(product)),
        updateTotal: (total) => dispatch(OrderActions.updateTotal(total)),
        updateTakeAway: (takeAway) => dispatch(OrderActions.updateTakeAway(takeAway)),
        updateTips: (tips) => dispatch(OrderActions.updateTips(tips)),
        setComents: (coment) => dispatch(OrderActions.setComents(coment)),
        setCuitAndMail: (mail, cuit) => dispatch(OrderActions.setCuitAndMail(mail, cuit)),
        deleteOrder: () => dispatch(OrderActions.deleteOrder()),
        setOrderNumber: (number) => dispatch(OrderActions.setOrderNumber(number)),
        logout: () => dispatch(UserActions.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);