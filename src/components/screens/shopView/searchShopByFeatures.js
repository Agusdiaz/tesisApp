import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text, Image, } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles'
import { Portal, Button, Dialog } from 'react-native-paper';
import { RadioButton } from 'material-bread';
import ArrowButton from '../../commons/arrowButton'
import ShopCardSummary from '../../commons/shopCardSummary'
import ShopActions from '../../../redux/shops/action'
import { getAllShopsOpenClose } from '../../../api/shops'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class SearchShopByNameFeatures extends Component {

    constructor(props) {
        super(props);
        this.state = {
            areStores: true,
            shops: [],
            refreshing: false,
            visibleDialog: false,
            checked: [false, false, false, false, false, false, false],
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        this.getShopsOpenClose()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let newShops = []
        newShops = nextProps.shops.allShops
        this.setState({ shops: newShops })
        this.arrayholder = newShops
        this._onChangeSearch()
    }

    async getShopsOpenClose() {
        let newShops = []
        const data = await getAllShopsOpenClose(this.props.user.mail, this.props.user.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 200) {
            this.props.setShopsData(data.body)
            newShops = this.props.shops.allShops
            this.setState({ shops: newShops })
            this.arrayholder = newShops
        }
        if (newShops.length === 0)
            this.setState({ areStores: false })
        else this.setState({ areStores: true })
    }

    onRefresh = () => {
        this.setState({ shops: [], refreshing: true })
        this.arrayholder = []
        this.getShopsOpenClose()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch() {
        //HACER FILTRAR POR CARACTERISTICAS
        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.nombre ? item.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() : ''.toUpperCase();
            const textData = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            shops: newData,
            areStores: (newData.length > 0) ? true : false
        });
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

    _renderItem(item) {
        if (this.state.areStores) {
            return (
                <ShopCardSummary rute={'navBarClientSearch'} data={item} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noStore.png')} style={styles.image} />
                    <Text style={styles.infoImage}>No se encontraron locales</Text>
                </View>
            );
        }
    }

    _showDialog = () => this.setState({ visibleDialog: true })
    _hideDialog = () => this.setState({ visibleDialog: false })

    setFilter(index) {
        this.setState(prevState => ({
            checked: prevState.checked.map((el, i) => {
                if (i === index) {
                    if (index === 4 ) {
                        this.state.checked[index + 1] = false
                    }
                    else if (index === 5 ) {
                        this.state.checked[index - 1] = false
                    }
                    return !el
                }
                else return el
            }
            )
        }))
    }

    render() {

        return (
            <View style={appStyles.container}>
                <ArrowButton rute='navBarClientSearch' />

                <Button
                    style={{ margin: sizes.hp('1%'), top: sizes.hp('6%') }}
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => { this._showDialog() }}>
                    Aplicá filtros
                    </Button>

                <FlatList
                    style={styles.list}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    data={(this.state.areStores) ? this.state.shops : [1]}
                    ItemSeparatorComponent={this.renderSeparator}
                    initialNumToRender={0}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item, i) => i.toString()}
                />

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialog}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>Seleccioná las características que deseas filtrar</Dialog.Title>
                        <Dialog.Content>
                            <RadioButton
                                radioButtonColor={colors.APP_MAIN}
                                rippleColor={colors.APP_MAIN}
                                labelStyle={styles.options}
                                checked={this.state.checked[0]}
                                onPress={() => this.setFilter(0)}
                                label="Apto para mascotas"
                            />
                            <RadioButton
                                radioButtonColor={colors.APP_MAIN}
                                rippleColor={colors.APP_MAIN}
                                labelStyle={styles.options}
                                checked={this.state.checked[1]}
                                onPress={() => this.setFilter(1)}
                                label="Con sala para niños"
                            />
                            <RadioButton
                                radioButtonColor={colors.APP_MAIN}
                                rippleColor={colors.APP_MAIN}
                                labelStyle={styles.options}
                                checked={this.state.checked[2]}
                                onPress={() => this.setFilter(2)}
                                label="Con juegos"
                            />
                            <RadioButton
                                radioButtonColor={colors.APP_MAIN}
                                rippleColor={colors.APP_MAIN}
                                labelStyle={styles.options}
                                checked={this.state.checked[3]}
                                onPress={() => this.setFilter(3)}
                                label="Al aire Libre"
                            />
                            <RadioButton
                                radioButtonColor={colors.APP_MAIN}
                                rippleColor={colors.APP_MAIN}
                                labelStyle={styles.options}
                                checked={this.state.checked[4]}
                                onPress={() => this.setFilter(4)}
                                label="Apto fumadores"
                            />
                            <RadioButton
                                radioButtonColor={colors.APP_MAIN}
                                rippleColor={colors.APP_MAIN}
                                labelStyle={styles.options}
                                checked={this.state.checked[5]}
                                onPress={() => this.setFilter(5)}
                                label="Libre de humo"
                            />
                            <RadioButton
                                radioButtonColor={colors.APP_MAIN}
                                rippleColor={colors.APP_MAIN}
                                labelStyle={styles.options}
                                checked={this.state.checked[6]}
                                onPress={() => this.setFilter(6)}
                                label="Con wifi"
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button style={{}} color={'#000000'} onPress={() => { this._hideDialog() }}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        top: sizes.hp('8%'),
        marginBottom: sizes.hp('11%'),
        width: '100%',
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
    options: {
        marginRight: sizes.wp('6%')
    },
})

function mapStateToProps(state) {
    return {
        user: state.authState.client,
        shops: state.shops,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShopsData: (shops) => dispatch(ShopActions.setShopsData(shops)),
        logout: () => dispatch(UserActions.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchShopByNameFeatures)