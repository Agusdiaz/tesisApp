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

class ShopCard extends Component {
    constructor(props) {
        super(props);
        this.state = { //IMAGENES?
            name: 'Nombre del Local',
            address: 'Lima 123',
            phoneNumber: '45897620',
            mail: 'local@mail.com',
            password: '123',
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
        }
    }

    render() {

        const Adress = props => <Text style={styles.rightText}>{this.state.address}</Text>

        const PhoneNumber = props => <Text style={styles.rightText}>{this.state.phoneNumber}</Text>

        const Schedule = props => <FlatList
            data={this.state.schedule}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            style={styles.flatListContent}
        />

        const Mail = propr => <Text style={styles.rightText}>{this.state.mail}</Text>

        return (

            <Card style={styles.shopCard}>
                            <Card.Title style={{ margin: 20 }} titleStyle={{ alignSelf: 'center', fontSize: 22 }} title={this.state.name} />
                            <Divider />
                            <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Dirección:" right={Adress} rightStyle={styles.rightText} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Teléfono:" right={PhoneNumber} rightStyle={styles.rightText} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Horarios:" right={Schedule} rightStyle={styles.rightText} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Mail:" right={Mail} rightStyle={styles.rightText} />
                        </Card>
        )
    }
}

const styles = StyleSheet.create({
    shopCard: {
        width: sizes.wp('91%'),
        height: sizes.hp('70%'),
        marginTop: sizes.hp('2%'),
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
    flatListContent: {
        height: sizes.hp('9%'),
        top: sizes.hp('2.5%'),
        marginBottom: sizes.hp('5%')
    },
    textList: {
        fontSize: 16,
        margin: 5,
        alignSelf: 'flex-end'
    },
});

export default ShopCard;