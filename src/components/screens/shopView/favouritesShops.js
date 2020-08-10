import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCard from '../../commons/shopCardSummary'
import { Actions } from 'react-native-router-flux';
import ArrowButton from '../../commons/arrowButton'
import ShopActions from '../../../redux/shops/action'
import { getAllShopsOpenClose } from '../../../api/shops'

class FavouritesShopsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            areFavourites: false,
            shops: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.getFavouritesShops()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let newShops = []
        newShops = nextProps.shops.allShops.filter(function (item) {
            return item.favorito
        });
        this.setState({ shops: newShops })
        if (newShops.length === 0)
            this.setState({ areFavourites: false })
        else this.setState({ areFavourites: true })
    }

    getFavouritesShops() {
        let newShops = []
        newShops = this.props.shops.allShops.filter(function (item) {
            return item.favorito
        });
        this.setState({ shops: newShops })
        if (newShops.length === 0)
            this.setState({ areFavourites: false })
        else this.setState({ areFavourites: true })
    }

    async getShopsAZ() {
        const data = await getAllShopsOpenClose(this.props.user.mail, this.props.user.token)
        if (data.status === 200)
            this.props.setShopsData(data.body)
        this.getFavouritesShops()
    }

    onRefresh = () => {
        this.setState({ shops: [], refreshing: true })
        this.getShopsAZ()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
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
        if (this.state.areFavourites) {
            return (
                <ShopCard data={item} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noStar.png')} style={styles.image} />
                    <Text style={styles.infoImage}>Todavía no tenés ningún local favorito</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={appStyles.container}>

                <ArrowButton rute='navBarClientProfile' />

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS LOCALES FAVORITOS</Text>
                </Surface>

                <FlatList
                    style={styles.list}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    data={(this.state.areFavourites) ? this.state.shops : [1]}
                    ItemSeparatorComponent={this.renderSeparator}
                    initialNumToRender={0}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item, i) => i.toString()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    surface: {
        width: sizes.wp('100%'),
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
        top: sizes.hp('12.8%'),
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        bottom: sizes.hp('-3%')
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
        //borderWidth: 5,
        //height: sizes.hp('-5%'),
        top: sizes.hp('13%'),
        marginBottom: sizes.hp('14%'),
        width: '100%'
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesShopsScreen)