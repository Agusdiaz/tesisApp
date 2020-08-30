import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { TextInput, Button, Dialog, Modal, ActivityIndicator, Paragraph, HelperText } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import LoginActions from '../../../redux/authState/action'
import { Actions } from 'react-native-router-flux';
import { insertClient } from '../../../api/users'

class SignUpClientScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			loading: false,
			visibleDialogCreate: false,
			visibleDialogError: false,
			messageError: '',
			emailError: false,
			passwordError: false,
		}
	}

	async signup() {
		this.setState({ loading: true })
		const data = await insertClient(this.state.email, this.state.firstName, this.state.lastName, this.state.password)
		if (data.status === 500 || data.status === 401) {
			this.setState({ loading: false, email: '', password: '', messageError: data.body })
			this._showDialogError()
		} else {
			this.setState({ loading: false, email: '', firstName: '', lastName: '', password: '' })
			this.props.setLoginClientData(data.body.mail, data.body.nombre, data.body.apellido, data.body.token)
			Actions.navbarclient()
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

	_showDialogError = () => this.setState({ visibleDialogError: true });
	_hideDialogError = () => this.setState({ visibleDialogError: false });

	render() {
		return (
			<KeyboardAvoidingView style={appStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? -165 : 0} >
				<ArrowButton rute={'logsign'} />

				<Text style={styles.signupText}> Crea tu nueva cuenta y comienza a hacer pedidos</Text>

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

				<HelperText type="error" visible={this.state.emailError} style={{ marginBottom: -12 }}>
					El mail ingresado es inválido
      			</HelperText>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Mail'
					placeholder="ejemplo@mail.com"
					error={this.state.emailError}
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(email) => this.validateMail(email)}
					value={this.state.email}
				/>

				<TextInput
					style={styles.inputView}
					mode='outlined'
					label='Contraseña'
					secureTextEntry={true}
					placeholder="Contraseña"
					error={this.state.passwordError}
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(password) => this.validatePassword(password)}
					value={this.state.password}
				/>

				<HelperText type="error" visible={this.state.passwordError} style={{ marginTop: -25 }}>
					La contraseña debe tener 6 dígitos mínimo
      			</HelperText>

				<Button
					style={{ top: sizes.hp('4.5%') }}
					icon="account-plus"
					mode="contained"
					color={colors.APP_MAIN}
					disabled={this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '' ||
						this.state.emailError || this.state.passwordError}
					onPress={this._showDialogCreate}>
					Registrarse
 				</Button>

				<TouchableOpacity style={{ top: sizes.hp('8%') }} onPress={() => Actions.signupshop()}>
					<Text style={{ color: colors.APP_MAIN, fontSize: 12.8 }}>¿Querés registrar tu local? Hace click acá</Text>
				</TouchableOpacity>

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
					<Dialog.Title style={{ alignSelf: 'center' }}>Error</Dialog.Title>
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
		//fontFamily: "",
		color: colors.APP_MAIN,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 30
	},
	inputView: {
		width: "80%",
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 8,
		fontSize: sizes.TEXT_INPUT,
	},
})

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoginClientData: (mail, name, lastName, token) => dispatch(LoginActions.setLoginClientData(mail, name, lastName, token)),
	}
};

export default connect(
	mapStateToProps, mapDispatchToProps
)(SignUpClientScreen);