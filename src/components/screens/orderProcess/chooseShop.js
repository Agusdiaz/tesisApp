import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ActivityIndicator, Image, FlatList } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Searchbar } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import ShopCardSummary from '../../commons/shopCardSummary'
import ShopActions from '../../../redux/shops/action'
import { getAllShopsOpenClose } from '../../../api/shops'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ChooseShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchQuery: '',
            areStores: true,
            shops: [],
            refreshing: false,
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        this.getOpenShops()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let newShops = []
        newShops = nextProps.shops.allShops.filter(function (item) {
            return item.abierto === 1
        });
        this.setState({ shops: newShops })
        this.arrayholder = newShops
        this._onChangeSearch(this.state.searchQuery)
    }

    async getOpenShops() {
        let newShops = []
        const data = await getAllShopsOpenClose(this.props.user.mail, this.props.user.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 200) {
            this.props.setShopsData(data.body)
            newShops = this.props.shops.allShops.filter(function (item) {
                return item.abierto === 1
            });
            this.setState({ shops: newShops })
            this.arrayholder = newShops
        }
        if (newShops.length === 0)
            this.setState({ areStores: false })
        else this.setState({ areStores: true })
    }

    onRefresh = () => {
        this.setState({ shops: [], refreshing: true, searchQuery: '' })
        this.arrayholder = []
        this.getOpenShops()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    nextStepParent = () => {
        this.props.nextStepParent();
    }

    _onChangeSearch(query) {
        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.nombre ? item.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() : ''.toUpperCase();
            const textData = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            shops: newData,
            searchQuery: query,
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
                <ShopCardSummary rute={'chooseShop'} data={item} nextStepParent={this.nextStepParent} />
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

    render() {
        return (
            <View style={[appStyles.container, { top: sizes.hp('1%'), marginTop: sizes.hp('0%') }]}>

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar local por nombre"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={text => this._onChangeSearch(text)}
                    value={this.state.searchQuery}
                />

                {(!this.state.isLoading) ?

                    <AnimatedFlatList
                        style={styles.list}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        ItemSeparatorComponent={this.renderSeparator}
                        data={(this.state.areStores) ? this.state.shops : [1]}
                        initialNumToRender={0}
                        onScroll={this.props.onScroll}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => this._renderItem(item)}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, i) => i.toString()}
                    />
                    :
                    <View style={{ marginTop: sizes.hp('-70%') }}>
                        <ActivityIndicator />
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
        fontSize: sizes.TEXT_INPUT,
    },
    list: {
        top: sizes.hp('9%'),
        marginBottom: sizes.hp('7%'),
        width: sizes.wp('100%'),
    },
    viewImage: {
        top: sizes.hp('10%'),
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

function mapStateToProps(state) {
    return {
        user: state.authState.client,
        shops: state.shops,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShopsData: (shops) => dispatch(ShopActions.setShopsData(shops)),
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseShopScreen)