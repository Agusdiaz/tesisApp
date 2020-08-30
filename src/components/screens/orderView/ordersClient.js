import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Searchbar } from 'react-native-paper';
import { Surface } from 'react-native-paper';
import OrderCardClient from '../../commons/orderCardClient';
import ArrowButton from '../../commons/arrowButton'
import moment from 'moment'
import { getAllOrdersByClient } from '../../../api/orders'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class OrdersClientScreen extends Component {

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
        const data = await getAllOrdersByClient(this.props.user.mail, this.props.user.token)
        if(data.status === 500 && data.body.error){
            this.props.logout()
            Actions.logsign({visible: true})
        } else if (data.status === 500 || data.status === 204)
            this.setState({ areOrders: false })
        else {
            this.setState({ areOrders: true, orders: data.body.sort(function(a,b){
                return new Date(b.fecha) - new Date(a.fecha);
              }) })
            this.arrayholder = data.body.sort(function(a,b){
                return new Date(b.fecha) - new Date(a.fecha);
              })
        }
    }

    onRefresh = () => {
        this.setState({ orders: [], refreshing: true });
        this.arrayholder = []
        this.getOrders()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch(query) {
        const newData = this.arrayholder.filter(function (item) {
            const dateFilter = item.fecha ? (moment(item.fecha).format("YYYY/MM/DD HH:mm")).toUpperCase() : ''.toUpperCase();
            const shopFilter = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
            const textData = (query.toString()).toUpperCase();
            return (dateFilter.indexOf(textData) > -1 || shopFilter.indexOf(textData) > -1);
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
                <OrderCardClient data={item} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noOrderClient.png')} style={styles.image} />
                    <Text style={styles.infoImage}>No se registran pedidos</Text>
                </View>
            );
        }
    }

    render() {

        return (
            <View style={appStyles.container}>

                <ArrowButton rute='navBarClientProfile' />

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar por local o fecha"
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
    searchInput: {
        position: 'absolute',
        top: sizes.hp('5.5%'),
        width: sizes.wp('78%'),
        left: sizes.wp('20%'),
        fontSize: sizes.TEXT_INPUT,
    },
    surface: {
        width: sizes.wp('100%'),
        top: sizes.hp('12.8%'),
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
        marginTop: sizes.hp('6%')
    },
    image: {
        width: 170,
        height: 170,
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
        user: state.authState.client,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersClientScreen);