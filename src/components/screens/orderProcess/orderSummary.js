import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { colors, sizes, orderStage, appStyles } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, Portal, Dialog, TextInput, Paragraph } from 'react-native-paper';
import OrderActions from '../../../redux/orders/action'
import TextTicker from 'react-native-text-ticker'
import { Actions } from 'react-native-router-flux';
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
        }
    }

    onChangeTip = (tip) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < tip.length; i++) {
            if (numbers.indexOf(tip[i]) > -1) {
                newText = newText + tip[i]
                //if (i === tip.length - 1)
                    this.setState({tips: tip.toString()})
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if(tip.length === 0)
            this.setState({tips: ''})
    }

    validateComent(text){
        if (text.trim() === "") {
            this.setState(() => ({ comentError: true, coments: text}));
          } else {
            this.setState(() => ({ comentError: false, coments: text}));
          }
    }

    _showDialogContinue = () => this.setState({ visibleDialogContinue: true });
    _hideDialogContinue = () => this.setState({ visibleDialogContinue: false });

    _showDialogComent = () => this.setState({ visibleDialogComent: true });
    _hideDialogComent = () => this.setState({ visibleDialogComent: false });

    _showDialogTip = () => this.setState({ visibleDialogTip: true });
    _hideDialogTip = () => this.setState({ visibleDialogTip: false });

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
                                            .map(row => (
                                                <DataTableRow key={row.idProducto}>
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
                                            .map(row => (
                                                <DataTableRow key={row.idPromo}>
                                                    <DataTableCell text={(!row.modificado) ? row.nombre : '(*) ' + row.nombre} borderRight textStyle={{ textAlign: 'center', color: (row.modificado) ? colors.APP_MAIN : null }} style={{ maxWidth: '30%' }} />
                                                    <DataTableCell text={(row.cantidad).toString()} textStyle={{ textAlign: 'center', }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={'$' + (row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={100} />
                                                    <DataTableCell text={'$' + (row.cantidad * row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={105} />
                                                </DataTableRow>
                                            ))}
                                    </View>
                                    : null}
                                    <Divider style={styles.divider} />
                                    <Text style={{color: colors.APP_MAIN, fontWeight: 'bold', marginTop: sizes.hp('3%'), left: 10}}>(*) modificaste este producto</Text>
                            </ScrollView>
                        </DataTable>
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Propina:" right={tips} />
                    <Divider style={styles.divider} />
                    <Card.Actions style={{alignSelf: 'center', alignItems: 'center'}}>
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
                    color={colors.APP_MAIN}
                    onPress={() => this._showDialogContinue()}>
                    Continuar
 				</Button>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogContinue}
                        onDismiss={this._hideDialogContinue}>
                        <Dialog.Title style={{ alignSelf: 'center', fontWeight: 'bold' }}>El total es ${this.props.order.total + this.props.order.propina}</Dialog.Title>
                        <Dialog.Content style={{ alignSelf: 'center' }}><Paragraph style={{ fontSize: 16.5 }}>¿Desea modificar su pedido?</Paragraph></Dialog.Content>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogContinue}>Modificar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => { this._hideDialogContinue(),
                                Actions.navbarclient()
                                this.props.deleteOrder()
                                this.nextStepParent() }}>Continuar</Button>
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
                                style={[styles.inputView, {height: sizes.hp('10%'), margin: -5}]}
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
        deleteOrder: () => dispatch(OrderActions.deleteOrder()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);