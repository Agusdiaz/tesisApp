import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, Text, View, Linking, ScrollView } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, IconButton, Divider, FAB, Modal, Portal } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import { setShopAsFavourite, deleteShopAsFavourite } from '../../api/shops'
import ShopActions from '../../redux/shops/action'
import Schedule from './schedule'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../redux/authState/action'

class ShopCardClient extends Component {
    constructor() {
        super();
        this.state = {
            photo: 'https://picsum.photos/500',
            visibleModalSchedule: false,
        };
    }

    _showModalSchedule = () => this.setState({ visibleModalSchedule: true });
    _hideModalSchedule = () => this.setState({ visibleModalSchedule: false });

    async setFavourite() {
        const data = await setShopAsFavourite(this.props.user.mail, this.props.shop.cuit, this.props.user.token)
        if(data.status === 500 && data.body.error){
            this.props.logout()
            Actions.logsign({visible: true})
        } else if (data.status === 200)
            this.props.updateShopFavourite(this.props.shop.cuit, true)
    }

    async removeFavourite() {
        const data = await deleteShopAsFavourite(this.props.user.mail, this.props.shop.cuit, this.props.user.token)
        if(data.status === 500 && data.body.error){
            this.props.logout()
            Actions.logsign({visible: true})
        } else if (data.status === 200)
            this.props.updateShopFavourite(this.props.shop.cuit, false)
    }

    render() {
        const PeopleButton = props => <Button
            style={{ borderRadius: 20, borderColor: colors.APP_MAIN, borderWidth: 1, width: sizes.wp('85%'), alignItems: 'center', }}
            labelStyle={{ fontSize: 12, color: colors.APP_MAIN, }}
            color={colors.APP_MAIN}
            mode='outlined'
            icon='account-clock-outline'>
            En este momento la demora es: {this.props.shop.demora}</Button>

        const Address = props => <TextTicker style={{ fontSize: 16, }}
            duration={5000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.shop.direccion}</TextTicker>

        const PhoneNumber = props => <View>
            <Text style={{ fontSize: 16, right: sizes.wp('13%') }}>{this.props.shop.telefono}</Text>
            <FAB style={styles.fabPhone}
                color={colors.APP_BACKGR}
                small
                icon="phone"
                onPress={() => { Linking.openURL(`tel:${this.props.shop.telefono}`) }}
            />
        </View>

        const ScheduleFab = props => <FAB
            style={{backgroundColor: colors.APP_MAIN}}
            label={'Ver'}
            icon="clock"
            color='#fff'
            onPress={() => this._showModalSchedule()}
        />

        const OpenClose = props => (this.props.shop.abierto == 1) ? <Button style={{ borderRadius: 20, alignItems: 'center' }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} >
            Abierto </Button> : <Button style={{ borderRadius: 20, alignItems: 'center' }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }}>Cerrado </Button>

        const TitleStar = props => <View style={{ flexDirection: 'row', left: 7, }}>

            <View style={{ flexDirection: 'column', width: sizes.wp('48%'), justifyContent: 'center' }}>
                <TextTicker style={styles.title}
                    duration={5000}
                    loop
                    animationType='bounce'
                    repeatSpacer={50}
                    marqueeDelay={1000}>{this.props.shop.nombre}</TextTicker>
            </View>

            <IconButton {...props}
                icon={(this.props.shop.favorito) ? "star" : "star-outline"}
                color={colors.STAR}
                size={30}
                onPress={() => { (this.props.shop.favorito) ? this.removeFavourite() : this.setFavourite() }} />
        </View>

        return (
            <Card style={styles.shopCard}>
                <Card.Title style={{ marginBottom: -4 }} left={OpenClose} leftStyle={{ right: 8, width: sizes.wp('25%') }} right={TitleStar} 
                rightStyle={{right: 15}}/>
                <Divider />
                <ScrollView>
                {(this.props.shop.abierto === 1) ?
                    <Card.Content style={{ margin: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    <PeopleButton />
                </Card.Content>
                    : null}
                    <Card.Cover source={{ uri: this.state.photo }} />
                    <Divider />
                    <Card.Actions style={{ alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: sizes.wp('89.5%') }}>
                            {(this.props.shop.mascotas == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Apto para mascotas'}
                                    icon="dog-side"
                                />
                                :
                                null
                            }
                            {(this.props.shop.bebes == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Sala para niños'}
                                    icon="baby"
                                />
                                :
                                null
                            }
                            {(this.props.shop.juegos == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Juegos'}
                                    icon="gamepad-variant"
                                />
                                :
                                null
                            }
                            {(this.props.shop.aireLibre == 1) ?
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
                                label={(this.props.shop.libreHumo == 0) ? 'Apto fumadores' : 'Libre de humo'}
                                icon={(this.props.shop.libreHumo == 0) ? 'smoking' : 'smoking-off'}
                            />
                            {(this.props.shop.wifi == 1) ?
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
                    <Card.Title titleStyle={styles.leftText} title="Horarios:" title="Horarios:" right={ScheduleFab} rightStyle={styles.rightSide} />
                </ScrollView>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalSchedule} onDismiss={this._hideModalSchedule}>
                        <Schedule hideModalFromChild={this._hideModalSchedule} data={this.props.shop.horarios[0]} />
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
        borderColor: colors.APP_MAIN,
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
        shop: state.shops.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShopFavourite: (cuit, favourite) => dispatch(ShopActions.updateShopFavourite(cuit, favourite)),
        logout: () => dispatch(UserActions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCardClient);