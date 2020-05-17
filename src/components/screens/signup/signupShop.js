import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert,} from 'react-native';
import { TextInput, Button, Snackbar, Dialog } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'

class SignUpShopScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cuit: '',
			legalName: '',
			email: '',
			password: '',
			visibleSnackBar: true,
			visibleDialog: false,
		}
	}

	signup = () => {
		if (this.state.cuit == '' || this.state.legalName == '' || this.state.email == '' || this.state.password == '')
			Alert.alert('Atención','Campos Incompletos')
		else
			this._showDialog()
	}

	_showDialog = () => this.setState({ visibleDialog: true });

	_hideDialog = () => this.setState({ visibleDialog: false });

	_onDismissSnackBar = () => this.setState({ visibleSnackBar: false })

	render() {
		return (
			<KeyboardAvoidingView style={appStyles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? -220 : -170}>
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
					<Text style={{ fontSize: 18, textAlign: 'left' }}>
						IMPORTANTE: Una vez cargada tu información, la misma será validada. Te enviaremos un mail a esa
						dirección notificando el alta del local en nuestro sistema.
					</Text>

				</Snackbar>

				<Text style={styles.signupText}> Crea una nueva cuenta para tu local</Text>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='CUIT'
					placeholder='xx-xxxxxxxx-x'
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(text) => this.setState({ cuit: text })}
					value={this.state.cuit}
				/>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Nombre Razón Social'
					placeholder='Nombre Razón Social'
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(text) => this.setState({ legalName: text })}
					value={this.state.legalName}
				/>

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
					style={{ top: sizes.hp('-7%') }}
					icon="account-plus"
					mode="contained"
					color={colors.APP_MAIN}
					//disabled="true"
					onPress={() => this.signup()}>
					Registrarse
 				</Button>

				 <Dialog
					visible={this.state.visibleDialog}
					onDismiss={this._hideDialog}>
					<Dialog.Title style={{ alignSelf: 'center' }}>¿Desea crear cuenta?</Dialog.Title>
					<Dialog.Actions>
						<Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialog}>Cancelar</Button>
						<Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Ok</Button>
					</Dialog.Actions>
				</Dialog>

			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	signupText: {
		color: colors.APP_MAIN,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
		top: sizes.hp('-10%'),
		padding: 40,
	},
	inputView: {
		top: sizes.hp('-10%'),
		width: "80%",
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 5,
	},
	snackbar: {
		alignSelf: 'center',
		marginBottom: sizes.hp('2%'),
		width: sizes.wp('90%'),
		padding: 5,
		backgroundColor: colors.APP_MAIN,
	},
})

export default SignUpShopScreen;