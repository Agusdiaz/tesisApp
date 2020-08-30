import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Dialog, Modal, Portal, ActivityIndicator } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../index.styles';
import { DataTable, DataTableCell, DataTableRow } from 'material-bread'
import TimePicker from "react-native-24h-timepicker";
import ShopActions from '../../redux/authState/action'
import { updateShopSchedule } from '../../api/shops'
import { updatePromoHours } from '../../api/promos'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../redux/authState/action'

const TimeOpening = TimePicker;
const TimeClosing = TimePicker;

class EditDaySchedule extends Component {

    days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

    constructor(props) {
        super(props);
        this.state = {
            newSchedule: [],
            timeOpen: '00:00',
            timeClose: '00:00',
            visibleDialogFinish: false,
            visibleDialogExtends: false,
            schedule: (this.props.rute === 'editPromo') ? this.props.data
            : this.props.shop.horarios[0].filter(x => x.id === this.props.day),
        }
    }

    async updateSchedule() {
        if (this.props.rute === 'editShop') {
            this.props.updateLoading(true)
            var response = {
                cuit: this.props.shop.cuit,
                diaSemana: this.props.day,
                horas: this.state.newSchedule,
            }
            const data = await updateShopSchedule(response, this.props.shop.token)
            if(data.status === 500 && data.body.error){
                this.props.logout()
                Actions.logsign({visible: true})
            } else if (data.status === 500 || data.status === 404) {
                this.props.updateLoading(false)
                this.props.showDialogResponse(data.body)
            } else {
                this.hideModal()
                this.props.updateLoading(false)
                this.props.showDialogResponse(data.body)
                var hours = ''
                this.state.newSchedule.map(obj => {
                    hours += obj.horaAbre + ' - ' + obj.horaCierra + '\n'
                })
                this.props.updateShopSchedule(hours, this.props.day, 1)
            }
        } else if(this.props.rute === 'editPromo'){
            this.props.updateLoading(true)
            var response = {
                idPromo: this.props.id,
                diaSemana: this.props.day,
                horas: this.state.newSchedule,
            }
            const data = await updatePromoHours(response, this.props.shop.token)
            if(data.status === 500 && data.body.error){
                this.props.logout()
                Actions.logsign({visible: true})
            } else if (data.status === 500 || data.status === 404) {
                this.props.updateLoading(false)
                this.props.showDialogResponse(data.body)
            } else {
                var hours = ''
                this.state.newSchedule.map(obj => {
                    hours += obj.horaAbre + ' - ' + obj.horaCierra + '\n'
                })
                this.props.updatePropsSchedule(hours)
                this.hideModal()
                this.props.updateLoading(false)
                this.props.showDialogResponse(data.body)
            }
        }
    }

    _showDialogFinish = () => this.setState({ visibleDialogFinish: true });
    _hideDialogFinish = () => this.setState({ visibleDialogFinish: false });

    _showDialogExtends = () => this.setState({ visibleDialogExtends: true });
    _hideDialogExtends = () => this.setState({ visibleDialogExtends: false });

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    addHours(ext) {
        var time = {
            horaAbre: this.state.timeOpen,
            horaCierra: this.state.timeClose,
            horaExtendida: ext,
        }
        this.setState(prevState => ({
            newSchedule: [...prevState.newSchedule, time]
        }))
        this.setState({ timeOpen: '00:00', timeClose: '00:00' });
    }

    removeHours(index) {
        this.setState(prevState => ({
            newSchedule: [...prevState.newSchedule.slice(0, index), ...prevState.newSchedule.slice(index + 1)]
        }))
    }

    onCancel() {
        this.TimeOpening.close();
        this.TimeClosing.close();
    }

    onConfirmOpening(hour, minute) {
        this.setState({ timeOpen: (hour.length === 1) ? `0${hour}:${minute}` : `${hour}:${minute}` });
        this.TimeOpening.close();
    }

    onConfirmClosing(hour, minute) {
        this.setState({ timeClose: (hour.length === 1) ? `0${hour}:${minute}` : `${hour}:${minute}` }, this._showDialogExtends);
        this.TimeClosing.close();
    }

