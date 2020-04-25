import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Card, IconButton, Surface, FAB, Divider } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../index.styles';
import Tabs from 'react-native-tabs';
import ArrowButton from './arrowButton';

const Adress = props => <Text style={styles.rightText}>Lima 123</Text>

const PhoneNumber = props => <View>
    <Text style={{ fontSize: 16, right: sizes.wp('13%') }}>45210325</Text>
    <FAB style={styles.fab}
        color={colors.APP_BACKGR}
        small
        icon="phone"
        onPress={() => { }}
    />
</View>

const Schedule = props => <FlatList
    data={DATA}
    renderItem={({ item }) => <Item title={item.title} />}
    keyExtractor={item => item.id}
    style={styles.flatListContent}
/>

function Item({ title }) {
    return (
        <View>
            <Text style={styles.textList}>{title}</Text>
        </View>
    );
}

const DATA = [
    {
        id: '1',
        title: 'Domingo: 11am-11pm',
    },
    {
        id: '2',
        title: 'Lunes: CERRADO',
    },
    {
        id: '3',
        title: 'Martes: 10am-11pm',
    },
    {
        id: '4',
        title: 'Miércoles: 10am-11pm',
    },
    {
        id: '5',
        title: 'Jueves: 10am-11pm',
    },
    {
        id: '6',
        title: 'Viernes: 10am-1am',
    },
    {
        id: '7',
        title: 'Sábado: 11am-3am',
    },
];

class ShopInformationScreen extends Component {
    constructor() {
        super();
        this.state = { //PONER METODO PARA SABER EL ESTADO
            favState: false, 
            isOpen: true,
         }; 
    }

    render() {
        const OpenClose = props => (this.state.isOpen) ? <Button style={{ borderRadius: 20 }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} contentStyle={{ width: 90 }} >
            Abierto </Button> : <Button style={{ borderRadius: 20 }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} contentStyle={{ width: 90 }} >
            Cerrado </Button>

        const Star = props => <IconButton {...props}
            icon={(this.state.favState) ? "star" : "star-outline"}
            color={colors.STAR}
            size={30}
            onPress={() => {
                this.setState(
                    { favState: !this.state.favState })
            }} />

        return (
            <View style={appStyles.container}>
                <ArrowButton rute={'navbarclient'} />

                <Card style={styles.shopCard}>
                    <Card.Title titleStyle={{ right: 10 }} title="Nombre Local" left={OpenClose} leftStyle={{ width: 90, right: 8 }} right={Star} />
                    <Divider />
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Divider />
                    <Card.Title titleStyle={styles.leftText} title="Dirección:" right={Adress} rightStyle={styles.rightText} />
                    <Divider />
                    <Card.Title titleStyle={styles.leftText} title="Teléfono:" right={PhoneNumber} rightStyle={styles.rightText} />
                    <Divider />
                    <Card.Title titleStyle={styles.leftText} title="Horarios:" right={Schedule} rightStyle={styles.rightText} />
                </Card>

                <Button style={styles.buttonMenu}
                    icon="book-open-page-variant" //chef-hat
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => { }}>
                    Ver Menú
                </Button>

                <Button style={styles.buttonOrder}
                    icon="basket"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => { }}>
                    Hacer Pedido
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    shopCard: {
        width: sizes.wp('90%'),
        marginTop: sizes.hp('5%'),
        height: sizes.hp('65%'),
        elevation: 10,
        borderRadius: 15,
        marginBottom: sizes.hp('3%'),
    },
    rightText: {
        fontSize: 16,
        right: sizes.wp('3%'),
    },
    leftText: {
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        alignSelf: 'center',
        margin: 10,
        right: sizes.wp('-2%'),
        top: sizes.hp('-2.2%'),
        backgroundColor: colors.APP_MAIN,
        height: 37,
        width: 37,
        alignItems: 'center'
    },
    flatListContent: {
        height: sizes.hp('14%'),
        top: sizes.hp('2.5%'),
    },
    textList: {
        fontSize: 16,
        margin: 5,
        alignSelf: 'flex-end'
    },
    buttonMenu: {
        width: sizes.wp('42%'),
        alignSelf: 'center',
    },
    buttonOrder: {
        width: sizes.wp('42%'),
        alignSelf: 'center',
        marginTop: sizes.hp('2.5%')
    },
});

export default ShopInformationScreen;