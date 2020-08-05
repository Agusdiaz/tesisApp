import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, Image } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Button, Dialog, Modal, Portal, Menu, ActivityIndicator } from 'react-native-paper';
import { Tabs, Tab, } from 'material-bread';
import ShopCard from '../../commons/shopCard'
import MenuShop from '../../commons/menu'
import EditFeatures from '../profile/profileShopFeatures'
import EditSchedule from '../profile/profileShopSchedule'
import { Actions } from 'react-native-router-flux';
import SalesMenu from '../../commons/salesMenu';
import ShopActions from '../../../redux/authState/action'

class ProfileShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            areSales: true,
            areProducts: true,
            loading: false,
            actionMessage: '',
            visibleDialogResponse: false,
            visibleDialogSessionOut: false,
            visibleModalEditFeatures: false,
            visibleModalEditSchedule: false,
        }
        this.updateIsLoading = this.updateIsLoading.bind(this)
        this._showDialogResponse = this._showDialogResponse.bind(this)
    }

    updateIsLoading(value){
        this.setState({ loading: value })
    }

    _showDialogSessionOut = () => this.setState({ visibleDialogSessionOut: true });
    _hideDialogSessionOut = () => this.setState({ visibleDialogSessionOut: false });

    _showModalEditFeatures = () => this.setState({ visibleModalEditFeatures: true });
    _hideModalEditFeatures = () => this.setState({ visibleModalEditFeatures: false });

    _showModalEditSchedule = () => this.setState({ visibleModalEditSchedule: true });
    _hideModalEditSchedule = () => this.setState({ visibleModalEditSchedule: false });

    _showDialogResponse(message){
        this.setState({ visibleDialogResponse: true, actionMessage: message})
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' });

    render() {

        return (
            <View style={appStyles.container}>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_BACKGR}
                    underlineColor={colors.APP_MAIN}
                    scrollEnabled
                    actionItems={[
                        <Tab key={1} icon='info' label='Tu Información' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                        iconStyles={{ color: (this.state.selectedTab == 0) ? colors.APP_MAIN : colors.APP_INACTIVE }}/>,
                        <Tab key={2} icon='restaurant-menu' label='Tu Menú' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                        iconStyles={{ color: (this.state.selectedTab == 1) ? colors.APP_MAIN : colors.APP_INACTIVE }}/>,
                        <Tab key={3} icon='new-releases' label='Tus Promociones' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                        iconStyles={{ color: (this.state.selectedTab == 2) ? colors.APP_MAIN : colors.APP_INACTIVE }}/>, //attach-money
                        <Tab key={4} icon='settings' label='Ajustes' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                        iconStyles={{ color: (this.state.selectedTab == 3) ? colors.APP_MAIN : colors.APP_INACTIVE }}/>,
                    ]}
                />

                {(this.state.selectedTab === 0) ?
                    <View style={{ top: sizes.hp('7%') }}>
                        <ShopCard />
                    </View>

                    : (this.state.selectedTab === 1) ?
                        (this.state.areProducts) ?
                            <MenuShop rute='shop' />
                            :
                            <View style={styles.viewImage}>
                                <Image source={require('../../../icons/noProducts.png')} style={styles.image} />
                                <Text style={styles.infoImage}>Actualmente no tenés productos cargados en tu menú</Text>
                            </View>

                        : (this.state.selectedTab === 2) ?
                            (this.state.areSales) ?
                                <SalesMenu />
                                :
                                <View style={styles.viewImage}>
                                    <Image source={require('../../../icons/noSales.png')} style={styles.image} />
                                    <Text style={styles.infoImage}>Actualmente no tenés promociones vigentes</Text>
                                </View>

                            :

                            <View>

                                <Button
                                    style={styles.buttonStyle}
                                    icon="room-service-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={() => Actions.ordersshop()}>
                                    Historial de Pedidos
                                </Button>

                                <Button
                                    style={styles.buttonStyle}
                                    icon="palette-swatch"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showModalEditFeatures}>
                                    Editar Características
                                </Button>

                                <Button
                                    style={styles.buttonStyle}
                                    icon="clock-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showModalEditSchedule}>
                                    Editar Horarios
                                </Button>

                                <Button
                                    style={styles.buttonStyle}
                                    icon="logout-variant"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showDialogSessionOut}>
                                    Cerrar Sesión
                                </Button>

                                <Portal>
                                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEditFeatures} onDismiss={this._hideModalEditFeatures}>
                                        <EditFeatures hideModalFromChild={this._hideModalEditFeatures} updateLoading={this.updateIsLoading} showDialogResponse={this._showDialogResponse}/>
                                    </Modal>

                                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEditSchedule} onDismiss={this._hideModalEditSchedule}>
                                        <EditSchedule hideModalFromChild={this._hideModalEditSchedule} />
                                    </Modal>

                                    <Dialog
                                        style={{ top: sizes.hp('-3%') }}
                                        visible={this.state.visibleDialogSessionOut}
                                        onDismiss={this._hideDialogSessionOut}>
                                        <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea cerrar sesión?</Dialog.Title>
                                        <Dialog.Actions>
                                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogSessionOut}>Cancelar</Button>
                                            <Button color={colors.APP_GREEN} onPress={() => {
                                                this.props.logout()
                                                this._hideDialogSessionOut()
                                                Actions.logsign()
                                            }}>Ok</Button>
                                        </Dialog.Actions>
                                    </Dialog>

                                    <Dialog
                                        style={{ width: sizes.wp('70%'), alignSelf: 'center' }}
                                        visible={this.state.visibleDialogResponse}
                                        onDismiss={this._hideDialogResponse}>
                                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                                        <Dialog.Actions>
                                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                                        </Dialog.Actions>
                                    </Dialog>

                                    <Modal dismissable={false}
                                        visible={this.state.loading}
                                        style={styles.modalActivityIndicator} >
                                        <ActivityIndicator
                                            animating={this.state.loading}
                                            size={60}
                                            color={colors.APP_MAIN}
                                        />
                                    </Modal>
                                </Portal>
                            </View>
                }
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
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        marginTop: sizes.hp('75%'),
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
    buttonStyle: {
        marginTop: sizes.hp('10%'),
        width: sizes.wp('62%'),
        height: sizes.hp('4%'),
        justifyContent: 'center'
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(ShopActions.logout())
    }
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(ProfileShopScreen);