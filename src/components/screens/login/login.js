import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image, View } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { appStyles, colors } from '../../../index.styles';
import ArrowButton from '../../commons/ArrowButton'


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
                <ArrowButton />

                {/*}<Image source={require('../../../icons/book.gif')} style={{ width: 100, height: 100, marginBottom: 70 }} />{*/}
                <IconButton
                    icon='account-circle-outline'
                    size={120}
                    style={styles.iconUser}
                    color={colors.APP_MAIN}

                />

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
                    style={{ marginTop: 15 }}
                    icon="send"
                    mode="contained"
                    color={colors.APP_MAIN}
                    //disabled="true"
                    onPress={() => this.login(this.state.firstName, this.state.lastName, this.state.email, this.state.password)}>
                    INICIAR SESIÓN
 				</Button>

            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    inputView: {
        width: "80%",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 5,
    },
    iconUser: {
        top: -35,
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        marginBottom: 10
    },
});

function MapStateToProps(state) {
    return {
        user: state.session && state.session.user ? state.session.user : false
    }
}

export default connect(MapStateToProps, { login })(LoginScreen);