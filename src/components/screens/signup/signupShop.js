import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, } from 'react-native';
import { TextInput, Button, Snackbar, Dialog, ActivityIndicator, Modal, HelperText, Paragraph } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import { insertShop } from '../../../api/user'

//VER HELPER TEXT, VALIDACION TELEFONO, ARREGLAR SNACKBAR, 
export default class SignUpShopScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cuit: '',
			name: '',
			address: '',
			phone: '',
			legalName: '',
			email: '',
			password: '',
			visibleSnackBar: true,
			visibleDialogCreate: false,
			visibleDialogError: false,
			loading: false,
			messageError: '',
			emailError: false,
			passwordError: false,
		}
	}

	async signup(){
		this.setState({ loading: true })
		const data = await insertShop(this.state.email, this.state.firstName, this.state.lastName, this.state.password)
		if (data.status === 500) {
			this.setState({ loading: false, email: '', password: '', messageError: data.body })
			this._showDialogError()
		}else if(data.status === 401){
			this.setState({ loading: false, email: '', password: '', messageError: 'Error: ' + data.body })
			this._showDialogError()
		}else {
			this.setState({ loading: false, cuit: '', name: '', address: '', phone: '', legalName: '', email: '', password: '', messageError: data.body})
			this._showDialogError()
		}
	}

	validateMail = (text) => {
		if(text === '')
			this.setState({ email: text, emailError: false })
		else{
			let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(text) === false) //INCORRECTO
			this.setState({ email: text, emailError: true })
		else //CORRECTO
			this.setState({ email: text, emailError: false })
		}
	}

	validatePassword = (text) => {
		if(text === '')
			this.setState({ password: text, passwordError: false })
		else{
			if (text.length > 5)
			this.setState({ password: text, passwordError: false })
		else
			this.setState({ password: text, passwordError: true })			
		}
	}

	_showDialogCreate = () => this.setState({ visibleDialogCreate: true });
	_hideDialogCreate = () => this.setState({ visibleDialogCreate: false });

	_onDismissSnackBar = () => this.setState({ visibleSnackBar: false })

	render() {
		return (
			<KeyboardAvoidingView style={[appStyles.container]} behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? -90 : -170}>
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
					label='Nombre del Local'
					placeholder='Nombre del Local'
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(text) => this.setState({ name: text })}
					value={this.state.name}
				/>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Dirección'
					placeholder='Calle 123'
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(text) => this.setState({ name: text })}
					value={this.state.address}
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
					label='Teléfono'
					placeholder='Teléfono'
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(phone) => this.validatePhone({ phone })}
					value={this.state.phone}
				/>

				<HelperText type="error" visible={this.state.emailError} style={{ marginBottom: -12 }}>
					El mail ingresado es inválido
      			</HelperText>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Mail'
					placeholder='ejemplo@mail.com'
					error={this.state.emailError}
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(text) => this.validateMail(text)}
					value={this.state.email}
				/>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Contraseña'
					placeholder='Contraseña'
					error={this.state.passwordError}
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(text) => this.validatePassword(text)}
					value={this.state.password}
				/>

				<HelperText type="error" visible={this.state.passwordError} style={{ marginTop: -80 }}>
					La contraseña debe tener 6 dígitos mínimo
      			</HelperText>

				<Button
					style={{ top: sizes.hp('-2%') }}
					icon="account-plus"
					mode="contained"
					color={colors.APP_MAIN}
					disabled={this.state.cuit === '' || this.state.name === '' || this.state.address === '' || this.state.phone === '' || this.state.legalName === '' 
					|| this.state.email === '' || this.state.password === '' || this.state.emailError || this.state.passwordError}
					onPress={this._showDialogCreate}>
					Registrarse
 				</Button>

				 <Dialog
					visible={this.state.visibleDialogCreate}
					onDismiss={this._hideDialogCreate}>
					<Dialog.Title style={{ alignSelf: 'center' }}>¿Desea crear cuenta?</Dialog.Title>
					<Dialog.Actions>
						<Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogCreate}>Cancelar</Button>
						<Button color={colors.APP_GREEN} onPress={() => {this.signup()
						this._hideDialogCreate}}>Ok</Button>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					visible={this.state.visibleDialogCreate}
					onDismiss={this._hideDialogCreate}>
					<Dialog.Title style={{ alignSelf: 'center' }}>¿Desea crear cuenta?</Dialog.Title>
					<Dialog.Actions>
						<Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogCreate}>Cancelar</Button>
						<Button color={colors.APP_GREEN} onPress={() => {this.signup()
						this._hideDialogCreate()}}>Ok</Button>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					style={{ width: sizes.wp('70%'), alignSelf: 'center' }}
					visible={this.state.visibleDialogError}
					onDismiss={this._hideDialogError}>
					<Dialog.Content style={{ alignItems: 'center' }}><Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>{this.state.messageError}</Paragraph></Dialog.Content>
					<Dialog.Actions>
						<Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogError}>Ok</Button>
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
	signupText: {
		color: colors.APP_MAIN,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
		alignSelf: 'center',
		top: sizes.hp('1%'),
		padding: 12,
		height: sizes.hp('12%'),
		marginBottom: sizes.hp('12%'),
	},
	inputView: {
		top: sizes.hp('-10%'),
		width: "80%",
		height: 40,
		marginBottom: 15,
		justifyContent: "center",
		padding: 5,
		//position: 'absolute',
	},
	snackbar: {
		alignSelf: 'center',
		top: sizes.hp('-50%'),
		width: sizes.wp('90%'),
		padding: 5,
		backgroundColor: colors.APP_MAIN,
		//position: 'relative'
		flex: 2
	},
})