import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button } from 'react-native-paper';
import SalesCard from '../commons/salesCard'
import { getAllShopPromos } from '../../api/promos'

class SalesMenu extends Component {
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
        const data = await getAllShopPromos(this.props.data.cuit, this.props.user.token)
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
                    <Image source={require('../../icons/noSales.png')} style={styles.image} />
                    <Text style={styles.infoImage}>Este local no tiene promociones</Text>
                </View>
            );
        }
    }

    render() {

        return (
            <View style={{ width: sizes.wp('100%'), height: sizes.hp('100%'), top: sizes.hp('19%') }}>

                <FlatList
                    style={styles.list}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    data={(this.state.areSales) ? this.state.sales : [1]}
                    initialNumToRender={0}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item, i) => i.toString()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        top: sizes.hp('1%'),
        width: sizes.wp('100%'),
        marginBottom: sizes.hp('23%'),
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
});

function mapStateToProps(state) {
    return {
        user: state.authState.client
    };
}

export default connect(mapStateToProps)(SalesMenu);
