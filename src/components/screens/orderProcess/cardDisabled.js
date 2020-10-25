import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { colors, sizes, orderStage, appStyles } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider } from 'react-native-paper';
import OrderActions from '../../../redux/orders/action'
import { Actions } from 'react-native-router-flux';

class DisabledCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    cleanOrder() {
        this.props.updateTotal(this.props.data.total)
        if (this.props.data.promociones) {
            this.props.data.promociones.map(prom => {
                this.props.removeDisabledPromo(prom.id)
            })
        }
        if (this.props.data.productos) {
            this.props.data.productos.map(prod => {
                this.props.removeDisabledProduct(prod.id)
            })
        }
        if (this.props.data.ingredientes) {
            this.props.data.ingredientes.map(ing => {
                this.props.removeDisabledProductIngredient(ing.id)
                this.props.removeDisabledPromoIngredient(ing.id)
            })
        }
    }

    render() {
        return (
            <View style={[appStyles.container, { top: sizes.hp('7%'), }]} >
                <Card style={styles.orderCard}>
                    <Card.Title style={styles.cardRow} titleStyle={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }} titleNumberOfLines={7}
                        title='Mientras estabas haciendo tu pedido, hubo algunos ingredientes, productos y/o promociones que el local deshabilitó, y por lo tanto no podrás pedir' />
                    <Divider style={styles.divider} />
                    <Card.Content style={{ alignItems: 'center', width: sizes.wp('87%'), alignSelf: 'center' }}>
                        <DataTable style={{ width: sizes.wp('100%'), }}>
                            <DataTableHeader
                                title={'¿Qué se deshabilitó?'}
                                style={{ right: sizes.wp('-16%') }}
                            />
                            <ScrollView style={{ height: sizes.hp('40%') }}>
                                {(this.props.data.ingredientes.length > 0) ?
                                    <View>
                                        <DataTableRow style={{}}>
                                            <DataTableCell text={'INGREDIENTES'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '35%' }} />
                                            <DataTableCell text={'Cantidad Pedida'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '7%' }} minWidth={130} />
                                            <DataTableCell text={'Total descontado'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '7%' }} minWidth={140} />
                                        </DataTableRow>

                                        {this.props.data.ingredientes
                                            .map((row, i) => (
                                                <DataTableRow key={i}>
                                                    <DataTableCell text={row.nombre} borderRight textStyle={{ textAlign: 'center', color: colors.APP_RED }} style={{ maxWidth: '35%' }} />
                                                    <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '7%', alignSelf: 'center' }} minWidth={130} />
                                                    <DataTableCell text={'$' + (row.total).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '7%', alignSelf: 'center' }} minWidth={140} />
                                                </DataTableRow>
                                            ))}
                                    </View>
                                    : null}

                                {(this.props.data.productos.length > 0) ?
                                    <View>
                                        <DataTableRow style={{}}>
                                            <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '35%' }} />
                                            <DataTableCell text={'Cantidad Pedida'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '7%' }} minWidth={130} />
                                            <DataTableCell text={'Total descontado'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '7%' }} minWidth={140} />
                                        </DataTableRow>

                                        {this.props.data.productos
                                            .map((row, i) => (
                                                <DataTableRow key={i}>
                                                    <DataTableCell text={row.nombre} borderRight textStyle={{ textAlign: 'center', color: colors.APP_RED }} style={{ maxWidth: '35%' }} />
                                                    <DataTableCell text={(row.cantidad).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '7%', alignSelf: 'center' }} minWidth={130} />
                                                    <DataTableCell text={'$' + (row.total).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '7%', alignSelf: 'center' }} minWidth={140} />
                                                </DataTableRow>
                                            ))}
                                    </View>
                                    : null}

                                {(this.props.data.promociones.length > 0) ?
                                    <View>
                                        <DataTableRow style={{}}>
                                            <DataTableCell text={'PROMOCIONES'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '35%' }} />
                                            <DataTableCell text={'Cantidad Pedida'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '7%' }} minWidth={130} />
                                            <DataTableCell text={'Total descontado'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '7%' }} minWidth={140} />
                                        </DataTableRow>
                                        {this.props.data.promociones
                                            .map((row, i) => (
                                                <DataTableRow key={i}>
                                                    <DataTableCell text={row.nombre} borderRight textStyle={{ textAlign: 'center', color: colors.APP_RED }} style={{ maxWidth: '35%' }} />
                                                    <DataTableCell text={(row.cantidad).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '7%', alignSelf: 'center' }} minWidth={130} />
                                                    <DataTableCell text={'$' + (row.total).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '7%', alignSelf: 'center' }} minWidth={140} />
                                                </DataTableRow>
                                            ))}
                                    </View>
                                    : null}
                            </ScrollView>
                        </DataTable>
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Title title={`El nuevo total será: $${this.props.data.total}`} />
                    <Divider style={styles.divider} />
                    <Card.Actions style={{ alignSelf: 'center', alignItems: 'center', margin: 7 }}>
                        <Button
                            style={{ marginRight: sizes.wp('13%') }}
                            dark
                            color={colors.APP_MAIN}
                            mode={'contained'}
                            onPress={() => {
                                this.props.deleteOrder()
                                this.props.hideModalFromChild()
                                Actions.navbarclient()
                            }} >
                            Cancelar pedido
                    </Button>

                        <Button
                            style={{}}
                            dark
                            color={colors.APP_MAIN}
                            mode={'contained'}
                            onPress={() => {
                                this.cleanOrder(),
                                this.props.hideModalFromChild()
                            }} >
                            De acuerdo
                    </Button>
                    </Card.Actions>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        height: sizes.hp('76%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 2,
        top: sizes.hp('-8%'),
    },
    cardRow: {
        margin: 2
    },
    divider: {
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
        updateTotal: (total) => dispatch(OrderActions.updateTotal(total)),
        removeDisabledProduct: (id) => dispatch(OrderActions.removeDisabledProduct(id)),
        removeDisabledProductIngredient: (id) => dispatch(OrderActions.removeDisabledProductIngredient(id)),
        removeDisabledPromo: (id) => dispatch(OrderActions.removeDisabledPromo(id)),
        removeDisabledPromoIngredient: (id) => dispatch(OrderActions.removeDisabledPromoIngredient(id)),
        deleteOrder: () => dispatch(OrderActions.deleteOrder()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisabledCard);