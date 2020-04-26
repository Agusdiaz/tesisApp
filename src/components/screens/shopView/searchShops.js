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

            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainerName: {
        height: sizes.hp('39%'),
        width: sizes.wp('98%'),
        //position: 'absolute',
        //left: sizes.wp('-50%'),
        top: sizes.hp('2%'),
    },
    imageContainerAddress: {
        height: sizes.hp('39%'),
        width: sizes.wp('98%'),
        //position: 'absolute',
        //right: sizes.wp('-50%'),
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
        marginTop: sizes.hp('12%'),
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#FFF'
    },
});