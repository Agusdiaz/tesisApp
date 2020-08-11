import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Title, Portal, Modal } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import ProductDetails from '../commons/productDetails'
import SaleCard from '../commons/salesCard'
import moment from 'moment'

class OrderDetailsClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetails: [],
            promoDetails: [],
            visibleModalProduct: false,
            visibleModalPromo: false,
        }
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    _showModalProduct = () => this.setState({ visibleModalProduct: true });
    _hideModalProduct = () => this.setState({ visibleModalProduct: false });

    _showModalPromo = () => this.setState({ visibleModalPromo: true });
    _hideModalPromo = () => this.setState({ visibleModalPromo: false });

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

        const takeAway = props => <Text style={styles.rightText}> {(this.props.data.takeAway === 1) ? 'Para llevar' : 'Para comer aquí'} </Text>

        const orderNumber = props => <Text style={styles.rightText}> {this.props.data.numero} </Text>

        const name = props => <TextTicker style={{ fontSize: 16 }}
            duration={6000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>

        const address = props => <TextTicker style={{ fontSize: 16 }}
            duration={6000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.data.direccion}</TextTicker>

        const propina = props => <Text style={styles.rightText}> ${this.props.data.propina} </Text>

        const total = props => <Text style={styles.rightText}> ${this.props.data.total} </Text>

        const date = props => <Text style={styles.rightText}>{moment(this.props.data.fecha).format("YYYY/MM/DD hh:mm")+' hs'}</Text>

        return (

            <Card style={styles.orderCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-4') }} left={stageOrder} leftStyle={styles.stageOrder} right={Close} rightStyle={styles.close} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Modalidad:" right={takeAway} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del Pedido:" right={orderNumber} />
                <Divider />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Local:" right={name} rightStyle={{ width: sizes.wp('54%'), right: sizes.wp('3%'), alignItems: 'flex-end', }} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Dirección:" right={address} rightStyle={{ width: sizes.wp('54%'), right: sizes.wp('3%'), alignItems: 'flex-end', }} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date}/>
                <Divider style={styles.divider} />
                <Card.Content style={{ alignSelf: 'center', width: sizes.wp('90%'), }}>
                    <DataTable style={{ width: sizes.wp('110%') }}>
                        <DataTableHeader
                            title={'¿Qué es lo que pediste?'}
                            style={{ right: sizes.wp('-12.5%') }}
                        />
                        <ScrollView style={{ height: sizes.hp('29.5%') }}>
                            {(this.props.data.productos[0] !== null) ?
                                <View>
                                    <DataTableRow style={{}}>
                                        <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                        <DataTableCell text={'Cantidad'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                        <DataTableCell text={'Precio Unit'} type={'header'} style={{ maxWidth: '6%', left: sizes.wp('-8%') }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                        <DataTableCell text={'Precio Total'} type={'header'} style={{ maxWidth: '23%', left: sizes.wp('-12%') }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                        <DataTableCell text={'Detalles'} type={'header'} style={{ maxWidth: '4%', left: sizes.wp('-18%') }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                    </DataTableRow>
                                    {this.props.data.productos[0]
                                        .map(row => (
                                            <DataTableRow key={row.id}>
                                                <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%' }} />
                                                <DataTableCell text={(row.cantidad).toString()} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center' }} />
                                                <DataTableCell text={'$' + (row.precio).toString()} style={{ maxWidth: '6%', left: sizes.wp('-8%') }} textStyle={{ textAlign: 'center' }} />
                                                <DataTableCell text={'$' + (row.cantidad * row.precio).toString()} style={{ maxWidth: '23%', left: sizes.wp('-12%') }} textStyle={{ textAlign: 'center' }} />
                                                <DataTableCell text={'VER'} style={{ maxWidth: '4%', left: sizes.wp('-18%') }} textStyle={{ color: colors.APP_MAIN, fontWeight: 'bold', textAlign: 'center' }} onPress={() => {
                                                    this.setState({ productDetails: row })
                                                    this._showModalProduct()
                                                }} />
                                            </DataTableRow>
                                        ))}
                                </View>
                                : null}
                            {(this.props.data.promociones[0] !== null) ?
                                <View>
                                    <DataTableRow style={{}}>
                                        <DataTableCell text={'PROMOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                        <DataTableCell text={'Cantidad'} type={'header'} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                        <DataTableCell text={'Precio Unit'} type={'header'} style={{ maxWidth: '6%', left: sizes.wp('-8%') }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                        <DataTableCell text={'Precio Total'} type={'header'} style={{ maxWidth: '23%', left: sizes.wp('-12%') }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                        <DataTableCell text={'Detalles'} type={'header'} style={{ maxWidth: '4%', left: sizes.wp('-18%') }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                    </DataTableRow>
                                    {this.props.data.promociones[0]
                                        .map(row => (
                                            <DataTableRow key={row.id}>
                                                <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%' }} />
                                                <DataTableCell text={(row.cantidad).toString()} style={{ maxWidth: '5%', left: sizes.wp('-2%') }} textStyle={{ textAlign: 'center' }} />
                                                <DataTableCell text={'$' + (row.precio).toString()} style={{ maxWidth: '6%', left: sizes.wp('-8%') }} textStyle={{ textAlign: 'center' }} />
                                                <DataTableCell text={'$' + (row.cantidad * row.precio).toString()} style={{ maxWidth: '23%', left: sizes.wp('-12%') }} textStyle={{ textAlign: 'center' }} />
                                                <DataTableCell text={'VER'} style={{ maxWidth: '4%', left: sizes.wp('-18%') }} textStyle={{ color: colors.APP_MAIN, fontWeight: 'bold', textAlign: 'center' }} onPress={() => {
                                                    this.setState({ promoDetails: row })
                                                    this._showModalPromo()
                                                }}/>
                                            </DataTableRow>
                                        ))}
                                </View>
                                : null}
                        </ScrollView>

                    </DataTable>
                </Card.Content>
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Propina:" right={propina} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                <Divider style={styles.divider} />

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalProduct} onDismiss={this._hideModalProduct}>
                        <ProductDetails hideModalFromChild={this._hideModalProduct} data={this.state.productDetails} />
                    </Modal>

                    <Modal contentContainerStyle={{alignItems: "center"}} visible={this.state.visibleModalPromo} onDismiss={this._hideModalPromo}>
                        <SaleCard hideModalFromChild={this._hideModalPromo} data={this.state.promoDetails} rute={'order'}/>
                    </Modal>
                </Portal>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        height: sizes.hp('87%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 0,
    },
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
    close: {
        left: sizes.wp('-2%')
    },
    stageOrder: {
        right: sizes.wp('0%')
    },
    cardTitle: {
        margin: -9
    },
    takeAwayText: {

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