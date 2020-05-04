import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Linking } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, IconButton, Divider, FAB, } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

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

    passToParent = (value) => {
        this.props.callbackFromParent(value);
    }

    componentDidMount(){
        this.passToParent(this.state.isOpen)
    }

    render() {

        const Adress = props => <TextTicker style={{ fontSize: 16, }}
            duration={2000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.state.address}</TextTicker>

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

        const OpenClose = props => (this.state.isOpen) ? <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} >
            Abierto </Button> : <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }}>Cerrado </Button>

        const RightContent = props => <View style={{ flexDirection: 'row', left: 7, }}>

            <View style={{ flexDirection: 'column', width: sizes.wp('48%'), justifyContent: 'center', }}>
                <TextTicker style={styles.title}
                    duration={5000}
                    loop
                    animationType='bounce'
                    repeatSpacer={50}
                    marqueeDelay={1000}>{this.state.name}</TextTicker>
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
            //this.passToParent()
            <Card style={styles.shopCard}>
                <Card.Title left={OpenClose} leftStyle={{ right: 8, }} right={RightContent} />
                <Divider />
                <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
                <Divider />
                <Card.Title titleStyle={styles.leftText} title="Dirección:" right={Adress} rightStyle={styles.rightSide} />
                <Divider />
                <Card.Title titleStyle={styles.leftText} title="Teléfono:" right={PhoneNumber} rightStyle={styles.rightSide} />
                <Divider />
                <Card.Title titleStyle={styles.leftText} title="Horarios:" right={Schedule} rightStyle={styles.rightSide} />
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
    rightText: {
        fontSize: 16,
    },
    rightSide: {
        right: sizes.wp('4%'),
        width: sizes.wp('58%'),
        alignItems: 'flex-end'
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