import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Avatar, Button, Dialog, TextInput, Modal } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import { Actions } from 'react-native-router-flux';

export default class ProfileClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: 'Juan',
            lastName: 'Perez',
            mail: 'juanperez@mail.com',
            avatarLabel: 'JP', //`${state.firstName.charAt(0)}${state.lastName.charAt(0)}`
            password: '123',
            firstNameNew: '',
            lastNameNew: '',
            passwordNew: '',
            passwordRepeated: '',
            visibleDialogSessionOut: false,
            visibleDialogEditProfile: false,
            visibleModal: false,
        }
    }

    _showDialogSessionOut = () => this.setState({ visibleDialogSessionOut: true });

    _hideDialogSessionOut = () => this.setState({ visibleDialogSessionOut: false });

    _showDialogEditProfile = () => this.setState({ visibleDialogEditProfile: true });

    _hideDialogEditProfile = () => this.setState({ visibleDialogEditProfile: false });

    _showModal = () => this.setState({ visibleModal: true });

    _hideModal = () => this.setState({ visibleModal: false });

    passwordsMatch() {
        if (this.state.passwordNew.localeCompare(this.state.passwordRepeated) == 0 && this.state.passwordNew.length > 5 &&
            this.state.passwordNew.localeCompare(this.state.password) != 0)
            return true
        return false;
    }

    editProfile() {
        if (this.state.passwordNew != '' || this.state.passwordRepeated != '') {
            if (this.passwordsMatch()) { //CONTRASEñA SIN ERROR
                if ((this.state.firstNameNew != '' && this.state.firstNameNew.localeCompare(this.state.firstName) != 0) &&
                    (this.state.lastNameNew != '' && this.state.lastNameNew.localeCompare(this.state.lastName) != 0)) { //CAMBIAR NOMBRE, APELLIDO Y CONTRASEñA
                    this.setState({
                        firstName: this.state.firstNameNew, lastName: this.state.lastNameNew, avatarLabel: `${this.state.firstNameNew.charAt(0)}${this.state.lastNameNew.charAt(0)}`,
                        password: this.state.passwordNew, firstNameNew: '', lastNameNew: '', passwordNew: '', passwordRepeated: ''
                    });
                    return 0;
                }
                else if (this.state.firstNameNew != '' && this.state.firstNameNew.localeCompare(this.state.firstName) != 0) { //CAMBIAR NOMBRE Y CONTRASEñA
                    this.setState({
                        firstName: this.state.firstNameNew, password: this.state.passwordNew, firstNameNew: '',
                        avatarLabel: `${this.state.firstNameNew.charAt(0)}${this.state.lastName.charAt(0)}`, passwordNew: '', passwordRepeated: ''
                    });
                    return 1;
                }
                else if (this.state.lastNameNew != '' && this.state.lastNameNew.localeCompare(this.state.lastName) != 0) { //CAMBIAR APELLIDO Y CONTRASEñA
                    this.setState({
                        lastName: this.state.lastNameNew, password: this.state.passwordNew, lastNameNew: '',
                        avatarLabel: `${this.state.firstName.charAt(0)}${this.state.lastNameNew.charAt(0)}`, passwordNew: '', passwordRepeated: ''
                    });
                    return 2;
                }
                else { //CAMBIAR SOLO CONTRASEñA
                    this.setState({
                        password: this.state.passwordNew, passwordNew: '', passwordRepeated: ''
                    });
                    return 3;
                }
            }
            else { //CONTRASEñA ERROR 
                if ((this.state.firstNameNew != '' && this.state.firstNameNew.localeCompare(this.state.firstName) != 0) &&
                    (this.state.lastNameNew != '' && this.state.lastNameNew.localeCompare(this.state.lastName) != 0)) { //CAMBIAR NOMBRE Y APELLIDO
                    return 4;
                }
                else if (this.state.firstNameNew != '' && this.state.firstNameNew.localeCompare(this.state.firstName) != 0) { //CAMBIAR NOMBRE
                    return 5;
                }
                else if (this.state.LastNameNew != '' && this.state.lastNameNew.localeCompare(this.state.lastName) != 0) { //CAMBIAR APELLIDO
                    return 6;
                }
            }
        }
        else { //NO CAMBIAR CONTRASEñA
            if ((this.state.firstNameNew != '' && this.state.firstNameNew.localeCompare(this.state.firstName) != 0) &&
                (this.state.lastNameNew != '' && this.state.lastNameNew.localeCompare(this.state.lastName) != 0)) { //CAMBIAR NOMBRE Y APELLIDO
                this.setState({
                    firstName: this.state.firstNameNew, lastName: this.state.lastNameNew,
                    avatarLabel: `${this.state.firstNameNew.charAt(0)}${this.state.lastNameNew.charAt(0)}`, firstNameNew: '', lastNameNew: ''
                });
                return 7;
            }
            else if (this.state.firstNameNew != '' && this.state.firstNameNew.localeCompare(this.state.firstName) != 0) { //CAMBIAR NOMBRE
                this.setState({
                    firstName: this.state.firstNameNew, firstNameNew: '',
                    avatarLabel: `${this.state.firstNameNew.charAt(0)}${this.state.lastName.charAt(0)}`
                });
                return 8;
            }
            else if (this.state.lastNameNew != '' && this.state.lastNameNew.localeCompare(this.state.lastName) != 0) { //CAMBIAR APELLIDO
                this.setState({
                    lastName: this.state.lastNameNew, lastNameNew: '',
                    avatarLabel: `${this.state.firstName.charAt(0)}${this.state.lastNameNew.charAt(0)}`,
                });
                return 9;
            }
            else { //NO CAMBIAR NADA
                return 10;
            }
        }
    }

    render() {
        return (
            <View style={appStyles.container}>
                <View style={{ alignItems: 'center', top: 0, bottom: 0 }}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Avatar.Text style={styles.avatar} size={100} label={this.state.avatarLabel} labelStyle={{ color: colors.APP_MAIN }} />
                            <TextTicker style={styles.fullName}
                                duration={5000}
                                loop
                                animationType='bounce'
                                repeatSpacer={50}
                                marqueeDelay={1000}> {this.state.firstName} {this.state.lastName}</TextTicker>
                            <TextTicker style={styles.userInfo}
                                duration={5000}
                                loop
                                animationType='bounce'
                                repeatSpacer={50}
                                marqueeDelay={1000}> {this.state.mail} </TextTicker>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.iconContent}>
                                <Button
                                    style={{ margin: sizes.hp('3%'), width: '50%' }}
                                    icon="room-service-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={() => Actions.lastorders()}>
                                    Últimos pedidos
 				                </Button>
                                <Button
                                    style={{ margin: sizes.hp('3%'), width: '50%' }}
                                    icon="star-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={() => Actions.favouritesshops()}>
                                    Favoritos
 				                </Button>
                                <Button
                                    style={{ margin: sizes.hp('3%'), width: '50%' }}
                                    icon="pencil-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showModal}>
                                    Editar Perfil
 				                </Button>
                                <Button
                                    style={{ margin: sizes.hp('3%'), width: '50%' }}
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

                <Dialog
                    visible={this.state.visibleDialogSessionOut}
                    onDismiss={this._hideDialogSessionOut}>
                    <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea cerrar sesión?</Dialog.Title>
                    <Dialog.Actions>
                        <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogSessionOut}>Cancelar</Button>
                        <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>

                <Modal visible={this.state.visibleModal} onDismiss={this._hideModal}>
                    <KeyboardAvoidingView behavior='position' >
                        <View style={styles.modalView}>

                            <Text style={styles.signupText}>Estos son los datos que podés modificar</Text>

                            <TextInput
                                style={styles.inputView}
                                mode='outlined'
                                label='Nombre'
                                placeholder={this.state.firstName}
                                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                onChangeText={text => this.setState({ firstNameNew: text })}
                            />

                            <TextInput
                                style={styles.inputView}
                                mode='outlined'
                                label='Apellido'
                                placeholder={this.state.lastName}
                                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                onChangeText={text => this.setState({ lastNameNew: text })}
                            />

                            <TextInput
                                style={styles.inputView}
                                mode='outlined'
                                label='Contraseña'
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

                            <Button
                                style={{ margin: sizes.hp('1%'), width: '42%', left: sizes.hp('-11%'), top: sizes.hp('4%') }}
                                icon="close-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._hideModal}>
                                Cancelar
                            </Button>

                            <Button
                                style={{ margin: sizes.hp('1%'), width: '42%', right: sizes.hp('-11%'), top: sizes.hp('-1.8%') }}
                                icon="check-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={() => {
                                    switch (this.editProfile()) {
                                        case 0:
                                            this._hideModal();
                                            break;
                                        case 1:
                                            this._hideModal();
                                            break;
                                        case 2:
                                            this._hideModal();
                                            break;
                                        case 3:
                                            this._hideModal();
                                            break;
                                        case 4: //ERROR
                                            this._showDialogEditProfile();
                                            break;
                                        case 5: //ERROR
                                            this._showDialogEditProfile();
                                            break;
                                        case 6: //ERROR
                                            this._showDialogEditProfile();
                                            break;
                                        case 7:
                                            this._hideModal();
                                            break;
                                        case 8:
                                            this._hideModal();
                                            break;
                                        case 9:
                                            this._hideModal();
                                            break;
                                        case 10:
                                            this._hideModal();
                                            break;
                                    }
                                }}>
                                Confirmar
                            </Button>

                            <Dialog
                                visible={this.state.visibleDialogEditProfile}
                                onDismiss={this._hideDialogEditProfile}>
                                <Dialog.Title style={{ alignSelf: 'center' }}>Error al querer cambiar la contraseña</Dialog.Title>
                                <Dialog.Actions>
                                    <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogEditProfile}>Ok</Button>
                                </Dialog.Actions>
                            </Dialog>

                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.APP_MAIN,
        marginTop: sizes.hp('10%'),
        alignSelf: 'stretch'
    },
    headerContent: {
        padding: 50,
        alignItems: 'center',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: sizes.hp('30%'),

    },
    modalView: {
        marginTop: sizes.hp('10%'),
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
        //backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    signupText: {
        //fontFamily: "",
        color: "#E1454A",
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