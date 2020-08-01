import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Title } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import moment from 'moment'

class OrderDetailsClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

        const orderNumber = props => <Text style={styles.rightText}> {this.props.data.numero} </Text>

        const Name = props => <TextTicker style={{ fontSize: 16 }}
            duration={6000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>

        const propina = props => <Text style={styles.rightText}> ${this.props.data.propina} </Text>

        const total = props => <Text style={styles.rightText}> ${this.props.data.total} </Text>

        const date = props => <Text style={styles.rightText}>{moment(this.props.data.fecha).format("YYYY/MM/DD hh:mm")}</Text>

        return (

            <Card style={styles.orderCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-2') }} left={Close} leftStyle={styles.close} right={stageOrder} rightStyle={styles.stageOrder} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número:" right={orderNumber} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Local:" right={Name} rightStyle={{ width: sizes.wp('54%'), right: sizes.wp('3%'), alignItems: 'flex-end', }} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} />
                <Divider style={styles.divider} />
                <Card.Content style={{ alignSelf: 'center', width: sizes.wp('90%'), }}>
                    <DataTable style={{ width: sizes.wp('50%') }}>
                        <DataTableHeader
                            title={'¿Qué es lo que pediste?'}
                            style={{ right: sizes.wp('-12.5%') }}
                        />
                        <DataTableRow style={{}}>
                            <DataTableCell text={'Productos'} type={'header'} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '30%' }} />
                            <DataTableCell text={'Cantidad'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center' }} />
                            <DataTableCell text={'Precio Unit'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-10%') }} textStyle={{ textAlign: 'center' }} />
                            <DataTableCell text={'Precio Total'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-16%') }} textStyle={{ textAlign: 'center' }} />
                        </DataTableRow>
                        <ScrollView style={{ height: sizes.hp('32%') }}>
                            {this.props.data.productos[0]
                                .map(row => (
                                    <DataTableRow key={row.id}>
                                        <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%' }} />
                                        <DataTableCell text={(row.cantidad).toString()} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center' }} />
                                        <DataTableCell text={'$' + (row.precio).toString()} style={{ maxWidth: '5%', left: sizes.wp('-10%') }} textStyle={{ textAlign: 'center' }} />
                                        <DataTableCell text={'$' + (row.cantidad * row.precio).toString()} style={{ maxWidth: '5%', left: sizes.wp('-16%') }} textStyle={{ textAlign: 'center' }} />
                                    </DataTableRow>
                                ))}
                        </ScrollView>

                    </DataTable>
                </Card.Content>
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Propina:" right={propina} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                <Divider style={styles.divider} />
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        height: sizes.hp('80%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 0,
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