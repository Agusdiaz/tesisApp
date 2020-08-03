import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, IconButton, Divider, FAB, Portal, Modal } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import Schedule from './schedule'

class ShopCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: 'https://picsum.photos/500',
            delay: 'Poca',
            visibleModalSchedule: false,
        }
    }

    _showModalSchedule = () => this.setState({ visibleModalSchedule: true });
    _hideModalSchedule = () => this.setState({ visibleModalSchedule: false });

    render() {
        const PeopleButton = props => <Button
            style={{ borderRadius: 20, borderColor: colors.APP_MAIN, borderWidth: 1, width: sizes.wp('80%'), alignSelf: 'center', }}
            labelStyle={{ fontSize: 12, color: colors.APP_MAIN, }}
            color={colors.APP_MAIN}
            mode='outlined'
            icon='account-clock-outline'>
            En este momento tenés {this.state.delay} demora</Button>

        const Name = props => <TextTicker style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold' }}
            duration={5000}
            loop
            animationType='bounce'
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.shop.nombre}</TextTicker>

        const Adress = props => <TextTicker style={{ fontSize: 16, }}
            duration={5000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}>{this.props.shop.direccion}</TextTicker>

        const PhoneNumber = props => <Text style={styles.rightText}>{this.props.shop.telefono}</Text>

        const ScheduleFab = props => <FAB
        style={{backgroundColor: colors.APP_MAIN}}
        label={'Ver'}
        icon="clock"
        color='#fff'
        onPress={() => this._showModalSchedule()}
    />

        const Mail = props => <Text style={styles.rightText}>{this.props.shop.mail}</Text>

        return (

            <Card style={styles.shopCard}>
                <Card.Title style={{ margin: 2 }} leftStyle={{ right: sizes.wp('-5%'), width: sizes.wp('72%'), alignItems: 'center' }} left={Name} />
                <ScrollView>
                    <Divider />
                    <Card.Title style={{ margin: -10,}} left={PeopleButton} leftStyle={{ alignSelf: 'center', right: sizes.wp('-38.5%')}} />
                    <Card.Cover source={{ uri: this.state.photo }} />
                    <Divider />
                    <Card.Actions style={{ alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: sizes.wp('89.5%') }}>
                            {(this.props.shop.mascotas === 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Apto para mascotas'}
                                    icon="dog-side"
                                />
                                :
                                null
                            }
                            {(this.props.shop.bebes === 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Sala para niños'}
                                    icon="baby"
                                />
                                :
                                null
                            }
                            {(this.props.shop.juegos === 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    label={'Juegos'}
                                    icon="gamepad-variant"
                                />
                                :
                                null
                            }
                            {(this.props.shop.aireLibre === 1) ?
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
                                label={(this.props.shop.libreHumo === 0) ? 'Apto fumadores' : 'Libre de humo'}
                                icon={(this.props.shop.libreHumo === 0) ? 'smoking' : 'smoking-off'}
                            />
                            {(this.props.shop.wifi === 1) ?
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
                    <Card.Title titleStyle={styles.leftText} title="Dirección:" right={Adress} rightStyle={styles.rightSide} />
                    <Divider />
                    <Card.Title titleStyle={styles.leftText} title="Teléfono:" right={PhoneNumber} rightStyle={styles.rightSide} />
                    <Divider />
                    <Card.Title titleStyle={styles.leftText} title="Horarios:" right={ScheduleFab} rightStyle={styles.rightSide} />
                    <Divider />
                    <Card.Title titleStyle={styles.leftText} title="Mail:" right={Mail} rightStyle={styles.rightSide} />
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
        width: sizes.wp('91%'),
        height: sizes.hp('70%'),
        marginTop: sizes.hp('2%'),
        elevation: 10,
        borderRadius: 15,
        marginBottom: sizes.hp('3%'),
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

const mapStateToProps = state => {
    return {
        shop: state.authState.shop,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //updateShopFavourite: (cuit, favourite) => dispatch(ShopActions.updateShopFavourite(cuit, favourite))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCard);