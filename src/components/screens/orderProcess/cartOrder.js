import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { Card, FAB, Button, Divider, Portal, IconButton, Modal, } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import OrderActions from '../../../redux/orders/action'
import { Actions } from 'react-native-router-flux';
import ProductDetails from './productDetailsInCart'
import PromoDetails from './promoDetailsInCart'

class CartOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModalProduct: false,
            visibleModalPromo: false,
        }
    }

    _showModalProduct = () => this.setState({ visibleModalProduct: true })
    _hideModalProduct = () => this.setState({ visibleModalProduct: false })

    _showModalPromo = () => this.setState({ visibleModalPromo: true })
    _hideModalPromo = () => this.setState({ visibleModalPromo: false })

    async removeProduct(item) {
        this.props.updateTotal(this.props.order.total - (item.precio * item.cantidad))
        this.props.removeProduct(item.index)
    }

    removePromo(item) {
        this.props.updateTotal(this.props.order.total - (item.precio * item.cantidad))
        this.props.removePromo(item.index)
    }

    nextStep = () => {
        Actions.makeorder({ pos: 2 })
    }

    _renderItem(item, i) {
        if (this.props.order.productos.length > 0 || this.props.order.promociones.length > 0) {
            item.index = i
            const Info = props => <View>
                <TextTicker style={styles.title}
                    duration={5000}
                    loop
                    animationType='bounce'
                    repeatSpacer={50}
                    marqueeDelay={1000}>{item.nombre}</TextTicker>
                <Text style={styles.subtitle}>Cantidad: {item.cantidad}</Text>
                <Text style={styles.subtitle}>Precio: ${item.precio * item.cantidad}</Text>
            </View>
            return (
                <Card style={{ height: sizes.hp('15%'), elevation: 5,}}>
                    <Card.Actions style={styles.actionSide} >
                        {(item.modificado) ?
                            <Button style={{ position: 'absolute', }}
                                labelStyle={{ fontSize: 10 }}
                                mode="contained"
                                dark
                                color={colors.APP_MAIN}>
                                Modificado
                            </Button>
                            :
                            null}

                            <View style={{flexDirection: 'row', justifyContent:'space-between', width: sizes.wp('30%')}}>
                            <FAB
                            style={styles.fabButtons}
                            color={colors.APP_MAIN}
                            icon="delete"
                            small
                            onPress={() => {
                                if (item.idProducto !== undefined) this.removeProduct(item)
                                else this.removePromo(item)
                            }}
                        />
                        <FAB
                            style={styles.fabButtons}
                            color={colors.APP_MAIN}
                            icon="eye"
                            small
                            onPress={() => {
                                if (item.idProducto !== undefined) {
                                    this.props.setSelectedProduct(item)
                                    this._showModalProduct()
                                }
                                else {
                                    this.props.setSelectedPromo(item)
                                    this._showModalPromo()
                                }
                            }}
                        />
                        </View>
                    </Card.Actions>
                    <Card.Title left={Info} leftStyle={styles.leftSide} />
                </Card>
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noProducts.png')} style={styles.image} />
                    <Text style={styles.infoImage}>No hay productos seleccionados</Text>
                </View>
            );
        }
    }

    render() {
        const total = props => <Text style={styles.rightText}> ${this.props.order.total} </Text>

        return (
            <View style={[appStyles.container, { top: sizes.hp('7%'), }]} >

                <IconButton
                    style={{ left: sizes.wp('-40%'), top: sizes.hp('-6%') }}
                    icon='chevron-left'
                    color={colors.APP_MAIN}
                    size={40}
                    onPress={() => Actions.pop()} />

                <Card style={styles.orderCard}>
                    <Card.Title style={{ alignItems: 'center' }} title='¿Qué es lo que estas pidiendo?' titleStyle={{ fontSize: 21, alignSelf: 'center' }} />
                    <Divider style={styles.divider} />
                    <Card.Content style={styles.cardContent}>
                        <FlatList
                            style={styles.list}
                            data={(this.props.order.productos.length === 0 && this.props.order.promociones.length === 0) ? [1] : this.props.order.productos.concat(this.props.order.promociones)}
                            initialNumToRender={0}
                            renderItem={({ item, index }) => this._renderItem(item, index)}
                            keyExtractor={(item, i) => i.toString()} />
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Title style={{ margin: -9 }} titleStyle={{ fontSize: 18 }} title="Total:" right={total} />
                    <Divider style={styles.divider} />
                </Card>

                <Button
                    style={{ top: sizes.hp('-5%'), right: sizes.wp('-20%'), width: '50%' }}
                    icon="arrow-right-bold-outline"
                    mode="contained"
                    disabled={this.props.order.productos.length === 0 && this.props.order.promociones.length === 0}
                    color={colors.APP_MAIN}
                    onPress={this.nextStep}>
                    Continuar
 				</Button>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalProduct} onDismiss={this._hideModalProduct}>
                        <ProductDetails hideModalFromChild={this._hideModalProduct} />
                    </Modal>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalPromo} onDismiss={this._hideModalPromo}>
                        <PromoDetails hideModalFromChild={this._hideModalPromo} />
                    </Modal>

                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        height: sizes.hp('78%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 2,
        top: sizes.hp('-6%'),
    },
    cardContent: {
        alignItems: 'center',
        height: sizes.hp('64%'),
    },
    list: {
        top: sizes.hp('1%'),
        width: sizes.wp('85%'),
        marginBottom: sizes.hp('1%'),
    },
    divider: {
    },
    rightText: {
        fontSize: 16,
        right: sizes.wp('3%'),
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        top: sizes.hp('11%')
    },
    image: {
        width: 170,
        height: 170,
        marginBottom: sizes.hp('2%'),
        alignSelf: 'center',
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
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
    leftSide: {
        top: sizes.hp('-10.5%'),
        width: sizes.wp('48%'),
        height: sizes.hp('11%'),
    },
    actionSide: {
        alignSelf: 'flex-end',
        margin: -2,
        left: sizes.wp('-3%'),
        top: sizes.hp('1.2%'),
        height: sizes.hp('13%'),
        width: sizes.wp('30%'),
        flexDirection: 'column',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        marginTop: 15,
        fontSize: 16,
    },
    fabButtons: {
        backgroundColor: '#FFFFFF', 
        borderColor: colors.APP_MAIN, 
        borderWidth: 2, 
        top: sizes.hp('6%'),
    },
});

function mapStateToProps(state) {
    return {
        order: state.order
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedProduct: (product) => dispatch(OrderActions.setSelectedProduct(product)),
        setSelectedPromo: (promo) => dispatch(OrderActions.setSelectedPromo(promo)),
        removeProduct: (index) => dispatch(OrderActions.removeProduct(index)),
        removePromo: (index) => dispatch(OrderActions.removePromo(index)),
        updateTotal: (total) => dispatch(OrderActions.updateTotal(total)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOrder);