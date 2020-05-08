import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, VirtualizedList } from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCard from '../../commons/shopCardSummary'
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

    constructor() {
        super()
        this.state = {
            areFavourites: false,
        }
    }

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

                <ArrowButton rute='navBarClientProfile' />

                <Surface style={[styles.surface, { top: (this.state.areFavourites) ? sizes.hp('12.8%') : sizes.hp('-20%') }]}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS LOCALES FAVORITOS</Text>
                </Surface>

                {(this.state.areFavourites) ?
                    <VirtualizedList
                        style={styles.list}
                        ItemSeparatorComponent={this.renderSeparator}
                        data={DATA}
                        initialNumToRender={0}
                        renderItem={({ item }) => <ShopCard />}
                        keyExtractor={item => item.key}
                        getItemCount={getItemCount}
                        getItem={getItem} />
                    :
                    <View style={styles.viewImage}>
                        <Image source={require('../../../icons/noStar.png')} style={styles.image} />
                        <Text style={styles.infoImage}>Todavía no tenés ningún local favorito</Text>
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
        alignSelf: 'center'
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
        width: '100%'
    }
})

export default FavouritesShopsScreen;