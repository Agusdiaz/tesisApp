import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, orderStage } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Dialog, Portal, Modal } from 'react-native-paper';
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
            visibleDialogComent: false,
        }
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    _showModalProduct = () => this.setState({ visibleModalProduct: true });
    _hideModalProduct = () => this.setState({ visibleModalProduct: false });

    _showModalPromo = () => this.setState({ visibleModalPromo: true });
    _hideModalPromo = () => this.setState({ visibleModalPromo: false });

    _showDialogComent = () => this.setState({ visibleDialogComent: true })
    _hideDialogComent = () => this.setState({ visibleDialogComent: false })

    render() {
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={this.hideModal}
        />

        const stageOrder = props =>
            <Button style={{ borderRadius: 20, width: sizes.wp('48%') }}
                mode="contained"
                dark
                color={ (this.props.data.aceptado === 0) ? colors.APP_WAITING : (this.props.data.etapa === orderStage.PENDING) ? colors.APP_PENDING 
                    : (this.props.data.etapa === orderStage.READY) ? colors.APP_GREEN : colors.APP_DELIVERED}
                labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
                {(this.props.data.aceptado === 0) ? 'Esperando aprobación' : (this.props.data.etapa === orderStage.PENDING) ? 'En Proceso' : (this.props.data.etapa === orderStage.READY) ?
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

        const date = props => <Text style={styles.rightText}>{moment(this.props.data.fecha).format("YYYY/MM/DD HH:mm") + ' hs'}</Text>

        const comment = props =>
            <FAB style={[styles.fabComment, { backgroundColor: (this.props.data.comentario === null) ? colors.APP_INACTIVE : colors.APP_MAIN }]}
                color={colors.APP_BACKGR}
                label={'VER'}
                disabled={this.props.data.comentario === null}
                icon="comment-text-outline"
                onPress={this._showDialogComent}
            />

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
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} />
                <Divider style={styles.divider} />
                <Card.Content style={{ alignSelf: 'center', width: sizes.wp('90%'), }}>
                    <DataTable style={{ width: sizes.wp('130%') }}>
                        <DataTableHeader
                            title={'¿Qué es lo que pediste?'}
                            style={{ right: sizes.wp('-12.5%') }}
                        />
                        <ScrollView style={{ height: sizes.hp('29.5%') }}>
                            {(this.props.data.productos[0] !== null) ?
                                <View>
                                    <DataTableRow style={{}}>
                                        <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                        <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                        <DataTableCell text={'Precio Unit'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={100} />
                                        <DataTableCell text={'Precio Total'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={105} />
                                        <DataTableCell text={'Detalles'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                    </DataTableRow>
                                    {this.props.data.productos[0]
                                        .map(row => (
                                            <DataTableRow key={row.id}>
                                                <DataTableCell text={(row.modificado === 0) ? row.nombre : '(*) ' + row.nombre} borderRight textStyle={{ textAlign: 'center', color: (row.modificado === 1) ? colors.APP_MAIN : null }} style={{ maxWidth: '30%' }} />
                                                <DataTableCell text={(row.cantidad).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                <DataTableCell text={'$' + (row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={100} />
                                                <DataTableCell text={'$' + (row.cantidad * row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={105} />
                                                <DataTableCell text={'VER'} textStyle={{ color: colors.APP_MAIN, fontWeight: 'bold', textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} onPress={() => {
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
                                        <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                        <DataTableCell text={'Precio Unit'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={100} />
                                        <DataTableCell text={'Precio Total'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={105} />
                                        <DataTableCell text={'Detalles'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                    </DataTableRow>
                                    {this.props.data.promociones[0]
                                        .map(row => (
                                            <DataTableRow key={row.id}>
                                                <DataTableCell text={(row.modificado === 0) ? row.nombre : '(*) ' + row.nombre} borderRight textStyle={{ textAlign: 'center', color: (row.modificado === 1) ? colors.APP_MAIN : null }} style={{ maxWidth: '30%' }} />
                                                <DataTableCell text={(row.cantidad).toString()} textStyle={{ textAlign: 'center', }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                <DataTableCell text={'$' + (row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={100} />
                                                <DataTableCell text={'$' + (row.cantidad * row.precio).toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={105} />
                                                <DataTableCell text={'VER'} textStyle={{ color: colors.APP_MAIN, fontWeight: 'bold', textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} onPress={() => {
                                                    this.setState({ promoDetails: row })
                                                    this._showModalPromo()
                                                }} />
                                            </DataTableRow>
                                        ))}
                                </View>
                                : null}
                            <Divider style={styles.divider} />
                            <Text style={{ color: colors.APP_MAIN, fontWeight: 'bold', marginBottom: sizes.hp('1%'), marginTop: sizes.hp('2%') }}>(*) modificaste este producto</Text>
                        </ScrollView>

                    </DataTable>
                </Card.Content>
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Comentario:" right={comment} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Propina:" right={propina} />
                <Divider style={styles.divider} />
                <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                <Divider style={styles.divider} />

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalProduct} onDismiss={this._hideModalProduct}>
                        <ProductDetails hideModalFromChild={this._hideModalProduct} data={this.state.productDetails} rute={'order'} />
                    </Modal>

                    <Modal contentContainerStyle={{ alignItems: "center" }} visible={this.state.visibleModalPromo} onDismiss={this._hideModalPromo}>
                        <SaleCard hideModalFromChild={this._hideModalPromo} data={this.state.promoDetails} rute={'order'} />
                    </Modal>

                    <Dialog
                        visible={this.state.visibleDialogComent}
                        onDismiss={this._hideDialogComent}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14 }} numberOfLines={15}>{this.props.data.comentario}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogComent}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                </Portal>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        maxHeight: sizes.hp('87%'),
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
        margin: -10
    },
    takeAwayText: {},
    divider: {},
    rightText: {
        fontSize: 16,
        right: sizes.wp('3%'),
    },
    leftText: {
        fontSize: 18,
    },
    fabComment: {
        right: sizes.wp('3%'),
        justifyContent: 'center',
        backgroundColor: colors.APP_MAIN,
        alignItems: 'center',
        width: 85,
        height: 38
    },
});

export default OrderDetailsClient;