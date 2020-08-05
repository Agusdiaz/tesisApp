import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { login } from '../../../redux/actions';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import LoginActions from '../../../redux/authState/action'
import { TextInput, Button, ActivityIndicator, Modal, Dialog, Paragraph } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import { Actions } from 'react-native-router-flux';
import { login } from '../../../api/user'

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            visibleDialog: false,
            messageError: '',
        }
    }

    _showDialog = () => this.setState({ visibleDialog: true });
    _hideDialog = () => this.setState({ visibleDialog: false });

    async _login() {
        this.setState({ loading: true })
        setTimeout(() => { this.setState({ loading: false, }) }, 5000);
        const data = await login(this.state.email, this.state.password)
        if (data.status === 500 || data.status === 404) {
            this.setState({ loading: false, email: '', password: '', messageError: data.body })
            this._showDialog()
        } else if (data.status === 401) {
            this.setState({ loading: false, password: '', messageError: data.body })
            this._showDialog()
        } else {
            this.setState({ loading: false, email: '', password: '' })
            if (data.body.cuit === undefined) {
                this.props.setLoginClientData(data.body.mail, data.body.nombre, data.body.apellido, data.body.token)
                Actions.navbarclient()
            } else if (data.body.nuevo === 0) {
                this.props.setLoginShopData(data.body.cuit, data.body.nombre, data.body.direccion, data.body.telefono, data.body.mail,
                    data.body.mascotas, data.body.bebes, data.body.juegos, data.body.aireLibre, data.body.libreHumo, data.body.wifi,
                    data.body.demora, data.body.abierto, data.body.horarios, data.body.token)
                Actions.navbarshop()
            }
            else { //GUARDAR INFO?
                Actions.signupshopfeatures()
            }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={appStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? -150 : -100}>
                <ArrowButton rute={'logsign'} />

                <Image source={require('../../../icons/flammaPic.png')} style={styles.imageLogo} />

                <TextInput
                    style={styles.inputView}
                    mode='outlined'
                    label='Email'
                    placeholder="ejemplo@mail.com"
                    theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.inputView}
                    mode='outlined'
                    label='Contraseña'
                    secureTextEntry={true}
                    placeholder="Contraseña"
                    theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <TouchableOpacity>
                    <Text style={{ color: colors.APP_MAIN, fontSize: 12 }}>¿Has olvidado tu contraseña?</Text>
                </TouchableOpacity>

                <Button
                    style={{ top: sizes.hp('-10%') }}
                    icon="send"
                    mode="contained"
                    color={colors.APP_MAIN}
                    disabled={(this.state.email != '' && this.state.password != '') ? false : true}
                    onPress={() => this._login()}>
                    INICIAR SESIÓN
 				</Button>

                <Dialog
                    style={{ width: sizes.wp('70%'), alignSelf: 'center' }}
                    visible={this.state.visibleDialog}
                    onDismiss={this._hideDialog}>
                    <Dialog.Title style={{ alignSelf: 'center' }}>Error</Dialog.Title>
                    <Dialog.Content style={{ alignItems: 'center' }}><Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>{this.state.messageError}</Paragraph></Dialog.Content>
                    <Dialog.Actions>
                        <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialog}>Ok</Button>
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

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    imageLogo: {
        width: sizes.wp('50%'),
        height: sizes.hp('48%'),
        top: sizes.hp('-10%'),
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        width: sizes.wp('80%'),
        height: sizes.hp('5%'),
        top: sizes.hp('-12%'),
        marginBottom: 20,
        justifyContent: "center",
        padding: 5,
        fontSize: sizes.TEXT_INPUT,
    },
    modalActivityIndicator: {
        //flex: 1,
        alignItems: 'center',
        //flexDirection: 'column',
        //justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
});

function mapStateToProps(state) {
    return {
        user: state.authState
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginClientData: (mail, name, lastName, token) => dispatch(LoginActions.setLoginClientData(mail, name, lastName, token)),
        setLoginShopData: (cuit, nombre, direccion, telefono, mail, mascotas, bebes, juegos, aireLibre, libreHumo, wifi, demora, abierto, horarios, token) => dispatch(LoginActions.setLoginShopData(cuit, nombre, direccion, telefono, mail, mascotas, bebes, juegos, aireLibre, libreHumo, wifi, demora, abierto, horarios, token))
    }
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(LoginScreen);