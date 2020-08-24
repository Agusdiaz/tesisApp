import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Dialog, IconButton, Portal } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { DataTable, DataTableCell, DataTableRow } from 'material-bread'
import TimePicker from "react-native-24h-timepicker";
import { updateShopSchedule } from '../../../api/shops'

const TimeOpening = TimePicker;
const TimeClosing = TimePicker;

class ProfileShopScheduleScreen extends Component {

    days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

    constructor(props) {
        super(props);
        this.state = {
            timeOpen: '00:00',
            timeClose: '00:00',
            open: false,
            visibleDialog: false,
            schedule: this.props.shop.horarios[0].filter(x => x.id === this.props.day),
            newSchedule: []
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
            <View style={{ maxHeight: sizes.hp('80%') }}>
                <Text style={styles.titleText}> Editá los horarios del {this.days[this.props.day - 1]} </Text>

                <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('70%'), height: sizes.wp('20%'), }}>
                    <ScrollView style={{ height: sizes.hp('20%') }}>
                        < DataTableRow key={this.state.schedule[0].id} style={{}} >
                            <DataTableCell text={'Tus horarios actualmente'} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '40%' }} />
                            <DataTableCell text={(this.state.schedule[0].horas.length > 0) ? this.state.schedule[0].horas : 'CERRADO'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '40%', alignSelf: 'center' }} minWidth={150} />
                        </DataTableRow>
                    </ScrollView>
                </DataTable>

                <Text style={styles.subtitleText}> Ingresá tus nuevos horarios </Text>

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
    subtitleText: {
        color: colors.APP_MAIN,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        //top: sizes.hp('-1.5%'),
        //padding: 12,
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

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShopScheduleScreen);