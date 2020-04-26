import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, VirtualizedList } from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCard from '../../commons/shopCard'
import { Actions } from 'react-native-router-flux';
import ArrowButton from '../../commons/arrowButton'

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

class FavouritesShopsScreen extends Component {

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

                <ArrowButton rute='navbarclient' />

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS LOCALES FAVORITOS</Text>
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
    surface: {
        marginTop: sizes.hp('13%'),
        width: sizes.wp('100%'),
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    list: {
        marginTop: sizes.hp('0.5%'),
        marginBottom: sizes.hp('0.5%'),
        width: '100%'
    }
})

export default FavouritesShopsScreen;