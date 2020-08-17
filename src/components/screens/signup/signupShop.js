import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, } from 'react-native';
import { TextInput, Button, Dialog, ActivityIndicator, Modal, HelperText, Paragraph } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import { insertShop } from '../../../api/user'
 
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
			visibleDialogCreate: false,
			visibleDialogError: false,
			loading: false,
			messageError: 'IMPORTANTE: Una vez cargada tu información, la misma será validada. Te enviaremos un mail a esa dirección ' +
			'notificando el alta del local en nuestro sistema.',
			emailError: false,
			passwordError: false,
		}
	}

	async signup(){
		this.setState({ loading: true })
		setTimeout(() => { this.setState({ loading: false }) }, 4000);
		const data = await insertShop(this.state.cuit, this.state.name, this.state.address, this.state.phone, this.state.legalName, 
			this.state.email, this.state.password)
		if (data.status === 500) {
			this.setState({ loading: false, password: '', messageError: data.body })
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
	
	validatePhone = (text) => {
		this.setState({ phone: text})
	}

	_showDialogCreate = () => this.setState({ visibleDialogCreate: true });
	_hideDialogCreate = () => this.setState({ visibleDialogCreate: false });

	_showDialogError = () => this.setState({ visibleDialogError: true });
	_hideDialogError = () => this.setState({ visibleDialogError: false });

	render() {
		return (
			<KeyboardAvoidingView style={[appStyles.container]} behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? -55 : -170}>
				<ArrowButton rute={'logsign'} />

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
					onChangeText={(text) => this.setState({ address: text })}
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
					onChangeText={(text) => this.setState({ phone: text })}
					value={this.state.phone}
				/>

				<HelperText type="error" visible={this.state.emailError} style={{ bottom:sizes.hp('5%')}}>
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

				<HelperText type="error" visible={this.state.passwordError} style={{ bottom:sizes.hp('6%')}}>
					La contraseña debe tener 6 dígitos como mínimo
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
						<Button color={colors.APP_GREEN} onPress={() => {this.signup(), this._hideDialogCreate()}}>Ok</Button>
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
		top: sizes.hp('6%'),
		//marginBottom: sizes.hp('10%'),
		padding: 12,
		height: sizes.hp('12%'),
		marginBottom: sizes.hp('12%'),
	},
	inputView: {
		top: sizes.hp('-5%'),
		width: "80%",
		height: 40,
		marginBottom: 20,
		justifyContent: "center",
		//padding: 5,
		//position: 'absolute',
	},
})