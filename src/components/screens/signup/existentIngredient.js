import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { colors, sizes } from '../../../index.styles';
import { Card, FAB, Button, Divider, IconButton, TextInput, Searchbar } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import { getIngredients } from '../../../api/menus'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class ExistentIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            ingredients: [],
            areIngredients: true,
            searchQuery: '',
        }
        this.arrayholder = []
        this.setSelected = this.setSelected.bind(this);
    }

    componentDidMount() {
        this.getIngredients()
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    setSelected(id, name, details) {
        this.props.setSelected(id, name, details)
        this.hideModal()
    }

    async getIngredients() {
        const data = await getIngredients(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.setState({ areIngredients: false })
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 204)
            this.setState({ areIngredients: false })
        else if (this.props.ingredientsInProduct.length > 0) {
            this.setState({ ingredients: data.body.filter(val => !this.props.ingredientsInProduct.find(x => x.id === val.id)) })
            if (this.state.ingredients.length > 0) this.setState({ areIngredients: true })
            else this.setState({ areIngredients: false })
            this.arrayholder = this.state.ingredients
        } else {
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
                <Card style={{ height: sizes.hp('8%'), elevation: 2 }}>
                    <Card.Title style={{ alignSelf: 'center', height: sizes.hp('7%') }}
                        left={() => <View style={{ width: sizes.wp('53%'), alignSelf: 'center' }}>
                            <TextTicker style={styles.title}
                                duration={5000}
                                loop
                                animationType='bounce'
                                repeatSpacer={50}
                                marqueeDelay={1000}>{item.nombre}</TextTicker>
                        </View>}
                        right={() => <FAB
                            style={styles.fabActions}
                            color={colors.APP_MAIN}
                            icon="plus"
                            small
                            onPress={() => this.setSelected(item.id, item.nombre, item.detalle)} />}
                        rightStyle={{ left: sizes.wp('-4%'), }}
                        leftStyle={{ width: sizes.wp('55%') }} />
                </Card>
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
            <Card style={styles.ingredientCard}>
                <Card.Title title='Seleccioná un ingrediente existente' style={{ alignSelf: 'center'}} 
                titleStyle={styles.titleText} titleNumberOfLines={2}/>
                <Divider />
                <Card.Content style={{ alignItems: 'center', height: sizes.hp('70%') }}>
                    <Searchbar
                        style={styles.searchInput}
                        placeholder="Buscar por nombre"
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
                </Card.Content>
                <Divider />
                <Card.Actions style={{ justifyContent: 'space-between', margin: 5, marginBottom: sizes.hp('-1%') }}>
                    <Button
                        style={{}}
                        icon="close"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={this.hideModal}>
                        Cancelar
 				</Button>

                    <Button
                        style={{}}
                        icon="plus"
                        mode="contained"
                        color={colors.APP_MAIN}
                        disabled={this.state.name === ''}
                        onPress={() => { this.hideModal(), this.addIngredient() }}>
                        Crear
 				</Button>
                </Card.Actions>
            </Card >
        )
    }
}

const styles = StyleSheet.create({
    ingredientCard: {
        width: sizes.wp('90%'),
        elevation: 0
    },
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5
    },
    searchInput: {
        marginTop: sizes.hp('1%'),
        marginBottom: sizes.hp('1%'),
        width: sizes.wp('85%'),
        fontSize: sizes.TEXT_INPUT,
    },
    list: {
        width: sizes.wp('85%'),
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
    fabActions: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
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

export default connect(mapStateToProps, mapDispatchToProps)(ExistentIngredient)