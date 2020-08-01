import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Dialog, Modal, ActivityIndicator, Paragraph } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import { Actions } from 'react-native-router-flux';
import { } from '../../../api/user'

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
		}
	}

	validateData(){
		this.setState({ loading: true })
	}

	signup(){

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
					disabled={this.state.firstName == '' || this.state.lastName == '' || this.state.email == '' || this.state.password == ''}
					onPress={this._showDialogCreate}>
					Registrarse
 				</Button>

				 <TouchableOpacity style={{bottom: sizes.hp('-4%')}} onPress={() => Actions.signupshop()}>
					<Text style={{ color: colors.APP_MAIN, fontSize: 12.8 }}>¿Querés registrar tu local? Hace click acá</Text>
				</TouchableOpacity>

				<Dialog
					visible={this.state.visibleDialogCreate}
					onDismiss={this._hideDialogCreate}>
					<Dialog.Title style={{ alignSelf: 'center' }}>¿Desea crear cuenta?</Dialog.Title>
					<Dialog.Actions>
						<Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogCreate}>Cancelar</Button>
						<Button color={colors.APP_GREEN} onPress={() => this.validateData()}>Ok</Button>
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

export default SignUpClientScreen;