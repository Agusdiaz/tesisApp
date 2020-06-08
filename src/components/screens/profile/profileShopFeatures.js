import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Button, Dialog, Modal, Portal, Menu, } from 'react-native-paper';
import { Tabs, Tab, RadioButton } from 'material-bread';

export default class ProfileShopFeaturesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedPets: true,
            checkedKids: true,
            checkedGames: true,
            checkedOutside: true,
            checkedSmoking: true,
            checkedWifi: true,
            visibleDialog: false,
        }
    }

    _showDialog = () => this.setState({ visibleDialog: true });
    _hideDialog = () => this.setState({ visibleDialog: false });

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    render() {
        return (
            <View>
                <Text style={styles.titleText}> Edita las carecterísticas de tu local </Text>

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
                        onPress={this.hideModal}>
                        Cancelar
                    </Button>

                    <Button
                        style={{ margin: sizes.hp('1%'), width: '42%', }}
                        icon="check-outline"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={this._showDialog}>
                        Confirmar
                    </Button>
                </View>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialog}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea modificar su información?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialog}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialog()
                                this.hideModal()
                            }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    viewRadioButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
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
