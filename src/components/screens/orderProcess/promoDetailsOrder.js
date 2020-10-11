import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Portal, Modal, Dialog } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import ProductDetailsOrder from './productDetailsOrder'
import OrderActions from '../../../redux/orders/action'

class PromoDetailsOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: 'https://picsum.photos/500',
            visibleModalOrder: false,
            visibleDialogResponse: false,
            indexDetails: null,
            actionMessage: '',
            originalProds: []
        }
    }

    componentDidMount() {
        this.setState({
            originalProds: this.props.data.productos[0].map(obj => {
                obj.modificado = false
                return JSON.parse(JSON.stringify(obj))
            })
        })
    }

    _showModalOrder = () => this.setState({ visibleModalOrder: true })
    _hideModalOrder = () => this.setState({ visibleModalOrder: false })

    _showDialogResponse = () => this.setState({ visibleDialogResponse: true })
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false })

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    onChangeModified = (id) => {
        this.setState(prevState => ({
            originalProds: prevState.originalProds.map(
                el => el.id === id ? { ...el, modificado: true } : el
            )
        }))
    }

    addPromo() {
        var promo = {
            idPromo: this.props.data.id,
            nombre: this.props.data.nombre,
            precio: this.props.data.precio,
            cantidad: 1,
            modificado: false,
            detalle: this.props.data.detalle,
            productos: [],
        }
        var isSelected = Array.from({length: this.state.originalProds.length}, () => null)
        this.state.originalProds.map((prod, index) => {
            if (prod.modificado)
                promo.modificado = true
            if (prod.selectivo === 0) {
                if (prod.ingredientes[0].length === 0) {
                    promo.productos.push({
                        idProducto: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: prod.cantidad, modificado: prod.modificado,
                        condicion: prod.condicion, detalle: prod.detalle, ingredientes: []
                    })
                } else {
                    var i = 0
                    var long = prod.ingredientes[0].length
                    var ingredientes = []
                    prod.ingredientes[0].map(ing => {
                        var cant = 0
                        if (ing.opcion !== 1 || ing.cantidad) {
                            cant = (ing.precio) ? ing.precio * ing.cantidad : 0
                            ingredientes.push({ idIngrediente: ing.id, nombre: ing.nombre, detalle: ing.detalle, cantidad: ing.cantidad })
                        }
                        prod.precio = prod.precio + cant
                        i++
                        if (i === long) {
                            promo.productos.push({
                                idProducto: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: prod.cantidad, modificado: prod.modificado,
                                condicion: prod.condicion, detalle: prod.detalle, ingredientes: ingredientes
                            })
                        }
                    })
                }
            } else {
                var i = 0
                isSelected[index] = false
                var long = prod.ingredientes[0].length
                var ingredientes = []
                prod.ingredientes[0].map(ing => {
                    if (ing.check) {
                        isSelected[index] = true
                        ingredientes.push({ idIngrediente: ing.id, nombre: ing.nombre, detalle: ing.detalle, cantidad: ing.cantidad })
                    }
                    i++
                    if (i === long) {
                        promo.productos.push({
                            idProducto: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: prod.cantidad, modificado: prod.modificado,
                            condicion: prod.condicion, detalle: prod.detalle, ingredientes: ingredientes
                        })

                    }
                })
            }
        })
        if (isSelected.filter(x => x === false).length > 0) {
            this.setState({ actionMessage: 'Es necesario que selecciones ingredientes de algunos productos para poder ordenar esta promoción' })
            this._showDialogResponse()            
        } else {
            this.props.setPromoOrder(promo)
            this.props.updateTotal(this.props.order.total + this.props.data.precio)
            this.hideModal()
        }
    }

    render() {

        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={this.hideModal}
        />

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
            <Card style={styles.promoCard}>
                <Card.Title right={Close} rightStyle={styles.close} style={{ margin: -10, marginTop: sizes.hp('-2') }} />
                <Divider />
                <Card.Title right={NamePrice} rightStyle={styles.rightSide} />
                <Card.Cover source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />
                <Card.Content style={{ alignItems: 'center' }}>
                    <Text style={styles.details} numberOfLines={4}>{this.props.data.detalle}</Text>

                    <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('80%'), left: -10 }}>
                        <DataTableHeader
                            title={'¿Qué incluye la promoción?'}
                            style={{ right: sizes.wp('-12%') }}
                        />
                        <DataTableRow >
                            <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '45%' }} />
                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '5%' }} minWidth={100} />
                            <DataTableCell text={'Modificable'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '5%' }} minWidth={105} />
                        </DataTableRow>

                        <ScrollView style={{ height: sizes.hp('30%') }}>
                            {this.state.originalProds
                                .map((row, i) => (
                                    <DataTableRow key={row.id}>
                                        <DataTableCell text={row.nombre} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '45%' }} />
                                        <DataTableCell text={row.cantidad.toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '5%', alignSelf: 'center' }} minWidth={100} />
                                        {(row.ingredientes[0] === null) ?
                                            <DataTableCell text={'NO'} textStyle={{ color: colors.APP_RED, fontWeight: 'bold', textAlign: 'center' }} style={{ maxWidth: '5%', alignSelf: 'center' }} minWidth={105} />
                                            :
                                            <DataTableCell text={'SÍ'} textStyle={{ color: colors.APP_GREEN, fontWeight: 'bold', textAlign: 'center' }} style={{ maxWidth: '5%', alignSelf: 'center' }} minWidth={105} onPress={() => {
                                                this.setState({ indexDetails: i }),
                                                    this._showModalOrder()
                                            }} />
                                        }
                                    </DataTableRow>
                                ))}
                        </ScrollView>
                    </DataTable>
                </Card.Content>
                <Card.Actions style={{ alignSelf: 'center' }}>
                    <Button
                        style={{ width: sizes.wp('33%') }}
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => { this.addPromo() }}>
                        Agregar
 				        </Button>
                </Card.Actions>

                <Portal>
                    <Modal contentContainerStyle={[styles.modalView, { maxHeight: sizes.hp('92%') }]} visible={this.state.visibleModalOrder} onDismiss={this._hideModalOrder}>
                        <ProductDetailsOrder hideModalFromChild={this._hideModalOrder} data={this.state.originalProds[this.state.indexDetails]} rute={'promo'} setModified={this.onChangeModified} />
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

            </Card >
        )
    }
}

const styles = StyleSheet.create({
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
    promoCard: {
        height: sizes.hp('80%'),
        width: sizes.wp('90%'),
        elevation: 0
    },
    close: {
        top: -5,
        left: sizes.wp('-3%')
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
        //borderWidth: 1,
        width: sizes.wp('80%'),
        right: sizes.wp('-3%'),
        marginTop: sizes.hp('2%'),
    },
});

function mapStateToProps(state) {
    return {
        order: state.order
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPromoOrder: (promo) => dispatch(OrderActions.setPromoOrder(promo)),
        updateTotal: (total) => dispatch(OrderActions.updateTotal(total)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PromoDetailsOrder);