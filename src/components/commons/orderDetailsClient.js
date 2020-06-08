import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Title } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class OrderDetailsClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: 7856,
            shopName: 'Nombre del Local',
            stage: 'Listo',
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
            total: '$1500',
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
                color={(this.state.stage === orderStage.PENDING) ? colors.APP_PENDING : (this.state.stage === orderStage.READY) ? colors.APP_GREEN : colors.APP_DELIVERED}
                labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
                {(this.state.stage === orderStage.PENDING) ? 'En Proceso' : (this.state.stage === orderStage.READY) ?
                    'Listo' : 'Entregado'} </Button>

        const orderNumber = props => <Text style={styles.rightText}> {this.state.orderNumber} </Text>

        const Name = props => <TextTicker style={{ fontSize: 16 }}
            duration={6000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.state.shopName}</TextTicker>

        const total = props => <Text style={styles.rightText}> {this.state.total} </Text>

        const date = props => <Text style={styles.rightText}> {this.state.date} </Text>

        return (

            <Card style={styles.orderCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-2') }} left={Close} leftStyle={styles.close} right={stageOrder} rightStyle={styles.stageOrder} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número:" right={orderNumber} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Local:" right={Name} rightStyle={{ width: sizes.wp('54%'), right: sizes.wp('3%'), alignItems: 'flex-end',}} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} />
                <Divider style={styles.divider} />
                <Card.Content style={{ alignItems: 'center', width: sizes.wp('90%'), marginLeft: sizes.wp('-6%') }}>
                    <DataTable style={{width: sizes.wp('100%')}}>
                        <DataTableHeader
                            title={'¿Qué es lo que pediste?'}
                            style={{ right: sizes.wp('-15%') }}
                        />
                        <DataTableRow style={{}}>
                            <DataTableCell text={'Productos'} type={'header'} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '30%'}}/>
                            <DataTableCell text={'Cantidad'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center' }} />
                            <DataTableCell text={'Precio Unit'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-10%') }} textStyle={{ textAlign: 'center' }} />
                            <DataTableCell text={'Precio Total'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-16%') }} textStyle={{ textAlign: 'center' }} />
                        </DataTableRow>
                        <ScrollView style={{ height: sizes.hp('37%') }}>
                            {this.state.items
                                .map(row => (
                                    <DataTableRow key={row.id}>
                                        <DataTableCell text={row.name} borderRight style={{ maxWidth: '30%'}} />
                                        <DataTableCell text={(row.amount).toString()} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center'}} />
                                        <DataTableCell text={'$' + (row.unitPrice).toString()} style={{ maxWidth: '5%', left: sizes.wp('-10%') }} textStyle={{ textAlign: 'center' }} />
                                        <DataTableCell text={'$' + (row.amount * row.unitPrice).toString()} style={{ maxWidth: '5%', left: sizes.wp('-16%') }} textStyle={{ textAlign: 'center' }} />
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
    productCard: {
        height: sizes.hp('80%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 0
    },
    close: {
        left: sizes.wp('-2%')
    },
    stageOrder: {
        right: sizes.wp('7%')
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

export default OrderDetailsClient;