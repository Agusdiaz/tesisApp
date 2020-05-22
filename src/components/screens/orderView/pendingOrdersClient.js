import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, VirtualizedList, RefreshControl, ActivityIndicator } from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import OrderPendingCardClient from '../../commons/orderPendingCardClient';

const getItem = (data, index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

const getItemCount = (data) => {
    return 10;
}

class PendingOrdersClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arePendings: true,
            refreshing: false //cuando funcione bien -> true
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
                //loading view while data is loading
                <View style={{ flex: 1, marginTop: 70 }}>
                    <ActivityIndicator />
                </View>
            );
        }
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
                        data={this.state.dataSource}
                        initialNumToRender={0}
                        renderItem={({ item }) => <OrderPendingCardClient />}
                        keyExtractor={item => item.id}
                        getItemCount={getItemCount}
                        getItem={getItem} />
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

export default PendingOrdersClientScreen;