import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, productCondition } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton } from 'react-native-paper';
import OrderActions from '../../redux/orders/action'
import TextTicker from 'react-native-text-ticker'

class ProductDetailsOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalProd: {...props.data},
            photo: 'https://picsum.photos/500',
            product: {
                idProducto: props.data.id,
                cantidad: 1,
                ingredientes: [] //idIngrediente y cantidad
            },
            modifing: false,
            selected: 0
        }
    }

    componentDidMount() {
        console.log('abro')
    }

    componentWillUnmount(){
        console.log('cierro')
        this.setState({originalProd: null, product: null, modifing: null})
        //console.log('stateeeee ', this.state)
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    removeIngredient(id) {
        var index = this.state.originalProd.ingredientes[0].findIndex(x => x.id === id)
        var copy = [...this.state.originalProd.ingredientes]
        copy.splice(index, 1);
        this.setState(prevState => ({
            originalProd: {
                ...prevState.originalProd,
                ingredientes: copy
            }
        }))
    }

    addProduct() {
        if (!this.props.data.ingredientes[0])
            this.props.setProductOrder(this.state.product)
        else {
        }
        this.hideModal()
        /* this.setState(prevState => ({
            product: {            
                ...prevState.product,
                idProducto: 'something'
            }
        })) */
    }

    setAmount(action, id) {
        var index = this.state.originalProd.ingredientes[0].findIndex(x => x.id === id)
        var copy = [...this.state.originalProd.ingredientes]
        copy[0][index].cantidad = (action === 0) ? copy[0][index].cantidad - 1 : copy[0][index].cantidad + 1
        this.setState(prevState => ({
            originalProd: {
                ...prevState.originalProd,
                ingredientes: copy
            }
        }))
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
                <Card.Content style={{ alignItems: 'center', }}>
                    <Text style={styles.details} numberOfLines={6}>{this.props.data.detalle}</Text>
                    {(this.props.data.tope) ?
                    <Text style={[styles.details, {fontWeight: 'bold'}]}>{this.props.data.tope} ingrediente(s) como máximo</Text> : null}

                    <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('120%'), left: -10 }}>
                        <DataTableHeader
                            title={'¿De qué esta hecho este producto?'}
                            style={{ right: sizes.wp('-3%') }}
                        />
                        {(!this.state.modifing) ?
                            <View>
                                <DataTableRow >
                                    <DataTableCell text={'INGREDIENTES'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                    <DataTableCell text={'Detalle'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '10%'}} minWidth={90} />
                                    <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%'}} minWidth={90} />
                                    <DataTableCell text={'Precio'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={70} />
                                    <DataTableCell text={'Opcional'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                </DataTableRow>

                                <ScrollView style={{ height: (this.props.data.tope) ? sizes.hp('31%') : sizes.hp('33%') }}>
                                    {(this.props.data.ingredientes[0]) ?
                                        this.props.data.ingredientes[0]
                                            .map(row =>
                                                < DataTableRow key={row.id} >
                                                    <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%' }} textStyle={{ textAlign: 'center' }} />
                                                    <DataTableCell text={(row.detalle) ? row.detalle : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '10%', alignSelf: 'center'}} minWidth={90} />
                                                    <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center'}} minWidth={90} />
                                                    <DataTableCell text={(row.precio) ? '$' + (row.precio).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={70} />
                                                    <DataTableCell text={(row.opcion === 1) ? <Text style={{ color: colors.APP_GREEN }}>Agregar</Text> : (row.opcion === 0) ?
                                                        <Text style={{ color: colors.APP_RED }}>Eliminar</Text> : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                </DataTableRow>
                                            )
                                        :
                                        <DataTableCell text={'Este producto no posee ingredientes para mostrar'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                                    }
                                </ScrollView>
                            </View>
                            :
                            <View>
                                <DataTableRow >
                                    <DataTableCell text={'INGREDIENTES'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                    <DataTableCell text={'Precio'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={70} />
                                    <DataTableCell text={'Opcional'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                    <DataTableCell text={'     '} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '4%' }} minWidth={50} />
                                    <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                    <DataTableCell text={'     '} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '4%' }} minWidth={50} />
                                </DataTableRow>

                                <ScrollView style={{ height: (this.props.data.tope) ? sizes.hp('31%') : sizes.hp('33%') }}>
                                    {(this.state.originalProd.ingredientes[0]) ?
                                        this.state.originalProd.ingredientes[0]
                                            .map(row =>
                                                < DataTableRow key={row.id} >
                                                    <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%', }} textStyle={{ textAlign: 'center' }} />
                                                    <DataTableCell text={(row.precio) ? '$' + (row.precio).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={70} />
                                                    <DataTableCell text={(row.opcion === 1) ? <Text style={{ color: colors.APP_GREEN }}>{'Agregar'}</Text> : (row.opcion === 0) ?
                                                        <Text style={{ color: colors.APP_RED }} onPress={this.removeIngredient}>{'Eliminar'}</Text> : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={<Text style={{ color: (row.opcion === null) ? colors.APP_INACTIVE : colors.APP_RED, fontWeight: 'bold', fontSize: 30 }}>-</Text>} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '4%' }} minWidth={50}
                                                        onPress={(row.opcion === null) ? null : () => { this.setAmount(0, row.id) }} />
                                                    <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                                    <DataTableCell text={<Text style={{ color: (row.opcion === null) ? colors.APP_INACTIVE : colors.APP_GREEN, fontWeight: 'bold', fontSize: 30 }}>+</Text>} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '4%' }} minWidth={50}
                                                        onPress={(row.opcion === null) ? null : () => { this.setAmount(1, row.id) }} />
                                                </DataTableRow>
                                            )
                                        :
                                        <DataTableCell text={'Este producto ya no posee ingredientes'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                                    }
                                </ScrollView>
                            </View>
                        }

                    </DataTable>
                </Card.Content>
                <Card.Actions style={{ alignSelf: 'center' }}>
                    {(this.props.data.ingredientes[0]) ?
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
                        :
                        <Button
                            style={{ width: sizes.wp('33%') }}
                            mode="contained"
                            color={colors.APP_MAIN}
                            onPress={() => { this.addProduct() }}>
                            Agregar
 				        </Button>
                    }
                </Card.Actions>
            </Card >
        )
    }
}

const styles = StyleSheet.create({
    productCard: {
        height: sizes.hp('86%'),
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
        setProductOrder: (product) => dispatch(OrderActions.setProductOrder(product)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsOrder);