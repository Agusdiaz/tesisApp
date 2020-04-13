import React, { Component } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';

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
        this.setState({ lodaer: true })
        this.props.login(this.state).then(($result) => {
            //todo salio bien enviamos a otra vista donde veremos el perfild del usuario
        }).catch((err) => {
            Alert.alert('Error', err.message);
        })
    }
    
    render() {
        return (

            <View style={styles.container}>

                <Image source={require('../../icons/book.gif')} style={{ width: 100, height: 100, marginBottom: 70 }} />

                <View style={styles.inputView} >
                   <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#FFFFFF"
                        onChangeText={text => this.setState({ email: text })} />
                 </View>

                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        placeholder="Contraseña..."
                        placeholderTextColor="#FFFFFF"
                        onChangeText={text => this.setState({ password: text })} />
                    </View>

                <TouchableOpacity>
                    <Text style={styles.forgot}>¿Has olvidado tu contraseña?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>INICIAR SESIÓN</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.loginText}>Registrarse</Text>
                </TouchableOpacity>

            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E78427',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: "80%",
        backgroundColor: "#82572E",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "#E6903D",
        fontSize: 15
    },
    forgot: {
        color: "white",
        fontSize: 12
    },
    loginText: {
        color: "white",
        fontSize: 16
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#553F2A",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    MailStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
});

function MapStateToProps(state) {
    return {
        user: state.session && state.session.user ? state.session.user : false
    }
}

export default connect(MapStateToProps, { login })(LoginScreen);