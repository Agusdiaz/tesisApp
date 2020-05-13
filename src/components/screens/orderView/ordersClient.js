import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, VirtualizedList, RefreshControl, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Surface } from 'react-native-paper';
import OrderDeliveredCardClient from '../../commons/orderDeliveredCard';
import ArrowButton from '../../commons/arrowButton'

const getItem = (data, index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

const getItemCount = (data) => {
    return 10 ;
}

class OrdersClientScreen extends Component { //EL ESTADO DEL PEDIDO TIENE QUE SER 'ENTREGADO'

    constructor() {
        super()
        this.state = {
            areOrders: true,
            refreshing: false,
        }
        this.GetData();
    }

    GetData = () => {
        /*
      //Service to get the data from the server to render
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            refreshing: false,
            //Setting the data source for the list to render
            dataSource: responseJson
          });
        })
        .catch(error => {
          console.error(error);
        });
        */
    };

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
        //Clear old data of the list
        this.setState({ dataSource: [] });
        //Call the Service to get the latest data
        this.GetData();
    }

    render() {
        if (this.state.refreshing) {
            return (
                <View style={appStyles.container}>

                <ArrowButton rute='navBarClientProfile' />

                <Surface style={[styles.surface, {top: (this.state.areOrders) ? sizes.hp('12.8%') : (this.state.areOrders && !this.state.refreshing) ? sizes.hp('-20%') : sizes.hp('12.8%')}]}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTE ES TU HISTORIAL DE PEDIDOS</Text>
                </Surface>
                
                <View style={{ flex: 1, marginTop: 145 }}>
                    <ActivityIndicator size='large'/>
                </View>
                </View>
            );
        }
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
                        data={this.state.dataSource}
                        initialNumToRender={0}
                        renderItem={({ item }) => <OrderDeliveredCardClient />}
                        keyExtractor={item => item.key}
                        getItemCount={getItemCount}
                        getItem={getItem} />
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

export default OrdersClientScreen;