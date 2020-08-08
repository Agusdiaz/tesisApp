import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { colors, sizes } from '../../../index.styles'
import { Button } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import SalesCard from '../../commons/salesCard'
import { getAllShopPromos } from '../../../api/promos'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class SalesProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areSales: true,
            sales: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.getPromos()
    }

    async getPromos() {
        const data = await getAllShopPromos(this.props.shop.cuit, this.props.user.token)
        if (data.status === 500 || data.status === 204)
            this.setState({ areSales: false })
        else this.setState({ areSales: true, sales: data.body })
    }

    onRefresh() {
        this.setState({ sales: [], refreshing: true })
        this.getPromos()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _renderItem(item) {
        if (this.state.areSales) {
            return (
                <SalesCard data={item} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noSales.png')} style={styles.image} />
                    <Text style={styles.infoImage}>Actualmente no hay promociones vigentes</Text>
                </View>
            );
        }
    }

    render() {

        return (
            <View style={{ width: sizes.wp('100%'), height: sizes.hp('100%'), top: sizes.hp('8%') }}>

                <AnimatedFlatList
                    style={styles.list}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    data={(this.state.areSales) ? this.state.sales : [1]}
                    initialNumToRender={0}
                    onScroll={this.props.onScroll}
                    scrollEventThrottle={16}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item, i) => i.toString()} />

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
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        height: sizes.hp('50%'),
        alignItems: 'center'
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
    list: {
        top: sizes.hp('1%'),
        width: sizes.wp('100%'),
        //height: sizes.hp('70%'),
        marginBottom: sizes.hp('14%'),
    },
});

function mapStateToProps(state) {
    return {
        user: state.authState.client,
        shop: state.shops.selected,
    };
}

export default connect(mapStateToProps)(SalesProcess);