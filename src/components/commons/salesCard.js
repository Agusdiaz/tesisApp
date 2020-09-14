import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Card, ActivityIndicator, Modal, Portal, Button, Dialog, Divider, IconButton, TextInput } from 'react-native-paper';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import TextTicker from 'react-native-text-ticker';
import ProductDetails from '../commons/productDetails'
import PromoDetails from '../screens/orderProcess/promoDetailsOrder'
import ShopActions from '../../redux/authState/action'
import { Actions } from 'react-native-router-flux';
import Schedule from './schedule'
import { updatePromoPrice, deletePromo } from '../../api/promos'

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
            visibleDialogPrice: false,
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

    _showDialogPrice = () => (this._isMounted) ? this.setState({ visibleDialogPrice: true }) : null;
    _hideDialogPrice = () => (this._isMounted) ? this.setState({ visibleDialogPrice: false }) : null;

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

    async updatePrice() {
        if (this._isMounted) {
            this.setState({ loading: true })
            const data = await updatePromoPrice(this.props.data.id, this.state.price, this.props.shop.cuit, this.props.shop.token)
            if (data.status === 500 && data.body.error) {
                this.props.logout()
                Actions.logsign({ visible: true })
            } else if (data.status !== 200) {
                this.setState({ price: '', loading: false });
                this._showDialogError(data.body)
            } else {
                this.setState({ price: '', loading: false });
                this.props.refreshParent()
                this.props.showDialogResponse(data.body)
            }
        }
    }

    async deletePromo() {
        if (this._isMounted) {
            this.setState({ loading: true })
            const data = await deletePromo(this.props.data.id, this.props.shop.cuit, this.props.shop.token)
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
                        color={colors.APP_MAIN}>
                        Agregar
            </Button>
                    :
                    <IconButton
                        style={{ right: sizes.wp('-35%'), top: sizes.hp('-7%') }}
                        icon='close'
                        color={colors.APP_MAIN}
                        size={30}
                        onPress={() => this.props.hideModalFromChild()}/>}
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
                        {(this.props.rute === 'editPromo') ?
                            <View style={{ marginTop: sizes.hp('1%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Button
                                    style={{ marginRight: sizes.wp('12%')}}
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showDialogPrice}>
                                    Modificar Precio
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
                                rute={this.props.rute} refreshParent={this.props.refreshParent} />
                        </Modal>
                        : null}

                    <Dialog
                        style={{ top: -50 }}
                        visible={this.state.visibleDialogPrice}
                        onDismiss={this._hideDialogPrice}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>Ingresá el nuevo precio para tu producto:</Dialog.Title>
                        <Dialog.Content style={{ alignItems: 'center' }}>
                            <TextInput
                                style={styles.inputView}
                                mode='outlined'
                                label='Nuevo precio'
                                placeholder='$'
                                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                onChangeText={(price) => this.validateNumber(price)}
                                value={this.state.price} />
                        </Dialog.Content>
                        <Dialog.Actions style={{ marginTop: sizes.hp('-2%') }}>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogPrice}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} disabled={this.state.price === '' || this.state.price === '0'} onPress={() => {
                                this.updatePrice(),
                                    this._hideDialogPrice()
                            }}>Modificar</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={this.state.visibleDialogDelete}
                        onDismiss={this._hideDialogDelete}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Desea eliminar esta promoción?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('4%') }} color={colors.APP_RED} onPress={() => this._hideDialogDelete()}>No</Button>
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
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    inputView: {
        marginTop: sizes.hp('1%'),
        width: "90%",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 8,
        fontSize: sizes.TEXT_INPUT,
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