import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Surface } from 'react-native-paper';
import ArrowButton from '../../commons/arrowButton'

class LastOrdersClientScreen extends Component { //EL ESTADO DEL PEDIDO TIENE QUE SER 'ENTREGADO'

    render() {
        return (
            <View style={appStyles.container}>

                <ArrowButton rute='navBarClientProfile' />

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS PEDIDOS DENTRO DE LAS ÚLTIMAS 48HS</Text>
                </Surface>

                <Image source={require('../../../icons/plato.png')} style={styles.image} />
                <Text style={styles.info}>No se registran pedidos</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    surface: {
        top: sizes.hp('-20.5%'),
        width: sizes.wp('100%'),
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    header: {
        fontSize: 25,
        alignContent: 'flex-start',
        justifyContent: 'space-evenly',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'center'
    },
    info: {
        fontSize: 16,
        justifyContent: 'center'
    },
})

export default LastOrdersClientScreen;