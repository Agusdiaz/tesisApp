import * as React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Divider } from 'react-native-paper';

const orderNumber = props =>  <Text style={styles.rightText}> 10 </Text>
const user = props =>  <Text style={styles.rightText}> Juan Perez </Text>
const total = props =>  <Text style={styles.rightText}> $10 </Text>

const OrderCard = () => (
    
    <Card style={styles.cardContent}>
        <ImageBackground source={require('../../icons/ticket.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
        <Card.Title titleStyle={styles.leftText} title="Número de pedido:" right={orderNumber} />
        <Divider />
        <Card.Title titleStyle={styles.leftText} title="Usuario:" right={user}/>
        <Divider />
        <Card.Title titleStyle={styles.leftText} title="Total:" right={total}/>
        <Divider />
        <Card.Actions style={{margin: 5}}>
            <Button
                style={{alignSelf:'center', left: sizes.wp('5%'), width: '38%' }} //ESTANDARIZAR
                icon="eye"
                mode="contained"
                color={colors.APP_MAIN}
                onPress={() => { }}>
                Ver Detalle
                </Button>

                <Button
                style={{ left: sizes.wp('17%'), width: '38%' }} //ESTANDARIZAR
                icon="cart-arrow-right"
                mode="contained"
                color={colors.APP_MAIN}
                onPress={() => { }}>
                Entregar
                </Button>
        </Card.Actions>
        </ImageBackground>
    </Card>
    
);

const styles = StyleSheet.create({
    cardContent: {
        padding: 7,
        borderRadius: 15,
    },
    rightText: {
        fontSize: 17,
        right: sizes.wp('5%'),
    },
    leftText: {
        fontSize: 20,
    },
    imageOutside: {
        resizeMode: 'contain',
    },
    imageInside: {
        opacity:0.3, 
        borderRadius: 15
    },
});

export default OrderCard;