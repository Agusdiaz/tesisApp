import React, { Component } from 'react';
import { StyleSheet, Text, View, VirtualizedList, Image } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { Button, Surface } from 'react-native-paper';
import ProductCard from '../../commons/productCard'

const DATA = [];

const getItem = (index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

const getItemCount = (data) => {
    return 10;
}

class DisabledProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areDisabled: true,
        }
    }

    render() {

        return (
            <View style={appStyles.container}>

                <Surface style={[styles.surface, { top: (this.state.areDisabled) ? sizes.hp('5%') : sizes.hp('-20.7%') }]}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS PRODUCTOS DESHABILITADOS</Text>
                </Surface>

                {(this.state.areDisabled) ?
                    <VirtualizedList
                        style={styles.list}
                        data={DATA}
                        initialNumToRender={0}
                        data={DATA}
                        renderItem={({ item }) => <ProductCard rute='disabled' />}
                        keyExtractor={item => item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                    />
                    :
                    <View style={styles.viewImage}>
                        <Image source={require('../../../icons/noProductsDisabled.png')} style={styles.image} />
                        <Text style={styles.infoImage}>No tenés productos deshabilitados</Text>
                    </View>
                }

            </View>

        )
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
        alignSelf: 'center'
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    list: {
        marginTop: sizes.hp('6%'),
        width: sizes.wp('100%'),
    },
});

export default DisabledProducts;