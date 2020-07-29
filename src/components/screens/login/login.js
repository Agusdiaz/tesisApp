import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { login } from '../../../redux/actions';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput, Button, IconButton, ActivityIndicator, Modal } from 'react-native-paper';
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
            loading: false
        }
    }

    _getDisabled() {
        let disabled = false;
        if (!this.state.email)
            disabled = true;
        if (!this.state.password || this.state.password.length <= 5)
            disabled = true;
        if (this.state.loading)
            disabled = true;
        return disabled;
    }

    _login() {
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({
              loading: false,
            email: '',
            password: ''
            });
          }, 4000);
        login(this.state.email, this.state.password).then((result) => {
         
        }).catch((err) => {
            this.setState({ loading: false })
            this.setState({ email: '', password: '' })
            Alert.alert('Error', err);
        })
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

function MapStateToProps(state) {
    return {
        user: state.session && state.session.user ? state.session.user : false
    }
}

export default connect(MapStateToProps, { login })(LoginScreen);