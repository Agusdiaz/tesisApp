import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, VirtualizedList } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Actions } from 'react-native-router-flux';

export default class SearchShopsScreen extends Component {

    render() {
        return (
            <View style={appStyles.container}>

                <TouchableOpacity style={styles.touchable} onPress={() => Actions.searchshopname()}>
                    <ImageBackground source={require('../../../icons/name.jpg')} style={styles.imageContainerName} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>BUSCAR LOCAL POR NOMBRE</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchable} onPress={() => Actions.searchshopaddress()}>
                    <ImageBackground source={require('../../../icons/address.jpg')} style={styles.imageContainerAddress} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>BUSCAR LOCAL POR DIRECCIÓN</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchable} onPress={() => Actions.searchshopsale()}>
                    <ImageBackground source={require('../../../icons/sale.jpg')} style={styles.imageContainerSale} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>ENCONTRÁ PROMOCIONES</Text>
                    </ImageBackground>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainerName: {
        height: sizes.hp('26%'),
        width: sizes.wp('98%'),
        top: sizes.hp('3%'),
    },
    imageContainerAddress: {
        height: sizes.hp('26%'),
        width: sizes.wp('98%'),
        bottom: sizes.hp('-3%'),
    },
    imageContainerSale: {
        height: sizes.hp('26%'),
        width: sizes.wp('98%'),
        bottom: sizes.hp('-3%'),
    },
    imageInside: {
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#FFF',
        opacity: 0.7
    },
    touchable: {
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf: 'center',
        marginTop: sizes.hp('6.5%'),
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
});