import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Searchbar, Portal, Dialog, Modal, ActivityIndicator, Button } from 'react-native-paper';
import OrderCardShop from '../../commons/orderCardShop'
import { Surface, ToggleButton } from 'react-native-paper';
import BadgeActions from '../../../redux/notifications/action'
import moment from 'moment'
import { getPendingOrdersByShopInOrder, getPendingOrdersByShopMoreProducts } from '../../../api/orders'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

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
            actionMessage: '',
            visibleDialogResponse: false,
            loading: false,
        };
        this.arrayholder = [];
        this.onRefresh = this.onRefresh.bind(this);
        this.updateIsLoading = this.updateIsLoading.bind(this);
        this._showDialogResponse = this._showDialogResponse.bind(this);
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

    updateIsLoading(value) {
        this.setState({ loading: value })
    }

    _showDialogResponse(message) {
        this.setState({ visibleDialogResponse: true, actionMessage: message })
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' });

    async getOrdersByArrival() {
        const data = await getPendingOrdersByShopInOrder(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 204)
            this.setState({ areOrders: false })
        else {
            this.setState({ areOrders: true, orders: data.body.sort((a, b) => a.aceptado - b.aceptado || new Date(b.fecha) - new Date(a.fecha)) })
            this.arrayholder = this.state.orders
        }
    }

    async getOrdersByMoreProducts() {
        const data = await getPendingOrdersByShopMoreProducts(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 204)
            this.setState({ areOrders: false })
        else {
            this.setState({
                areOrders: true, orders: data.body.sort((a, b) => a.aceptado - b.aceptado || b.cantProductos - a.cantProductos)
            })
            this.arrayholder = this.state.orders
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
            const dateFilter = item.fecha ? (moment(item.fecha).format("YYYY/MM/DD HH:mm")).toUpperCase() : ''.toUpperCase();
            const clientFilter = item.cliente ? item.cliente.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() : ''.toUpperCase();
            const textData = (query.toString()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
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
                <OrderCardShop data={item} refreshParent={this.onRefresh} updateLoading={this.updateIsLoading} showDialogResponse={this._showDialogResponse} />
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
                        <ToggleButton style={styles.toggleButton} icon="sort-numeric" value="products" onPress={() => this.getOrdersByMoreProducts()}
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

                <Portal>

                    <Dialog
                        style={{ width: sizes.wp('70%'), alignSelf: 'center' }}
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
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

                </Portal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        top: sizes.hp('6%'),
        width: '100%',
        marginBottom: sizes.hp('6%'),
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateBadgeShop: (action) => dispatch(BadgeActions.updateBadgeShop(action)),
        logout: () => dispatch(UserActions.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeShopScreen);