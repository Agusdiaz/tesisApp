import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import { appStyles, colors } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'

class LastOrdersClientScreen extends Component {

    render() {
        return (
            <View style={appStyles.container}>

                <ArrowButton rute='navbarclient'/>
                 
                <Text style={styles.header}>Pedidos dentro de las últimas 48hs</Text>
                <Image source={require('../../../icons/plato.png')} style={styles.image} />
                <Text style={styles.info}>No se registran pedidos</Text>

            </View> 
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        alignContent:'flex-start',
		justifyContent: 'space-evenly',
    },
    image: {
        width: 150, 
        height: 150, 
        marginBottom: 20,
        marginTop: 20,
        justifyContent:'center'
    },
    info: {
        fontSize: 16,
        justifyContent:'center'
    },
})

export default LastOrdersClientScreen;