import React, { Component } from 'react';
import { StyleSheet, View, VirtualizedList, Text, ActivityIndicator, Alert, Image } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles'
import { Searchbar } from 'react-native-paper';
import ArrowButton from '../../commons/arrowButton'
import ShopCard from '../../commons/shopCardSummary'

const getItem = (data, index) => {
    if (data == null) {
        return null
    }
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

const getItemCount = (data) => {
    return 10;
}

export default class SearchShopBySaleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchQuery: '',
            areSales: true,
            DATA: [],
        };
        //his.arrayholder = [];
    }

    _onChangeSearch = query => this.setState({ searchQuery: query });

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
        if (this.state.isLoading) { //ESTA BUSCANDO
            return (
                <View style={appStyles.container}>
                    <ArrowButton rute='navBarClientSearch' />

                    <Searchbar
                        style={styles.searchInput}
                        placeholder="Buscar local por nombre"
                        theme={{ colors: { primary: colors.APP_MAIN } }}
                        iconColor={colors.APP_MAIN}
                        onChangeText={this._onChangeSearch}
                        value={this.state.searchQuery}
                    />

                    <View style={{ marginTop: sizes.hp('-70%') }}>
                        <ActivityIndicator />
                    </View>
                </View>
            );
        }
        else {
            //const { searchQuery } = this.state;
            return (
                <View style={appStyles.container}>
                    <ArrowButton rute='navBarClientSearch' />

                    <Searchbar
                        style={styles.searchInput}
                        placeholder="Buscar local por nombre"
                        theme={{ colors: { primary: colors.APP_MAIN } }}
                        iconColor={colors.APP_MAIN}
                        onChangeText={this._onChangeSearch}
                        value={this.state.searchQuery}
                    />

                    {(this.state.areSales) ?
                        <VirtualizedList
                            style={styles.list}
                            ItemSeparatorComponent={this.renderSeparator}
                            data={this.state.DATA}
                            initialNumToRender={0}
                            renderItem={({ item }) => <ShopCard />}
                            keyExtractor={item => item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />
                        :
                        <View style={styles.viewImage}>
                            <Image source={require('../../../icons/noSales.png')} style={styles.image} />
                            <Text style={styles.infoImage}>Actualmente no hay promociones vigentes</Text>
                        </View>
                    }
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    searchInput: {
        position: 'absolute',
        top: sizes.hp('5.5%'),
        width: sizes.wp('78%'),
        left: sizes.wp('20%'),
        fontSize: sizes.TEXT_INPUT,
    },
    list: {
        top: sizes.hp('12%'),
        marginBottom: sizes.hp('14%'),
        width: '100%'
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        marginTop: sizes.hp('45%'),
        top: sizes.hp('-40%')
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