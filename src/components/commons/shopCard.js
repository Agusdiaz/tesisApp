import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, IconButton, Divider, FAB,  } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class ShopCard extends Component {
    constructor(props) {
        super(props);
        this.state = { //IMAGENES?
            name: 'Nombre del Local',
            photo: 'https://picsum.photos/500',
            address: 'Lima 123',
            phoneNumber: '45897620',
            mail: 'local@mail.com',
            password: '123',
            schedule: [{
                id: 1,
                title: '11am-11pm',
            },
            {
                id: 2,
                title: 'CERRADO',
            },
            {
                id: 3,
                title: '10am-11pm',
            },
            {
                id: 4,
                title: '10am-11pm',
            },
            {
                id: 5,
                title: '10am-11pm',
            },
            {
                id: 6,
                title: '10am-1am',
            },
            {
                id: 7,
                title: '11am-3am',
            },],
            isFav: false,
            isOpen: true,
            pets: true,
            kids: true,
            games: true,
            outside: true,
            smoking: true,
            wifi: true,
        }
    }

    render() {

        const Name = props => <TextTicker style={{fontSize: 22, textAlign: 'center'}} 
        duration={5000}
        loop
        animationType='bounce'
        repeatSpacer={50}
        marqueeDelay={1000}>{this.state.name}</TextTicker>

        const Adress = props => <TextTicker style={{fontSize: 16,  }} 
        duration={5000}
        loop
        bounce
        repeatSpacer={50}
        marqueeDelay={1000}>{this.state.address}</TextTicker>

        const PhoneNumber = props => <Text style={styles.rightText}>{this.state.phoneNumber}</Text>

        const Schedule = props => <View>
            <Text style={styles.textSchedule}>Domingo: {this.state.schedule.find(e => e.id == 1).title}</Text>
            <Text style={styles.textSchedule}>Lunes: {this.state.schedule.find(e => e.id == 2).title} </Text>
            <Text style={styles.textSchedule}>Martes: {this.state.schedule.find(e => e.id == 3).title}</Text>
            <Text style={styles.textSchedule}>Miércoles: {this.state.schedule.find(e => e.id == 4).title}</Text>
            <Text style={styles.textSchedule}>Jueves: {this.state.schedule.find(e => e.id == 5).title}</Text>
            <Text style={styles.textSchedule}>Viernes: {this.state.schedule.find(e => e.id == 6).title}</Text>
            <Text style={styles.textSchedule}>Sábado: {this.state.schedule.find(e => e.id == 7).title}</Text>
        </View>

        const Mail = props => <Text style={styles.rightText}>{this.state.mail}</Text>

        return (

            <Card style={styles.shopCard}>
                            <Card.Title style={{ margin: 2 }} leftStyle={{ right: sizes.wp('-5%'), width: sizes.wp('72%'), alignItems: 'center'}} left={Name} />
                            <ScrollView>
                            <Divider />
                            <Card.Cover source={{ uri: this.state.photo }} />
                            <Divider />
                    <Card.Actions style={{ alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: sizes.wp('89.5%') }}>
                            {(this.state.pets) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Apto para mascotas'}
                                    icon="dog-side"
                                />
                                :
                                null
                            }
                            {(this.state.kids) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Sala para niños'}
                                    visible={this.state.kids}
                                    icon="baby"
                                />
                                :
                                null
                            }
                            {(this.state.games) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Juegos'}
                                    visible={this.state.games}
                                    icon="gamepad-variant"
                                />
                                :
                                null
                            }
                            {(this.state.outside) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Aire Libre'}
                                    visible={this.state.outside}
                                    icon="image-filter-hdr"
                                />
                                :
                                null
                            }
                            <FAB
                                color={colors.APP_MAIN}
                                style={styles.fab}
                                label={(this.state.smoking) ? 'Apto fumadores' : 'Libre de humo'}
                                icon={(this.state.smoking) ? 'smoking' : 'smoking-off'}
                            />
                            {(this.state.wifi) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Wifi'}
                                    visible={this.state.wifi}
                                    icon="wifi"
                                />
                                :
                                null
                            }
                        </View>
                    </Card.Actions>
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Dirección:" right={Adress} rightStyle={styles.rightSide} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Teléfono:" right={PhoneNumber} rightStyle={styles.rightSide} />
                            <Divider />
                            <Card.Title titleStyle={{ justifyContent: 'center', marginTop: 5, marginBottom: 5 }} title="Horarios:" right={Schedule} rightStyle={styles.rightSide} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Mail:" right={Mail} rightStyle={styles.rightSide} />
                            </ScrollView>
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
        borderWidth: 2,
        borderColor: colors.APP_MAIN
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
    flatListContent: {
        height: sizes.hp('9%'),
        top: sizes.hp('2.5%'),
        marginBottom: sizes.hp('5%')
    },
    fab: {
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: colors.APP_MAIN,
        marginBottom: 4,
        width: '40%',
        height: '10%',
        margin: 5
    },
    textSchedule: {
        fontSize: 16,
        margin: 5,
        textAlign: 'right',
    },
});

export default ShopCard;