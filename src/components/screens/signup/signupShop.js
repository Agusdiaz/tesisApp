import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'

class SignUpShopScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			visibleSnackBar: true,
		}
	}

	signup = (email, password) => {
		if (email == '' || password == '')
			alert('Campos Incompletos')
	}

	_onDismissSnackBar = () => this.setState({ visibleSnackBar: false })

	render() {
		return (
			<KeyboardAvoidingView style={appStyles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<ArrowButton rute={'logsign'} />

				<Snackbar
				style={styles.snackbar}
				theme={{ colors: { accent: '#FFFFFF' } }}
					visible={this.state.visibleSnackBar}
					onDismiss={this._onDismissSnackBar}
					duration={30000}
					action={{
						label: 'Ok',
						onPress: () => { this._onDismissSnackBar },
					}}>
					<Text style={{fontSize: 18, textAlign:'left'}}>
						IMPORTANTE: Una vez cargada toda tu información correspondiente, te enviaremos un mail a esa 
					dirrección notificando el alta o no del local en nuestro sistema.
					</Text>

        </Snackbar>

				<Text style={styles.signupText}> Crea una nueva cuenta para tu local</Text>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Email'
					placeholder='ejemplo@mail.com'
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(text) => this.setState({ email: text })}
					value={this.state.email}
				/>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Contraseña'
					placeholder='Contraseña'
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(text) => this.setState({ password: text })}
					value={this.state.password}
				/>

				<Button
					style={{ marginTop: sizes.hp('-2%') }}
					icon="arrow-right-bold-outline"
					mode="contained"
					color={colors.APP_MAIN}
					//disabled="true"
					onPress={() => this.signup(this.state.email, this.state.password)}>
					Siguiente
 				</Button>

			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	signupText: {
		//fontFamily: "",
		color: colors.APP_MAIN,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
		top: sizes.hp('-5%'),
		padding: 40,
	},
	inputView: {
		top: sizes.hp('-4%'),
		width: "80%",
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 5,
	},
	snackbar:{
		marginBottom: sizes.hp('5%'),
		padding:5,
		backgroundColor: colors.APP_MAIN,
	},
})

export default SignUpShopScreen;