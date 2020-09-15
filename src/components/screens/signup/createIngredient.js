import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { colors, sizes } from '../../../index.styles';
import { RadioButton } from 'material-bread'
import { Card, Dialog, Button, Divider, TextInput, Portal, } from 'react-native-paper';
import { validateIngredientName } from '../../../api/menus'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class CreateIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.selected.name,
            details: this.props.selected.details,
            amount: '',
            price: '',
            checkedOption: 0,
            nameError: false,
            actionMessage: '',
            visibleDialogResponse: false,
        }
        this.addIngredient = this.addIngredient.bind(this);
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    _showDialogResponse = () => this.setState({ visibleDialogResponse: true });
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false });

    async validateIngredientName() {
        const data = await validateIngredientName(this.state.name, this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 401) {
            this.setState({ loading: false, actionMessage: data.body })
            this._showDialogResponse()
        } else if (this.props.isIngredientNameRepeated(this.state.name)) {
            this.setState({ loading: false, actionMessage: 'Ya existe un ingrediente con ese nombre' })
            this._showDialogResponse()
        } else this.addIngredient()
    }

    addIngredient() {
        this.hideModal()
        const options = [null, 0, 1]
        var ingredient = {
            cantidad: (this.state.amount === '') ? null : parseInt(this.state.amount),
            opcion: options[this.state.checkedOption],
            precio: (this.state.price === "") ? null : this.state.price,
        }
        if (this.props.selected.id === null) {
            ingredient.nombre = this.state.name
            ingredient.detalle = (this.state.details.trim() === "") ? null : this.state.details
        } else {
            ingredient.id = this.props.selected.id
            ingredient.nombre = this.props.selected.name
            ingredient.detalle = this.props.selected.details
        }
        this.props.addIngredient(ingredient)
    }

    validateEmptyText(text) {
        if (text.trim() === "")
            this.setState(() => ({ nameError: true, name: text }))
        else if (text.length > 50)
            Alert.alert('Texto demasiado largo')
        else this.setState(() => ({ nameError: false, name: text }))
    }

    validateNumber = (number, place) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < number.length; i++) {
            if (numbers.indexOf(number[i]) > -1) {
                newText = newText + number[i]
                if (place === 0) this.setState({ amount: number.toString() })
                else this.setState({ price: number.toString() })
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if (number.length === 0) {
            if (place === 0) this.setState({ amount: '' })
            else this.setState({ price: '' })
        }
    }

    validateTextLength(text) {
        if (text.length > 100)
            Alert.alert('Texto demasiado largo')
        else this.setState({ details: text })
    }

    render() {

        return (
            <Card style={styles.ingredientCard}>
                <Card.Title title='Creá un ingrediente' style={{ alignSelf: 'center', }} titleStyle={styles.titleText} />
                <Divider />
                <Card.Content style={{ alignItems: 'center', }}>
                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='Nombre del Ingrediente'
                        placeholder="Nombre"
                        disabled={(this.props.selected.id !== null)}
                        error={this.state.nameError}
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={text => this.validateEmptyText(text)}
                        value={this.state.name}
                    />

                    <TextInput
                        style={[styles.inputView, { height: sizes.hp('10%') }]}
                        mode='outlined'
                        label='OPCIONAL - Detalles'
                        multiline
                        disabled={(this.props.selected.id !== null)}
                        numberOfLines={5}
                        placeholder='Detalles'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(text) => this.validateTextLength(text)}
                        value={this.state.details} />

                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='OPCIONAL - Cantidad'
                        placeholder='Cantidad'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(amount) => this.validateNumber(amount, 0)}
                        value={this.state.amount} />

                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='OPCIONAL - Precio'
                        placeholder='$'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(price) => this.validateNumber(price, 1)}
                        value={this.state.price} />

                    <Text style={styles.questionText}> Este ingrediente ... </Text>
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
                        onPress={() => {
                            if (this.props.selected.id !== null)
                                this.addIngredient()
                            else this.validateIngredientName()
                        }}>
                        Agregar
 				</Button>
                </Card.Actions>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
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

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateIngredient);