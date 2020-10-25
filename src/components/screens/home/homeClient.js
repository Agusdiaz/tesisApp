import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { Surface, ToggleButton, } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCardSummary from '../../commons/shopCardSummary'
import { Actions } from 'react-native-router-flux';
import Animated from 'react-native-reanimated';
import ShopActions from '../../../redux/shops/action'
import BadgeActions from '../../../redux/notifications/action'
import UserActions from '../../../redux/authState/action'
import { getAllShopsAZ, getAllShopsOpenClose } from '../../../api/shops'

const HEADER_EXPANDED_HEIGHT = 205
const HEADER_COLLAPSED_HEIGHT = -205

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class AnimatedHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueButtons: 'open',
            sortText: 'Abierto/Cerrado',
            animatedValue: new Animated.Value(1),
            refreshing: false,
            areStores: true,
        }
    }

    componentDidMount() {
        this.getShopsOpenClose()
    }

    async getShopsOpenClose() {
        const data = await getAllShopsOpenClose(this.props.user.mail, this.props.user.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 204) {
            this.setState({ areStores: false })
        } else {
            this.props.setShopsData(data.body)
            this.setState({ areStores: true })
        }
    }

    async getShopsAZ() {
        const data = await getAllShopsAZ(this.props.user.mail, this.props.user.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 500 || data.status === 204) {
            this.setState({ areStores: false })
        } else {
            this.props.setShopsData(data.body)
            this.setState({ areStores: true })
        }
    }

    onRefresh = () => {
        this.setState({ refreshing: true, shops: [] });
        this.getShopsOpenClose()
        setTimeout(() => { this.setState({ refreshing: false }) }, 1500);
    }

    handleButtons = (values, callback) => {
        if (values != null) {
            this.setState({ valueButtons: values })
            callback()
        }
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 10,
                }}
            />
        );
    };

    _renderItem(item) {
        if (this.state.areStores) {
            return (
                <ShopCardSummary data={item} />
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noStore.png')} style={styles.image} />
                    <Text style={styles.infoImage}>Actualmente no hay locales adheridos</Text>
                </View>
            );
        }
    }

    render() {
        let translateY = this.state.animatedValue.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT],
            outputRange: [0, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp',
        });

        return (
            <View style={appStyles.container}>
                <Animated.View style={[styles.headerWrapper, { transform: [{ translateY }] }]}>
                    <TouchableOpacity style={styles.touchable} onPress={() => Actions.makeorder()}>
                        <ImageBackground source={require('../../../icons/tabla.jpg')} style={styles.imageContainer} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                            <Text style={styles.text}>PEDÍ AHORA</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <Surface style={styles.surface}>
                        <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON NUESTROS LOCALES ADHERIDOS</Text>
                    </Surface>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('100%'), height: 43, }}>
                        <Text style={{ fontSize: 15, textAlign: 'left', left: sizes.wp('-3%'), bottom: sizes.hp('-1%') }}>
                            Ordenar por: {this.state.sortText}
                        </Text>

                        <ToggleButton.Group
                            onValueChange={value => this.handleButtons(value, () => {
                                this.setState({
                                    sortText: (value === 'open') ? 'Abierto/Cerrado'
                                        : 'Orden Alfabético'
                                });
                            })}
                            value={this.state.valueButtons}>
                            <ToggleButton style={styles.toggleButton} icon="store-24-hour" value="open" onPress={() => this.getShopsOpenClose()}
                                color={(this.state.valueButtons === 'open') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                            <ToggleButton style={styles.toggleButton} icon="sort-alphabetical" value="letters" onPress={() => this.getShopsOpenClose()}
                                color={(this.state.valueButtons === 'letters') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                        </ToggleButton.Group>
                    </View>

                    <AnimatedFlatList
                        style={[styles.list, { height: (this.props.shops.allShops.length === 2) ? sizes.hp('62.5%') : sizes.hp('70%') }]}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        data={(this.state.areStores && this.state.valueButtons === 'letters') ? this.props.shops.allShops.sort((a, b) => a.nombre.localeCompare(b.nombre))
                            : (this.state.areStores) ? this.props.shops.allShops : [1]}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: { contentOffset: { y: this.state.animatedValue } },
                                },
                            ],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => this._renderItem(item)}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, i) => i.toString()}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 170,
        width: 400,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    imageInside: {
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    touchable: {
        marginTop: sizes.hp('6%'),
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: sizes.hp('13%'),
        textShadowRadius: 12,
        textShadowColor: '#000',
        width: sizes.wp('70%'),
        textAlign: 'center'
    },
    surface: {
        marginTop: sizes.hp('1%'),
        width: sizes.wp('100%'),
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    toggleButton: {
        right: sizes.wp('-5%'),
        marginLeft: sizes.wp('2%'),
    },
    list: {
        marginTop: sizes.hp('0%'),
        width: '100%',
    },
    headerWrapper: {
        width: '100%',
        marginTop: sizes.hp('24%')
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        marginTop: sizes.hp('48%'),
        top: sizes.hp('-40%')
    },
    image: {
        width: 170,
        height: 170,
        marginBottom: sizes.hp('2%'),
        alignSelf: 'center',
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
})

function mapStateToProps(state) {
    return {
        user: state.authState.client,
        shops: state.shops,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShopsData: (shops) => dispatch(ShopActions.setShopsData(shops)),
        updateBadgeClient: (action) => dispatch(BadgeActions.updateBadgeClient(action)),
        logout: () => dispatch(UserActions.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedHeader)