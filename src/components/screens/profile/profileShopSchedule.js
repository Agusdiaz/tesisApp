import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, Dialog, IconButton, Portal } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import TimePicker from "react-native-24h-timepicker";
import { RadioButton } from 'material-bread'

var TimeOpening = TimePicker;
var TimeClosing = TimePicker;

class ProfileShopScheduleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeSunOpen: '00:00',
            timeSunClose: '00:00',
            openSun: false,
            timeMonOpen: '00:00',
            timeMonClose: '00:00',
            openMon: false,
            timeTueOpen: '00:00',
            timeTueClose: '00:00',
            openTue: false,
            timeWenOpen: '00:00',
            timeWenClose: '00:00',
            openWen: false,
            timeThuOpen: '00:00',
            timeThuClose: '00:00',
            openThu: false,
            timeFriOpen: '00:00',
            timeFriClose: '00:00',
            openFri: false,
            timeSatOpen: '00:00',
            timeSatClose: '00:00',
            openSat: false,
            day: 1,
            visibleDialog: false,
        }
    }

    _showDialog = () => this.setState({ visibleDialog: true });
    _hideDialog = () => this.setState({ visibleDialog: false });

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    onCancel() {
        this.TimeOpening.close();
        this.TimeClosing.close();
    }

    onConfirmOpening(hour, minute) {
        if (this.state.day == 0)
            this.setState({ timeSunOpen: `${hour}:${minute}` });
        if (this.state.day == 1)
            this.setState({ timeMonOpen: `${hour}:${minute}` });
        if (this.state.day == 2)
            this.setState({ timeTueOpen: `${hour}:${minute}` });
        if (this.state.day == 3)
            this.setState({ timeWenOpen: `${hour}:${minute}` });
        if (this.state.day == 4)
            this.setState({ timeThuOpen: `${hour}:${minute}` });
        if (this.state.day == 5)
            this.setState({ timeFriOpen: `${hour}:${minute}` });
        if (this.state.day == 6)
            this.setState({ timeSatOpen: `${hour}:${minute}` });
        this.TimeOpening.close();
    }

    onConfirmClosing(hour, minute) {
        if (this.state.day == 0)
            this.setState({ timeSunClose: `${hour}:${minute}` });
        if (this.state.day == 1)
            this.setState({ timeMonClose: `${hour}:${minute}` });
        if (this.state.day == 2)
            this.setState({ timeTueClose: `${hour}:${minute}` });
        if (this.state.day == 3)
            this.setState({ timeWenClose: `${hour}:${minute}` });
        if (this.state.day == 4)
            this.setState({ timeThuClose: `${hour}:${minute}` });
        if (this.state.day == 5)
            this.setState({ timeFriClose: `${hour}:${minute}` });
        if (this.state.day == 6)
            this.setState({ timeSatClose: `${hour}:${minute}` });
        this.TimeClosing.close();
    }

    render() {

        return (
            <View>
                <Text style={styles.titleText}> Edita los horarios de tu local </Text>

                <View style={{ alignSelf: 'center', top: sizes.hp('-1%'), width: sizes.wp('90%') }}>

                    <Text style={styles.textDays}>Domingo: </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            style={{ marginBottom: sizes.hp('-1%') }}
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={!this.state.openSun}
                            onPress={() => this.setState({ openSun: false })}
                            label="Cerrado"
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            checked={this.state.openSun}
                            onPress={() => this.setState({ openSun: true })}
                            label="Abierto"
                        />
                    </View>

                    {(this.state.openSun) ?
                        <View style={styles.whenOpen}>
                            <Text>Desde </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 0 })
                                    this.TimeOpening.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeSunOpen}</Text>
                            </TouchableOpacity>
                            <Text>Hasta </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 0 })
                                    this.TimeClosing.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeSunClose}</Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    <Text style={styles.textDays}>Lunes: </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            style={{ marginBottom: sizes.hp('-1%') }}
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={!this.state.openMon}
                            onPress={() => this.setState({ openMon: false })}
                            label="Cerrado"
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            checked={this.state.openMon}
                            onPress={() => this.setState({ openMon: true })}
                            label="Abierto"
                        />
                    </View>

                    {(this.state.openMon) ?
                        <View style={styles.whenOpen}>
                            <Text>Desde </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 1 })
                                    this.TimeOpening.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeMonOpen}</Text>
                            </TouchableOpacity>
                            <Text>Hasta </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 1 })
                                    this.TimeClosing.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeMonClose}</Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    <Text style={styles.textDays}>Martes: </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            style={{ marginBottom: sizes.hp('-1%') }}
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={!this.state.openTue}
                            onPress={() => this.setState({ openTue: false })}
                            label="Cerrado"
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            checked={this.state.openTue}
                            onPress={() => this.setState({ openTue: true })}
                            label="Abierto"
                        />
                    </View>

                    {(this.state.openTue) ?
                        <View style={styles.whenOpen}>
                            <Text>Desde </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 2 })
                                    this.TimeOpening.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeTueOpen}</Text>
                            </TouchableOpacity>
                            <Text>Hasta </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 2 })
                                    this.TimeClosing.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeTueClose}</Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    <Text style={styles.textDays}>Miércoles: </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            style={{ marginBottom: sizes.hp('-1%') }}
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={!this.state.openWen}
                            onPress={() => this.setState({ openWen: false })}
                            label="Cerrado"
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            checked={this.state.openWen}
                            onPress={() => this.setState({ openWen: true })}
                            label="Abierto"
                        />
                    </View>

                    {(this.state.openWen) ?
                        <View style={styles.whenOpen}>
                            <Text>Desde </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 3 })
                                    this.TimeOpening.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeWenOpen}</Text>
                            </TouchableOpacity>
                            <Text>Hasta </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 3 })
                                    this.TimeClosing.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeWenClose}</Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    <Text style={styles.textDays}>Jueves: </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            style={{ marginBottom: sizes.hp('-1%') }}
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={!this.state.openThu}
                            onPress={() => this.setState({ openThu: false })}
                            label="Cerrado"
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            checked={this.state.openThu}
                            onPress={() => this.setState({ openThu: true })}
                            label="Abierto"
                        />
                    </View>

                    {(this.state.openThu) ?
                        <View style={styles.whenOpen}>
                            <Text>Desde </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 4 })
                                    this.TimeOpening.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeThuOpen}</Text>
                            </TouchableOpacity>
                            <Text>Hasta </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 4 })
                                    this.TimeClosing.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeThuClose}</Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    <Text style={styles.textDays}>Viernes: </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            style={{ marginBottom: sizes.hp('-1%') }}
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={!this.state.openFri}
                            onPress={() => this.setState({ openFri: false })}
                            label="Cerrado"
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            checked={this.state.openFri}
                            onPress={() => this.setState({ openFri: true })}
                            label="Abierto"
                        />
                    </View>

                    {(this.state.openFri) ?
                        <View style={styles.whenOpen}>
                            <Text>Desde </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 5 })
                                    this.TimeOpening.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeFriOpen}</Text>
                            </TouchableOpacity>
                            <Text>Hasta </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 5 })
                                    this.TimeClosing.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeFriClose}</Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    <Text style={styles.textDays}>Sábado: </Text>
                    <View style={styles.viewRadioButtons}>
                        <RadioButton
                            style={{ marginBottom: sizes.hp('-1%') }}
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            labelStyle={styles.options}
                            checked={!this.state.openSat}
                            onPress={() => this.setState({ openSat: false })}
                            label="Cerrado"
                        />
                        <RadioButton
                            radioButtonColor={colors.APP_MAIN}
                            rippleColor={colors.APP_MAIN}
                            checked={this.state.openSat}
                            onPress={() => this.setState({ openSat: true })}
                            label="Abierto"
                        />
                    </View>

                    {(this.state.openSat) ?
                        <View style={styles.whenOpen}>
                            <Text>Desde </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 6 })
                                    this.TimeOpening.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeSatOpen}</Text>
                            </TouchableOpacity>
                            <Text>Hasta </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ day: 6 })
                                    this.TimeClosing.open()
                                }}>
                                <Text style={styles.textTime}>{this.state.timeSatClose}</Text>
                            </TouchableOpacity>
                        </View>
                        : null}


                </View>

                <TimeOpening
                    ref={ref => {
                        this.TimeOpening = ref;
                    }}
                    textConfirm='Confirmar'
                    textCancel='Cancelar'
                    onCancel={() => this.onCancel()}
                    onConfirm={(hour, minute) => this.onConfirmOpening(hour, minute)}
                />

                <TimeClosing
                    ref={ref => {
                        this.TimeClosing = ref;
                    }}
                    textConfirm='Confirmar'
                    textCancel='Cancelar'
                    onCancel={() => this.onCancel()}
                    onConfirm={(hour, minute) => this.onConfirmClosing(hour, minute)}
                />

                <View style={{ flexDirection: "row", marginTop: sizes.wp('1%') }}>
                    <Button
                        style={{ margin: sizes.hp('1%'), width: '42%', marginRight: sizes.wp('8%') }}
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
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: "bold",
        textAlign: "center",
        top: sizes.hp('-1.5%'),
        padding: 12,
    },
    textDays: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: sizes.hp('-0.5%')
    },
    textTime: {
        borderWidth: 1.3,
        padding: 5,
        borderColor: colors.APP_MAIN,
        borderRadius: 6,
        marginRight: sizes.wp('5%')
    },
    viewRadioButtons: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginLeft: sizes.wp('2%')
    },
    options: {
        marginRight: sizes.wp('1%')
    },
    whenOpen: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: sizes.wp('60%'),
        top: sizes.hp('-6%'),
        right: sizes.wp('-30%'),
        marginBottom: sizes.hp('-3.5%')
    }
})

export default ProfileShopScheduleScreen;