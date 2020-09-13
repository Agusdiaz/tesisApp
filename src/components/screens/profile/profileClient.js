import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, KeyboardAvoidingView, } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Avatar, Button, Dialog, TextInput, Modal, IconButton, Portal, ActivityIndicator } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import { Actions } from 'react-native-router-flux';
import { updateClient, changePassword } from '../../../api/users'
import ClientActions from '../../../redux/authState/action'

class ProfileClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstNameNew: '',
            lastNameNew: '',
            passwordNew: '',
            passwordRepeated: '',
            visibleDialogSessionOut: false,
            visibleDialogEditProfile: false,
            visibleModalName: false,
            visibleModalPassword: false,
            errorMessage: '',
            loading: false,
        }
    }

    _showDialogSessionOut = () => this.setState({ visibleDialogSessionOut: true });
    _hideDialogSessionOut = () => this.setState({ visibleDialogSessionOut: false });

    _showDialogEditProfile = () => this.setState({ visibleDialogEditProfile: true });
    _hideDialogEditProfile = () => this.setState({ visibleDialogEditProfile: false });

    _showModalName = () => this.setState({ visibleModalName: true });
    _hideModalName = () => this.setState({ visibleModalName: false });

    _showModalPassword = () => this.setState({ visibleModalPassword: true });
    _hideModalPassword = () => this.setState({ visibleModalPassword: false });

    passwordsMatch() {
        if (this.state.passwordNew.localeCompare(this.state.passwordRepeated) === 0 && this.state.passwordNew.length > 5)
            return true
        else if(this.state.passwordNew.localeCompare(this.state.passwordRepeated) !== 0){
            this.setState({errorMessage: 'Las contraseñas ingresadas deben coincidir' });
            this._showDialogEditProfile()
            return
        } else if(this.state.passwordNew.length <= 5){
            this.setState({errorMessage: 'La contraseña debe tener 6 o más caracteres' });
            this._showDialogEditProfile()
            return
        }
    }

    async editPassword() {
        if (this.state.passwordNew != '' && this.state.passwordRepeated != '') {
            if (this.passwordsMatch()) {
                this.setState({loading: true})
                const data = await changePassword(this.props.user.mail, this.state.passwordNew, this.props.user.token)
                if(data.status === 500 && data.body.error){
                    this.props.logout()
                    Actions.logsign({visible: true})
                } else if(data.status !== 200){
                    this.setState({ passwordRepeated: '', passwordNew: '', errorMessage: data.body, loading: false });
                    this._showDialogEditProfile()
                } else {
                    this.setState({ passwordNew: '', passwordRepeated: '', errorMessage: data.body, loading: false });
                    this._showDialogEditProfile()
                    this._hideModalPassword()
                }
            }
        }
    }        

    async editNameLastName() {
        if ((this.state.firstNameNew != '' && this.state.firstNameNew.localeCompare(this.props.user.name) != 0) &&
            (this.state.lastNameNew != '' && this.state.lastNameNew.localeCompare(this.props.user.lastName) != 0)) {
                this.setState({ loading: true })
            const data = await updateClient(this.props.user.mail, this.state.firstNameNew, this.state.lastNameNew, this.props.user.token)
            if(data.status === 500 && data.body.error){
                this.props.logout()
                Actions.logsign({visible: true})
            } else if (data.status === 500 || data.status === 404) {
                this.setState({ firstNameNew: '', lastNameNew: '', loading: false, messageError: data.body})
                this._showDialogEditProfile()
            } else {
                this.props.updateClientData(this.state.firstNameNew, this.state.lastNameNew)
                this.setState({ loading: false, firstNameNew: '', lastNameNew: '', errorMessage: 'Se guardaron tus cambios'})
                this._showDialogEditProfile()
                this._hideModalName()
            }
        } else if (this.state.firstNameNew != '' && this.state.firstNameNew.localeCompare(this.props.user.name) != 0) {
            this.setState({ loading: true })
            const data = await updateClient(this.props.user.mail, this.state.firstNameNew, this.props.user.lastName, this.props.user.token)
            if(data.status === 500 && data.body.error){
                this.props.logout()
                Actions.logsign({visible: true})
            } else if (data.status === 500 || data.status === 404) {
                this.setState({ firstNameNew: '', loading: false, messageError: data.body})
                this._showDialogEditProfile()
            } else {
                this.props.updateClientData(this.state.firstNameNew, this.props.user.lastName)
                this.setState({ loading: false, firstNameNew: '', errorMessage: 'Se guardaron tus cambios'})
                this._showDialogEditProfile()
                this._hideModalName()
            }
        }
        else if (this.state.lastNameNew != '' && this.state.lastNameNew.localeCompare(this.props.user.lastName) != 0) {
            this.setState({ loading: true })
            const data = await updateClient(this.props.user.mail, this.props.user.name, this.state.lastNameNew, this.props.user.token)
            if(data.status === 500 && data.body.error){
                this.props.logout()
                Actions.logsign({visible: true})
            } else if (data.status === 500 || data.status === 404) {
                this.setState({ lastNameNew: '', loading: false, messageError: data.body})
                this._showDialogEditProfile()
            } else {
                this.props.updateClientData(this.props.user.name, this.state.lastNameNew)
                this.setState({ loading: false, firstNameNew: '', lastNameNew: '', errorMessage: 'Se guardaron tus cambios'})
                this._showDialogEditProfile()
                this._hideModalName()
            }
        }
        else
            this._hideModalName()
    }

    render() {
        return (
            <View style={appStyles.container}>
                <View style={{ alignItems: 'center', top: 0, bottom: 0 }}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                        <Avatar.Text style={styles.avatar} size={100} label={(this.props.user.lastName !== undefined) ? 
                        this.props.user.name.charAt(0)+this.props.user.lastName.charAt(0) : ''} labelStyle={{ color: colors.APP_MAIN }} />
                            <TextTicker style={styles.fullName}
                                duration={5000}
                                loop
                                animationType='bounce'
                                repeatSpacer={50}
                                marqueeDelay={1000}> {this.props.user.name} {this.props.user.lastName}</TextTicker>

                            <TextTicker style={styles.userInfo}
                                duration={5000}
                                loop
                                animationType='bounce'
                                repeatSpacer={50}
                                marqueeDelay={1000}> {this.props.user.mail} </TextTicker>
                            <IconButton
                                icon='pencil'//"account-edit"
                                style={styles.iconEdit}
                                color={'#fff'}
                                size={38}
                                onPress={this._showModalName} />
                        </View>

                    </View>

                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.iconContent}>
                                <Button
                                    style={{ margin: sizes.hp('3%'), width: '52%' }}
                                    icon="room-service-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={() => Actions.ordersclient()}>
                                    Mis pedidos
 				                </Button>
                                <Button
                                    style={{ margin: sizes.hp('3%'), width: '52%' }}
                                    icon="star-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={() => Actions.favouritesshops()}>
                                    Mis Favoritos
 				                </Button>
                                <Button
                                    style={{ margin: sizes.hp('3%'), width: '52%' }}
                                    icon="pencil-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showModalPassword}>
                                    Editar Contraseña
 				                </Button>
                                <Button
                                    style={{ margin: sizes.hp('3%'), width: '52%' }}
                                    icon="logout-variant"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showDialogSessionOut}>
                                    Cerrar Sesión
 				                </Button>
                            </View>
                        </View>

                    </View>
                </View>

                <Portal>

                    <Dialog
                        visible={this.state.visibleDialogSessionOut}
                        onDismiss={this._hideDialogSessionOut}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea cerrar sesión?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogSessionOut}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this.props.logout()
                                this._hideDialogSessionOut()
                                Actions.logsign()}}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal visible={this.state.visibleModalPassword} onDismiss={this._hideModalPassword} contentContainerStyle={styles.modalView}>

                        <Text style={styles.signupText}>Modificá tu contraseña</Text>
                        <TextInput
                            style={styles.inputView}
                            mode='outlined'
                            label='Nueva Contraseña'
                            secureTextEntry={true}
                            placeholder="Nueva contraseña"
                            theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                            onChangeText={text => this.setState({ passwordNew: text })}
                        />
                        <TextInput
                            style={styles.inputView}
                            mode='outlined'
                            disabled={(this.state.passwordNew === '') ? true : false}
                            label='Confirmar contraseña'
                            secureTextEntry={true}
                            placeholder="Confirmar contraseña"
                            theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                            onChangeText={text => this.setState({ passwordRepeated: text })}
                        />

                        <View style={{ flexDirection: "row", marginTop: sizes.wp('3%') }}>
                            <Button
                                style={{ margin: sizes.hp('1%'), width: '42%', marginRight: sizes.wp('10%') }}
                                icon="close-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._hideModalPassword}>
                                Cancelar
                            </Button>

                            <Button
                                style={{ margin: sizes.hp('1%'), width: '42%', }}
                                icon="check-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                disabled={(this.state.passwordNew == '' || this.state.passwordRepeated == '') ? true : false}
                                onPress={() => this.editPassword()} >
                                Confirmar
                            </Button>
                        </View>
                    </Modal>

                    <Modal visible={this.state.visibleModalName} onDismiss={this._hideModalName} contentContainerStyle={styles.modalView}>
                        <Text style={styles.signupText}>Modificá tu nombre y apellido</Text>

                        <TextInput
                            style={styles.inputView}
                            mode='outlined'
                            label='Nombre'
                            placeholder={this.props.user.name}
                            theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                            onChangeText={text => this.setState({ firstNameNew: text })}
                        />

                        <TextInput
                            style={styles.inputView}
                            mode='outlined'
                            label='Apellido'
                            placeholder={this.props.user.lastName}
                            theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                            onChangeText={text => this.setState({ lastNameNew: text })}
                        />

                        <View style={{ flexDirection: "row", marginTop: sizes.wp('3%') }}>
                            <Button
                                style={{ margin: sizes.hp('1%'), width: '42%', marginRight: sizes.wp('10%') }}
                                icon="close-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._hideModalName}>
                                Cancelar
                            </Button>

                            <Button
                                style={{ margin: sizes.hp('1%'), width: '42%', }}
                                icon="check-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                disabled={(this.state.firstNameNew == '' && this.state.lastNameNew == '') ? true : false}
                                onPress={() => this.editNameLastName()}>
                                Confirmar
                            </Button>
                        </View>
                    </Modal>

                    <Dialog
                        visible={this.state.visibleDialogEditProfile}
                        onDismiss={this._hideDialogEditProfile}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.errorMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogEditProfile}>Ok</Button>
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
                </Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.APP_MAIN,
        marginTop: sizes.hp('12%'),
        alignSelf: 'stretch'
    },
    headerContent: {
        padding: 50,
        alignItems: 'center',
        height: sizes.hp('33%')
    },
    avatar: {
        color: colors.APP_BACKGR,
        backgroundColor: colors.APP_BACKGR,
        marginBottom: sizes.hp('2%'),
    },
    fullName: {
        fontSize: 25,
        color: colors.APP_BACKGR,
        fontWeight: 'bold',
        marginBottom: sizes.hp('1%'),
        textAlign: 'center',
    },
    userInfo: {
        fontSize: 16,
        color: colors.APP_BACKGR,
        textAlign: 'center',
    },
    iconEdit: {
        right: sizes.wp('-40%'),
        top: sizes.hp('-1.5%'),
    },
    body: {
        backgroundColor: colors.APP_BACKGR,
        height: sizes.hp('55%'),
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        marginTop: sizes.hp('5%'),
    },
    iconContent: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 5,
    },
    modalView: {
        top: sizes.hp('-10%'),
        margin: sizes.hp('2%'),
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
    },
    signupText: {
        color: colors.APP_MAIN,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: sizes.hp('5%'),
        marginBottom: sizes.hp('4%'),
    },
    inputView: {
        width: "80%",
        height: 50,
        margin: sizes.hp('0.5%'),
        justifyContent: "center",
        padding: 8,
        fontSize: sizes.TEXT_INPUT,
    },
});

function mapStateToProps(state) {
    return {
        user: state.authState.client,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateClientData: (name, lastName) => dispatch(ClientActions.updateClientData(name, lastName)),
        logout: () => dispatch(ClientActions.logout())
    }
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(ProfileClientScreen);