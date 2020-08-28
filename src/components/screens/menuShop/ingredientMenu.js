import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image, KeyboardAvoidingView } from 'react-native';
import { colors, sizes, productType } from '../../../index.styles';
import { Button, Searchbar } from 'react-native-paper';
import IngredientCard from '../../commons/ingredientCard'
import { getIngredients } from '../../../api/menus'

class IngredientMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            ingredients: [],
            areIngredients: true,
            searchQuery: '',
        }
        this.arrayholder = []
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.getIngredients()
    }

    async getIngredients() {
        const data = await getIngredients(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ areIngredients: false })
        else {
            this.setState({ ingredients: data.body, areIngredients: true })
            this.arrayholder = data.body
        }
    }

    onRefresh = () => {
        this.setState({ ingredients: [], refreshing: true });
        this.arrayholder = []
        this.getIngredients()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch(query) {
        const newData = this.arrayholder.filter(function (item) {
            const ingredientFilter = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
            const textData = (query.toString()).toUpperCase();
            return (ingredientFilter.indexOf(textData) > -1);
        });
        this.setState({
            ingredients: newData,
            searchQuery: query,
            areIngredients: (newData.length > 0) ? true : false
        });
    }

    _renderItem(item) {
        if (this.state.areIngredients) {
            return (
                <IngredientCard rute={(this.props.rute === 'initial') ? 'initial' : 'enable'} data={item} refreshParent={this.onRefresh} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noProducts.png')} style={styles.image} />
                    <Text style={styles.infoImage}>No se registran ingredientes</Text>
                </View>
            );
        }
    }

    render() {

        return (
            <View style={{ width: sizes.wp('100%'), height: sizes.hp('100%'), top: sizes.hp('13%'), flex: 1,}}>
            
                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar por nombre del ingrediente"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={text => this._onChangeSearch(text)}
                    value={this.state.searchQuery}
                />

                    <FlatList
                        style={styles.list}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        data={(this.state.areIngredients) ? this.state.ingredients : [1]}
                        initialNumToRender={0}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item, i) => i.toString()}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchInput: {
        position: 'absolute',
        top: sizes.hp('-1%'),
        width: sizes.wp('100%'),
        left: sizes.wp('0%'),
        fontSize: sizes.TEXT_INPUT,
    },
    list: {
        top: sizes.hp('5%'),
        width: sizes.wp('100%'),
        marginBottom: sizes.hp('18%')
        //height: sizes.hp('64%')
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
        height: sizes.hp('50%'),
    },
    image: {
        width: 170,
        height: 170,
        marginBottom: sizes.hp('2%'),
        marginTop: sizes.hp('-10%'),
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

export default connect(mapStateToProps)(IngredientMenu)