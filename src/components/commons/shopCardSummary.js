import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Chip } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
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

        const LeftContent = props => (this.state.isOpen) ? <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} >
            Abierto </Button> : <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }}>Cerrado </Button>

        const RightContent = props => <View style ={{ flexDirection: 'row', left: -6}}>

        <View style ={{ flexDirection: 'column', width: sizes.wp('55%'), marginTop: 6, }}>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.state.name}</TextTicker>

            <TextTicker style={styles.subtitle}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.state.address}</TextTicker>
        </View>

            <IconButton {...props}
                icon={(this.state.isFav) ? "star" : "star-outline"}
                color={colors.STAR}
                size={30}
                onPress={() => {
                    this.setState(
                        { isFav: !this.state.isFav })
                }} />
        </View>

        return (
            <Card style={styles.cardContent}>
                <Card.Title left={LeftContent} leftStyle={{ right: 8 }} right={RightContent} />
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
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 7,
        fontSize: 14,
    },
});

export default ShopCardSummary;