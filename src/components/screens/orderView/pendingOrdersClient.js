import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image, View, FlatList,} from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import OrderCardClient from '../../commons/orderCardClient';
import {getPendingOrdersByClient} from '../../../api/orders'

class PendingOrdersClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arePendings: true,
            refreshing: false,
            orders: []
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount(){
        this.getPendings()
    }

    async getPendings(){
        const data = await getPendingOrdersByClient(this.props.user.mail, this.props.user.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ arePendings: false})
        else this.setState({ arePendings: true, orders: data.body })
    }

    onRefresh(){
        this.setState({ orders: [], refreshing: true })
        this.getPendings()  
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
        if (this.state.arePendings) {
            return (
                <OrderCardClient data={item} refreshParent={this.onRefresh}/>
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

                    <FlatList
                        style={styles.list}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                        data={(this.state.arePendings) ? this.state.orders : [1]}
                        ItemSeparatorComponent={this.renderSeparator}
                        initialNumToRender={0}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item, i) => i.toString()}/>                    
            
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
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        bottom: sizes.hp('-3%'),
    },
    image: {
        width: 170,
        height: 170,
        alignSelf:'center',
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    list: {
        top: sizes.hp('6.5%'),
        marginBottom: sizes.hp('6%'),
        width: '100%',
    },
})

function mapStateToProps(state) {
    return {
        user: state.authState
    };
}

export default connect(mapStateToProps)(PendingOrdersClientScreen);