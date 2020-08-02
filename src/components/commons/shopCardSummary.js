import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Avatar, Button, Card, IconButton, FAB, Divider } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import { Actions } from 'react-native-router-flux';
import { setShopAsFavourite, deleteShopAsFavourite } from '../../api/shops'
import ShopActions from '../../redux/shops/action'

class ShopCardSummary extends Component {

    constructor() {
        super();
        this.state = {
            delay: 'Poca',
        };
    }

    nextStepParent = () => {
        this.props.nextStepParent();
    }

    async setFavourite(){
        const data = await setShopAsFavourite(this.props.user.mail, this.props.data.cuit, this.props.user.token)
        if (data.status === 200 ) 
            this.props.updateShopFavourite(this.props.data.cuit, true)
    }

    async removeFavourite(){
        const data = await deleteShopAsFavourite(this.props.user.mail, this.props.data.cuit, this.props.user.token)
        if (data.status === 200 ){
            this.props.updateShopFavourite(this.props.data.cuit, false)
        }
    }

    render() {
        const LeftContent = props => (this.props.data.abierto == 1) ? <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }} >
            Abierto </Button> : <Button style={{ borderRadius: 20, width: 105, alignItems: 'center' }} mode="contained" color={colors.APP_RED} labelStyle={{ fontSize: 9, color: colors.APP_BACKGR }}>Cerrado </Button>

        const RightContent = props => <View style={{ flexDirection: 'row', left: -6 }}>

            <View style={{ flexDirection: 'column', width: sizes.wp('55%'), marginTop: 6, }}>
                <TextTicker style={styles.title}
                    duration={5000}
                    loop
                    animationType='bounce'
                    repeatSpacer={50}
                    marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>

                <TextTicker style={styles.subtitle}
                    duration={5000}
                    loop
                    animationType='bounce'
                    repeatSpacer={50}
                    marqueeDelay={1000}>{this.props.data.direccion}</TextTicker>
            </View>

            <IconButton
                icon={(this.props.data.favorito) ? "star" : "star-outline"} //require('../../icons/flammaPic.p')
                color={colors.STAR}
                size={30}
                onPress={() =>  (this.props.data.favorito) ? this.removeFavourite() : this.setFavourite()} />
        </View>

        const PeopleButton = props => <Button
            style={{ borderRadius: 20, borderColor: colors.APP_MAIN, borderWidth: 1, width: sizes.wp('80%'), alignItems: 'center', }}
            labelStyle={{ fontSize: 12, color: colors.APP_MAIN, }}
            color={colors.APP_MAIN}
            mode='outlined'
            icon='account-clock-outline'>
            En este momento hay {this.state.delay} demora</Button>

        return (
                <Card style={styles.cardContent}>
                    <Card.Title left={LeftContent} leftStyle={{ right: 8 }} right={RightContent} />
                    <Divider />
                    <Card.Title style={{ margin: -10 }} left={PeopleButton} leftStyle={{ alignItems: 'center', width: sizes.wp('80%'), right: sizes.wp('-8%') }} />
                    <Card.Cover style={{ height: sizes.hp('20%') }} source={{ uri: 'https://picsum.photos/500' }} />
                    <Card.Actions>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: sizes.wp('3%'), width: sizes.wp('40%'), alignItems: 'center', justifyContent: 'flex-start' }}>
                            {(this.props.data.mascotas == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    small
                                    icon="dog-side"
                                />
                                :
                                null
                            }
                            {(this.props.data.bebes == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    small
                                    icon="baby"
                                />
                                :
                                null
                            }
                            {(this.props.data.juegos == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    small
                                    icon="gamepad-variant"
                                />
                                :
                                null
                            }
                            {(this.props.data.aireLibre == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    small
                                    icon="image-filter-hdr"
                                />
                                :
                                null
                            }
                            <FAB
                                color={colors.APP_MAIN}
                                style={styles.fab}
                                small
                                icon={(this.props.data.libreHumo == 0) ? 'smoking' : 'smoking-off'}
                            />
                            {(this.props.data.wifi == 1) ?
                                <FAB
                                    color={colors.APP_MAIN}
                                    style={styles.fab}
                                    small
                                    icon="wifi"
                                />
                                :
                                null
                            }
                        </View>
                        {(this.props.rute == 'chooseShop') ?
                            <Button
                                style={{ left: sizes.wp('10%'), width: '40%', }}
                                icon="cart-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this.nextStepParent}>
                                Pedir Aca
                        </Button>
                            :
                            <Button
                                style={{ left: sizes.wp('10%'), width: '40%', }}
                                icon="plus"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={() => Actions.shopinformation({data: this.props.data})}>
                                Detalles
                        </Button>
                        }
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
    fab: {
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: colors.APP_MAIN,
        marginRight: 17,
        marginBottom: 5,
        width: 37,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = state => {
    return {
        user: state.authState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShopFavourite: (cuit, favourite) => dispatch(ShopActions.updateShopFavourite(cuit, favourite))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCardSummary);