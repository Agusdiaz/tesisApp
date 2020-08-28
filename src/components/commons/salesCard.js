import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Card, FAB, Modal, Portal, Button, Dialog, Divider, IconButton } from 'react-native-paper';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import TextTicker from 'react-native-text-ticker';
import ProductDetails from '../commons/productDetails'
import PromoDetails from '../screens/orderProcess/promoDetailsOrder'
import { Actions } from 'react-native-router-flux';
import Schedule from './schedule'

class SalesCard extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            visibleModalDetails: false,
            visibleModalSchedule: false,
            visibleModalPromoDetails: false,
            productDetails: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _showModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: true }) : null;
    _hideModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: false }) : null;

    _showModalSchedule = () => (this._isMounted) ? this.setState({ visibleModalSchedule: true }) : null;
    _hideModalSchedule = () => (this._isMounted) ? this.setState({ visibleModalSchedule: false }) : null;

    _showModalPromoDetails = () => (this._isMounted) ? this.setState({ visibleModalPromoDetails: true }) : null;
    _hideModalPromoDetails = () => (this._isMounted) ? this.setState({ visibleModalPromoDetails: false }) : null;

    render() {
        const NamePriceButton = props => <View style={{
            width: sizes.wp('50%'), alignItems: 'center', height: sizes.wp('14%'),
            right: (this.props.rute === 'order') ? sizes.wp('-10%') : null
        }}>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
            <Text style={styles.subtitle}>${this.props.data.precio}</Text>

            {(this.props.rute !== 'order' && this.props.rute !== 'cart') ?
                <Button
                    style={styles.buttonAvailable}
                    labelStyle={{ fontSize: 10, textAlign: 'center' }}
                    compact
                    mode='contained'
                    dark
                    onPress={this._showModalSchedule}
                    color={(this.props.data.valida === 1) ? colors.APP_GREEN : colors.APP_RED}
                >
                    {(this.props.data.valida === 1) ? 'Válida' : 'No válida'}
                </Button>
                : (this.props.rute === 'cart') ?
                    <Button
                        style={styles.buttonAvailable}
                        labelStyle={{ fontSize: 10, textAlign: 'center' }}
                        compact
                        mode='contained'
                        dark
                        onPress={this._showModalPromoDetails}
                        color={colors.APP_MAIN}
                    >
                        Agregar
            </Button>
                    :
                    <IconButton
                        style={{ right: sizes.wp('-35%'), top: sizes.hp('-7%') }}
                        icon='close'
                        color={colors.APP_MAIN}
                        size={30}
                        onPress={() => this.props.hideModalFromChild()}
                    />}
        </View>

        return (
            <View>
                <Card style={[styles.salesCard, { width: (this.props.rute !== 'order') ? sizes.wp('100%') : sizes.wp('90%') }]}>
                    <ImageBackground source={require('../../icons/promo.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                        <Card.Title right={NamePriceButton} rightStyle={styles.rightSide} />
                    </ImageBackground>
                    <Divider />
                    <Card.Content style={{ alignItems: 'center' }}>
                        {(this.props.data.detalle) ? <Text style={styles.details} numberOfLines={6}>{this.props.data.detalle}</Text> : null}
                        <DataTable style={{ width: sizes.wp('90%'), left: -10 }}>
                            <DataTableHeader
                                title={'¿Qué inlcuye la promoción?'}
                                style={{ right: sizes.wp('-15%') }}
                            />
                            <DataTableRow >
                                <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '45%' }} />
                                <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '5%' }} minWidth={100} />
                                <DataTableCell text={'Detalles'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '5%' }} minWidth={90} />
                            </DataTableRow>

                            <ScrollView style={{ maxHeight: sizes.hp('16.5%') }}>
                                {this.props.data.productos[0]
                                    .map(row => (
                                        <DataTableRow key={row.id}>
                                            <DataTableCell text={row.nombre} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '45%' }} />
                                            <DataTableCell text={row.cantidad.toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '5%', alignSelf: 'center' }} minWidth={100} />
                                            <DataTableCell text={'VER'} textStyle={{ color: colors.APP_MAIN, fontWeight: 'bold', textAlign: 'center' }} style={{ maxWidth: '5%', alignSelf: 'center' }} minWidth={90} onPress={() => {
                                                this.setState({ productDetails: row }), this._showModalDetails()
                                            }} />
                                        </DataTableRow>
                                    ))}
                            </ScrollView>
                        </DataTable>
                    </Card.Content>

                </Card>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <ProductDetails hideModalFromChild={this._hideModalDetails} data={this.state.productDetails}
                            rute={(this.props.rute === 'order') ? 'order' : null} />
                    </Modal>

                    <Modal contentContainerStyle={[styles.modalView, { maxHeight: sizes.hp('92%') }]} visible={this.state.visibleModalPromoDetails} onDismiss={this._hideModalPromoDetails}>
                        <PromoDetails hideModalFromChild={this._hideModalPromoDetails} data={this.props.data} />
                    </Modal>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalSchedule} onDismiss={this._hideModalSchedule}>
                        <Schedule hideModalFromChild={this._hideModalSchedule} data={this.props.data.horarios[0]} id={this.props.data.id}
                            rute={this.props.rute} refreshParent={this.props.refreshParent} />
                    </Modal>
                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    salesCard: {
        marginTop: sizes.hp('1%'),
        elevation: 10,
        borderRadius: 15,
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
    imageOutside: {
        resizeMode: 'contain',
    },
    imageInside: {
        opacity: 0.48,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    rightSide: {
        height: sizes.hp('7%'),
        marginRight: sizes.wp('28%'),
        alignItems: 'center',
        top: sizes.hp('1%')
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        width: sizes.wp('90%'),
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonAvailable: {
        width: sizes.wp('20%'),
        right: sizes.wp('-41%'),
        top: sizes.hp('-4.4%'),
        fontSize: 5
    },
    fab: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
        width: sizes.wp('10%'),
        height: sizes.hp('4%'),
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
});

export default SalesCard;