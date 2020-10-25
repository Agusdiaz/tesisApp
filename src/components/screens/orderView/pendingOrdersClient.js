import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image, View, FlatList, } from 'react-native';
import { Surface } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import OrderCardClient from '../../commons/orderCardClient';
import { getPendingOrdersByClient } from '../../../api/orders'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class PendingOrdersClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arePendings: true,
            refreshing: false,
            orders: [],
            searchQuery: '',
        };
        this.arrayholder = [];
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.getPendings()
    }

    async getPendings() {
        const data = await getPendingOrdersByClient(this.props.user.mail, this.props.user.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 204)
            this.setState({ arePendings: false })
        else {
            this.setState({ arePendings: true, orders: data.body.sort((a, b) => a.etapa.localeCompare(b.etapa) || b.tiempo - a.tiempo) })
            this.arrayholder = data.body.sort((a, b) => a.etapa.localeCompare(b.etapa) || a.tiempo - b.tiempo)
        }
    }

    onRefresh() {
        this.setState({ orders: [], refreshing: true })
        this.arrayholder = []
        this.getPendings()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch(query) {
        const newData = this.arrayholder.filter(function (item) {
            const shopFilter = item.nombre ? item.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() : ''.toUpperCase();
            const textData = (query.toString()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
            return (shopFilter.indexOf(textData) > -1);
        });
        this.setState({
            orders: newData,
            searchQuery: query,
            arePendings: (newData.length > 0) ? true : false
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
        if (this.state.arePendings) {
            return (
                <OrderCardClient data={item} refreshParent={this.onRefresh} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noOrderClient.png')} style={styles.image} />
                    <Text style={styles.infoImage}>En este momento no tenés ningún pedido pendiente</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={appStyles.container}>

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS PEDIDOS PENDIENTES</Text>
                </Surface>

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar por local"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={text => this._onChangeSearch(text)}
                    value={this.state.searchQuery}
                />

                <FlatList
                    style={styles.list}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    data={(this.state.arePendings) ? this.state.orders : [1]}
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
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
        top: sizes.hp('6%'),
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
        top: sizes.hp('5%'),
        bottom: sizes.hp('-3%'),
    },
    image: {
        width: 170,
        height: 170,
        alignSelf: 'center',
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    list: {
        top: sizes.hp('12.5%'),
        marginBottom: sizes.hp('12.5%'),
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

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrdersClientScreen);