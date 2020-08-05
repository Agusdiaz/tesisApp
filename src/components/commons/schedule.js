import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, } from 'react-native-paper';

class ScheduleDetails extends Component {

    constructor() {
        super();
        this.state = {
        }
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
                {(this.props.shop.abierto !== undefined) ?
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-3') }} left={openClose} leftStyle={{}} right={Close} rigthStyle={styles.close} />
                :
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-3') }} right={Close} rigthStyle={styles.close} />
                }
                <Divider />
                <Card.Title title='Estos son los horarios:' titleStyle={styles.title} />
                <DataTable style={{ marginTop: sizes.wp('1%'), width: sizes.wp('50%') }}>
                        <DataTableRow >
                            <DataTableCell text={'Día'} type={'header'} borderRight textStyle={{ textAlign: 'center', left: '30%' }} style={{ right:'16.5%'}} />
                            <DataTableCell text={'Horas'} type={'header'} textStyle={{ textAlign: 'center' }} style={{right:'14%' }} />
                        </DataTableRow>

                        <ScrollView style={{ height: sizes.hp('31%') }}>
                                {this.props.data.map(row => 
                                            < DataTableRow key = { row.id } style={{}} >
                                                <DataTableCell text={row.dia} borderRight style={{right:'16.5%'}} textStyle={{textAlign: 'center', left: '30%'}}/>
                                                {(row.horas.length > 0) ?
                                                <DataTableCell text={row.horas} textStyle={{ textAlign: 'center',}} style={{right:'14%'}} />
                                                :
                                                <DataTableCell text={'----------------'} textStyle={{ textAlign: 'center', }} style={{right:'14%' }} />
                                                }
                                        </DataTableRow>
                                        )
                                    }
                        </ScrollView> 
                    </DataTable>
            </Card >
        )
    }
}

const styles = StyleSheet.create({
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
    cell: {
        //borderWidth: 1,
        width: sizes.wp('80%'),
        right: sizes.wp('-3%'),
        marginTop: sizes.hp('2%')
    },
});

const mapStateToProps = state => {
    return {
        shop: state.authState.shop,
    }
}


export default connect(mapStateToProps)(ScheduleDetails);