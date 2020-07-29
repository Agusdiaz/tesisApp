import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, VirtualizedList, RefreshControl } from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCard from '../../commons/shopCardSummary'
import { Actions } from 'react-native-router-flux';
import ArrowButton from '../../commons/arrowButton'
import { getClientFavourites } from '../../../api/shops'

class FavouritesShopsScreen extends Component {

    constructor() {
        super()
        this.state = {
            areFavourites: false,
            shops: null,
            refreshing: false,
        }
    }

    componentDidMount(){
        this.getFavourites()
    }

    getFavourites = () => {
        getClientFavourites('mp@mail.com').then((shops) => {
        this.setState({ shops: shops, areFavourites: (shops != null) ? true : false })})
    }

    onRefresh() {
        //Clear old data of the list
        this.setState({ shops: [] });
        //Call the Service to get the latest data
        this.getFavourites()
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
        if (this.state.refreshing) {
            return (
                <View style={appStyles.container}>

                <ArrowButton rute='navBarClientProfile' />

                <Surface style={[styles.surface, { top: (this.state.areFavourites) ? sizes.hp('12.8%') : sizes.hp('-20%') }]}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS LOCALES FAVORITOS</Text>
                </Surface>
                
                <View style={{ flex: 1, marginTop: 145 }}>
                    <ActivityIndicator size='large'/>
                </View>
                </View>
            );

        }
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
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}
                        data={this.state.shops}
                        initialNumToRender={0}
                        renderItem={({ item }) => <ShopCard data={item}/>}
                        keyExtractor={(item, i) => i.toString()}
                        getItemCount={() => this.state.shops.length}
                        getItem={(item, i) => item[i]} />
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
        //borderWidth: 5,
        //height: sizes.hp('-5%'),
        top: sizes.hp('13%'),
        marginBottom: sizes.hp('14%'),
        width: '100%'
    }
})

export default FavouritesShopsScreen;