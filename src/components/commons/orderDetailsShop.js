import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Title } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class OrderDetailsShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: 7856,
            mail: 'juan@mail.com',
            isTakeAway: true,
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

        const ConditionOrder = props =>
            <Button mode='outlined' style={styles.takeAwayButton} color={colors.APP_MAIN}>
                     {(this.state.isTakeAway) ? 'Para Llevar' : 'Para Comer Aquí'}   
                    </Button>

        const OrderNumber = props => <Text style={styles.rightText}> {this.state.orderNumber} </Text>

        const Mail = props => <TextTicker style={{ fontSize: 16 }}
            duration={6000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.state.mail}</TextTicker>

        const Total = props => <Text style={styles.rightText}> {this.state.total} </Text>

        const Date = props => <Text style={styles.rightText}> {this.state.date} </Text>

        return (

            <Card style={styles.productCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-2') }} left={Close} leftStyle={styles.close} right={ConditionOrder} rightStyle={styles.stageOrder} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del Pedido:" right={OrderNumber} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Mail del Cliente:" right={Mail} rightStyle={{ width: sizes.wp('47%'), right: sizes.wp('3%'), alignItems: 'flex-end',}} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={Date} />
                <Divider style={styles.divider} />
                <Card.Content style={{ alignItems: 'center', width: sizes.wp('90%'), marginLeft: sizes.wp('-6%') }}>
                    <DataTable style={{width: sizes.wp('100%')}}>
                        <DataTableHeader
                            title={'¿De qué se compone el pedido?'}
                            style={{ right: sizes.wp('-6.5%') }}
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
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={Total} />
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
    takeAwayButton: {
        alignSelf: 'center', 
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
        borderRadius: 20, 
        width: sizes.wp('45%'),
        marginBottom: sizes.wp('1%'),
        marginRight: sizes.wp('-1%'),
    },
});

export default OrderDetailsShop;