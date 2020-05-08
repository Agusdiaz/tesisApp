import React, { Component } from 'react';
import { StyleSheet, View, Text, VirtualizedList, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import OrderCardShop from '../../commons/orderCardShop'
import { Surface, ToggleButton } from 'react-native-paper';

const getItem = (data, index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

const getItemCount = (data) => {
    return 10;
}

class HomeShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false, //cuando funcione bien -> true
            valueButtons: 'time',
            sortText: 'Orden de llegada',
            areOrders: false,
        }
        this.GetData();
    }

    handleButtons = (values, callback) => {
        if (values != null) {
            this.setState({ valueButtons: values })
            callback()
        }
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
                    height: 10,
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

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold' }}>PEDIDOS PENDIENTES</Text>
                </Surface>

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('100%') }}>
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
                        <ToggleButton style={styles.toggleButton} icon="timelapse" value="time"
                            color={(this.state.valueButtons === 'time') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                        <ToggleButton style={styles.toggleButton} icon="shopping" value="products"
                            color={(this.state.valueButtons === 'products') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                    </ToggleButton.Group>
                </View>

                {(this.state.areOrders) ?

                    <VirtualizedList
                        style={styles.list}
                        ItemSeparatorComponent={this.renderSeparator}
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}
                        data={this.state.dataSource}
                        initialNumToRender={0}
                        renderItem={({ item }) => <OrderCardShop />}
                        keyExtractor={item => item.key}
                        getItemCount={getItemCount}
                        getItem={getItem} />

                    :

                    <View style={styles.viewImage}>
                        <Image source={require('../../../icons/noOrderShop.png')} style={styles.image} />
                        <Text style={styles.infoImage}>Actualmente no tenés pedidos que entregar</Text>
                    </View>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        // marginTop: sizes.hp('0%'),
        marginBottom: 10,
        width: '100%',
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

export default HomeShopScreen;