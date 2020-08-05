import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Title } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import moment from 'moment'

class OrderDetailsShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    render() {
       
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={this.hideModal}
        />

        const stageOrder = props =>
            <Button style={{ borderRadius: 20, width: sizes.wp('30%') }}
                mode="contained"
                dark
                color={(this.props.data.etapa === orderStage.PENDING) ? colors.APP_PENDING : (this.props.data.etapa === orderStage.READY) ? colors.APP_GREEN : colors.APP_DELIVERED}
                labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
                {(this.props.data.etapa === orderStage.PENDING) ? 'En Proceso' : (this.props.data.etapa === orderStage.READY) ?
                    'Listo' : 'Entregado'} </Button>

        const takeAway = props => <Text style={styles.rightText}> {(this.props.data.takeAway === 1) ? 'Para llevar' : 'Para comer aquí'}</Text>

        const orderNumber = props => <Text style={styles.rightText}> {this.props.data.numero}</Text>

        const mail = props => <TextTicker style={{ fontSize: 16 }}
            duration={6000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.data.cliente}</TextTicker>

        const total = props => <Text style={styles.rightText}> ${this.props.data.total}</Text>

        const date = props => <Text style={styles.rightText}> {moment(this.props.data.fecha).format("YYYY/MM/DD hh:mm")} hs</Text>

        return (

            <Card style={styles.orderCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-4') }} left={stageOrder} leftStyle={styles.stageOrder} right={Close} rightStyle={styles.close} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Modalidad:" right={takeAway} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del Pedido:" right={orderNumber} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Mail del Cliente:" right={mail} rightStyle={{ width: sizes.wp('47%'), right: sizes.wp('3%'), alignItems: 'flex-end',}} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} />
                <Divider style={styles.divider} />
                <Card.Content style={{ alignSelf: 'center', width: sizes.wp('90%'), }}>
                    <DataTable style={{width: sizes.wp('50%')}}>
                        <DataTableHeader
                            title={'¿De qué se compone el pedido?'}
                            style={{ right: sizes.wp('-4.5%') }}
                        />
                        <DataTableRow style={{}}>
                            <DataTableCell text={'Productos'} type={'header'} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '30%'}}/>
                            <DataTableCell text={'Cantidad'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center' }} />
                            <DataTableCell text={'Agregar'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-7.5%') }} textStyle={{ textAlign: 'center' }} />
                            <DataTableCell text={'Quitar'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-13%') }} textStyle={{ textAlign: 'center' }} />
                        </DataTableRow>
                        <ScrollView style={{ height: sizes.hp('41%') }}>
                            {this.state.items
                                .map(row => (
                                    <DataTableRow key={row.id}>
                                        <DataTableCell text={row.name} borderRight style={{ maxWidth: '30%'}} />
                                        <DataTableCell text={(row.amount).toString()} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center'}} />
                                        <DataTableCell text={'$' + (row.unitPrice).toString()} style={{ maxWidth: '5%', left: sizes.wp('-7.5%') }} textStyle={{ textAlign: 'center' }} />
                                        <DataTableCell text={'$' + (row.amount * row.unitPrice).toString()} style={{ maxWidth: '5%', left: sizes.wp('-13%') }} textStyle={{ textAlign: 'center' }} />
                                    </DataTableRow>
                                ))}
                        </ScrollView>

                    </DataTable>
                </Card.Content>
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                <Divider style={styles.divider} />
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        height: sizes.hp('87%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 0
    },
    close: {
        left: sizes.wp('-2%')
    },
    stageOrder: {
        right: sizes.wp('0%')
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
});

export default OrderDetailsShop;