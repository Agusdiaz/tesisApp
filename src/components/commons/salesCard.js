import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
//import { Card, CardHeader, Avatar, IconButton } from 'material-bread'
import { Card, FAB, Modal, Portal, Button, Dialog, Divider, } from 'react-native-paper';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import TextTicker from 'react-native-text-ticker';
import ProductDetails from '../commons/productDetails'
import { Actions } from 'react-native-router-flux';

class SalesCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Nombre de la Promoción',
            details: 'Detalles de la Promoción',
            total: '700',
            products: [{
                id: 1,
                name: 'Producto 1',
                amount: 2,
            }, {
                id: 2,
                name: 'Producto 2',
                amount: 1,
            }, {
                id: 3,
                name: 'Producto 3',
                amount: 1,
            },],
            //available: true,
            visibleModalDetails: false,
        }
    }

    _showModalDetails = () => this.setState({ visibleModalDetails: true });
    _hideModalDetails = () => this.setState({ visibleModalDetails: false });

    render() {

        const NamePrice = props => <View>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.state.name}</TextTicker>
            <Text style={styles.subtitle}>${this.state.total}</Text>
        </View>

        return (
            <View>
                <Card style={styles.salesCard}>
                <ImageBackground source={require('../../icons/promo.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                    <Card.Title right={NamePrice} rightStyle={styles.rightSide} />
                    </ImageBackground>
                    <Divider />
                    <Card.Content style={{ alignItems: 'center' }}>
                        <Text style={styles.details} numberOfLines={6}>{this.state.details}</Text>
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

                            <ScrollView style={{ height: sizes.hp('16.5%') }}>
                                {this.state.products
                                    .map(row => (
                                        <DataTableRow key={row.id}>
                                            <DataTableCell text={row.name} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '35%' }} />
                                            <DataTableCell text={row.amount.toString()} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '35%' }} />
                                            <DataTableCell text={'VER'} textStyle={{color: colors.APP_MAIN, fontWeight: 'bold'}} onPress={this._showModalDetails} style={{ left: sizes.wp('8%') }}/>
                                        </DataTableRow>
                                    ))}
                            </ScrollView>
                        </DataTable>
                    </Card.Content>

                </Card>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <ProductDetails hideModalFromChild={this._hideModalDetails} />
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
        marginBottom: sizes.hp('1%'),
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
    },
    rightSide: {
        width: sizes.wp('90%'),
        height: sizes.hp('7%'),
        marginRight: sizes.wp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
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