import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Button, Dialog, Modal, Portal, } from 'react-native-paper';
import { Tabs, Tab, RadioButton } from 'material-bread';
import ShopCard from '../../commons/shopCard'
import { Actions } from 'react-native-router-flux';

const uriImageBckg = '../../../icons/forks.jpg'

export default class ProfileShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { //IMAGENES?
            selectedTab: 0,
            //pets: '',
            checkedPets: true,
            //kids: '',
            checkedKids: true,
            //games: '',
            checkedGames: true,
            //outside: '',
            checkedOutside: true,
            //smoking: '',
            checkedSmoking: true,
            //wifi: '',
            checkedWifi: true,
            visibleDialogSessionOut: false,
            visibleModalEdit: false
        }
    }

    _showDialogSessionOut = () => this.setState({ visibleDialogSessionOut: true });
    _hideDialogSessionOut = () => this.setState({ visibleDialogSessionOut: false });

    _showModalEdit = () => this.setState({ visibleModalEdit: true });
    _hideModalEdit = () => this.setState({ visibleModalEdit: false });

    render() {


        return (
            <View style={appStyles.container}>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_MAIN}
                    scrollEnabled
                    actionItems={[
                        <Tab key={1} icon='info' label='Tu Información' />,
                        <Tab key={2} icon='restaurant-menu' label='Tu Menú' />,
                        <Tab key={3} icon='new-releases' label='Tus Promociones' />, //attach-money
                        <Tab key={4} icon='settings' label='Ajustes' />,
                    ]}
                />

                {(this.state.selectedTab === 0) ?
                    <ImageBackground source={require(uriImageBckg)} style={styles.imageOutside} imageStyle={styles.imageInside} >
                        <ShopCard />
                    </ImageBackground>

                    : (this.state.selectedTab === 1) ?
                        <Text>Menu</Text>

                        : (this.state.selectedTab === 2) ?
                            <Text>Promociones</Text>


                            :

                            <ImageBackground source={require(uriImageBckg)} style={styles.imageOutside} imageStyle={styles.imageInside} >

                                <Button
                                    style={styles.buttonStyle}
                                    icon="pencil-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showModalEdit}>
                                    Editar Información
                                </Button>

                                <Button
                                    style={styles.buttonStyle}
                                    icon="logout-variant"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showDialogSessionOut}>
                                    Cerrar Sesión
                                </Button>

                                <Dialog
                                    style={{ top: sizes.hp('-15%') }}
                                    visible={this.state.visibleDialogSessionOut}
                                    onDismiss={this._hideDialogSessionOut}>
                                    <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea cerrar sesión?</Dialog.Title>
                                    <Dialog.Actions>
                                        <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogSessionOut}>Cancelar</Button>
                                        <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Ok</Button>
                                    </Dialog.Actions>
                                </Dialog>

                                <Portal>
                                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEdit} onDismiss={this._hideModalEdit}>
                                        <Text style={styles.titleText}> Cambia las carecterísticas de tu local. </Text>

                                        <Text style={styles.questionText}> ¿Tu local admite la presencia de animales? </Text>
                                        <View style={styles.viewRadioButtons}>
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                labelStyle={styles.options}
                                                checked={this.state.checkedPets}
                                                onPress={() => this.setState({ checkedPets: true })}
                                                label="Sí"
                                            />
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                checked={!this.state.checkedPets}
                                                onPress={() => this.setState({ checkedPets: false })}
                                                label="No"
                                            />
                                        </View>

                                        <Text style={styles.questionText}> ¿Tu local dispone de entretenimiento para niños? </Text>
                                        <View style={styles.viewRadioButtons}>
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                labelStyle={styles.options}
                                                checked={this.state.checkedKids}
                                                onPress={() => this.setState({ checkedKids: true })}
                                                label="Sí"
                                            />
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                checked={!this.state.checkedKids}
                                                onPress={() => this.setState({ checkedKids: false })}
                                                label="No"
                                            />
                                        </View>

                                        <Text style={styles.questionText}> ¿Tu local dispone de juegos/arcade para los clientes? </Text>
                                        <View style={styles.viewRadioButtons}>
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                labelStyle={styles.options}
                                                checked={this.state.checkedGames}
                                                onPress={() => this.setState({ checkedGames: true })}
                                                label="Sí"
                                            />
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                checked={!this.state.checkedGames}
                                                onPress={() => this.setState({ checkedGames: false })}
                                                label="No"
                                            />
                                        </View>

                                        <Text style={styles.questionText}> ¿Tu local dispone de espacio al aire libre? </Text>
                                        <View style={styles.viewRadioButtons}>
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                labelStyle={styles.options}
                                                checked={this.state.checkedOutside}
                                                onPress={() => this.setState({ checkedOutside: true })}
                                                label="Sí"
                                            />
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                checked={!this.state.checkedOutside}
                                                onPress={() => this.setState({ checkedOutside: false })}
                                                label="No"
                                            />
                                        </View>

                                        <Text style={styles.questionText}> ¿Tu local es libre de humo? </Text>
                                        <View style={styles.viewRadioButtons}>
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                labelStyle={styles.options}
                                                checked={this.state.checkedSmoking}
                                                onPress={() => this.setState({ checkedSmoking: true })}
                                                label="Sí"
                                            />
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                checked={!this.state.checkedSmoking}
                                                onPress={() => this.setState({ checkedSmoking: false })}
                                                label="No"
                                            />
                                        </View>

                                        <Text style={styles.questionText}> ¿Tu local dispone de wifi para los clientes? </Text>
                                        <View style={styles.viewRadioButtons}>
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                labelStyle={styles.options}
                                                checked={this.state.checkedWifi}
                                                onPress={() => this.setState({ checkedWifi: true })}
                                                label="Sí"
                                            />
                                            <RadioButton
                                                radioButtonColor={colors.APP_MAIN}
                                                rippleColor={colors.APP_MAIN}
                                                checked={!this.state.checkedWifi}
                                                onPress={() => this.setState({ checkedWifi: false })}
                                                label="No"
                                            />
                                        </View>

                                        <View style={{ flexDirection: "row", marginTop: sizes.wp('1%') }}>
                                            <Button
                                                style={{ margin: sizes.hp('1%'), width: '42%', marginRight: sizes.wp('10%') }}
                                                icon="close-outline"
                                                mode="contained"
                                                color={colors.APP_MAIN}
                                                onPress={this._hideModalEdit}>
                                                Cancelar
                            </Button>

                                            <Button
                                                style={{ margin: sizes.hp('1%'), width: '42%', }}
                                                icon="check-outline"
                                                mode="contained"
                                                color={colors.APP_MAIN}
                                                onPress={this._hideModalEdit}>
                                                Confirmar
                            </Button>
                                        </View>
                                    </Modal>
                                </Portal>
                            </ImageBackground>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    appBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: sizes.hp('5%'),

    },
    imageOutside: {
        alignItems: 'center',
        resizeMode: 'contain',
        width: sizes.wp('100%'),
        height: sizes.hp('100%'),
        marginTop: sizes.hp('38.1%')
    },
    imageInside: {
        opacity: 0.75,
    },
    modalView: {
        marginTop: sizes.hp('0%'),
        margin: sizes.hp('2%'),
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
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
    buttonStyle: {
        marginTop: sizes.hp('18%'),
        width: sizes.wp('55%'),
        height: sizes.hp('5%'),
        justifyContent: 'center'
    },
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    viewRadioButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    questionText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: sizes.hp('1.5%')
    },
    options: {
        marginRight: sizes.wp('6%')
    },
});
