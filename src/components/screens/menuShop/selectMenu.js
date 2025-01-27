import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { Tabs, Tab } from 'material-bread'
import { FAB, Portal, Dialog, Button } from 'react-native-paper'
import ProductMenu from '../../commons/menu'
import IngredientMenu from './ingredientMenu'
import SalesMenu from '../../commons/salesMenu'
import { Actions } from 'react-native-router-flux';

class SelectMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            visibleDialogResponse: false,
            actionMessage: '',
        }
        this.products = React.createRef();
        this.promos = React.createRef();
        this._showDialogResponse = this._showDialogResponse.bind(this);
    }

    onRefreshChilds = () => {
        if (this.state.selectedTab === 2)
            this.promos.current.onRefresh();
        else
            this.products.current.onRefresh();
    };

    _showDialogResponse(message) {
        this.setState({ visibleDialogResponse: true, actionMessage: message })
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' })


    render() {
        return (
            <View style={appStyles.container}>
                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_BACKGR}
                    underlineColor={colors.APP_MAIN}
                    actionItems={[
                        <Tab key={1} label='Productos' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 0) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                        <Tab key={2} label='Ingredientes' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 1) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                        <Tab key={3} label='Promociones' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 2) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                    ]}
                />

                {(this.state.selectedTab === 0) ?
                    <ProductMenu rute={(this.props.rute === 'initial') ? 'initial' : 'shop'} ref={this.products} />
                    : (this.state.selectedTab === 1) ?
                        <IngredientMenu rute={(this.props.rute === 'initial') ? 'initial' : null} />
                        :
                        <SalesMenu rute='shop' ref={this.promos} initial={'yes'} />
                }

                {(this.props.rute === 'initial') ?
                    <TouchableHighlight activeOpacity={0.6} onPress={() => { Actions.pop() }}>
                        <Image source={require('../../../icons/arrow.png')} style={[styles.imageCart,
                        { bottom: (this.state.selectedTab === 2) ? sizes.hp('-45%') : sizes.hp('5%') }]} />
                    </TouchableHighlight>
                    : (this.state.selectedTab !== 1) ?
                        <FAB
                            style={styles.fabPlus}
                            color='#FFF'
                            icon="plus"
                            onPress={() => {
                                (this.state.selectedTab === 2) ? Actions.createpromo({
                                    onRefreshChilds: this.onRefreshChilds.bind(this),
                                    rute: (this.props.rute === 'initial') ? 'initial' : 'shop',
                                    showDialogResponse: this._showDialogResponse
                                })
                                    : Actions.createproduct({
                                        onRefreshChilds: this.onRefreshChilds.bind(this),
                                        rute: (this.props.rute === 'initial') ? 'initial' : 'shop',
                                        showDialogResponse: this._showDialogResponse
                                    })
                            }} />
                        : null}

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
    appBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: sizes.hp('5%'),
        borderTopWidth: 2,
        borderColor: colors.APP_MAIN,

    },
    imageCart: {
        width: sizes.wp('21%'),
        height: sizes.hp('10%'),
        position: 'absolute',
        backgroundColor: colors.APP_MAIN,
        borderRadius: sizes.wp('50%'),
        right: sizes.wp('22%'),
        resizeMode: 'center',
    },
    fabPlus: {
        backgroundColor: colors.APP_GREEN,
        borderRadius: sizes.wp('50%'),
        position: 'absolute',
        height: '8.2%',
        width: '16%',
        justifyContent: 'center',
        alignItems: 'center',
        right: sizes.wp('75%'),
        bottom: sizes.hp('2%'),
    },
});

export default SelectMenu