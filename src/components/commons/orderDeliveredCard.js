import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, Title, Dialog, IconButton, Divider, FAB, TextInput } from 'react-native-paper';

class OrderDeliveredCard extends Component {
    constructor() {
        super();
        this.state = { //PONER METODO PARA SABER EL ESTADO
            orderNumber: 7856,
            total: '$1500',
            date: '24/03/2020',
        };
    }

    render() {

        const orderNumber = props => <Text style={styles.rightText}> {this.state.orderNumber} </Text>

        const stateOrder = props => <Button style={{ borderRadius: 20, width: sizes.wp('30%'), marginRight: sizes.wp('3%') }} mode="contained" color={colors.APP_DELIVERED} labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
            Entregado </Button>

        const total = props => <Text style={styles.rightText}> {this.state.total} </Text>

        const date = props => <Text style={styles.rightText}> {this.state.date} </Text>

        return (

            <View>
               
            <Card style={styles.cardContent}>
                
                <ImageBackground source={require('../../icons/ticket.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                    
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Número del pedido:" right={orderNumber} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Estado:" right={stateOrder} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Fecha:" right={date} />
                    <Divider style={styles.divider} />
                    <Card.Actions style={{ margin: 5, alignSelf: 'center' }}>

                        <Button
                            style={{ width: '38%' }} //ESTANDARIZAR
                            icon="eye"
                            mode="contained"
                            color={colors.APP_MAIN}
                            onPress={() => { }}>
                            Ver Detalle
                        </Button>

                    </Card.Actions>
                </ImageBackground>

            </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContent: {
        padding: 7,
        borderRadius: 15,
        elevation: 5,
    },
    cardTitle: {
        margin: -9
    },
    divider: {

    },
    rightText: {
        fontSize: 16,
        right: sizes.wp('3%'),
    },
    leftText: {
        fontSize: 18,
    },
    imageOutside: {
        resizeMode: 'contain',
    },
    imageInside: {
        opacity: 0.3,
        borderRadius: 15
    },  
});

export default OrderDeliveredCard;