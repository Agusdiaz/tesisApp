import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Surface } from 'react-native-paper';
import OrderCardClient from '../../commons/orderCardClient';
import ArrowButton from '../../commons/arrowButton'
import { getAllOrdersByClient } from '../../../api/orders'

class OrdersClientScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            areOrders: true,
            refreshing: false,
            orders: [],
        }
    }

    componentDidMount() {
        this.getOrders()
    }

    async getOrders() {
        const data = await getAllOrdersByClient(this.props.user.mail, this.props.user.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ areOrders: false })
        else
            this.setState({ areOrders: true, orders: data.body })
    }

    onRefresh = () => {
        this.setState({ orders: [], refreshing: true });
        this.getOrders()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
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

                <Surface style={[styles.surface, { top: (this.state.areOrders) ? sizes.hp('12.8%') : sizes.hp('-20%') }]}>
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
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center'
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
        marginBottom: sizes.hp('14%'),
        width: '100%',
    },
})

function mapStateToProps(state) {
    return {
        user: state.authState
    };
}

export default connect(mapStateToProps)(OrdersClientScreen);