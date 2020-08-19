import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, productCondition } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Portal, Modal, Surface } from 'react-native-paper';
import OrderActions from '../../../redux/orders/action'
import TextTicker from 'react-native-text-ticker'
import ProductDetails from '../../commons/productDetails'

class PromoDetailsInCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: 'https://picsum.photos/500',
            productDetails: [],
            visibleModalDetails: false,
        }
    }

    hideModal = () => { this.props.hideModalFromChild() }

    _showModalDetails = () => this.setState({ visibleModalDetails: true });
    _hideModalDetails = () => this.setState({ visibleModalDetails: false });

    removePromo() {
        this.props.updateTotal(this.props.order.total - (this.props.promo.precio * this.props.promo.cantidad))
        this.props.removePromo(this.props.promo)
        this.hideModal()
    }

    setAmount(action) {
        if (action === 0 && this.props.promo.cantidad > 1) {
            var cant = this.props.promo.cantidad - 1
            this.props.updatePromoAmount(this.props.promo.idPromo, cant)
            this.props.updateTotal(this.props.order.total - this.props.promo.precio)
        }
        else if (action === 1) {
            var cant = this.props.promo.cantidad + 1
            this.props.updatePromoAmount(this.props.promo.idPromo, cant)
            this.props.updateTotal(this.props.order.total + this.props.promo.precio)
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
                marqueeDelay={1000}>{this.props.promo.nombre}</TextTicker>
            <Text style={styles.subtitle}>${this.props.promo.precio}</Text>
        </View>

        return (
            <Card style={styles.productCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-2') }} right={Close} rightStyle={styles.close} />
                <Divider />
                <Card.Title right={NamePrice} rightStyle={styles.rightSide} />
                <Card.Cover source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />
                <Card.Content style={{ alignItems: 'center' }}>
                    <Text style={styles.details} numberOfLines={4}>{this.props.promo.detalle}</Text>
                    <DataTable style={{
                        marginTop: sizes.wp('1%'), width: sizes.wp('80%'), left: -10,
                    }}>
                        <DataTableHeader
                            title={'¿Qué inlcuye la promoción?'}
                            style={{ right: sizes.wp('-11%') }}
                        />
                        <DataTableRow >
                            <DataTableCell text={'PRODUCTOS'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '45%' }} />
                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '5%' }} minWidth={100} />
                            <DataTableCell text={'Detalles'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '5%' }} minWidth={90} />
                        </DataTableRow>

                        <ScrollView style={{ height: sizes.hp('27%') }}>
                            {this.props.promo.productos
                                .map(row => (
                                    <DataTableRow key={row.idProducto}>
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
                <Card.Actions style={{ alignSelf: 'center', marginTop: sizes.hp('0.5%') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: sizes.wp('14%') }}>

                        <FAB
                            style={styles.fabAmount}
                            color={colors.APP_MAIN}
                            small
                            icon="minus"
                            onPress={() => this.setAmount(0)}
                        />

                        <Surface style={styles.surfaceAmount}>
                            <Text>{this.props.promo.cantidad}</Text>
                        </Surface>

                        <FAB
                            style={styles.fabAmount}
                            color={colors.APP_MAIN}
                            small
                            icon="plus"
                            onPress={() => this.setAmount(1)}
                        />
                    </View>

                    <Button
                        style={{ width: sizes.wp('33%') }}
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => { this.removePromo() }}>
                        Eliminar
 				        </Button>
                </Card.Actions>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <ProductDetails hideModalFromChild={this._hideModalDetails} data={this.state.productDetails}
                            rute={'promoOrder'} />
                    </Modal>
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
    fabAmount: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    surfaceAmount: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: sizes.wp('2%'),
        marginLeft: sizes.wp('2%'),
        borderRadius: 8,
    },
});

function mapStateToProps(state) {
    return {
        order: state.order,
        promo: state.order.selectedPromo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePromoAmount: (id, amount) => dispatch(OrderActions.updatePromoAmount(id, amount)),
        removePromo: (product) => dispatch(OrderActions.removePromo(product)),
        updateTotal: (total) => dispatch(OrderActions.updateTotal(total)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PromoDetailsInCart);