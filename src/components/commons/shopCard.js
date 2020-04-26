import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Chip } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

class ShopCard extends Component {
    constructor() {
        super();
        this.state = { //PONER METODO PARA SABER EL ESTADO
            favState: false, 
            isOpen: true,
         }; 
    }

    render() {

        const LeftContent = props => (this.state.isOpen) ? <Button style={{ borderRadius: 20 }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} contentStyle={{ width: 90 }} >
        Abierto </Button> : <Button style={{ borderRadius: 20 }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} contentStyle={{ width: 90 }} >
        Cerrado </Button>

        const RightContent = props => <IconButton {...props}
            icon={(this.state.favState) ? "star" : "star-outline"}
            color={colors.STAR}
            size={30}
            onPress={() => {
                this.setState(
                    { favState: !this.state.favState })
            }} />

        return (
            <Card style={styles.cardContent}>
                <Card.Title titleStyle={styles.titleAndSubtitle} title="Nombre Local" subtitleStyle={styles.titleAndSubtitle} subtitle="Direccion Local" left={LeftContent} leftStyle={{ width: 90, right: 8 }} right={RightContent} />
                <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
                <Card.Actions>
                    <Button
                        style={{ left: sizes.wp('28%'), width: '40%', }} //ESTANDARIZAR
                        icon="plus"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => Actions.shopinformation()}>
                        Detalles
                </Button>
                </Card.Actions>
            </Card>
        )
    }
};

const styles = StyleSheet.create({
    cardContent: {
        elevation: 5,
        borderRadius: 15,
    },
    titleAndSubtitle: {
        right: 10,
    }
});

export default ShopCard;