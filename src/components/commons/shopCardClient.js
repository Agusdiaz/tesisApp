import React, { Component, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, Linking, ScrollView } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, IconButton, Divider, FAB, } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class ShopCardClient extends Component {
    constructor() {
        super();
        this.state = { //PONER METODO PARA SABER EL ESTADO
            name: 'Nombre del Local',
            address: 'Lima 123',
            phoneNumber: '45213256',
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
            delay: 'Poca',
            isFav: false,
            isOpen: true,
            pets: true,
            kids: true,
            games: true,
            outside: true,
            smoking: true,
            wifi: true,
        };
    }

   componentDidMount() {
        this.props.callbackFromParent(this.state.isOpen)
    }

    render() {

        const PeopleButton = props => <Button
            style={{ borderRadius: 20, borderColor: colors.APP_MAIN, borderWidth: 1, width: sizes.wp('80%'), alignItems: 'center', }}
            labelStyle={{ fontSize: 12, color: colors.APP_MAIN, }}
            color={colors.APP_MAIN}
            mode='outlined'
            icon='account-clock-outline'>
            En este momento hay {this.state.delay} demora</Button>

        const Adress = props => <TextTicker style={{ fontSize: 16, }}
            duration={5000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.state.address}</TextTicker>

        const PhoneNumber = props => <View>
            <Text style={{ fontSize: 16, right: sizes.wp('13%') }}>{this.state.phoneNumber}</Text>
            <FAB style={styles.fabPhone}
                color={colors.APP_BACKGR}
                small
                icon="phone"
                onPress={() => { Linking.openURL(`tel:${this.state.phoneNumber}`) }}
            />
        </View>

        const Schedule = props => <View>
            <Text style={styles.textSchedule}>Domingo: {this.state.schedule.find(e => e.id == 1).title}</Text>
            <Text style={styles.textSchedule}>Lunes: {this.state.schedule.find(e => e.id == 2).title} </Text>
            <Text style={styles.textSchedule}>Martes: {this.state.schedule.find(e => e.id == 3).title}</Text>
            <Text style={styles.textSchedule}>Miércoles: {this.state.schedule.find(e => e.id == 4).title}</Text>
            <Text style={styles.textSchedule}>Jueves: {this.state.schedule.find(e => e.id == 5).title}</Text>
            <Text style={styles.textSchedule}>Viernes: {this.state.schedule.find(e => e.id == 6).title}</Text>
            <Text style={styles.textSchedule}>Sábado: {this.state.schedule.find(e => e.id == 7).title}</Text>
        </View>

        const OpenClose = props => (this.state.isOpen) ? <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} >
            Abierto </Button> : <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }}>Cerrado </Button>

        const TitleStar = props => <View style={{ flexDirection: 'row', left: 7, }}>

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
            <Card style={styles.shopCard}>
                <Card.Title style={{ marginBottom: -4 }} left={OpenClose} leftStyle={{ right: 8 }} right={TitleStar} />
                <Divider />
                <ScrollView>
                    <Card.Title style={{ margin: -10 }} left={PeopleButton} leftStyle={{ alignItems: 'center', width: sizes.wp('80%'), right: sizes.wp('-5%') }} />
                    <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
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
                    <Card.Title style={{ justifyContent: 'center', marginTop: 5, marginBottom: 5 }} titleStyle={styles.leftText} title="Horarios:" right={Schedule} rightStyle={styles.rightSide} />
                </ScrollView>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    shopCard: {
        width: sizes.wp('93%'),
        marginTop: sizes.hp('14%'),
        height: sizes.hp('72%'),
        elevation: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.APP_MAIN
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    features: {
        marginTop: sizes.hp('2%'),
        marginBottom: sizes.hp('2%'),
        width: sizes.wp('85%'),
        //height: sizes.hp('13%'),
    },
    rightText: {
        fontSize: 16,
    },
    rightSide: {
        right: sizes.wp('4%'),
        width: sizes.wp('55%'),
        alignItems: 'flex-end'
    },
    leftText: {
        fontSize: 18,
        width: sizes.wp('30%'),
    },
    fabPhone: {
        position: 'absolute',
        alignSelf: 'center',
        margin: 10,
        right: sizes.wp('-2%'),
        top: sizes.hp('-2.2%'),
        backgroundColor: colors.APP_MAIN,
        alignItems: 'center'
    },
    textSchedule: {
        fontSize: 16,
        margin: 5,
        textAlign: 'right',
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
});

export default ShopCardClient;