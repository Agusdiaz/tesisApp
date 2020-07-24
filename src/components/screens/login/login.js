import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image, View } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import { Actions } from 'react-native-router-flux';


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loader: false
        }
    }

    _getDisabled() {
        let disabled = false;
        if (!this.state.email)
            disabled = true;
        if (!this.state.password || this.state.password.length <= 5)
            disabled = true;
        if (this.state.loader)
            disabled = true;
        return disabled;
    }

    _login() {
        this.setState({ loader: true })
        this.props.login(this.state).then(($result) => {
            //todo salio bien enviamos a otra vista donde veremos el perfild del usuario
        }).catch((err) => {
            Alert.alert('Error', err.message);
        })
    }

    tryLogin = () => {
        this.props.attemptLogin(this.state.email, this.state.password, () => this.setState({ email: '', password: '' }))
    }

    render() {
        return (
            <KeyboardAvoidingView style={appStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? -150 : -100}>
                <ArrowButton rute={'logsign'}/>

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
                    //disabled="true"
                    onPress={() => this._login()}>
                    INICIAR SESIÓN
 				</Button>

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
});

function MapStateToProps(state) {
    return {
        user: state.session && state.session.user ? state.session.user : false
    }
}

export default connect(MapStateToProps, { login })(LoginScreen);