import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, orderStage, appStyles } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Title } from 'react-native-paper';
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
            total: '$1500',
        }
    }

    render() {

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
            <View style={[appStyles.container, { top: sizes.hp('7%'), }]} >
                <Card style={styles.orderCard}>
                    <Card.Title style={[styles.cardTitle, { marginTop: sizes.hp('-2%') }]} titleStyle={styles.leftText} title="Número:" right={orderNumber} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Local:" right={Name} rightStyle={{ width: sizes.wp('54%'), right: sizes.wp('3%'), alignItems: 'flex-end', }} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} />
                    <Divider style={styles.divider} />
                    <Card.Content style={{ alignItems: 'center', width: sizes.wp('97%'), marginLeft: sizes.wp('-6%') }}>
                        <DataTable style={{ width: sizes.wp('100%') }}>
                            <DataTableHeader
                                title={'¿Qué es lo que pediste?'}
                                style={{ right: sizes.wp('-15%') }}
                            />
                            <DataTableRow style={{}}>
                                <DataTableCell text={'Productos'} type={'header'} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '30%' }} />
                                <DataTableCell text={'Cantidad'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center' }} />
                                <DataTableCell text={'Precio Unit'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-10%') }} textStyle={{ textAlign: 'center' }} />
                                <DataTableCell text={'Precio Total'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-16%') }} textStyle={{ textAlign: 'center' }} />
                            </DataTableRow>
                            <ScrollView style={{ height: sizes.hp('33%') }}>
                                {this.state.items
                                    .map(row => (
                                        <DataTableRow key={row.id}>
                                            <DataTableCell text={row.name} borderRight style={{ maxWidth: '30%' }} />
                                            <DataTableCell text={(row.amount).toString()} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center' }} />
                                            <DataTableCell text={'$' + (row.unitPrice).toString()} style={{ maxWidth: '5%', left: sizes.wp('-10%') }} textStyle={{ textAlign: 'center' }} />
                                            <DataTableCell text={'$' + (row.amount * row.unitPrice).toString()} style={{ maxWidth: '5%', left: sizes.wp('-16%') }} textStyle={{ textAlign: 'center' }} />
                                        </DataTableRow>
                                    ))}
                            </ScrollView>

                        </DataTable>
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                </Card>

                <Button
                    style={{ top: sizes.hp('-7%'), right: sizes.wp('-23%'), width: '50%'}}
                    icon="arrow-right-bold-outline"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => {}}>
                    Continuar
 				</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        height: sizes.hp('70%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 2,
        top: sizes.hp('-10%'),
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

export default OrderSummary;