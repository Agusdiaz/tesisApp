import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Searchbar } from 'react-native-paper';
import OrderCardShop from '../../commons/orderCardShop'
import { Surface, ToggleButton } from 'react-native-paper';
import moment from 'moment'
import { getPendingOrdersByShopInOrder, getPendingOrdersByShopMoreProducts } from '../../../api/orders'

class HomeShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            areOrders: true,
            refreshing: false,
            orders: [],
            valueButtons: 'time',
            sortText: 'Orden de llegada',
            searchQuery: '',
        };
        this.arrayholder = [];
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.getOrdersByArrival()
    }

    handleButtons = (values, callback) => {
        if (values != null) {
            this.setState({ valueButtons: values })
            callback()
        }
    }

    async getOrdersByArrival() {
        const data = await getPendingOrdersByShopInOrder(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ areOrders: false })
        else {
            this.setState({ areOrders: true, orders: data.body })
            this.arrayholder = data.body
        }
    }

    async getOrdersByMoreProducts() {
        const data = await getPendingOrdersByShopMoreProducts(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ areOrders: false })
        else {
            this.setState({ areOrders: true, orders: data.body })
            this.arrayholder = data.body
        }
    }

    onRefresh() {
        this.setState({ orders: [], refreshing: true });
        this.arrayholder = []
        if (this.state.valueButtons === 'time')
            this.getOrdersByArrival()
        else
            this.getOrdersByMoreProducts()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch(query) {
        const newData = this.arrayholder.filter(function (item) {
            const dateFilter = item.fecha ? (moment(item.fecha).format("YYYY/MM/DD hh:mm")).toUpperCase() : ''.toUpperCase();
            const clientFilter = item.cliente ? item.cliente.toUpperCase() : ''.toUpperCase();
            const textData = (query.toString()).toUpperCase();
            return (dateFilter.indexOf(textData) > -1 || clientFilter.indexOf(textData) > -1);
        });
        this.setState({
            orders: newData,
            searchQuery: query,
            areOrders: (newData.length > 0) ? true : false
        });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 10,
                }}
            />
        );
    }

    _renderItem(item) {
        if (this.state.areOrders) {
            return (
                <OrderCardShop data={item} refreshParent={this.onRefresh} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noOrderShop.png')} style={styles.image} />
                    <Text style={styles.infoImage}>Actualmente no tenés pedidos que entregar</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={appStyles.container}>

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold' }}>TENÉS {this.state.orders.length} PEDIDOS PENDIENTES</Text>
                </Surface>

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar por cliente o fecha"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={text => this._onChangeSearch(text)}
                    value={this.state.searchQuery}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('100%'), top: sizes.hp('6%') }}>
                    <Text numberOfLines={2} style={{ width: '70%', fontSize: 15, textAlign: 'left', left: sizes.wp('1%'), bottom: sizes.hp('-1.5%') }}>
                        Ordenar por: {this.state.sortText}
                    </Text>

                    <ToggleButton.Group
                        onValueChange={value => this.handleButtons(value, () => {
                            this.setState({
                                sortText: (value === 'time') ? 'Orden de llegada'
                                    : 'Más productos pedidos'
                            });
                        })}
                        value={this.state.valueButtons}>
                        <ToggleButton style={styles.toggleButton} icon="timelapse" value="time" onPress={() => this.getOrdersByArrival()}
                            color={(this.state.valueButtons === 'time') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                        <ToggleButton style={styles.toggleButton} icon="sort-numeric" value="products" onPress={() => this.getOrdersByMoreProducts()} //icon="shopping"
                            color={(this.state.valueButtons === 'products') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                    </ToggleButton.Group>
                </View>

                <FlatList
                    style={styles.list}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    data={(this.state.areOrders) ? this.state.orders : [1]}
                    ItemSeparatorComponent={this.renderSeparator}
                    initialNumToRender={0}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item, i) => i.toString()} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        top: sizes.hp('6%'),
        width: '100%',
        //marginBottom: sizes.hp('5%'),
    },
    surface: {
        marginTop: sizes.hp('5%'),
        width: sizes.wp('100%'),
        padding: 20,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    toggleButton: {
        right: sizes.wp('1%'),
        marginLeft: sizes.wp('2%'),
    },
    searchInput: {
        position: 'absolute',
        top: sizes.hp('12.5%'),
        width: sizes.wp('100%'),
        left: sizes.wp('0%'),
        fontSize: sizes.TEXT_INPUT,
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        marginTop: sizes.hp('44.5%'),
        top: sizes.hp('-31%')
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
})

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

export default connect(mapStateToProps)(HomeShopScreen);