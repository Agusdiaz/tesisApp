import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { Button, Surface, Searchbar } from 'react-native-paper';
import ProductCard from '../../commons/productCard'
import IngredientCard from '../../commons/ingredientCard'
import { getMenuDisabled } from '../../../api/menus'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class DisabledMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueButtons: 'products',
            refreshing: false,
            products: [],
            ingredients: [],
            areProducts: true,
            areIngredients: false,
            searchQuery: '',
            visibleDialogResponse: false,
            actionMessage: '',
        }
        this.arrayholderProducts = []
        this.arrayholderIngredients = []
        this.onRefresh = this.onRefresh.bind(this);
        this._showDialogResponse = this._showDialogResponse.bind(this);
    }

    componentDidMount() {
        this.getMenuDisabled()
    }

    async getMenuDisabled() {
        const data = await getMenuDisabled(this.props.shop.cuit, this.props.shop.token)
        if(data.status === 500 && data.body.error){
            this.props.logout()
            Actions.logsign({visible: true})
        } else if (data.status === 500 || data.status === 204)
            this.setState({ areProducts: false, areIngredients: false })
        else {
            data.body.productos.map(obj => {
                this.state.products.push(obj)
                this.arrayholderProducts.push(obj)
            })
            data.body.ingredientes.map(obj => {
                this.state.ingredients.push(obj)
                this.arrayholderIngredients.push(obj)
            })
            this.setState({
                areProducts: (this.state.products.length > 0) ? true : false, areIngredients: (this.state.ingredients.length > 0) ? true : false
            })
        }
    }

    _showDialogResponse(message) {
        this.setState({ visibleDialogResponse: true, actionMessage: message })
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' })

    handleButtons = (values) => {
        if (values != null)
            this.setState({ valueButtons: values })
    }

    onRefresh(){
        this.setState({ products: [], ingredients: [], refreshing: true });
        this.arrayholderProducts = []
        this.arrayholderIngredients = []
        this.getMenuDisabled()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch(query) {
        if (this.state.valueButtons === 'products') {
            const newData = this.arrayholderProducts.filter(function (item) {
                const productFilter = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
                const textData = (query.toString()).toUpperCase();
                return (productFilter.indexOf(textData) > -1);
            });
            this.setState({
                products: newData,
                searchQuery: query,
                areProducts: (newData.length > 0) ? true : false
            });
        } else if (this.state.valueButtons === 'ingredients') {
            const newData = this.arrayholderIngredients.filter(function (item) {
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
    }

    _renderItem(item) {
        if (this.state.valueButtons === 'products' && this.state.areProducts) {
            return (
                <ProductCard rute={'disabled'} data={item} refreshParent={this.onRefresh} showDialogResponse={this._showDialogResponse}/>
            );
        } else if (this.state.valueButtons === 'products' && !this.state.areProducts) {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noProducts.png')} style={styles.image} />
                    <Text style={styles.infoImage}>Actualmente no hay productos deshabilitados</Text>
                </View>
            );
        }
        else if (this.state.valueButtons === 'ingredients' && this.state.areIngredients) {
            return (
                <IngredientCard rute={'disabled'} data={item} refreshParent={this.onRefresh} showDialogResponse={this._showDialogResponse}/>
            );
        } else if (this.state.valueButtons === 'ingredients' && !this.state.areIngredients) {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noProducts.png')} style={styles.image} />
                    <Text style={styles.infoImage}>Actualmente no hay ingredientes deshabilitados</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={appStyles.container}>

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS PRODUCTOS/INGREDIENTES DESHABILITADOS</Text>
                </Surface>

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('100%'), height: sizes.hp('4%'), marginTop: sizes.hp('5.2%') }}>
                    <Button
                        style={styles.toggleButton}
                        dark
                        color='#E0BB18'
                        mode={(this.state.valueButtons === 'products') ? 'contained' : 'outlined'}
                        onPress={() => this.handleButtons('products')}>
                        Productos
                    </Button>

                    <Button
                        style={styles.toggleButton}
                        dark
                        color='#E0BB18'
                        mode={(this.state.valueButtons === 'ingredients') ? 'contained' : 'outlined'}
                        onPress={() => this.handleButtons('ingredients')}>
                        Ingredientes
                    </Button>
                </View>

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar por nombre"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={text => this._onChangeSearch(text)}
                    value={this.state.searchQuery}
                />

                {(this.state.valueButtons === 'products') ?
                    <FlatList
                        style={styles.list}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                        data={(this.state.areProducts) ? this.state.products : [1]}
                        initialNumToRender={0}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item, i) => i.toString()}
                    />
                    :
                    <FlatList
                        style={styles.list}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                        data={(this.state.areIngredients) ? this.state.ingredients : [1]}
                        initialNumToRender={0}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item, i) => i.toString()}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    surface: {
        width: sizes.wp('100%'),
        top: sizes.hp('5%'),
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    toggleButton: {
        width: sizes.wp('50%'),
        height: sizes.hp('4.3%'),
        justifyContent: 'center',
        borderWidth: -1
    },
    searchInput: {
        position: 'absolute',
        top: sizes.hp('18.5%'),
        width: sizes.wp('100%'),
        left: sizes.wp('0%'),
        fontSize: sizes.TEXT_INPUT,
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        marginTop: sizes.hp('8%')
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
        marginTop: sizes.hp('6.5%'),
        width: sizes.wp('100%'),
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisabledMenu)