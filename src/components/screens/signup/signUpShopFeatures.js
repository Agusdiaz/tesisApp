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
            pets: '',
            checkedPets: 1,
            kids: '',
            checkedKids: 1,
            games: '',
            checkedGames: 1,
            outside: '',
            checkedOutside: 1,
            smoking: '',
            checkedSmoking: 1,
            wifi: '',
            checkedWifi: 1,
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
                
                <View style={{width: '93%', alignSelf: 'center', top: sizes.hp('3%')}}>
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
                        checked={this.state.checkedPets == 1}
                        onPress={() => this.setState({ checkedPets: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedPets == 2}
                        onPress={() => this.setState({ checkedPets: 2 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local dispone de entretenimiento para niños? </Text>
                <View style={styles.viewRadioButtons}>
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedKids == 1}
                        onPress={() => this.setState({ checkedKids: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedKids == 2}
                        onPress={() => this.setState({ checkedKids: 2 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local dispone de juegos/arcade para los clientes? </Text>
                <View style={styles.viewRadioButtons}>
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedGames == 1}
                        onPress={() => this.setState({ checkedGames: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedGames == 2}
                        onPress={() => this.setState({ checkedGames: 2 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local dispone de espacio al aire libre? </Text>
                <View style={styles.viewRadioButtons}>
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedOutside == 1}
                        onPress={() => this.setState({ checkedOutside: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedOutside == 2}
                        onPress={() => this.setState({ checkedOutside: 2 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local es libre de humo? </Text>
                <View style={styles.viewRadioButtons}>
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedSmoking == 1}
                        onPress={() => this.setState({ checkedSmoking: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedSmoking == 2}
                        onPress={() => this.setState({ checkedSmoking: 2 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local dispone de wifi para los clientes? </Text>
                <View style={styles.viewRadioButtons}>
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedWifi == 1}
                        onPress={() => this.setState({ checkedWifi: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedWifi == 2}
                        onPress={() => this.setState({ checkedWifi: 2 })}
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