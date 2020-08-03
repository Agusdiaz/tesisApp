import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Image, Text, ActivityIndicator } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles'
import { Searchbar } from 'react-native-paper';
import ArrowButton from '../../commons/arrowButton'
import ShopCardSummary from '../../commons/shopCardSummary'
import ShopActions from '../../../redux/shops/action'
import { getAllShopsAZ } from '../../../api/shops'

class SearchShopByAddressScreen extends Component {

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
        this.getShopsAZ()

    }

    async getShopsAZ() {
        const data = await getAllShopsAZ(this.props.user.mail, this.props.user.token)
        if (data.status === 200) {
            this.props.setShopsData(data.body)
            this.props.shops.allShops.map(obj => {
                this.state.shops.push(obj)
                this.arrayholder.push(obj)
            })
        }
        if (this.state.shops.length === 0)
            this.setState({ areStores: false })
        else this.setState({ areStores: true })
    }

    onRefresh = () => {
        this.setState({ shops: [], refreshing: true, searchQuery: '' })
        this.arrayholder = []
        this.getShopsAZ()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _onChangeSearch(query) {
        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.direccion ? item.direccion.toUpperCase() : ''.toUpperCase();
            const textData = query.toUpperCase();
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

    render() {
        return (
            <View style={appStyles.container}>
                <ArrowButton rute='navBarClientSearch' />

                <Searchbar
                    style={styles.searchInput}
                    placeholder="Buscar local por dirección"
                    theme={{ colors: { primary: colors.APP_MAIN } }}
                    iconColor={colors.APP_MAIN}
                    onChangeText={text => this._onChangeSearch(text)}
                    value={this.state.searchQuery}
                />

                {(!this.state.isLoading) ?

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
        top: sizes.hp('5.5%'),
        width: sizes.wp('78%'),
        left: sizes.wp('20%'),
        fontSize: sizes.TEXT_INPUT,
    },
    list: {
        top: sizes.hp('12%'),
        marginBottom: sizes.hp('14%'),
        width: '100%'
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

function mapStateToProps(state) {
    return {
        user: state.authState.client,
        shops: state.shops,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShopsData: (shops) => dispatch(ShopActions.setShopsData(shops))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchShopByAddressScreen)