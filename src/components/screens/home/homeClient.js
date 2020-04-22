import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, VirtualizedList } from 'react-native';
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
                    <ImageBackground source={require('../../../icons/tabla.jpg')} style={styles.imageContainer} resizeMode={'stretch'}>
                        <Text style={styles.text}>Hacer pedido</Text>
                    </ImageBackground>
                </TouchableOpacity>


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
    view: {
        position: 'absolute',
        backgroundColor: 'transparent'
    },
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
    image: {
        resizeMode: 'stretch',
    },
    touchable: {
        marginTop: sizes.hp('6%'),
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#000",
        marginTop: sizes.hp('12%')
    },
    list: {
        marginTop: 40,
        marginBottom: 10,
        width: '100%'
    }
})

export default HomeClientScreen;