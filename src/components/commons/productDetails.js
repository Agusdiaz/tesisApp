import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { colors, sizes, productCondition } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Portal, Dialog, TextInput, Modal, ActivityIndicator } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import ShopActions from '../../redux/authState/action'
import { Actions } from 'react-native-router-flux';
import { updateProductPrice } from '../../api/menus'

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: 'https://picsum.photos/500',
            price: '',
            loading: false,
            visibleDialogPrice: false,
            visibleDialogError: false,
            actionError: '',
        }
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    _showDialogPrice = () => this.setState({ visibleDialogPrice: true })
    _hideDialogPrice = () => this.setState({ visibleDialogPrice: false })

    _showDialogError(message) {
        this.setState({ visibleDialogError: true, actionError: message })
    }
    _hideDialogError = () => this.setState({ visibleDialogError: false, actionError: '' })

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

    async updatePrice() {
        this.setState({ loading: true })
        const data = await updateProductPrice(this.props.data.id, this.state.price, this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status !== 200) {
            this.setState({ price: '', loading: false });
            this._showDialogError(data.body)
        } else {
            this.setState({ price: '', loading: false });
            this.hideModal()
            this.props.refreshParent()
            this.props.showDialogResponse(data.body)
        }
    }

    render() {
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={this.hideModal}
        />

        const Condition = props =>
            (this.props.data.condicion) ?
                <Button style={{}}
                    mode="contained"
                    dark
                    color={(this.props.data.condicion === productCondition.VEGAN) ? colors.VEGAN : (this.props.data.condicion === productCondition.CELIAC) ?
                        colors.CELIAC : colors.VEGETARIAN} >
                    {this.props.data.condicion}
                </Button>
                :
                null

        const NamePrice = props => <View>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
            <Text style={styles.subtitle}>${this.props.data.precio}</Text>
        </View>

        return (
            <Card style={styles.productCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-2') }} left={Condition} leftStyle={styles.condition} right={Close} rightStyle={styles.close} />
                <Divider />
                <Card.Title right={NamePrice} rightStyle={styles.rightSide} />
                <Card.Cover source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />
                <Card.Content style={{ alignItems: 'center' }}>
                    <Text style={styles.details} numberOfLines={6}>{this.props.data.detalle}</Text>

                    <DataTable style={{ marginTop: sizes.wp('1%'), width: (this.props.rute !== 'order') ? sizes.wp('120%') : sizes.wp('100%'), left: -10 }}>
                        <DataTableHeader
                            title={'¿De qué esta hecho este producto?'}
                            style={{ right: sizes.wp('-3%') }}
                        />
                        <DataTableRow >
                            <DataTableCell text={'INGREDIENTES '} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                            <DataTableCell text={'Detalle'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '10%' }} minWidth={90} />
                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                            {(this.props.rute !== 'order' && this.props.rute !== 'promoOrder') ?
                                <View style={{ flexDirection: 'row' }}>
                                    <DataTableCell text={'Precio'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={70} />
                                    <DataTableCell text={'Opcional'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                </View>
                                : null}
                        </DataTableRow>

                        <ScrollView style={{ height: sizes.hp('31%') }}>
                            {(this.props.data.ingredientes[0].length > 0 && this.props.rute !== 'promoOrder') ?
                                this.props.data.ingredientes[0]
                                    .map(row =>
                                        < DataTableRow key={(row.idIngrediente) ? row.idIngrediente : row.id} >
                                            <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%' }} textStyle={{ textAlign: 'center' }} />
                                            <DataTableCell text={(row.detalle) ? row.detalle : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '10%', alignSelf: 'center' }} minWidth={90} />
                                            <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                            {(this.props.rute !== 'order' && this.props.rute !== 'promoOrder') ?
                                                <View style={{ flexDirection: 'row' }}>
                                                    <DataTableCell text={(row.precio) ? '$' + (row.precio).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={70} />
                                                    <DataTableCell text={(row.opcion === 1) ? 'Agregar' : (row.opcion === 0) ? 'Eliminar' : '-'} textStyle={{
                                                        textAlign: 'center', color: (row.opcion === 1) ? colors.APP_GREEN :
                                                            (row.opcion === 0) ? colors.APP_RED : null
                                                    }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                </View>
                                                : null}
                                        </DataTableRow>
                                    )
                                : (this.props.rute !== 'promoOrder') ?
                                    <DataTableCell text={'Este producto no posee ingredientes para mostrar'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                                    : (this.props.data.ingredientes.length > 0) ?
                                        this.props.data.ingredientes
                                            .map(row =>
                                                < DataTableRow key={row.idIngrediente} >
                                                    <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%' }} textStyle={{ textAlign: 'center' }} />
                                                    <DataTableCell text={(row.detalle) ? row.detalle : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '10%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                    {(this.props.rute !== 'order' && this.props.rute !== 'promoOrder') ?
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <DataTableCell text={(row.precio) ? '$' + (row.precio).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={70} />
                                                            <DataTableCell text={(row.opcion === 1) ? 'Agregar' : (row.opcion === 0) ? 'Eliminar' : '-'} textStyle={{
                                                                textAlign: 'center', color: (row.opcion === 1) ? colors.APP_GREEN :
                                                                    (row.opcion === 0) ? colors.APP_RED : null
                                                            }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                        </View>
                                                        : null}
                                                </DataTableRow>
                                            )
                                        :
                                        <DataTableCell text={'Este producto no posee ingredientes para mostrar'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                            }
                        </ScrollView>
                    </DataTable>
                    {(this.props.rute === 'shop') ?
                        <View style={{ borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                style={{}}
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._showDialogPrice}>
                                Modificar Precio
 				                </Button>
                        </View>
                        : null}
                </Card.Content>

                <Portal>
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

                    <Modal dismissable={false}
                        visible={this.state.loading}
                        style={styles.modalActivityIndicator} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
                    </Modal>

                    <Dialog
                        visible={this.state.visibleDialogError}
                        onDismiss={this._hideDialogError}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionError}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogError}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </Card >
        )
    }
}

const styles = StyleSheet.create({
    productCard: {
        height: sizes.hp('80%'),
        width: sizes.wp('90%'),
        elevation: 0
    },
    close: {
        left: sizes.wp('-2%')
    },
    condition: {
        right: sizes.wp('-1%'),
        width: '38%'
    },
    image: {
        width: sizes.wp('86%'),
        height: sizes.hp('17%'),
        alignSelf: 'center',
        borderRadius: 5
    },
    leftSide: {
        marginLeft: sizes.wp('-1%'),
        marginTop: sizes.hp('5.2%'),
    },
    rightSide: {
        width: sizes.wp('75%'),
        height: sizes.hp('7%'),
        right: sizes.wp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 6,
        fontSize: 20,
    },
    details: {
        width: sizes.wp('76%'),
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    cell: {
        width: sizes.wp('80%'),
        right: sizes.wp('-3%'),
        marginTop: sizes.hp('2%'),
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);