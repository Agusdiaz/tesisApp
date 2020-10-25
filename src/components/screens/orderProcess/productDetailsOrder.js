import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, productCondition } from '../../../index.styles'
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Portal, Dialog } from 'react-native-paper';
import OrderActions from '../../../redux/orders/action'
import TextTicker from 'react-native-text-ticker'

class ProductDetailsOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalIngr: [],
            photo: 'https://picsum.photos/500',
            modifing: false,
            selected: 0,
            allowIngredients: [],
            visibleDialogResponse: false,
            actionMessage: '',
            modified: false,
        }
    }

    componentDidMount() {
        if (this.props.rute !== 'promo') this.setState({ originalIngr: JSON.parse(JSON.stringify(this.props.data.ingredientes[0])) })
        else this.setState({ originalIngr: this.props.data.ingredientes[0] })
        this.props.data.ingredientes[0].map(obj => {
            if (obj.check) this.state.allowIngredients.push(obj.id)
        })
    }

    _showDialogResponse = () => this.setState({ visibleDialogResponse: true })
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false })

    hideModal = () => { this.props.hideModalFromChild() }

    addProduct() {
        var product = {
            idProducto: this.props.data.id,
            nombre: this.props.data.nombre,
            precio: this.props.data.precio,
            cantidad: 1,
            modificado: this.state.modifing,
            condicion: this.props.data.condicion,
            detalle: this.props.data.detalle,
            selectivo: this.props.data.selectivo,
            ingredientes: [],
        }
        if (this.props.data.ingredientes[0].length === 0) {
            this.props.setProductOrder(product)
            this.props.updateTotal(this.props.order.total + this.props.data.precio)
            this.hideModal()
        } else if (this.props.data.selectivo === 1 && this.state.selected === 0) {
            this.setState({ actionMessage: 'Debes seleccionar al menos 1 ingrediente' })
            this._showDialogResponse()
        } else {
            var cant = 0
            this.state.originalIngr.map(obj => {
                if (obj.check) {
                    cant = (obj.precio && obj.cantidad) ? obj.precio * obj.cantidad : 0
                    product.ingredientes.push({
                        idIngrediente: obj.id, nombre: obj.nombre, detalle: obj.detalle, cantidad: obj.cantidad,
                        precio: obj.precio, opcion: obj.opcion
                    })
                }
            })
            product.precio = this.props.data.precio + cant
            this.props.setProductOrder(product)
            this.props.updateTotal(this.props.order.total + product.precio)
            this.hideModal()
        }
    }

    setAmount(action, id) {
        var copy = this.state.originalIngr
        const i = copy.findIndex(x => x.id === id)
        if (action === 0 && copy[i].cantidad === 1) {
            copy[i].cantidad = 0
            copy[i].check = false
            if (this.state.allowIngredients.findIndex(el => el === id) === -1)
                this.setState({ selected: (this.state.selected === 0) ? 0 : this.state.selected - 1 })
        } else if (action === 0 && copy[i].cantidad > 0) {
            copy[i].cantidad -= 1
        } else if (action === 1) {
            if ((copy[i].cantidad === null || copy[i].cantidad === 0) && this.state.allowIngredients.findIndex(el => el === id) === -1) {
                if (this.state.selected === this.props.data.tope) {
                    var text = 'Sólo se pueden agregar hasta ' + this.props.data.tope + ' ingrediente(s)'
                    this.setState({ actionMessage: text })
                    this._showDialogResponse()
                } else {
                    copy[i].cantidad += 1
                    copy[i].check = true
                    this.setState({ selected: this.state.selected + 1 })
                }
            } else {
                copy[i].cantidad += 1
                copy[i].check = true
            }
        }
        this.setState({ originalIngr: copy })
    }

    onCheckChanged(id) {
        const data = this.state.originalIngr
        const index = data.findIndex(x => x.id === id)
        if (this.props.data.tope === null || this.state.allowIngredients.findIndex(el => el === id) !== -1) {
            data[index].check = !data[index].check
            this.setState({ originalIngr: data })
        } else if (!data[index].check && this.state.selected < this.props.data.tope) {
            if (data[index].cantidad === 0 || data[index].cantidad === null) data[index].cantidad = 1
            data[index].check = !data[index].check
            data[index].modificado = true
            this.setState({ originalIngr: data, selected: this.state.selected + 1 })
        } else if (!data[index].check && this.state.selected === this.props.data.tope) {
            var text = 'Sólo se pueden agregar hasta ' + this.props.data.tope + ' ingrediente(s)'
            this.setState({ actionMessage: text })
            this._showDialogResponse()
        } else if (data[index].check) {
            data[index].check = !data[index].check
            this.setState({ originalIngr: data, selected: this.state.selected - 1 })
        }
    }

    render() {
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={() => {
                if (this.props.rute === 'promo') {
                    if (this.props.data.selectivo === 1 && this.state.selected === 0) {
                        this.setState({ actionMessage: 'Debes seleccionar al menos 1 ingrediente' })
                        this._showDialogResponse()
                    } else this.hideModal()
                } else this.hideModal()
            }}
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
                <Card.Content style={{ alignItems: 'center', }}>
                    <Text style={styles.details} numberOfLines={4}>{this.props.data.detalle}</Text>
                    {(this.props.data.tope) ?
                        <Text style={[styles.details, { fontWeight: 'bold' }]}>{this.props.data.tope} ingrediente(s) como máximo</Text> : null}

                    <DataTable style={{
                        marginTop: sizes.wp('-2%'), width: sizes.wp('140%'), left: -10
                    }}>
                        <DataTableHeader
                            title={'¿De qué esta hecho este producto?'}
                            style={{ right: sizes.wp('-3%') }}
                        />
                        {(!this.state.modifing) ?
                            <View>
                                <DataTableRow checkboxOffset type={'header'} style={{ left: 10 }}>
                                    <DataTableCell text={'INGREDIENTES'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%', left: -30 }} />
                                    <DataTableCell text={'Detalle'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '10%' }} minWidth={90} />
                                    <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                    <DataTableCell text={'Precio'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={70} />
                                    <DataTableCell text={'Opcional'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                </DataTableRow>

                                <ScrollView style={{ height: (this.props.data.tope) ? sizes.hp('31%') : sizes.hp('33%') }}>
                                    {(this.state.originalIngr.length > 0) ?
                                        this.state.originalIngr
                                            .map(row =>
                                                < DataTableRow key={row.id}
                                                    style={{ left: 10, }}
                                                    showCheckbox
                                                    selected={row.check}
                                                    onPressCheckbox={() => {
                                                        if (row.opcion !== null) this.onCheckChanged(row.id)
                                                        else this.setState({ actionMessage: 'Este ingrediente no se puede quitar' }), this._showDialogResponse()
                                                    }}>
                                                    <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%', left: -30 }} textStyle={{ textAlign: 'center' }} />
                                                    <DataTableCell text={(row.detalle) ? row.detalle : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '10%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={(row.precio) ? '$' + (row.precio).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={70} />
                                                    <DataTableCell text={(row.opcion === 1) ? 'Agregar' : (row.opcion === 0) ? 'Eliminar' : '-'} textStyle={{
                                                        textAlign: 'center', color: (row.opcion === 1) ? colors.APP_GREEN :
                                                            (row.opcion === 0) ? colors.APP_RED : null
                                                    }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                </DataTableRow>
                                            )
                                        :
                                        <DataTableCell text={'Este producto no posee ingredientes para mostrar'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                                    }
                                </ScrollView>
                            </View>
                            :
                            <View>
                                <DataTableRow checkboxOffset type={'header'} style={{ left: 10 }}>
                                    <DataTableCell text={'INGREDIENTES'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%', left: -30 }} />
                                    <DataTableCell text={'Precio'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={70} />
                                    <DataTableCell text={'     '} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '4%' }} minWidth={50} />
                                    <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                    <DataTableCell text={'     '} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '4%' }} minWidth={50} />
                                    <DataTableCell text={'Opcional'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                </DataTableRow>

                                <ScrollView style={{ height: (this.props.data.tope) ? sizes.hp('31%') : sizes.hp('33%') }}>
                                    {this.state.originalIngr
                                        .map((row, i) =>
                                            < DataTableRow key={row.id}
                                                style={{ left: 10, }}
                                                showCheckbox
                                                selected={row.check}
                                                onPressCheckbox={() => {
                                                    if (row.opcion !== null) this.onCheckChanged(row.id)
                                                    else this.setState({ actionMessage: 'Este ingrediente no se puede quitar' }), this._showDialogResponse()
                                                }}>
                                                <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%', left: -30 }} textStyle={{ textAlign: 'center' }} />
                                                <DataTableCell text={(row.precio) ? '$' + (row.precio).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={70} />
                                                <DataTableCell text={'-'} textStyle={{ textAlign: 'center', color: (row.opcion === null) ? colors.APP_INACTIVE : colors.APP_RED, fontWeight: 'bold', fontSize: 30 }} style={{ maxWidth: '4%' }} minWidth={50}
                                                    onPress={(row.opcion === null) ? null : () => { this.setAmount(0, row.id) }} />
                                                <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                <DataTableCell text={'+'} textStyle={{ textAlign: 'center', color: (row.opcion === null) ? colors.APP_INACTIVE : colors.APP_GREEN, fontWeight: 'bold', fontSize: 30 }} style={{ maxWidth: '4%' }} minWidth={50}
                                                    onPress={(row.opcion === null) ? null : () => { this.setAmount(1, row.id) }} />
                                                <DataTableCell text={(row.opcion === 1) ? 'Agregar' : (row.opcion === 0) ? 'Eliminar' : '-'} textStyle={{
                                                    textAlign: 'center', color: (row.opcion === 1) ? colors.APP_GREEN :
                                                        (row.opcion === 0) ? colors.APP_RED : null
                                                }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                            </DataTableRow>
                                        )}
                                </ScrollView>
                            </View>
                        }

                    </DataTable>
                </Card.Content>
                <Card.Actions style={{ alignSelf: 'center' }}>
                    {(this.props.data.ingredientes[0].length > 0 && this.props.rute !== 'promo') ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button
                                style={{ width: sizes.wp('33%'), marginRight: sizes.wp('19.7%') }}
                                mode="contained"
                                color={colors.APP_MAIN}
                                disabled={this.state.modifing}
                                onPress={() => { this.setState({ modifing: true }) }}>
                                Modificar
                            </Button>

                            <Button
                                style={{ width: sizes.wp('33%') }}
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={() => { this.addProduct() }}>
                                Agregar
 				            </Button>
                        </View>
                        : (this.props.data.ingredientes[0].length > 0 && this.props.rute === 'promo') ?
                            <Button
                                style={{ width: sizes.wp('33%') }}
                                mode="contained"
                                color={colors.APP_MAIN}
                                disabled={this.state.modifing}
                                onPress={() => {
                                    this.setState({ modifing: true })
                                    this.props.setModified(this.props.data.id)
                                }}>
                                Modificar
 				        </Button>
                            : (this.props.rute !== 'promo') ?
                                <Button
                                    style={{ width: sizes.wp('33%') }}
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={() => { this.addProduct() }}>
                                    Agregar
 				        </Button>
                                : null}
                </Card.Actions>

                <Portal>
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
    productCard: {
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
});

function mapStateToProps(state) {
    return {
        order: state.order
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProductOrder: (product) => dispatch(OrderActions.setProductOrder(product)),
        updateTotal: (total) => dispatch(OrderActions.updateTotal(total)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsOrder);