import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Card, FAB, Modal, Portal, Button, Dialog, Divider } from 'react-native-paper';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import TextTicker from 'react-native-text-ticker';
import ProductDetails from '../commons/productDetails'
import { Actions } from 'react-native-router-flux';
import Schedule from './schedule'

class SalesCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModalDetails: false,
            visibleModalSchedule: false,
            productDetails: [],
        }
    }

    _showModalDetails = () => this.setState({ visibleModalDetails: true });
    _hideModalDetails = () => this.setState({ visibleModalDetails: false });

    _showModalSchedule = () => this.setState({ visibleModalSchedule: true });
    _hideModalSchedule = () => this.setState({ visibleModalSchedule: false });

    render() {
        //console.log(this.props.data.horarios)

        const NamePriceButton = props => <View style={{ width: sizes.wp('50%'), alignItems: 'center' }}>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
            <Text style={styles.subtitle}>${this.props.data.precio}</Text>
            <Button
                style={styles.buttonAvailable}
                labelStyle={{ fontSize: 10, textAlign: 'center' }}
                compact
                mode='contained'
                dark
                onPress={this._showModalSchedule}
                color={(this.props.data.valida === 1) ? colors.APP_GREEN : colors.APP_RED}
            >
                {(this.props.data.valida === 1) ? 'Válida' : 'No válida'}
            </Button>
        </View>

        return (
            <View>
                <Card style={styles.salesCard}>
                    <ImageBackground source={require('../../icons/promo.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                        <Card.Title right={NamePriceButton} rightStyle={styles.rightSide} />
                    </ImageBackground>
                    <Divider />
                    <Card.Content style={{ alignItems: 'center' }}>
                        <Text style={styles.details} numberOfLines={6}>{this.props.data.detalle}</Text>
                        <DataTable style={{ width: sizes.wp('90%'), left: -10 }}>
                            <DataTableHeader
                                title={'¿Que inlcuye la promoción?'}
                                style={{ right: sizes.wp('-15%') }}
                            />
                            <DataTableRow >
                                <DataTableCell text={'Producto'} type={'header'} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '35%' }} />
                                <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '35%' }} />
                                <DataTableCell text={'Detalles'} type={'header'} textStyle={{ textAlign: 'center' }} />
                            </DataTableRow>

                            <ScrollView style={{ maxHeight: sizes.hp('16.5%') }}>
                                {this.props.data.productos[0]
                                    .map(row => (
                                        <DataTableRow key={row.id}>
                                            <DataTableCell text={row.nombre} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '35%' }} />
                                            <DataTableCell text={row.cantidad.toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '35%' }} />
                                            <DataTableCell text={'VER'} textStyle={{ color: colors.APP_MAIN, fontWeight: 'bold' }} onPress={() => {
                                                this.setState({ productDetails: row })
                                                this._showModalDetails()
                                            }} style={{ left: sizes.wp('8%') }} />
                                        </DataTableRow>
                                    ))}
                            </ScrollView>
                        </DataTable>
                    </Card.Content>

                </Card>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <ProductDetails hideModalFromChild={this._hideModalDetails} data={this.state.productDetails} />
                    </Modal>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalSchedule} onDismiss={this._hideModalSchedule}>
                        <Schedule hideModalFromChild={this._hideModalSchedule} data={this.props.data.horarios[0]} />
                    </Modal>
                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    salesCard: {
        width: sizes.wp('100%'),
        marginTop: sizes.hp('1%'),
        elevation: 10,
        borderRadius: 15,
    },
    modalView: {
        marginTop: sizes.hp('5%'),
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
    imageOutside: {
        resizeMode: 'contain',
    },
    imageInside: {
        opacity: 0.48,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    rightSide: {
        height: sizes.hp('7%'),
        marginRight: sizes.wp('28%'),
        alignItems: 'center',
        top: sizes.hp('1%')
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        width: sizes.wp('90%'),
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonAvailable: {
        width: sizes.wp('20%'),
        right: sizes.wp('-41%'),
        top: sizes.hp('-4.4%'),
        fontSize: 5
    },
    fab: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
        width: sizes.wp('10%'),
        height: sizes.hp('4%'),
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
});

export default SalesCard;