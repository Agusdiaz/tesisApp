import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Dialog, IconButton, Modal, Portal, ActivityIndicator } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { DataTable, DataTableCell, DataTableRow } from 'material-bread'
import EditSchedule from '../../commons/editDaySchedule'
import { Actions } from 'react-native-router-flux';

class SignUpShopScheduleScreen extends Component {

    constructor() {
        super();
        this.state = {
            visibleDialogFinish: false,
            visibleModalEditSchedule: false,
            daySelected: null,
            loading: false,
            actionMessage: '',
        }
        this.updateIsLoading = this.updateIsLoading.bind(this)
        this._showDialogResponse = this._showDialogResponse.bind(this)
    }

    updateIsLoading(value) {
        this.setState({ loading: value })
    }

    _showDialogResponse(message) {
        this.setState({ visibleDialogResponse: true, actionMessage: message })
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' });

    _showDialogFinish = () => this.setState({ visibleDialogFinish: true });
    _hideDialogFinish = () => this.setState({ visibleDialogFinish: false });

    _showModalEditSchedule = () => this.setState({ visibleModalEditSchedule: true });
    _hideModalEditSchedule = () => this.setState({ visibleModalEditSchedule: false });

    render() {
        return (
            <View style={appStyles.container}>

                <IconButton
                    style={{ left: sizes.wp('-40%'), top: sizes.hp('-8%') }}
                    icon='chevron-left'
                    color={colors.APP_MAIN}
                    size={40}
                    onPress={() => Actions.signupshopfeatures()} />

                <Text style={styles.titleText}> Ingresá los horarios de tu local </Text>

                <View style={{width: sizes.wp('90%'), height: sizes.hp('50%'), top: sizes.hp('-2%')}}>
                    <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('90%') }}>
                        <DataTableRow >
                            <DataTableCell text={''} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '12%' }} minWidth={120} />
                            <DataTableCell text={'DÍA'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '15%' }} minWidth={105}/>
                            <DataTableCell text={'HORAS'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '40%' }} minWidth={150} />
                        </DataTableRow>

                        <ScrollView style={{ height: sizes.hp('35%') }}>
                            {this.props.shop.horarios[0].map(row =>
                                < DataTableRow key={row.id} style={{}} >
                                    <DataTableCell text={'Modificar'} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: colors.APP_GREEN, textDecorationLine: 'underline' }}
                                        style={{ maxWidth: '12%', alignSelf: 'center' }} minWidth={120} onPress={() => { this.setState({ daySelected: row.id }), this._showModalEditSchedule() }} />
                                    <DataTableCell text={row.dia} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '15%' }} minWidth={105}/>
                                    <DataTableCell text={(row.horas.length > 0) ? row.horas : 'CERRADO'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '40%', alignSelf: 'center' }} minWidth={150} />
                                </DataTableRow>
                            )
                            }
                        </ScrollView>
                    </DataTable>
                </View>

                <Button
                    style={{ top: sizes.hp('0%') }}
                    icon="arrow-right-bold-outline"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={this._showDialogFinish}>
                    Continuar
 				</Button>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogFinish}
                        onDismiss={this._hideDialogFinish}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿La información seleccionada es correcta?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogFinish}>Modificar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {this._hideDialogFinish(), Actions.signupshopmenu()}}>Es correcta</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEditSchedule} dismissable={false}>
                        <EditSchedule hideModalFromChild={this._hideModalEditSchedule} day={this.state.daySelected} rute={'editShop'}
                        updateLoading={this.updateIsLoading} showDialogResponse={this._showDialogResponse}/>
                    </Modal>

                    <Modal dismissable={false}
                        visible={this.state.loading}
                        style={styles.modalActivityIndicator} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
                    </Modal>

                    <Dialog
                        style={{ width: sizes.wp('70%'), alignSelf: 'center' }}
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
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: "bold",
        textAlign: "center",
        top: sizes.hp('-5%'),
        padding: 12,
        margin: 12,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpShopScheduleScreen);