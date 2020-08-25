import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { colors, sizes } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow, RadioButton } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, TextInput } from 'react-native-paper';

class CreateIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            details: '',
            amount: '',
            checkedOption: 0,
            nameError: false,
        }
        this.addIngredient = this.addIngredient.bind(this);
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    addIngredient() {
        const options = [null, 0, 1]
        var ingredient = {
            nombre: this.state.name,
            detalle: (this.state.details.trim() === "") ? null : this.state.details,
            cantidad: (this.state.amount === '') ? null : parseInt(this.state.amount),
            opcion: options[this.state.checkedOption]
        }
        this.props.addIngredient(ingredient)
    }

    validateEmptyText(text, place) {
        if (text.trim() === "")
            this.setState(() => ({ nameError: true, name: text }))
        else
            this.setState(() => ({ nameError: false, name: text }))
    }

    validateNumber = (number) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < number.length; i++) {
            if (numbers.indexOf(number[i]) > -1) {
                newText = newText + number[i]
                this.setState({ amount: number.toString() })
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if (number.length === 0) {
            this.setState({ amount: '' })
        }
    }

    render() {

        return (
            <Card style={styles.ingredientCard}>
                <Card.Title title='Creá un ingrediente' style={{ alignSelf: 'center', }} titleStyle={styles.titleText} />
                <Divider />
                <Card.Content style={{ alignItems: 'center',}}>
                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='Nombre del Ingrediente'
                        placeholder="Nombre"
                        error={this.state.nameError}
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={text => this.validateEmptyText(text)}
                        value={this.state.name}
                    />

                    <TextInput
                        style={[styles.inputView, { height: sizes.hp('10%') }]}
                        mode='outlined'
                        label='Detalles del Ingrediente'
                        multiline
                        numberOfLines={5}
                        placeholder='Detalles'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(text) => this.setState({ details: text })}
                        value={this.state.details} />

                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='Cantidad del Ingrediente'
                        placeholder='Cantidad'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(price) => this.validateNumber(price)}
                        value={this.state.price} />

                    <Text style={styles.questionText}> Este ingrediente .... </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedOption === 0}
                            onPress={() => this.setState({ checkedOption: 0 })}
                            label='No se puede eliminar del producto'
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedOption === 1}
                            onPress={() => this.setState({ checkedOption: 1 })}
                            label='Se puede eliminar del producto'
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedOption === 2}
                            onPress={() => this.setState({ checkedOption: 2 })}
                            label='Se puede agregar al producto'
                        />
                    </View>
                </Card.Content>
                <Divider />
                <Card.Actions style={{ justifyContent: 'space-between', margin: 5, marginBottom: sizes.hp('-1%') }}>
                    <Button
                        style={{}}
                        icon="close"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={this.hideModal}>
                        Cancelar
 				</Button>

                    <Button
                        style={{}}
                        icon="plus"
                        mode="contained"
                        color={colors.APP_MAIN}
                        disabled={this.state.name === ''}
                        onPress={() => { this.hideModal(), this.addIngredient() }}>
                        Crear
 				</Button>
                </Card.Actions>
            </Card >
        )
    }
}

const styles = StyleSheet.create({
    ingredientCard: {
        width: sizes.wp('90%'),
        elevation: 0
    },
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputView: {
        width: sizes.wp('70%'),
        height: sizes.hp('5%'),
        marginBottom: sizes.hp('1%'),
        justifyContent: "center",
        padding: 5,
        fontSize: sizes.TEXT_INPUT,
    },
    viewRadioButtons: {
        flexWrap: 'wrap',
        marginBottom: sizes.hp('2%'),
    },
    questionText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: sizes.hp('2%'),
    },
    options: {
        marginLeft: sizes.wp('0.5%'),
    },
});

export default CreateIngredient;