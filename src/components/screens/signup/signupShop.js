import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { appStyles, colors } from '../../../index.styles';
import ArrowButton from '../../commons/ArrowButton'

class HomeClientScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<KeyboardAvoidingView style={appStyles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<ArrowButton />

				<Text style={styles.signupText}> Bienvenido{"\n"}Crea tu nueva cuenta</Text>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Nombre'
					placeholder="Nombre(s)"
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(firstName) => this.setState({ firstName })}
					value={this.state.firstName}
				/>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Apellido'
					placeholder="Apellido(s)"
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(lastName) => this.setState({ lastName })}
					value={this.state.lastName}
				/>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Email'
					placeholder="ejemplo@email.com"
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(email) => this.setState({ email })}
					value={this.state.email}
				/>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Contraseña'
					secureTextEntry={true}
					placeholder="Contraseña"
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(password) => this.setState({ password })}
					value={this.state.password}
				/>

				<Button
					style={{ marginTop: 15 }}
					icon="account-plus"
					mode="contained"
					color={colors.APP_MAIN}
					//disabled="true"
					onPress={() => this.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.password)}>
					Registrarse
 				</Button>

			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	signupText: {
		//fontFamily: "",
		color: "#E1454A",
		fontSize: 35,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 30
	},
	inputView: {
		width: "80%",
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 5,
	},
})

export default HomeClientScreen;