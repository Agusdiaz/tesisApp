import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { Surface, ToggleButton, } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCardSummary from '../../commons/shopCardSummary'
import ProductCard from '../../commons/productCardOrder'
import { Actions } from 'react-native-router-flux';
import Animated from 'react-native-reanimated';
import ShopActions from '../../../redux/shops/action'
import { getAllShopsAZ, getAllShopsOpenClose } from '../../../api/shops'

const DATA = [
    { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' },
]

const HEADER_EXPANDED_HEIGHT = 205 //(DATA.length == 2) ? 28 : 205
const HEADER_COLLAPSED_HEIGHT = -205

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const globalState = {
    areStores: true,
    buttonValue: 'open'
}

class AnimatedList extends Component {

    state = {
        refreshing: false,
        animatedValue: new Animated.Value(0),
    };

    onRefresh = () => {
        this.setState({ refreshing: true });
        if(globalState.buttonValue === 'open')
            this.refreshOpenClose()
        else
            this.refreshAZ()
        this.setState({ refreshing: false }); 
    }

    async refreshOpenClose(){
        await this.props.getOpenClose()  
    }

    async refreshAZ(){
        await this.props.getAZ()
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
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                data={this.props.data}
                onScroll={this.props.onScroll}
                scrollEventThrottle={16}
                renderItem={({ item }) => <ShopCardSummary data={item} />}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={(item, i) => i.toString()}
            />
        );
    }
}

class AnimatedHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueButtons: 'open',
            sortText: 'Abierto/Cerrado',
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.getShopsOpenClose()
    }

    async getShopsOpenClose() {
        console.log('OP')
        const data = await getAllShopsOpenClose(this.props.user.mail, this.props.user.token)
        if (data.status === 500 || data.status === 204) {
            globalState.areStores = false
        } else {
            this.props.setShopsData(data.body)
            globalState.areStores = true
        }
    };

    async getShopsAZ() {
        console.log('AZ')
        const data = await getAllShopsAZ(this.props.user.mail, this.props.user.token)
        if (data.status === 500 || data.status === 204) {
            globalState.areStores = false
        } else {
            this.props.setShopsData(data.body)
            globalState.areStores = true
        }
    };

    handleButtons = (values, callback) => {
        if (values != null) {
            this.setState({ valueButtons: values })
            globalState.buttonValue= values
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
                    <TouchableOpacity style={styles.touchable} onPress={() => Actions.makeorder()}>
                        <ImageBackground source={require('../../../icons/flame.jpg')} style={styles.imageContainer} imageStyle={styles.imageInside} resizeMode={'stretch'}>
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
                            value={globalState.buttonValue}>
                            <ToggleButton style={styles.toggleButton} icon="store-24-hour" value="open" onPress={() => this.getShopsOpenClose()}
                                color={(globalState.buttonValue === 'open') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                            <ToggleButton style={styles.toggleButton} icon="sort-alphabetical" value="letters" onPress={() => this.getShopsAZ()}
                                color={(globalState.buttonValue === 'letters') ? colors.APP_MAIN : colors.APP_INACTIVE} />
                        </ToggleButton.Group>
                    </View>

                    {(globalState.areStores) ?

                        <AnimatedList
                            data={this.props.shops.allShops}
                            getOpenClose= {this.getShopsOpenClose}
                            getAZ={this.getShopsAZ}
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
        fontSize: 40, //28
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: sizes.hp('0%'), //13
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

function mapStateToProps(state) {
    return {
        user: state.authState,
        shops: state.shops,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShopsData: (shops) => dispatch(ShopActions.setShopsData(shops))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedHeader)
