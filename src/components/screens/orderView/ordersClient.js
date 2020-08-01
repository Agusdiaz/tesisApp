import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image, View, VirtualizedList, RefreshControl } from 'react-native';
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

    componentDidMount(){
        this.getOrders()
    }

    async getOrders(){
        const data = await getAllOrdersByClient(this.props.user.mail, this.props.user.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ areOrders: false})
        else 
            this.setState({ areOrders: true, orders: data.body })
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

    onRefresh() {
        this.setState({ orders: [], refreshing: true });
        this.getOrders()
        this.setState({ refreshing: false });  
    }

    render() {
       
        return (
            <View style={appStyles.container}>

                <ArrowButton rute='navBarClientProfile' />

                <Surface style={[styles.surface, {top: (this.state.areOrders) ? sizes.hp('12.8%') : sizes.hp('-20%')}]}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTE ES TU HISTORIAL DE PEDIDOS</Text>
                </Surface>

                {(this.state.areOrders) ?
                    <VirtualizedList
                        style={styles.list}
                        ItemSeparatorComponent={this.renderSeparator}
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}
                        data={this.state.orders}
                        initialNumToRender={0}
                        renderItem={({ item }) => <OrderCardClient data={item}/>}
                        keyExtractor={(item, i) => i.toString()}
                        getItemCount={() => this.state.orders.length}
                        getItem={(item, i) => item[i]} />
                    :
                    <View style={styles.viewImage}>
                        <Image source={require('../../../icons/noOrderClient.png')} style={styles.image} />
                        <Text style={styles.infoImage}>No se registran pedidos</Text>
                    </View>
                }
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
        marginBottom: sizes.hp('0.5%'),
        width: '100%',
    },
})

function mapStateToProps(state) {
    return {
        user: state.authState
    };
}

export default connect(mapStateToProps)(OrdersClientScreen);