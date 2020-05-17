import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, FlatList } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Searchbar } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import ShopCardSummary from '../../commons/shopCardSummary'

const DATA = [
    { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' },
]

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class ChooseShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchQuery: '',
            areStores: true,
            animatedValue: new Animated.Value(0),
        };
        this.arrayholder = [];
    }

    nextStepParent = () => {
        this.props.nextStepParent();
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

                    <Searchbar
                        style={styles.searchInput}
                        placeholder="Buscar local por nombre"
                        theme={{ colors: { primary: colors.APP_MAIN } }}
                        iconColor={colors.APP_MAIN}
                        onChangeText={this._onChangeSearch}
                        value={searchQuery}
                    />

                    <View style={{ marginTop: sizes.hp('-70%') }}>
                        <ActivityIndicator />
                    </View>
                </View>
            );
        }
        const { searchQuery } = this.state;
        return (
            <View style={appStyles.container}>

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar local por nombre"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={this._onChangeSearch}
                    value={searchQuery}
                />

                {(this.state.areStores) ?
                    <AnimatedFlatList
                        style={styles.list}
                        ItemSeparatorComponent={this.renderSeparator}
                        data={DATA}
                        initialNumToRender={0}
                        onScroll={this.props.onScroll}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => <ShopCardSummary rute={'chooseShop'} nextStepParent={this.nextStepParent} />}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, i) => i.toString()}
                    />
                    :
                    <View style={styles.viewImage}>
                        <Image source={require('../../../icons/noStore.png')} style={styles.image} />
                        <Text style={styles.infoImage}>No se encontraron locales con ese nombre</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchInput: {
        position: 'absolute',
        top: sizes.hp('2%'),
        width: sizes.wp('98%'),
        //left: sizes.wp('20%'),
        fontSize: sizes.TEXT_INPUT,
    },
    list: {
        top: sizes.hp('9%'),
        marginBottom: sizes.hp('1%'),
        width: sizes.wp('100%'),
        //height: sizes.hp('80%'),
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