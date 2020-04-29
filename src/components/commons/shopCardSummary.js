import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Chip } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

class ShopCardSummary extends Component {
    constructor() {
        super();
        this.state = { //PONER METODO PARA SABER EL ESTADO
            name: 'Nombre del Local',
            address: 'Dirección del Local',
            isFav: false, 
            isOpen: true,
         }; 
    }

    render() {

        const LeftContent = props => (this.state.isOpen) ? <Button style={{ borderRadius: 20 }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} contentStyle={{ width: 90 }} >
        Abierto </Button> : <Button style={{ borderRadius: 20 }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} contentStyle={{ width: 90 }} >
        Cerrado </Button>

        const RightContent = props => <IconButton {...props}
            icon={(this.state.isFav) ? "star" : "star-outline"}
            color={colors.STAR}
            size={30}
            onPress={() => {
                this.setState(
                    { isFav: !this.state.isFav })
            }} />

        return (
            <Card style={styles.cardContent}>
                <Card.Title titleStyle={styles.titleAndSubtitle} title={this.state.name} subtitleStyle={styles.titleAndSubtitle} subtitle={this.state.address} left={LeftContent} leftStyle={{ width: 90, right: 8 }} right={RightContent} />
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
       // maxWidth: sizes.wp('50%'),
       // maxHeight: sizes.hp('6%'),
        //flexWrap: 'nowrap'
    }
});

export default ShopCardSummary;