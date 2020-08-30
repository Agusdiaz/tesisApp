import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { appStyles, colors, sizes, productCondition, productType } from '../../../index.styles';
import { Button, Dialog, TextInput, Modal, Portal, ActivityIndicator } from 'react-native-paper'
import { RadioButton, Select } from 'material-bread'
import { Actions } from 'react-native-router-flux';
import ListIngredients from './listIngredients'
import UserActions from '../../../redux/authState/action'
import { createProduct } from '../../../api/menus'

class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleDialogFinish: false,
            visibleModalIngredients: false,
            visibleDialogResponse: false,
            ingredients: [],
            name: '',
            details: '',
            price: '',
            checkedCondition: 0,
            checkedType: 0,
            nameError: false,
            loading: false,
            actionMessage: '',
            isSelectivo: 0,
            tope: null,
        }
    }

    async createProduct() {
        this.setState({ loading: true })
        const conditions = [null, productCondition.VEGAN, productCondition.VEGETARIAN, productCondition.CELIAC]
        const types = [productType.SALTY, productType.SWEET, productType.DRINK]
        var response = {
            cuit: this.props.shop.cuit,
            producto: {
                nombre: this.state.name,
                precio: parseFloat(this.state.price),
                detalle: (this.state.details.trim() === "") ? null : this.state.details,
                condicion: conditions[this.state.checkedCondition],
                tipo: types[this.state.checkedType],
                selectivo: this.state.isSelectivo
            }
        }
        if (this.state.ingredients.length > 0) {
            response.producto.ingredientes = this.state.ingredients
            response.tope = this.state.tope
        }
        const data = await createProduct(response, this.props.shop.token)
        if(data.status === 500 && data.body.error){
            this.setState({ loading: false })
            this.props.logout()
            Actions.logsign({visible: true})
        } else if (data.status === 500) {
            this.setState({ loading: false, actionMessage: 'Error al crear producto. Inténtelo nuevamente' })
            this._showDialogResponse()
        } else if (data.status === 401) {
            this.setState({ loading: false, actionMessage: 'Ya existe un producto con ese nombre', name: '' })
            this._showDialogResponse()
        } else {
            this.setState({ loading: false, actionMessage: data.body })
            this._showDialogResponse()
            if(this.props.rute === 'shop') this.props.onRefreshChilds()
            Actions.pop()
        }
    }

    addIngredient = (item) => {
        this.setState(prevState => ({
            ingredients: [...prevState.ingredients, item]
        }))
    }

    removeIngredient = (index) => {
        this.setState(prevState => ({
            ingredients: [...prevState.ingredients.slice(0, index), ...prevState.ingredients.slice(index + 1)]
        }))
    }

    isIngredientNameRepeated = (name) => {
        var i = this.state.ingredients.findIndex(x => x.nombre === name)
        if (i === -1 ) return false
        else return true
    }   

    changeSelectiveAndTop = (tope, selectivo) => {
        this.setState({ tope: tope, isSelectivo: selectivo })
    }

    _showDialogFinish = () => this.setState({ visibleDialogFinish: true });
    _hideDialogFinish = () => this.setState({ visibleDialogFinish: false });

    _showDialogResponse = () => this.setState({ visibleDialogResponse: true });
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false });

    _showModalIngredients = () => this.setState({ visibleModalIngredients: true });
    _hideModalIngredients = () => this.setState({ visibleModalIngredients: false });

    validateEmptyText(text) {
        if (text.trim() === "")
            this.setState(() => ({ nameError: true, name: text }))
        else this.setState(() => ({ nameError: false, name: text }))
    }

    validateNumber = (number) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < number.length; i++) {
            if (numbers.indexOf(number[i]) > -1) {
                newText = newText + number[i]
                this.setState({ price: number.toString() })
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if (number.length === 0) {
            this.setState({ price: '' })
        }
    }

    validateTextLength(text){
        if(text.length > 100)
            Alert.alert('Texto demasiado largo')
        else this.setState({details: text})
    }

    render() {
        return (
            <View style={appStyles.container}>

                <Text style={styles.titleText}>Creá tu producto</Text>
                <View style={{ alignItems: 'center', height: sizes.hp('70%'), position: 'absolute', }}>
                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='Nombre del Producto'
                        placeholder="Nombre"
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
                        numberOfLines={5}
                        placeholder='Detalles'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(text) => this.validateTextLength(text)}
                        value={this.state.details} />

                    <TextInput
                        style={styles.inputView}
                        mode='outlined'
                        label='Precio del Producto'
                        placeholder='$'
                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                        onChangeText={(price) => this.validateNumber(price)}
                        value={this.state.price} />

                    <Text style={[styles.questionText, { marginTop: sizes.hp('2%'), }]}> ¿Tiene tu producto alguna condición especial? </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedCondition === 0}
                            onPress={() => this.setState({ checkedCondition: 0 })}
                            label='No'
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedCondition === 1}
                            onPress={() => this.setState({ checkedCondition: 1 })}
                            label='Vegano'
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedCondition === 2}
                            onPress={() => this.setState({ checkedCondition: 2 })}
                            label='Vegetariano'
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedCondition === 3}
                            onPress={() => this.setState({ checkedCondition: 3 })}
                            label='Celíaco'
                        />
                    </View>

                    <Text style={styles.questionText}> ¿Dónde clasifica tu producto? </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedType === 0}
                            onPress={() => this.setState({ checkedType: 0 })}
                            label='Salado'
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedType === 1}
                            onPress={() => this.setState({ checkedType: 1 })}
                            label='Dulce'
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={this.state.checkedType === 2}
                            onPress={() => this.setState({ checkedType: 2 })}
                            label='Bebida'
                        />
                    </View>

                    <View style={{ alignItems: 'center', top: sizes.hp('5%') }}>
                        <Button
                            style={{ width: sizes.wp('55%') }}
                            mode="contained"
                            color={colors.APP_MAIN}
                            onPress={this._showModalIngredients}>
                            Agregar Ingredientes
 				                </Button>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', top: sizes.hp('35%'), }}>
                    <Button
                        style={{ marginRight: sizes.wp('18%'), width: sizes.wp('35%') }}
                        icon="close"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => Actions.pop()}>
                        Cancelar
 				</Button>

                    <Button
                        style={{ width: sizes.wp('35%') }}
                        icon="plus"
                        mode="contained"
                        color={colors.APP_MAIN}
                        disabled={this.state.name === '' || this.state.price === ''}
                        onPress={this._showDialogFinish}>
                        Crear
 				</Button>
                </View>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogFinish}
                        onDismiss={this._hideDialogFinish}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Desea crear el producto?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ left: sizes.wp('-12%') }} color={colors.APP_RED} onPress={this._hideDialogFinish}>No</Button>
                            <Button color={colors.APP_GREEN} onPress={() => { this._hideDialogFinish(), this.createProduct() }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalIngredients} dismissable={false}>
                        <ListIngredients hideModalFromChild={this._hideModalIngredients} ingredients={this.state.ingredients}
                            addIngredient={this.addIngredient} removeIngredient={this.removeIngredient} isIngredientNameRepeated={this.isIngredientNameRepeated}
                            changeState={this.changeSelectiveAndTop} tope={this.state.tope} selectivo={this.state.isSelectivo}/>
                    </Modal>

                    <Modal dismissable={false}
                        visible={this.state.loading} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
                    </Modal>

                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: "bold",
        textAlign: "center",
        top: sizes.hp('-37%'),
        padding: 12,
    },
    inputView: {
        width: sizes.wp('80%'),
        height: sizes.hp('5%'),
        marginTop: sizes.hp('0%'),
        marginBottom: sizes.hp('1%'),
        justifyContent: "center",
        padding: 5,
        fontSize: sizes.TEXT_INPUT,
    },
    viewRadioButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: sizes.hp('2%'),
    },
    questionText: {
        fontSize: 16,
        textAlign: "center",
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);