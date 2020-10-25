import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Card, ActivityIndicator, Modal, Portal, Button, Dialog, Divider, IconButton } from 'react-native-paper';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import TextTicker from 'react-native-text-ticker';
import ProductDetails from '../commons/productDetails'
import PromoDetails from '../screens/orderProcess/promoDetailsOrder'
import ShopActions from '../../redux/authState/action'
import { Actions } from 'react-native-router-flux';
import Schedule from './schedule'
import { deletePromo } from '../../api/promos'

class SalesCard extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            visibleModalDetails: false,
            visibleModalSchedule: false,
            visibleModalPromoDetails: false,
            productDetails: [],
            price: '',
            loading: false,
            visibleDialogError: false,
            visibleDialogDelete: false,
            actionError: '',
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

    _showDialogDelete = () => (this._isMounted) ? this.setState({ visibleDialogDelete: true }) : null;
    _hideDialogDelete = () => (this._isMounted) ? this.setState({ visibleDialogDelete: false }) : null;

    _showDialogError(message) {
        (this._isMounted) ? this.setState({ visibleDialogError: true, actionError: message }) : null;
    }
    _hideDialogError = () => (this._isMounted) ? this.setState({ visibleDialogError: false, actionError: '' }) : null;

    async deletePromo() {
        if (this._isMounted) {
            this.setState({ loading: true })
            const data = await deletePromo(this.props.data.id, this.props.shop.cuit, this.props.shop.token, this.props.initial)
            if (data.status === 500 && data.body.error) {
                this.props.logout()
                Actions.logsign({ visible: true })
            } else if (data.status !== 200) {
                this.setState({ loading: false });
                this._showDialogError(data.body)
            } else {
                this.setState({ loading: false });
                this.props.refreshParent()
                this.props.showDialogResponse(data.body)
            }
        }
    }

    validateNumber = (number) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < number.length; i++) {
            if (numbers.indexOf(number[i]) > -1) {
                newText = newText + number[i]
                this.setState({ price: number.toString() })
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if (number.length === 0) this.setState({ price: '' })
    }

    render() {
        return (
            <View>
                <Card style={[styles.salesCard, { width: (this.props.rute !== 'order') ? sizes.wp('100%') : sizes.wp('90%') }]}>
                    <ImageBackground source={require('../../icons/promo.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                        <Card.Content style={styles.topContent}>
                            <View style={{ width: sizes.wp('50%'), alignItems: 'center', height: sizes.wp('14%'), justifyContent: 'center' }}>
                                <TextTicker style={styles.title}
                                    duration={5000}
                                    loop
                                    animationType='bounce'
                                    repeatSpacer={50}
                                    marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
                                <Text style={styles.subtitle}>${this.props.data.precio}</Text>
                            </View>

                            {(this.props.rute !== 'order' && this.props.rute !== 'cart') ?
                                <Button
                                    style={styles.buttonAvailable}
                                    labelStyle={{ fontSize: 10, textAlign: 'center' }}
                                    compact
                                    mode='contained'
                                    dark
                                    onPress={this._showModalSchedule}
                                    color={(this.props.data.valida === 1 && this.props.data.habilitada) ? colors.APP_GREEN : colors.APP_RED}>
                                    {(this.props.data.valida === 1 && this.props.data.habilitada) ? 'Válida' : 'No válida'}
                                </Button>
                                : (this.props.rute === 'cart') ?
                                    <Button
                                        style={styles.buttonAvailable}
                                        labelStyle={{ fontSize: 10, textAlign: 'center' }}
                                        compact
                                        mode='contained'
                                        dark
                                        onPress={this._showModalPromoDetails}
                                        color={colors.APP_MAIN}>
                                        Agregar
                                        </Button>
                                    :
                                    <IconButton
                                        style={{ right: sizes.wp('-35%'), top: sizes.hp('-7%') }}
                                        icon='close'
                                        color={colors.APP_MAIN}
                                        size={30}
                                        onPress={() => this.props.hideModalFromChild()} />}
                        </Card.Content>
                    </ImageBackground>
                    <Divider />
                    <Card.Content style={{ alignItems: 'center' }}>
                        {(this.props.data.detalle) ? <Text style={styles.details} numberOfLines={6}>{this.props.data.detalle}</Text> : null}
                        <DataTable style={{ width: sizes.wp('90%'), left: -10 }}>
                            <DataTableHeader
                                title={'¿Qué incluye la promoción?'}
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
                        {(this.props.rute === 'editPromo') ?
                            <View style={{ marginTop: sizes.hp('1%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Button
                                    style={{ marginRight: sizes.wp('12%') }}
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={() => {
                                        Actions.createpromo({
                                            rute: 'modify', data: this.props.data, refreshParent: this.props.refreshParent, initial: this.props.initial,
                                            showDialogResponse: this.props.showDialogResponse
                                        })
                                    }}>
                                    Modificar
 				                </Button>

                                <Button
                                    style={{}}
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showDialogDelete}>
                                    Eliminar
 				                </Button>
                            </View>
                            : null}
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

                    {(this.props.rute !== 'order') ?
                        <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalSchedule} onDismiss={this._hideModalSchedule}>
                            <Schedule hideModalFromChild={this._hideModalSchedule} data={this.props.data.horarios[0]} id={this.props.data.id}
                                rute={this.props.rute} refreshParent={this.props.refreshParent} habilitada={this.props.data.habilitada} />
                        </Modal>
                        : null}

                    <Dialog
                        visible={this.state.visibleDialogDelete}
                        onDismiss={this._hideDialogDelete}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Desea eliminar esta promoción?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('8%') }} color={colors.APP_RED} onPress={() => this._hideDialogDelete()}>No</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialogDelete()
                                this.deletePromo()
                            }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={this.state.visibleDialogError}
                        onDismiss={this._hideDialogError}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionError}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogError}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal dismissable={false}
                        visible={this.state.loading}
                        style={styles.modalActivityIndicator} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
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
    topContent: {
        height: sizes.hp('7%'),
        alignItems: 'center',
        width: sizes.wp('90%'),
        alignSelf: 'center',
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
        right: sizes.wp('-37%'),
        top: sizes.hp('-4.8%'),
        fontSize: 5
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(ShopActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesCard);