import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, VirtualizedList } from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCard from '../../commons/shopCard'

const DATA = [];

const getItem = (data, index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

const getItemCount = (data) => {
    return 10;
}

class HomeClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 20,
                }}
            />
        );
    }

    render() {
        return (
            <View style={appStyles.container}>
                <TouchableOpacity style={styles.touchable}>
                    <ImageBackground source={require('../../../icons/tabla.jpg')} style={styles.imageContainer} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>HACER PEDIDO</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <Surface style={styles.surface}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold' }}>LOCALES ADHERIDOS</Text>
                </Surface>

                <VirtualizedList
                    style={styles.list}
                    ItemSeparatorComponent={this.renderSeparator}
                    data={DATA}
                    initialNumToRender={0}
                    renderItem={({ item }) => <ShopCard />}
                    keyExtractor={item => item.key}
                    getItemCount={getItemCount}
                    getItem={getItem} />
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
        marginTop: sizes.hp('13%')
    },
    surface: {
        marginTop: sizes.hp('1.5%'),
        width: sizes.wp('100%'),
        padding: 20,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    list: {
        marginTop: sizes.hp('0.5%'),
        marginBottom: sizes.hp('0.5%'),
        width: '100%'
    }
})

export default HomeClientScreen;