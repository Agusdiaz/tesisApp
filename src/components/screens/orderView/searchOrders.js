import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Searchbar } from 'react-native-paper';

export default class SearchOrdersScreen extends Component {
    state = {
        searchQuery: '',
    };

    _onChangeSearch = query => this.setState({ searchQuery: query });

    render() {
        const { searchQuery } = this.state;
        return (
            <View style={appStyles.container}>
                <Searchbar
                    style = {styles.searchInput}
                    placeholder="Buscar local"
                    iconColor={colors.APP_MAIN}
                    onChangeText={this._onChangeSearch}
                    value={searchQuery}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchInput: {
		position: 'absolute',
        top: 40,
        fontSize: sizes.TEXT_INPUT,
	},
})