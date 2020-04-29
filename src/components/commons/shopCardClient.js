import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, IconButton, Divider, FAB,  } from 'react-native-paper';

function Item({ title }) {
    return (
        <View>
            <Text style={styles.textList}>{title}</Text>
        </View>
    );
}

class ShopCardClient extends Component {
    constructor() {
        super();
        this.state = { //PONER METODO PARA SABER EL ESTADO
            name: 'Nombre del Local',
            address: 'Lima 123',
            phoneNumber: '45213256',
            schedule: [{
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
            },],
            favState: false,
            isOpen: true,
        };
    }

    passToParent = () => {
        this.props.callbackFromParent(this.state.isOpen);
    }

    render() {

        const Adress = props => <Text style={styles.rightText}>{this.state.address}</Text>

        const PhoneNumber = props => <View>
            <Text style={{ fontSize: 16, right: sizes.wp('13%') }}>{this.state.phoneNumber}</Text>
            <FAB style={styles.fab}
                color={colors.APP_BACKGR}
                small
                icon="phone"
                onPress={() => { Linking.openURL(`tel:${this.state.phoneNumber}`) }}
            />
        </View>

        const Schedule = props => <FlatList
            data={this.state.schedule}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            style={styles.flatListContent}
        />

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
            //this.passToParent()
            <Card style={styles.shopCard}>
                <Card.Title titleStyle={{ right: 10 }} title={this.state.name} left={OpenClose} leftStyle={{ width: 90, right: 8 }} right={Star} />
                <Divider />
                <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
                <Divider />
                <Card.Title titleStyle={styles.leftText} title="Dirección:" right={Adress} rightStyle={styles.rightText} />
                <Divider />
                <Card.Title titleStyle={styles.leftText} title="Teléfono:" right={PhoneNumber} rightStyle={styles.rightText} />
                <Divider />
                <Card.Title titleStyle={styles.leftText} title="Horarios:" right={Schedule} rightStyle={styles.rightText} />
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    shopCard: {
        width: sizes.wp('90%'),
        marginTop: sizes.hp('15%'),
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
});

export default ShopCardClient;