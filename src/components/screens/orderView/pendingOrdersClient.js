import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image, View, VirtualizedList, RefreshControl, ActivityIndicator } from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import OrderCardClient from '../../commons/orderCardClient';
import {getPendingOrdersByClient} from '../../../api/orders'

class PendingOrdersClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arePendings: true,
            refreshing: false, //cuando funcione bien -> true
            orders: []
        }
    }

    componentDidMount(){
        this.getPendings()
    }

    async getPendings(){
        const data = await getPendingOrdersByClient(this.props.user.mail, this.props.user.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ arePendings: false})
        else 
            this.setState({ arePendings: true, orders: data.body })
    }

    onRefresh() {
        this.setState({ orders: [], refreshing: true });
        this.getPendings()
        this.setState({ refreshing: false });   
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

    render() {
        return (
            <View style={appStyles.container}>

                <Surface style={[styles.surface, { top: (this.state.arePendings) ? sizes.hp('6%') : sizes.hp('-20%') }]}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS PEDIDOS PENDIENTES</Text>
                </Surface>

                {(this.state.arePendings) ?
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
                        <Text style={styles.infoImage}>En este momento no tenés ningún pedido pendiente</Text>
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
        marginBottom: sizes.hp('2%'),
        alignSelf:'center'
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    list: {
        top: sizes.hp('6.5%'),
        marginBottom: sizes.hp('0.5%'),
        width: '100%',
    },
})

function mapStateToProps(state) {
    return {
        user: state.authState
    };
}

export default connect(mapStateToProps)(PendingOrdersClientScreen);