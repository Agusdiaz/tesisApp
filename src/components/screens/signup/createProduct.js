import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { appStyles, colors, sizes, productCondition } from '../../../index.styles';
import { Button, Dialog, TextInput } from 'react-native-paper'
import { RadioButton, Select } from 'material-bread'
import { Actions } from 'react-native-router-flux';

class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleDialogFinish: false,
            name: '',
            details: '',
            price: '',
            checkedCondition: 0,
            checkedType: 0,
            nameError: false,
            detailsError: false,
            ingredients: []
        }
    }

    _showDialogFinish = () => this.setState({ visibleDialogFinish: true });
    _hideDialogFinish = () => this.setState({ visibleDialogFinish: false });

    validateEmptyText(text, place) {
        if (text.trim() === "") {
            (place === 0) ? this.setState(() => ({ nameError: true, name: text }))
            : this.setState(() => ({ detailsError: true, details: text }))         
        } else {
            (place === 0) ? this.setState(() => ({ nameError: false, name: text }))
            : this.setState(() => ({ detailsError: false, details: text }))
        }
    }

    validatePrice = (price) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < price.length; i++) {
            if (numbers.indexOf(price[i]) > -1) {
                newText = newText + price[i]
                //if (i === tip.length - 1)
                this.setState({ price: price.toString() })
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if (price.length === 0)
            this.setState({ price: '' })
    }

    render() {
        return (
            <View style={appStyles.container}>

                <Text style={styles.titleText}>Creá tu producto</Text>
                <ScrollView contentContainerStyle={{alignItems: 'center',  top: 30,}}
                style={{height: sizes.hp('75%'), width: sizes.wp('100%'), position: 'absolute', borderWidth: 2}}>
                <TextInput
                    style={styles.inputView}
                    mode='outlined'
                    label='Nombre del Producto'
                    placeholder="Nombre"
                    error={this.state.nameError}
                    theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                    onChangeText={text => this.validateEmptyText(text, 0)}
                    value={this.state.name}
                />

                <TextInput
                    style={[styles.inputView, { height: sizes.hp('10%')}]}
                    mode='outlined'
                    label='Detalles del Producto'
                    multiline
                    numberOfLines={5}
                    placeholder='Detalles'
                    theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                    onChangeText={(text) => this.validateEmptyText(text, 1)}
                    value={this.state.details} />

                <TextInput
                    style={styles.inputView}
                    mode='outlined'
                    label='Precio del Producto'
                    placeholder='$'
                    theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                    onChangeText={(price) => this.validatePrice(price)}
                    value={this.state.price} />

                <Text style={styles.questionText}> ¿Tiene tu producto alguna condición especial? </Text>
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
                </ScrollView>


                <View style={{ flexDirection: 'row', top: sizes.hp('7%') }}>
                    <Button
                        style={{ marginRight: sizes.wp('16%') }}
                        icon="close"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => Actions.signupshopmenu()}>
                        Cancelar
 				</Button>

                    <Button
                        style={{}}
                        icon="plus"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={this._showDialogFinish}>
                        Crear
 				</Button>
                </View>

                <Dialog
                    visible={this.state.visibleDialogFinish}
                    onDismiss={this._hideDialogFinish}>
                    <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Desea crear el producto?</Dialog.Title>
                    <Dialog.Actions>
                        <Button style={{ left: sizes.wp('-12%') }} color={colors.APP_RED} onPress={this._hideDialogFinish}>No</Button>
                        <Button color={colors.APP_GREEN} onPress={() => { Actions.signupshopmenu() }}>Sí</Button>
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
        top: sizes.hp('-15%'),
        padding: 12,
    },
    inputView: {
        width: sizes.wp('80%'),
        height: sizes.hp('5%'),
        top: sizes.hp('-12%'),
        marginBottom: 5,
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
        marginBottom: sizes.hp('1%'),
    },
    options: {
        marginLeft: sizes.wp('0.5%'),
        //justifyContent: 'center',
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);