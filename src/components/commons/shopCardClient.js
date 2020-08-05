import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, Text, View, Linking, ScrollView } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, IconButton, Divider, FAB, Modal, Portal } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import { setShopAsFavourite, deleteShopAsFavourite } from '../../api/shops'
import ShopActions from '../../redux/shops/action'
import Schedule from './schedule'

class ShopCardClient extends Component {
    constructor() {
        super();
        this.state = {
            photo: 'https://picsum.photos/500',
            delay: 'Poca',
            visibleModalSchedule: false,
        };
    }

    _showModalSchedule = () => this.setState({ visibleModalSchedule: true });
    _hideModalSchedule = () => this.setState({ visibleModalSchedule: false });

    async setFavourite() {
        const data = await setShopAsFavourite(this.props.user.mail, this.props.data.cuit, this.props.user.token)
        if (data.status === 200)
            this.props.updateShopFavourite(this.props.data.cuit, true)
    }

    async removeFavourite() {
        const data = await deleteShopAsFavourite(this.props.user.mail, this.props.data.cuit, this.props.user.token)
        if (data.status === 200) {
            this.props.updateShopFavourite(this.props.data.cuit, false)
        }
    }

    render() {
        const PeopleButton = props => <Button
            style={{ borderRadius: 20, borderColor: colors.APP_MAIN, borderWidth: 1, width: sizes.wp('80%'), alignItems: 'center', }}
            labelStyle={{ fontSize: 12, color: colors.APP_MAIN, }}
            color={colors.APP_MAIN}
            mode='outlined'
            icon='account-clock-outline'>
            En este momento hay {this.state.delay} demora</Button>

        const Address = props => <TextTicker style={{ fontSize: 16, }}
            duration={5000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.data.direccion}</TextTicker>

        const PhoneNumber = props => <View>
            <Text style={{ fontSize: 16, right: sizes.wp('13%') }}>{this.props.data.telefono}</Text>
            <FAB style={styles.fabPhone}
                color={colors.APP_BACKGR}
                small
                icon="phone"
                onPress={() => { Linking.openURL(`tel:${this.props.data.telefono}`) }}
            />
        </View>

        const ScheduleFab = props => <FAB
            style={{backgroundColor: colors.APP_MAIN}}
            label={'Ver'}
            icon="clock"
            color='#fff'
            onPress={() => this._showModalSchedule()}
        />

        const OpenClose = props => (this.props.data.abierto == 1) ? <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} >
            Abierto </Button> : <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }}>Cerrado </Button>

        const TitleStar = props => <View style={{ flexDirection: 'row', left: 7, }}>

            <View style={{ flexDirection: 'column', width: sizes.wp('48%'), justifyContent: 'center', }}>
                <TextTicker style={styles.title}
                    duration={5000}
                    loop
                    animationType='bounce'
                    repeatSpacer={50}
                    marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
            </View>

            <IconButton {...props}
                icon={(this.props.data.favorito) ? "star" : "star-outline"}
                color={colors.STAR}
                size={30}
                onPress={() => { (this.props.data.favorito) ? this.removeFavourite() : this.setFavourite() }} />
        </View>

        return (
            <Card style={styles.shopCard}>
                <Card.Title style={{ marginBottom: -4 }} left={OpenClose} leftStyle={{ right: 8 }} right={TitleStar} />
                <Divider />
                <ScrollView>
                    <Card.Title style={{ margin: -10 }} left={PeopleButton} leftStyle={{ alignItems: 'center', width: sizes.wp('80%'), right: sizes.wp('-5%') }} />
                    <Card.Cover source={{ uri: this.state.photo }} />
                    <Divider />
                    <Card.Actions style={{ alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: sizes.wp('89.5%') }}>
                            {(this.props.data.mascotas == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Apto para mascotas'}
                                    icon="dog-side"
                                />
                                :
                                null
                            }
                            {(this.props.data.bebes == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Sala para niños'}
                                    icon="baby"
                                />
                                :
                                null
                            }
                            {(this.props.data.juegos == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Juegos'}
                                    icon="gamepad-variant"
                                />
                                :
                                null
                            }
                            {(this.props.data.aireLibre == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Aire Libre'}
                                    icon="image-filter-hdr"
                                />
                                :
                                null
                            }
                            <FAB
                                color={colors.APP_MAIN}
                                style={styles.fab}
                                label={(this.props.data.libreHumo == 0) ? 'Apto fumadores' : 'Libre de humo'}
                                icon={(this.props.data.libreHumo == 0) ? 'smoking' : 'smoking-off'}
                            />
                            {(this.props.data.wifi == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Wifi'}
                                    icon="wifi"
                                />
                                :
                                null
                            }
                        </View>
                    </Card.Actions>
                    <Divider />
                    <Card.Title titleStyle={styles.leftText} title="Dirección:" right={Address} rightStyle={styles.rightSide} />
                    <Divider />
                    <Card.Title titleStyle={styles.leftText} title="Teléfono:" right={PhoneNumber} rightStyle={styles.rightSide} />
                    <Divider />
                    <Card.Title style={{ justifyContent: 'center', marginTop: 5, marginBottom: 5 }} titleStyle={styles.leftText} title="Horarios:" right={ScheduleFab} rightStyle={styles.rightSide} />
                </ScrollView>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalSchedule} onDismiss={this._hideModalSchedule}>
                        <Schedule hideModalFromChild={this._hideModalSchedule} data={this.props.data.horarios[0]} />
                    </Modal>
                </Portal>
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
    modalView: {
        marginTop: sizes.hp('5%'),
        margin: sizes.hp('2%'),
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
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

const mapStateToProps = state => {
    return {
        user: state.authState.client,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShopFavourite: (cuit, favourite) => dispatch(ShopActions.updateShopFavourite(cuit, favourite))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCardClient);