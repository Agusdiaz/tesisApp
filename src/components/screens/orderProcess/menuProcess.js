import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { colors, sizes, productType } from '../../../index.styles'
import { Button, Searchbar } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import ProductCard from '../../commons/productCard'
import { getMenu } from '../../../api/menus'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MenuProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueButtons: productType.SALTY,
            refreshing: false,
            menuSalty: [],
            menuSweet: [],
            menuDrinks: [],
            areSalty: true,
            areSweet: false,
            areDrinks: false,
            searchQuery: '',
        }
        this.arrayholderSalty = []
        this.arrayholderSweet = []
        this.arrayholderDrinks = []
    }

    componentDidMount() {
        this.getMenu()
    }

    async getMenu() {
        const data = await getMenu(this.props.shop.cuit, this.props.user.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ areSalty: false, areSweet: false, areDrinks: false })
        else {
            data.body.map(obj => {
                if (obj.tipo === productType.SALTY) {
                    this.state.menuSalty.push(obj)
                    this.arrayholderSalty.push(obj)
                } else if (obj.tipo === productType.SWEET) {
                    this.state.menuSweet.push(obj)
                    this.arrayholderSweet.push(obj)
                } else {
                    this.state.menuDrinks.push(obj)
                    this.arrayholderDrinks.push(obj)
                }
            })
            this.setState({
                areSalty: (this.state.menuSalty.length > 0) ? true : false, areSweet: (this.state.menuSweet.length > 0) ? true : false,
                areDrinks: (this.state.menuDrinks.length > 0) ? true : false
            })
        }
    }

    handleButtons = (values) => {
        if (values != null)
            this.setState({ valueButtons: values })
    }

    onRefresh = () => {
        this.setState({ menuSalty: [], menuSweet: [], menuDrinks: [], refreshing: true });
        this.arrayholderSalty = []
        this.arrayholderSweet = []
        this.arrayholderDrinks = []
        this.getMenu()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch(query) {
        if (this.state.valueButtons === productType.SALTY) {
            const newData = this.arrayholderSalty.filter(function (item) {
                const productFilter = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
                const textData = (query.toString()).toUpperCase();
                return (productFilter.indexOf(textData) > -1);
            });
            this.setState({
                menuSalty: newData,
                searchQuery: query,
                areSalty: (newData.length > 0) ? true : false
            });
        } else if (this.state.valueButtons === productType.SWEET) {
            const newData = this.arrayholderSweet.filter(function (item) {
                const productFilter = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
                const textData = (query.toString()).toUpperCase();
                return (productFilter.indexOf(textData) > -1);
            });
            this.setState({
                menuSweet: newData,
                searchQuery: query,
                areSweet: (newData.length > 0) ? true : false
            });
        } else {
            const newData = this.arrayholderDrinks.filter(function (item) {
                const productFilter = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
                const textData = (query.toString()).toUpperCase();
                return (productFilter.indexOf(textData) > -1);
            });
            this.setState({
                menuDrinks: newData,
                searchQuery: query,
                areDrinks: (newData.length > 0) ? true : false
            });
        }
    }

    _renderItem(item) {
        if ((this.state.valueButtons === productType.SALTY && this.state.areSalty) || (this.state.valueButtons === productType.SWEET && this.state.areSweet) ||
            (this.state.valueButtons === productType.DRINK && this.state.areDrinks)) {
            return (
                <ProductCard data={item} rute={'order'}/>
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noProducts.png')} style={styles.image} />
                    <Text style={styles.infoImage}>No se registran productos</Text>
                </View>
            );
        }
    }

    render() {

        return (
            <View style={{ width: sizes.wp('100%'), height: sizes.hp('74%'), top: sizes.hp('-4%')}}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('100%'), height: sizes.hp('4.5%')}}>
                    <Button
                        style={styles.toggleButton}
                        dark
                        color={colors.SALTY}
                        mode={(this.state.valueButtons === productType.SALTY) ? 'contained' : 'outlined'}
                        onPress={() => this.handleButtons(productType.SALTY)}>
                        {productType.SALTY}
                    </Button>

                    <Button
                        style={styles.toggleButton}
                        dark
                        color={colors.SWEET}
                        mode={(this.state.valueButtons === productType.SWEET) ? 'contained' : 'outlined'}
                        onPress={() => this.handleButtons(productType.SWEET)}>
                        {productType.SWEET}
                    </Button>

                    <Button
                        style={styles.toggleButton}
                        dark
                        color={colors.DRINKS}
                        mode={(this.state.valueButtons === productType.DRINK) ? 'contained' : 'outlined'}
                        onPress={() => this.handleButtons(productType.DRINK)}>
                        {productType.DRINK}
                    </Button>
                </View>

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar por nombre del producto"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={text => this._onChangeSearch(text)}
                    value={this.state.searchQuery}
                />                

                {(this.state.valueButtons === productType.SALTY) ?
                    <AnimatedFlatList
                        style={styles.list}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        data={(this.state.areSalty) ? this.state.menuSalty : [1]}
                        initialNumToRender={0}
                        onScroll={this.props.onScroll}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item, i) => i.toString()} />
                    :
                    (this.state.valueButtons === productType.SWEET) ?
                        <AnimatedFlatList
                            style={styles.list}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            data={(this.state.areSweet) ? this.state.menuSweet : [1]}
                            initialNumToRender={0}
                            onScroll={this.props.onScroll}
                            scrollEventThrottle={16}
                            renderItem={({ item }) => this._renderItem(item)}
                            keyExtractor={(item, i) => i.toString()} />
                        :
                        <AnimatedFlatList
                            style={styles.list}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            data={(this.state.areDrinks) ? this.state.menuDrinks : [1]}
                            initialNumToRender={0}
                            onScroll={this.props.onScroll}
                            scrollEventThrottle={16}
                            renderItem={({ item }) => this._renderItem(item)}
                            keyExtractor={(item, i) => i.toString()} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toggleButton: {
        width: sizes.wp('34%'),
        height: sizes.hp('4.3%'),
        justifyContent: 'center',
        borderWidth: -1
    },
    searchInput: {
        position: 'absolute',
        top: sizes.hp('4.7%'),
        width: sizes.wp('100%'),
        left: sizes.wp('0%'),
        fontSize: sizes.TEXT_INPUT,
    },
    list: {
        top: sizes.hp('6%'),
        width: sizes.wp('100%'),
        //height: sizes.hp('100%'),
        //borderWidth: 4
        //marginBottom: sizes.hp('23%'),
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
        marginTop: sizes.hp('-20%'),
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
        user: state.authState.client,
        shop: state.shops.selected,
    };
}

export default connect(mapStateToProps)(MenuProcess)