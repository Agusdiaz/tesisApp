import React, { Component } from 'react';
import { StyleSheet, View, VirtualizedList } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles'
import { Searchbar } from 'react-native-paper';
import ArrowButton from '../../commons/arrowButton'
import ShopCard from '../../commons/shopCard'

const DATA = [];

const getItem = (data, index) => {
    if (data == null){
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

export default class SearchShopScreen extends Component {
    state = {
        searchQuery: '',
    };

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
        const { searchQuery } = this.state;
        return (
            <View style={appStyles.container}>
                <ArrowButton rute='navbarclient'/>

                <Searchbar
                    style = {styles.searchInput}
                    placeholder="Buscar local por"
                    theme={{colors: {primary: colors.APP_MAIN}}}
                    iconColor={colors.APP_MAIN}
                    onChangeText={this._onChangeSearch}
                    value={searchQuery}
                />

<VirtualizedList
                    style={styles.list}
                    ItemSeparatorComponent={this.renderSeparator}
                    data={DATA}
                    initialNumToRender={0}
                    renderItem={({ item }) => <ShopCard />}
                    keyExtractor={item => item.key}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    />
            </View>
        );
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
    list:{
        top: sizes.hp('12%'),
        marginBottom: sizes.hp('15%'),
        width: '100%'
    },
})