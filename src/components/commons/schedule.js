import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { DataTable, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Portal, Modal, ActivityIndicator, Dialog } from 'react-native-paper';
import EditDaySchedule from './editDaySchedule'

class ScheduleDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleModalEditSchedule: false,
            daySelected: null,
            loading: false,
            actionMessage: '',
        }
        this.updateIsLoading = this.updateIsLoading.bind(this)
        this._showDialogResponse = this._showDialogResponse.bind(this)
        this.updatePropsSchedule = this.updatePropsSchedule.bind(this)
    }

    updateIsLoading(value) {
        this.setState({ loading: value })
    }

    _showDialogResponse(message) {
        this.setState({ visibleDialogResponse: true, actionMessage: message })
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' });

    _showModalEditSchedule = () => this.setState({ visibleModalEditSchedule: true });
    _hideModalEditSchedule = () => this.setState({ visibleModalEditSchedule: false });

    updatePropsSchedule(schedule) {
        this.props.data.filter(x => x.id === this.state.daySelected)[0].horas = schedule
    }

    render() {
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={() => this.props.hideModalFromChild()}
        />

        const openClose = props => (this.props.shop.abierto === 1) ? <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} >
            Abierto </Button> : <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }}>Cerrado </Button>

        return (
            <Card style={styles.scheduleCard}>
                {(this.props.rute === 'shop') ?
                    <Card.Title style={{ margin: -10, marginTop: sizes.hp('-3') }} left={openClose} leftStyle={{}} right={Close} rigthStyle={styles.close} />
                    :
                    <Card.Title style={{ margin: -10, marginTop: sizes.hp('-3') }} right={Close} rigthStyle={styles.close} />
                }
                <Divider />
                <Card.Title title='Estos son los horarios:' titleStyle={styles.title} />
                <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('100%') }}>
                    <DataTableRow >
                        <DataTableCell text={'DÍA'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '20%' }} minWidth={130} />
                        <DataTableCell text={'HORAS'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '20%' }} minWidth={140} />
                        {(this.props.rute === 'editShop' || this.props.rute === 'editPromo') ?
                            <DataTableCell text={''} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '12%' }} minWidth={120} />
                            : null}
                    </DataTableRow>

                    <ScrollView style={{ height: sizes.hp('31%') }}>
                        {this.props.data.map(row =>
                                < DataTableRow key={row.id} style={{}} >
                                    <DataTableCell text={row.dia} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '20%' }} minWidth={130} />
                                    <DataTableCell text={(row.horas.length > 0) ? row.horas : '----------------'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '20%', alignSelf: 'center' }} minWidth={140} />
                                    {(this.props.rute === 'editShop' || this.props.rute === 'editPromo') ?
                                        <DataTableCell text={'Modificar'} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: colors.APP_GREEN, textDecorationLine: 'underline' }}
                                            style={{ maxWidth: '12%', alignSelf: 'center' }} minWidth={120} onPress={() => { this.setState({ daySelected: row.id }), this._showModalEditSchedule() }} />
                                        : null}
                                </DataTableRow>
                            )
                        }
                    </ScrollView>
                </DataTable>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEditSchedule} dismissable={false}>
                        <EditDaySchedule hideModalFromChild={this._hideModalEditSchedule} day={this.state.daySelected}
                            rute={this.props.rute} updateLoading={this.updateIsLoading} showDialogResponse={this._showDialogResponse}
                            data={this.props.data.filter(x => x.id === this.state.daySelected)}
                            id={this.props.id} updatePropsSchedule={this.updatePropsSchedule}/>
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
    scheduleCard: {
        height: sizes.hp('50%'),
        width: sizes.wp('80%'),
        elevation: 0
    },
    close: {
        left: sizes.wp('-2%')
    },
    condition: {
        right: sizes.wp('7%')
    },
    image: {
        width: sizes.wp('86%'),
        height: sizes.hp('17%'),
        alignSelf: 'center',
        borderRadius: 5
    },
    leftSide: {
        marginLeft: sizes.wp('-1%'),
        marginTop: sizes.hp('5.2%'),
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 6,
        fontSize: 20,
    },
    details: {
        width: sizes.wp('76%'),
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});

const mapStateToProps = state => {
    return {
        shop: state.authState.shop,
    }
}


export default connect(mapStateToProps)(ScheduleDetails);