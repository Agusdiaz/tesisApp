import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, VirtualizedList } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Surface } from 'react-native-paper';
import ShopCard from '../../commons/shopCard'
import { Actions } from 'react-native-router-flux';

const DATA = [];

const getItem = (data, index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

const getItemCount = (data) => {
    return 10;
}

export default class AllShopsScreen extends Component {

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 20,
                }}
            />
        );
    }

    render() {
        return (
            <View style={appStyles.container}>

                <TouchableOpacity style={styles.touchable} onPress={() => Actions.searchshop()}>
                    <ImageBackground source={require('../../../icons/name.jpg')} style={styles.imageContainerName} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>Buscar local por nombre</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchable} onPress={() => Actions.searchshop()}>
                    <ImageBackground source={require('../../../icons/address.jpg')} style={styles.imageContainerAddress} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>Buscar local por dirección</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold' }}>LOCALES ADHERIDOS</Text>
                </Surface>

                <VirtualizedList
                    style={styles.list}
                    ItemSeparatorComponent={this.renderSeparator}
                    data={DATA}
                    initialNumToRender={0}
                    renderItem={({ item }) => <ShopCard />}
                    keyExtractor={item => item.key}
                    getItemCount={getItemCount}
                    getItem={getItem} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainerName: {
        height: sizes.hp('15%'),
        width: sizes.wp('50%'),
		position: 'absolute',
        left: sizes.wp('-50%'),
        top: sizes.hp('5%'),
    },
    imageContainerAddress: {
        height: sizes.hp('15%'),
        width: sizes.wp('50%'),
		position: 'absolute',
        right: sizes.wp('-50%'),
        top: sizes.hp('5%'),
    },
    imageInside: {
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#FFF',
        opacity: 0.88
    },
    touchable: {
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf:'center',
        marginTop: sizes.hp('5%'),
       textAlign: 'center'
    },
    surface: {
        top: sizes.hp('20.5%'),
        width: sizes.wp('100%'),
        padding: 20,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    list: {
        top: sizes.hp('21%'),
        marginBottom: sizes.hp('0.5%'),
        width: '100%'
    }
});