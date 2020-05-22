import React, { Component } from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';
import { Button, Dialog, RadioButton as RadioPaper } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import { RadioButton, Select } from 'material-bread'

class SignUpShopFeaturesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            checkedPets: true,
            checkedKids: true,
            checkedGames: true,
            checkedOutside: true,
            checkedSmoking: true,
            checkedWifi: true,
            visibleDialog: false,
            selectedType: 'Bar/Cervecería',
        }
    }

    _showDialog = () => this.setState({ visibleDialog: true });
    _hideDialog = () => this.setState({ visibleDialog: false });

    render() {
        const types = [
            { id: '1', name: 'Bar/Cervecería' },
            { id: '2', name: 'Hamburguesería/Comida Rápida/Pizzería' },
            { id: '3', name: 'Restaurante/Tenedor Libre/Buffet' },
            { id: '4', name: 'Heladería/Chocolatería' },
            { id: '5', name: 'Confitería/Casa de té/Panadería' },
        ];
        return (
            <View style={appStyles.container}>
                <ArrowButton rute={'logsign'} />

                <Text style={styles.titleText}> ¡Bienvenido! Primero debes seleccionar las carecterísticas de tu local. </Text>

                <View style={{ width: '93%', alignSelf: 'center', top: sizes.hp('3%') }}>
                    <Select
                        buttonStyle={styles.selectList}
                        label={'¿Qué tipo de local sos?'}
                        type={'outlined'}
                        menuItems={types}
                        onSelect={value => this.setState({ selectedType: value.name })}
                        selectedItem={this.state.selectedType}
                        textFieldProps={{
                            borderColor: colors.APP_MAIN,
                            labelColor: '#000',
                            focusedLabelColor: '#000',
                        }}
                    />
                </View>

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

                <Button
                    style={{ top: sizes.hp('3%') }}
                    icon="arrow-right-bold-outline"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={this._showDialog}>
                    Continuar
 				</Button>

                <Dialog
                    visible={this.state.visibleDialog}
                    onDismiss={this._hideDialog}>
                    <Dialog.Title style={{ alignSelf: 'center' }}>¿La información seleccionada es correcta?</Dialog.Title>
                    <Dialog.Actions>
                        <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialog}>Modificar</Button>
                        <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Es correcta</Button>
                    </Dialog.Actions>
                </Dialog>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: "bold",
        textAlign: "center",
        top: sizes.hp('1%'),
        padding: 12,
    },
    selectList: {
        alignItems: 'center',
        marginBottom: sizes.hp('5%'),
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
})

export default SignUpShopFeaturesScreen;