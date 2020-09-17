import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Portal, Dialog } from 'react-native-paper';
import SalesCard from '../commons/salesCard'
import { getAllShopPromos } from '../../api/promos'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../redux/authState/action'

class SalesMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areSales: true,
            sales: [],
            refreshing: false,
            visibleDialogResponse: false,
            actionMessage: '',
        }
        this.onRefresh = this.onRefresh.bind(this);
        this._showDialogResponse = this._showDialogResponse.bind(this);
    }

    componentDidMount() {
        this.getPromos()
    }

    async getPromos() {
        var data
        if (this.props.user.mail !== undefined) {
            data = await getAllShopPromos(this.props.selected.cuit, this.props.user.token)
        } else {
            data = await getAllShopPromos(this.props.shop.cuit, this.props.shop.token)
        }
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 204)
            this.setState({ areSales: false })
        else this.setState({ areSales: true, sales: data.body.sort((a, b) => b.valida - a.valida && b.habilitada - a.habilitada) })
    }

    _showDialogResponse(message) {
        this.setState({ visibleDialogResponse: true, actionMessage: message })
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' })

    onRefresh() {
        this.setState({ sales: [], refreshing: true })
        this.getPromos()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    _renderItem(item) {
        if (this.state.areSales) {
            return (
                <SalesCard data={item} rute={(this.props.user.mail === undefined) ? 'editPromo' : null} refreshParent={this.onRefresh}
                    showDialogResponse={this._showDialogResponse} initial={this.props.initial} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../icons/noSales.png')} style={styles.image} />
                    <Text style={styles.infoImage}>{(this.props.user.mail !== undefined) ? 'Este local no tiene promociones'
                        : 'Tu local no tiene promociones '}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{ width: sizes.wp('100%'), height: sizes.hp('77%'), top: (this.props.rute === 'shop') ? sizes.hp('11%') : sizes.hp('21%'), position: 'absolute' }}>

                <FlatList
                    style={styles.list}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    data={(this.state.areSales) ? this.state.sales : [1]}
                    initialNumToRender={0}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item, i) => i.toString()} />

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        top: sizes.hp('1%'),
        width: sizes.wp('100%'),
        marginBottom: sizes.hp('1.5%'),
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
        user: state.authState.client,
        selected: state.shops.selected,
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SalesMenu)