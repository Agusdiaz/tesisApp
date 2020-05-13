import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { Surface, ToggleButton, } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCardSummary from '../../commons/shopCardSummary'
import ProductCard from '../../commons/productCard'
import { Actions } from 'react-native-router-flux';
import Animated from 'react-native-reanimated';

const DATA = [
    { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' },
]

const HEADER_EXPANDED_HEIGHT = 205 //(DATA.length == 2) ? 28 : 205
const HEADER_COLLAPSED_HEIGHT = -205

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class AnimatedList extends Component {

    state = {
        isLoading: false,
        animatedValue: new Animated.Value(0),
    };

    onRefresh = () => {
        this.setState({ isLoading: true })
        setTimeout(() => this.setState({ isLoading: false }), 1500)
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

    render() {
        return (
            <AnimatedFlatList
                style={styles.list}
                refreshing={this.state.isLoading}
                onRefresh={this.onRefresh}
                data={DATA}
                onScroll={this.props.onScroll}
                scrollEventThrottle={16}
                renderItem={({ item }) => <ShopCardSummary />}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={(item, i) => i.toString()}
            />
        );
    }
}

export default class AnimatedHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueButtons: 'open',
            sortText: 'Abierto/Cerrado',
            areStores: true,
            animatedValue: new Animated.Value(0),
        }
    }

    handleButtons = (values, callback) => {
        if (values != null) {
            this.setState({ valueButtons: values })
            callback()
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
                    <TouchableOpacity style={styles.touchable}>
                        <ImageBackground source={require('../../../icons/tabla.jpg')} style={styles.imageContainer} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                            <Text style={styles.text}>HAZ TU PEDIDO</Text>
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
                                        : (value === 'letters') ? 'Orden Alfabético' : 'Promociones'
                                });
                            })}
                            value={this.state.valueButtons}>
                            <ToggleButton style={styles.toggleButton} icon="sort-alphabetical" value="letters" onPress={() => { }}
                                color={(this.state.valueButtons === 'letters') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                            <ToggleButton style={styles.toggleButton} icon="store-24-hour" value="open" onPress={() => { }}
                                color={(this.state.valueButtons === 'open') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                            <ToggleButton style={styles.toggleButton} icon="sale" value="sales" onPress={() => { }}
                                color={(this.state.valueButtons === 'sales') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                        </ToggleButton.Group>
                    </View>

                    {(this.state.areStores) ?

                        <AnimatedList
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: { contentOffset: { y: this.state.animatedValue } },
                                    },
                                ],
                                { useNativeDriver: true }
                            )}
                        />
                        :
                        <View style={styles.viewImage}>
                            <Image source={require('../../../icons/noStore.png')} style={styles.image} />
                            <Text style={styles.infoImage}>Actualmente no hay locales adheridos</Text>
                        </View>
                    }
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        /*
        marginTop: 10,
        resizeMode: 'contain',
        position:'relative',
        flex: 1,
        top:-100,
        left: -100, 
        flexGrow:1, */
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: sizes.hp('13%'),
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
        //marginBottom: sizes.hp('0.5%'),
        height: (DATA.length == 2) ? sizes.hp('69%') : sizes.hp('70%'),
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