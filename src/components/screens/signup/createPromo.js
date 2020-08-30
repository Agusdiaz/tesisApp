import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Button, Dialog, TextInput, Modal, Portal, ActivityIndicator } from 'react-native-paper'
import { DataTable, DataTableCell, DataTableRow } from 'material-bread'
import ExistentProducts from './existentProduct'
import { createPromo } from '../../../api/menus'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class CreatePromo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleDialogFinish: false,
            visibleModalProducts: false,
            visibleDialogResponse: false,
            products: [],
            name: '',
            details: '',
            price: '',
            loading: false,
            actionMessage: '',
        }
    }

    async createPromo() {
        this.setState({ loading: true })
        var response = {
            cuit: this.props.shop.cuit,
            nombre: (this.state.name.trim() === "") ? 'Promoción' : this.state.name,
            detalle: (this.state.details.trim() === "") ? null : this.state.details,
            precio: parseFloat(this.state.price),
            productos: this.state.products,
        }
        const data = await createPromo(response, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.setState({ loading: false })
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 401) {
            this.setState({ loading: false, actionMessage: 'Error al crear promoción. Inténtelo nuevamente' })
            this._showDialogResponse()
        } else {
            this.setState({ loading: false, actionMessage: data.body })
            this._showDialogResponse()
            if(this.props.rute === 'shop') this.props.onRefreshChilds()
            Actions.pop()
        }
    }

    addProduct = (item) => {
        this.setState(prevState => ({
            products: [...prevState.products, item]
        }))
    }

    removeProduct = (index) => {
        this.setState(prevState => ({
            products: [...prevState.products.slice(0, index), ...prevState.products.slice(index + 1)]
        }))
    }

    _showDialogFinish = () => this.setState({ visibleDialogFinish: true });
    _hideDialogFinish = () => this.setState({ visibleDialogFinish: false });

    _showDialogResponse = () => this.setState({ visibleDialogResponse: true });
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false });

    _showModalProducts = () => this.setState({ visibleModalProducts: true });
    _hideModalProducts = () => this.setState({ visibleModalProducts: false });

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

    validateTextLength(text) {
        if (text.length > 100)
            Alert.alert('Texto demasiado largo')
        else this.setState({ details: text })
    }

    render() {
        return (
            <View style={appStyles.container}>

                <Text style={styles.titleText}>Creá tu promoción</Text>
                <View style={{ alignItems: 'center', height: sizes.hp('70%'), position: 'absolute', }}>
                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='OPCIONAL - Nombre'
                        placeholder="Nombre"
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={text => this.setState({ name: text })}
                        value={this.state.name}
                    />

                    <TextInput
                        style={[styles.inputView, { height: sizes.hp('10%') }]}
                        mode='outlined'
                        label='OPCIONAL - Detalles'
                        multiline
                        numberOfLines={5}
                        placeholder='Detalles'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(text) => this.validateTextLength(text)}
                        value={this.state.details} />

                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='Precio de la Promoción'
                        placeholder='$'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(price) => this.validateNumber(price)}
                        value={this.state.price} />

                    <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('95%'), margin: 15, }}>
                        <DataTableRow >
                            <DataTableCell text={''} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '2%' }} minWidth={85} />
                            <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '28%' }} />
                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                            <DataTableCell text={'Precio'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={85} />
                        </DataTableRow>

                        <ScrollView style={{ height: sizes.hp('17%') }}>
                            {(this.state.products.length > 0) ?
                                this.state.products.map((row, i) =>
                                    < DataTableRow key={i} >
                                        <DataTableCell text={'Eliminar'} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED, textDecorationLine: 'underline' }}
                                            style={{ maxWidth: '2%', alignSelf: 'center' }} minWidth={85} onPress={() => { this.removeProduct(i) }} />
                                        <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '28%' }} textStyle={{ textAlign: 'center' }} />
                                        <DataTableCell text={row.cantidad.toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                        <DataTableCell text={'$' + row.precio.toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={85} />
                                    </DataTableRow>
                                )
                                :
                                <DataTableCell text={'Promoción sin productos'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                            }
                        </ScrollView>
                    </DataTable>

                    <View style={{ alignItems: 'center', top: sizes.hp('2%') }}>
                        <Button
                            style={{ width: sizes.wp('55%') }}
                            mode="contained"
                            color={colors.APP_MAIN}
                            onPress={this._showModalProducts}>
                            Agregar Productos
 				                </Button>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', top: sizes.hp('39%'), }}>
                    <Button
                        style={{ marginRight: sizes.wp('18%'), width: sizes.wp('35%') }}
                        icon="close"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => Actions.pop()}>
                        Cancelar
 				</Button>

                    <Button
                        style={{ width: sizes.wp('35%') }}
                        icon="plus"
                        mode="contained"
                        color={colors.APP_MAIN}
                        disabled={this.state.price === '' || this.state.products.length === 0}
                        onPress={this._showDialogFinish}>
                        Crear
 				</Button>
                </View>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogFinish}
                        onDismiss={this._hideDialogFinish}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Desea crear la promoción?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ left: sizes.wp('-12%') }} color={colors.APP_RED} onPress={this._hideDialogFinish}>No</Button>
                            <Button color={colors.APP_GREEN} onPress={() => { this._hideDialogFinish(), this.createPromo() }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalProducts} dismissable={false}>
                        <ExistentProducts hideModalFromChild={this._hideModalProducts} products={this.state.products}
                            addProduct={this.addProduct} />
                    </Modal>

                    <Modal dismissable={false}
                        visible={this.state.loading} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
                    </Modal>

                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                </Portal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        marginTop: sizes.hp('0%'),
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
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: "bold",
        textAlign: "center",
        top: sizes.hp('-37%'),
        padding: 12,
    },
    inputView: {
        width: sizes.wp('80%'),
        height: sizes.hp('5%'),
        marginTop: sizes.hp('0%'),
        marginBottom: sizes.hp('1%'),
        justifyContent: "center",
        padding: 5,
        fontSize: sizes.TEXT_INPUT,
    },
    viewRadioButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: sizes.hp('2%'),
    },
    questionText: {
        fontSize: 16,
        textAlign: "center",
    },
    options: {
        marginLeft: sizes.wp('0.5%'),
    },
    cell: {
        width: sizes.wp('80%'),
        marginTop: sizes.hp('2%'),
        marginBottom: sizes.hp('2%'),
        marginLeft: sizes.wp('8%'),
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePromo);