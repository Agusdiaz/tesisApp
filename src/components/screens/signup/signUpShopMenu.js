import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Button, Dialog, IconButton, Portal } from 'react-native-paper'
import { Actions } from 'react-native-router-flux';
import { updateNewField } from '../../../api/shops'
import UserActions from '../../../redux/authState/action'

class SignUpShopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleDialogFinish: false,
            visibleDialogResponse: false,
            actionMessage: '',
        }
        this._showDialogResponse = this._showDialogResponse.bind(this);
    }

    async updateField() {
        this._hideDialogFinish()
        const data = await updateNewField(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 200) {
            this.props.updateShopOpen(data.body)
            Actions.navbarshop()
        }
    }

    _showDialogFinish = () => this.setState({ visibleDialogFinish: true });
    _hideDialogFinish = () => this.setState({ visibleDialogFinish: false });

    _showDialogResponse(message) {
        this.setState({ visibleDialogResponse: true, actionMessage: message })
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' })

    render() {
        return (
            <View style={appStyles.container}>

                <IconButton
                    style={{ left: sizes.wp('-40%'), top: sizes.hp('-6%') }}
                    icon='chevron-left'
                    color={colors.APP_MAIN}
                    size={40}
                    onPress={() => Actions.signupshopschedule()} />

                <Text style={styles.titleText}>Empezá a cargar tu menú</Text>

                <TouchableOpacity style={styles.touchable} onPress={() => Actions.createproduct({ showDialogResponse: this._showDialogResponse })}>
                    <ImageBackground source={require('../../../icons/product.jpg')} style={styles.imageContainerProduct} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>CREAR PRODUCTO</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchable} onPress={() => Actions.createpromo({ showDialogResponse: this._showDialogResponse })}>
                    <ImageBackground source={require('../../../icons/sale.jpg')} style={styles.imageContainerSale} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>CREAR PROMOCIÓN</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', top: sizes.hp('3%') }}>
                    <Button
                        style={{ marginRight: sizes.wp('16%') }}
                        icon="book-open-variant"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => Actions.initialmenu({ rute: 'initial' })}>
                        Ver Menú
 				</Button>

                    <Button
                        style={{}}
                        icon="arrow-right-bold-outline"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={this._showDialogFinish}>
                        Finalizar
 				</Button>
                </View>

                <Portal>

                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={this.state.visibleDialogFinish}
                        onDismiss={this._hideDialogFinish}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Has terminado de completar el menú?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ left: sizes.wp('-12%') }} color={colors.APP_RED} onPress={this._hideDialogFinish}>No</Button>
                            <Button color={colors.APP_GREEN} onPress={() => { this.updateField() }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: "bold",
        textAlign: "center",
        top: sizes.hp('-6%'),
        padding: 12,
    },
    imageContainerProduct: {
        height: sizes.hp('30%'),
        width: sizes.wp('96%'),
        top: sizes.hp('-4%'),
        justifyContent: 'center'
    },
    imageContainerSale: {
        height: sizes.hp('30%'),
        width: sizes.wp('96%'),
        top: sizes.hp('-2%'),
        justifyContent: 'center'
    },
    imageInside: {
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#FFF',
        opacity: 0.6,
    },
    touchable: {
    },
    text: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf: 'center',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        textShadowRadius: 12,
        textShadowColor: '#000',
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout()),
        updateShopOpen: (open) => dispatch(UserActions.updateShopOpen(open)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpShopMenu);