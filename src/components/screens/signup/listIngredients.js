import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { colors, sizes } from '../../../index.styles';
import { DataTable, DataTableCell, DataTableRow, RadioButton } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, TextInput, Modal, Portal, Dialog } from 'react-native-paper';
import CreateIngredient from './createIngredient'
import ExistentIngredient from './existentIngredient'

class ListIngredients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tope: this.props.tope,
            checkedSelectivo: this.props.selectivo,
            checkedTope: (this.props.tope === null) ? 0 : 1,
            visibleModalIngredients: false,
            visibleModalExistents: false,
            selectedIngredient: {}
        }
        this.removeIngredient = this.removeIngredient.bind(this);
        this.changeSelectiveAndTop = this.changeSelectiveAndTop.bind(this);
    }

    _showModalIngredients = () => this.setState({ visibleModalIngredients: true });
    _hideModalIngredients = () => this.setState({ visibleModalIngredients: false });

    _showModalExistents = () => this.setState({ visibleModalExistents: true });
    _hideModalExistents = () => this.setState({ visibleModalExistents: false });

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    setSelectedIngredient = (id, name, details) => {
        this.state.selectedIngredient = {
            id: id,
            name: name,
            details: details
        }
        this._showModalIngredients()
    }

    removeIngredient(index) {
        this.props.removeIngredient(index)
    }

    changeSelectiveAndTop() {
        this.props.changeState(this.state.tope, this.state.checkedSelectivo)
    }

    validateNumber = (number) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < number.length; i++) {
            if (numbers.indexOf(number[i]) > -1) {
                newText = newText + number[i]
                this.setState({ tope: number.toString() })
            }
            else {
                Alert.alert('Atención', 'Por favor, ingrese solo números');
                break
            }
        }
        if (number.length === 0) {
            this.setState({ tope: '' })
        }
    }

    render() {
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={() => { this.changeSelectiveAndTop(), this.hideModal() }}
        />

        return (
            <Card style={styles.ingredientCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-3') }} right={Close} rightStyle={styles.close} />
                <Divider />
                <Card.Title title='Agregale ingredientes a tu producto' style={{ alignSelf: 'center' }} titleStyle={{ textAlign: 'justify', fontWeight: 'bold' }} />
                <Divider />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, maxHeight: sizes.hp('62%') }}>
                        <Card.Content style={{ alignItems: 'center', marginTop: sizes.hp('2%') }}>
                            <Text style={styles.questionText}> ¿Los ingredientes de tu producto son selectivos? </Text>
                            <View style={styles.viewRadioButtons}>
                                <RadioButton
                                    radioButtonColor={colors.APP_MAIN}
                                    rippleColor={colors.APP_MAIN}
                                    labelStyle={styles.options}
                                    checked={this.state.checkedSelectivo === 0}
                                    onPress={() => this.setState({ checkedSelectivo: 0 })}
                                    label='No'
                                />
                                <RadioButton
                                    radioButtonColor={colors.APP_MAIN}
                                    rippleColor={colors.APP_MAIN}
                                    labelStyle={styles.options}
                                    checked={this.state.checkedSelectivo === 1}
                                    onPress={() => this.setState({ checkedSelectivo: 1 })}
                                    label='Sí'
                                />
                            </View>

                            <Text style={styles.questionText}> ¿Hay un máximo de ingredientes que se pueden agregar? </Text>
                            <View style={styles.viewRadioButtons}>
                                <RadioButton
                                    radioButtonColor={colors.APP_MAIN}
                                    rippleColor={colors.APP_MAIN}
                                    labelStyle={styles.options}
                                    checked={this.state.checkedTope === 0}
                                    onPress={() => this.setState({ checkedTope: 0 })}
                                    label='No'
                                />
                                <RadioButton
                                    radioButtonColor={colors.APP_MAIN}
                                    rippleColor={colors.APP_MAIN}
                                    labelStyle={styles.options}
                                    checked={this.state.checkedTope === 1}
                                    onPress={() => this.setState({ checkedTope: 1 })}
                                    label='Sí'
                                />
                            </View>

                            {(this.state.checkedTope === 1) ?
                                <TextInput
                                    style={styles.inputView}
                                    mode='outlined'
                                    label='Cantidad'
                                    placeholder='Cantidad'
                                    theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                    onChangeText={(tope) => this.validateNumber(tope)}
                                    value={this.state.tope} />
                                : null}
                        </Card.Content>
                        <Divider />
                        <Card.Content style={{ alignItems: 'center', padding: 20, marginBottom: sizes.hp('-2%') }}>
                            <DataTable style={{ marginTop: sizes.wp('0%'), width: sizes.wp('140%') }}>
                                <DataTableRow >
                                    <DataTableCell text={''} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '2%' }} minWidth={85} />
                                    <DataTableCell text={'INGREDIENTES'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '28%' }} />
                                    <DataTableCell text={'Detalle'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '10%' }} minWidth={90} />
                                    <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                    <DataTableCell text={'Precio'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={70} />
                                    <DataTableCell text={'Opcional'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                                </DataTableRow>

                                {(this.props.ingredients.length > 0) ?
                                    this.props.ingredients.map((row, i) =>
                                        < DataTableRow key={i} >
                                            <DataTableCell text={'Eliminar'} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED, textDecorationLine: 'underline' }}
                                                style={{ maxWidth: '2%', alignSelf: 'center' }} minWidth={85} onPress={() => { this.removeIngredient(i) }} />
                                            <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '28%' }} textStyle={{ textAlign: 'center' }} />
                                            <DataTableCell text={(row.detalle) ? row.detalle : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '10%', alignSelf: 'center' }} minWidth={90} />
                                            <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                            <DataTableCell text={(row.precio !== null) ? '$' + (row.precio).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={70} />
                                            <DataTableCell text={(row.opcion === 1) ? 'Agregar' : (row.opcion === 0) ? 'Eliminar' : '-'} textStyle={{
                                                textAlign: 'center', color: (row.opcion === 1) ? colors.APP_GREEN :
                                                    (row.opcion === 0) ? colors.APP_RED : null
                                            }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                        </DataTableRow>
                                    )
                                    :
                                    <DataTableCell text={'Producto sin ingredientes'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                                }

                            </DataTable>
                        </Card.Content>
                    </ScrollView>
                </View>
                <Divider />
                <Card.Actions style={{ justifyContent: 'space-between', margin: 3 }}>
                    <Button
                        style={{}}
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={this._showModalExistents}>
                        Agregar existente
 				</Button>

                    <Button
                        style={{}}
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => { this.setSelectedIngredient(null, '', ''), this._showModalIngredients() }}>
                        Crear nuevo
 				</Button>
                </Card.Actions>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalIngredients} dismissable={false}>
                        <CreateIngredient hideModalFromChild={this._hideModalIngredients} selected={this.state.selectedIngredient}
                            addIngredient={this.props.addIngredient} removeIngredient={this.props.removeIngredient}
                            isIngredientNameRepeated={this.props.isIngredientNameRepeated} />
                    </Modal>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalExistents} dismissable={false}>
                        <ExistentIngredient hideModalFromChild={this._hideModalExistents} setSelected={this.setSelectedIngredient}
                            ingredientsInProduct={this.props.ingredients} />
                    </Modal>
                </Portal>
            </Card >
        )
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
    ingredientCard: {
        height: sizes.hp('82%'),
        width: sizes.wp('90%'),
        elevation: 0
    },
    close: {
        left: sizes.wp('-2%')
    },
    inputView: {
        width: sizes.wp('50%'),
        height: sizes.hp('5%'),
        marginTop: sizes.hp('-2%'),
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
        marginTop: sizes.hp('-1%'),
    },
    options: {
        marginLeft: sizes.wp('0.5%'),
    },
    cell: {
        width: sizes.wp('80%'),
        marginTop: sizes.hp('2%'),
        marginBottom: sizes.hp('2%'),
    },
});

export default ListIngredients;