    render() {
        return (
            <View style={{ height: sizes.hp('78%'), width: sizes.wp('90%'), margin: 5 }}>
                <Text style={styles.titleText}> Editá los horarios del {this.days[this.props.day - 1]} </Text>

                <View style={{ height: sizes.wp('20%') }}>
                    <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('70%'), }}>
                        <ScrollView style={{ height: sizes.hp('20%') }}>
                            <DataTableRow key={this.state.schedule[0].id} style={{}} >
                                <DataTableCell text={'Tus horarios actualmente'} borderRight textStyle={{ textAlign: 'center', fontSize: 14 }} style={{ maxWidth: '15%' }} minWidth={150} />
                                <DataTableCell text={(this.state.schedule[0].horas.length > 0) ? this.state.schedule[0].horas : 
                                    (this.props.rute === 'editShop') ? 'CERRADO' : 'NO VÁLIDA'} textStyle={{ textAlign: 'center', fontSize: 14 }} style={{ maxWidth: '40%', alignSelf: 'center' }} minWidth={190} />
                            </DataTableRow>
                        </ScrollView>
                    </DataTable>
                </View>

                <Text style={styles.subtitleText}> Ingresá tus nuevos horarios: </Text>

                <View style={styles.whenOpen}>
                    <Text style={styles.text}>Desde: </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ day: 5 })
                            this.TimeOpening.open()
                        }}>
                        <View style={styles.borderText}>
                            <Text style={styles.text}>{this.state.timeOpen}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.text}>Hasta: </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ day: 5 })
                            this.TimeClosing.open()
                        }}>

                        <View style={styles.borderText}>
                            <Text style={styles.text}>{this.state.timeClose}</Text>
                        </View>

                    </TouchableOpacity>
                </View>

                <View style={{ height: sizes.wp('72%') }}>
                    <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('70%'), }}>
                        <DataTableRow style={{}}>
                            <DataTableCell text={'Tus nuevos horarios'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14 }} />
                        </DataTableRow>
                        <ScrollView style={{ height: sizes.hp('85%') }}>
                            {(this.state.newSchedule.length > 0) ?
                                this.state.newSchedule.map((row, i) =>
                                    <DataTableRow key={i} style={{}} >
                                        <DataTableCell text={'Eliminar'} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED, textDecorationLine: 'underline' }}
                                            style={{ maxWidth: '15%', alignSelf: 'center' }} minWidth={150} onPress={() => { this.removeHours(i) }} />
                                        <DataTableCell text={row.horaAbre + ' - ' + row.horaCierra} textStyle={{ textAlign: 'center', fontSize: 14 }} style={{ maxWidth: '40%', alignSelf: 'center' }} minWidth={190} />
                                    </DataTableRow>
                                )
                                : <Text style={{ color: colors.APP_MAIN, fontWeight: 'bold', marginTop: sizes.hp('2%'), alignSelf: 'center' }}>Todavía no cargaste nuevos horarios</Text>}
                        </ScrollView>
                    </DataTable>
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

                <Button
                    style={{ margin: sizes.hp('1%'), }}
                    mode="contained"
                    color={colors.APP_MAIN}
                    disabled={this.state.schedule[0].horas.length === 0}
                    onPress={() => { this._showDialogFinish() }}>
                    Eliminar horarios del día
                    </Button>

                <View style={{ flexDirection: "row", top: sizes.wp('4%') }}>
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
                        disabled={this.state.newSchedule.length === 0}
                        onPress={() => { this._showDialogFinish() }}>
                        Confirmar
                    </Button>
                </View>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogFinish}
                        onDismiss={this._hideDialogFinish}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea modificar los horarios?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogFinish}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialogFinish()
                                this.updateSchedule()
                            }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={this.state.visibleDialogExtends}
                        dismissable={false}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Este horario extiende las 00hs del día siguiente?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('10%') }} color={colors.APP_RED} onPress={() => {
                                this._hideDialogExtends()
                                this.addHours(0)
                            }}>No</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialogExtends()
                                this.addHours(1)
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
    subtitleText: {
        color: colors.APP_MAIN,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    borderText: {
        borderWidth: 1.3,
        borderColor: colors.APP_MAIN,
        borderRadius: 6,
        width: sizes.wp('23%'),
        height: sizes.hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    whenOpen: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: sizes.hp('9%'),
        justifyContent: 'space-between',
        width: sizes.wp('85%'),
    },
})

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateShopSchedule: (hours, id, action) => dispatch(ShopActions.updateShopSchedule(hours, id, action)),
        logout: () => dispatch(UserActions.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDaySchedule);