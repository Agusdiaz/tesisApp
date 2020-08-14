import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { colors, sizes, orderStage, appStyles } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, Portal, Dialog, TextInput, Paragraph } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: 7856,
            shopName: 'Nombre del Local',
            date: '24/03/2020 a la(s) 20:20hs',
            items: [
                {
                    id: 1,
                    name: 'Producto 1',
                    amount: 1,
                    unitPrice: 600,
                }, {
                    id: 2,
                    name: 'Producto 2',
                    amount: 1,
                    unitPrice: 700,
                }, {
                    id: 3,
                    name: 'Producto 3',
                    amount: 2,
                    unitPrice: 100,
                },],
            promociones: [],
            isTakeAway: false,
            tips: 0,
            total: 1500,
            visibleDialogContinue: false,
            visibleDialogTip: false,
        }
    }

    handleButtons = (value) => {
        if (value != null)
            this.setState({ isTakeAway: value })
    }

    onChangeTip = (tip) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < tip.length; i++) {
            if (numbers.indexOf(tip[i]) > -1) {
                newText = newText + tip[i]
                if (i == tip.length - 1)
                    this.setState({ tips: parseFloat(tip) });
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
    }

    _showDialogContinue = () => this.setState({ visibleDialogContinue: true });
    _hideDialogContinue = () => this.setState({ visibleDialogContinue: false });

    _showDialogTip = () => this.setState({ visibleDialogTip: true });
    _hideDialogTip = () => this.setState({ visibleDialogTip: false });

    nextStepParent = () => {
        this.props.nextStepParent();
    }

    render() {

        const orderNumber = props => <Text style={styles.rightText}> {this.state.orderNumber} </Text>

        const Name = props => <TextTicker style={{ fontSize: 16 }}
            duration={6000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.state.shopName}</TextTicker>

        const tips = props => <View><Text style={{ fontSize: 16, right: sizes.wp('12%'), }}> ${this.state.tips} </Text>
            <FAB style={styles.fabTips}
                color={colors.APP_BACKGR}
                small
                icon="plus"
                onPress={this._showDialogTip}
            />
        </View>

        const total = props => <Text style={styles.rightText}> ${this.state.total} </Text>

        const date = props => <Text style={styles.rightText}> {this.state.date} </Text>

        return (
            <View style={[appStyles.container, { top: sizes.hp('7%'), }]} >
                <Card style={styles.orderCard}>
                    <Card.Actions style={styles.actionsTakeAway}>
                        <Button
                            style={styles.takeAwayButtons}
                            dark
                            color={colors.APP_MAIN}
                            mode={(!this.state.isTakeAway) ? 'contained' : 'text'}
                            onPress={() => this.handleButtons(false)}>
                            Para comer acá
                    </Button>
                        <Button
                            style={styles.takeAwayButtons}
                            dark
                            color={colors.APP_MAIN}
                            mode={(this.state.isTakeAway) ? 'contained' : 'text'}
                            onPress={() => this.handleButtons(true)}>
                            Para llevar
                    </Button>
                    </Card.Actions>
                    <Card.Title style={[styles.cardTitle, { marginTop: sizes.hp('-2%') }]} titleStyle={styles.leftText} title="Número Pedido:" right={orderNumber} />
                    <Divider style={styles.divider} />
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
                                {(this.state.promociones !== null) ?
                                    <View>
                                        <DataTableRow style={{}}>
                                            <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                            <DataTableCell text={'Precio Unit'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={100} />
                                            <DataTableCell text={'Precio Total'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={105} />
                                        </DataTableRow>

                                        {this.state.items
                                            .map(row => (
                                                <DataTableRow key={row.id}>
                                                    <DataTableCell text={(row.modificado) ? <Text><Text style={{ color: colors.APP_MAIN, fontWeight: 'bold' }}>(*) </Text>{row.name}</Text>
                                                        : row.name} borderRight style={{ maxWidth: '30%' }} textStyle={{ textAlign: 'center' }} />
                                                    <DataTableCell text={(row.amount).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={'$' + (row.unitPrice).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={100} />
                                                    <DataTableCell text={'$' + (row.amount * row.unitPrice).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={105} />
                                                </DataTableRow>
                                            ))}
                                    </View>
                                    : null}

                                {(this.state.promociones.length > 0) ?
                                    <View>
                                        <DataTableRow style={{}}>
                                            <DataTableCell text={'PROMOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                            <DataTableCell text={'Precio Unit'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={100} />
                                            <DataTableCell text={'Precio Total'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={105} />
                                        </DataTableRow>
                                        {this.state.promociones
                                            .map(row => (
                                                <DataTableRow key={row.id}>
                                                    <DataTableCell text={(row.modificado) ? <Text><Text style={{ color: colors.APP_MAIN, fontWeight: 'bold' }}>(*) </Text>{row.name}</Text>
                                                        : row.name} borderRight style={{ maxWidth: '30%' }} textStyle={{ textAlign: 'center' }} />
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
                        <Dialog.Title style={{ alignSelf: 'center', fontWeight: 'bold' }}>El total es ${this.state.total + this.state.tips}</Dialog.Title>
                        <Dialog.Content style={{ alignSelf: 'center' }}><Paragraph style={{ fontSize: 16.5 }}>¿Desea modificar su pedido?</Paragraph></Dialog.Content>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogContinue}>Modificar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => { this._hideDialogContinue(), this.nextStepParent() }}>Continuar</Button>
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
                                placeholder="$"
                                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                onChangeText={(tip) => this.onChangeTip(tip)}
                                value={this.state.tips} />
                        </Dialog.Content>
                        <Dialog.Actions style={{ marginTop: sizes.hp('-2%') }}>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogTip}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialogTip()
                            }}>Agregar</Button>
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

export default OrderSummary;