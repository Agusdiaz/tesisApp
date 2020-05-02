import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, VirtualizedList } from 'react-native';
import { Surface, ToggleButton, } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCardSummary from '../../commons/shopCardSummary'
import ProductCard from '../../commons/productCard'
import { Actions } from 'react-native-router-flux';
import Animated from 'react-native-reanimated';

const HEADER_EXPANDED_HEIGHT = 220
const HEADER_COLLAPSED_HEIGHT = 40

class HomeClientScreen extends Component {

    constructor(props) {
        super(props);
        this.styleHeader={}
        this.state = {
            isHeaderHidden: false,
            valueButtons: 'open',
            sortText: 'Abierto/Cerrado',
            scrollY: new Animated.Value(0)
        }
    }

    handleButtons = (values, callback) => {
        if (values != null) {
            this.setState({ valueButtons: values })
            callback()
        }
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
          })

        return (
            <View style={appStyles.container}>
                <Animated.View style={{height: headerHeight}}>
                    <TouchableOpacity style={styles.touchable}>
                        <ImageBackground source={require('../../../icons/tabla.jpg')} style={styles.imageContainer} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                            <Text style={styles.text}>HAZ TU PEDIDO</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    </Animated.View>

                    <Surface style={styles.surface}>
                        <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON NUESTROS LOCALES ADHERIDOS</Text>
                    </Surface>
                

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('100%'), backgroundColor: colors.APP_BACKGR }}>
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

                    <Animated.ScrollView 
                    style={styles.list}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                             contentOffset: {
                               y: this.state.scrollY
                             }
                           }
                        }])}
                      scrollEventThrottle={16}>
                     <ShopCardSummary />
                     <View style = {{height: 2}}/>
                     <ShopCardSummary />
                     <View style = {{height: 2}}/>
                     <ShopCardSummary />
                     
                    </Animated.ScrollView>
                    
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
        marginBottom: sizes.hp('0.5%'),
        //height: sizes.hp('200%'),
        width: '100%',
    }
})

export default HomeClientScreen;