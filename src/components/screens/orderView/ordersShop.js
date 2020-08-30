import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Searchbar } from 'react-native-paper';
import { Surface } from 'react-native-paper';
import OrderCardShop from '../../commons/orderCardShop';
import ArrowButton from '../../commons/arrowButton'
import moment from 'moment'
import { getDeliveredOrdersByShop } from '../../../api/orders'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class OrdersShopScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            areOrders: true,
            refreshing: false,
            orders: [],
            searchQuery: '',
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        this.getOrders()
    }

    async getOrders() {
        const data = await getDeliveredOrdersByShop(this.props.shop.cuit, this.props.shop.token)
        if(data.status === 500 && data.body.error){
            this.props.logout()
            Actions.logsign({visible: true})
        } else if (data.status === 500 || data.status === 204)
            this.setState({ areOrders: false })
        else {
            this.setState({
                areOrders: true, orders: data.body.sort(function (a, b) {
                    return new Date(b.fecha) - new Date(a.fecha);
                })
            })
            this.arrayholder = data.body.sort(function (a, b) {
                return new Date(b.fecha) - new Date(a.fecha);
            })
        }
    }

    onRefresh = () => {
        this.setState({ orders: [], refreshing: true, searchQuery: '' });
        this.arrayholder = []
        this.getOrders()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch(query) {
        const newData = this.arrayholder.filter(function (item) {
            const dateFilter = item.fecha ? (moment(item.fecha).format("YYYY/MM/DD HH:mm")).toUpperCase() : ''.toUpperCase();
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
                    height: 5,
                }}
            />
        );
    }

    _renderItem(item) {
        if (this.state.areOrders) {
            return (
                <OrderCardShop data={item} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noOrderShop.png')} style={styles.image} />
                    <Text style={styles.infoImage}>No se registran pedidos</Text>
                </View>
            );
        }
    }

    render() {

        return (
            <View style={appStyles.container}>

                <ArrowButton rute='navBarShopProfile' />

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar por cliente o fecha"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={text => this._onChangeSearch(text)}
                    value={this.state.searchQuery}
                />

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTE ES TU HISTORIAL DE PEDIDOS</Text>
                </Surface>

                <FlatList
                    style={styles.list}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    data={(this.state.areOrders) ? this.state.orders : [1]}
                    ItemSeparatorComponent={this.renderSeparator}
                    initialNumToRender={0}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item, i) => i.toString()} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    surface: {
        width: sizes.wp('100%'),
        top: sizes.hp('12.8%'),
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    searchInput: {
        position: 'absolute',
        top: sizes.hp('5.5%'),
        width: sizes.wp('78%'),
        left: sizes.wp('20%'),
        fontSize: sizes.TEXT_INPUT,
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center'
    },
    image: {
        width: 170,
        height: 170,
        marginTop: sizes.hp('5%'),
        marginBottom: sizes.hp('2%')
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    list: {
        top: sizes.hp('13%'),
        marginBottom: sizes.hp('14.5%'),
        width: '100%',
    },
})

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersShopScreen);