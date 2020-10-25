import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image, Alert } from 'react-native';
import { colors, sizes, productType } from '../../../index.styles';
import { Card, FAB, Button, Divider, Modal, TextInput, Searchbar, Portal, Dialog, IconButton } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import ProductDetails from '../../commons/productDetails'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'
import { getMenu } from '../../../api/menus'

class ExistentProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            menuSalty: [],
            menuSweet: [],
            menuDrinks: [],
            areSalty: true,
            areSweet: false,
            areDrinks: false,
            searchQuery: '',
            amount: '',
            valueButtons: productType.SALTY,
            visibleModalDetails: false,
            visibleDialogAmount: false,
            productData: null,
        }
        this.arrayholderSalty = []
        this.arrayholderSweet = []
        this.arrayholderDrinks = []
        this.addProduct = this.addProduct.bind(this);
    }

    componentDidMount() {
        this.getMenu()
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    _showModalDetails = () => this.setState({ visibleModalDetails: true });
    _hideModalDetails = () => this.setState({ visibleModalDetails: false });

    _showDialogAmount = () => this.setState({ visibleDialogAmount: true });
    _hideDialogAmount = () => this.setState({ visibleDialogAmount: false });

    addProduct() {
        this.hideModal()
        var product = {
            id: this.state.productData.id,
            nombre: this.state.productData.nombre,
            cantidad: parseInt(this.state.amount),
            precio: this.state.productData.precio,
        }
        this.props.addProduct(product)
    }

    async getMenu() {
        const data = await getMenu(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        }
        if (data.status === 500 || data.status === 204)
            this.setState({ areSalty: false, areSweet: false, areDrinks: false })
        else {
            data.body.map(obj => {
                if (this.props.products.findIndex(x => x.id === obj.id) === -1) {
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

    validateNumber = (number) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < number.length; i++) {
            if (number === '0') {
                Alert.alert('Atención', 'La cantidad no puede ser 0');
                this.setState({ amount: '' })
                break
            }
            if (numbers.indexOf(number[i]) > -1) {
                newText = newText + number[i]
                this.setState({ amount: number.toString() })
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if (number.length === 0) this.setState({ amount: '' })
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
                const productFilter = item.nombre ? item.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() : ''.toUpperCase();
                const textData = (query.toString()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                return (productFilter.indexOf(textData) > -1);
            });
            this.setState({
                menuSalty: newData,
                searchQuery: query,
                areSalty: (newData.length > 0) ? true : false
            });
        } else if (this.state.valueButtons === productType.SWEET) {
            const newData = this.arrayholderSweet.filter(function (item) {
                const productFilter = item.nombre ? item.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() : ''.toUpperCase();
                const textData = (query.toString()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                return (productFilter.indexOf(textData) > -1);
            });
            this.setState({
                menuSweet: newData,
                searchQuery: query,
                areSweet: (newData.length > 0) ? true : false
            });
        } else {
            const newData = this.arrayholderDrinks.filter(function (item) {
                const productFilter = item.nombre ? item.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() : ''.toUpperCase();
                const textData = (query.toString()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
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
                <Card style={{ height: sizes.hp('8%'), elevation: 2 }}>
                    <Card.Title style={{ alignSelf: 'center', height: sizes.hp('7%') }}
                        left={() => <View style={{ width: sizes.wp('51%'), alignSelf: 'center' }}>
                            <TextTicker style={styles.title}
                                duration={5000}
                                loop
                                animationType='bounce'
                                repeatSpacer={50}
                                marqueeDelay={1000}>{item.nombre}</TextTicker>
                            <Text style={styles.subtitle}>${item.precio}</Text>
                        </View>}
                        right={() => <View style={{ width: sizes.wp('28%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <FAB
                                style={styles.fabActions}
                                color={colors.APP_MAIN}
                                icon="eye"
                                small
                                onPress={() => { this.setState({ productData: item }), this._showModalDetails() }} />

                            <FAB
                                style={styles.fabActions}
                                color={colors.APP_MAIN}
                                icon="plus"
                                small
                                onPress={() => { this.setState({ productData: item }), this._showDialogAmount() }} />

                        </View>}
                        rightStyle={{ left: sizes.wp('-4%'), }}
                        leftStyle={{ width: sizes.wp('53%') }} />
                </Card>
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
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={this.hideModal}
        />
        return (
            <Card style={styles.productCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-3') }} right={Close} rightStyle={styles.close} />
                <Divider />
                <Card.Title title='Seleccioná un producto existente' style={{ alignSelf: 'center', }} titleNumberOfLines={2}
                    titleStyle={styles.titleText} />
                <Divider />
                <Card.Content style={{ alignItems: 'center', height: sizes.hp('70%') }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('85%'), height: sizes.hp('4.7%'), marginTop: 7 }}>
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
                        placeholder="Buscar por nombre"
                        theme={{ colors: { primary: colors.APP_MAIN } }}
                        iconColor={colors.APP_MAIN}
                        onChangeText={text => this._onChangeSearch(text)}
                        value={this.state.searchQuery}
                    />

                    {(this.state.valueButtons === productType.SALTY) ?
                        <FlatList
                            style={styles.list}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            data={(this.state.areSalty) ? this.state.menuSalty : [1]}
                            initialNumToRender={0}
                            renderItem={({ item }) => this._renderItem(item)}
                            keyExtractor={(item, i) => i.toString()}
                        />
                        :
                        (this.state.valueButtons === productType.SWEET) ?
                            <FlatList
                                style={styles.list}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                                data={(this.state.areSweet) ? this.state.menuSweet : [1]}
                                initialNumToRender={0}
                                renderItem={({ item }) => this._renderItem(item)}
                                keyExtractor={(item, i) => i.toString()}
                            />
                            :
                            <FlatList
                                style={styles.list}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                                data={(this.state.areDrinks) ? this.state.menuDrinks : [1]}
                                initialNumToRender={0}
                                renderItem={({ item }) => this._renderItem(item)}
                                keyExtractor={(item, i) => i.toString()}
                            />
                    }
                </Card.Content>
                <Divider />

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <ProductDetails hideModalFromChild={this._hideModalDetails} data={this.state.productData} />
                    </Modal>

                    <Dialog
                        style={{ top: -50 }}
                        visible={this.state.visibleDialogAmount}
                        onDismiss={this._hideDialogAmount}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>El producto debe tener una cantidad:</Dialog.Title>
                        <Dialog.Content style={{ alignItems: 'center' }}>
                            <TextInput
                                style={styles.inputView}
                                mode='outlined'
                                label='Cantidad'
                                placeholder='$'
                                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                onChangeText={(amount) => this.validateNumber(amount)}
                                value={this.state.amount} />
                        </Dialog.Content>
                        <Dialog.Actions style={{ marginTop: sizes.hp('-2%') }}>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogAmount}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} disabled={this.state.amount === '' || this.state.amount === '0'} onPress={() => {
                                this.addProduct(),
                                this._hideDialogAmount()
                            }}>Agregar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Card >
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        marginTop: sizes.hp('0%'),
        margin: sizes.hp('2%'),
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
    },
    productCard: {
        width: sizes.wp('90%'),
        elevation: 0
    },
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    toggleButton: {
        width: sizes.wp('28%'),
        height: sizes.hp('4.3%'),
        justifyContent: 'center',
        borderWidth: -1
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
    subtitle: {
        marginTop: 5,
        fontSize: 16,
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
    inputView: {
        marginTop: sizes.hp('1%'),
        width: sizes.wp('70%'),
        marginBottom: 20,
        justifyContent: "center",
        padding: 8,
    },
    close: {
        left: sizes.wp('-2%')
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

export default connect(mapStateToProps, mapDispatchToProps)(ExistentProduct)