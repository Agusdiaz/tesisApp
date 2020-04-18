import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';

class HomeClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={appStyles.container}>
            <TouchableOpacity style={styles.touchable}>
                <ImageBackground source={require('../../../icons/menu.jpg')} style={styles.imageContainer} resizeMode={'stretch'}>
                    <Text style={styles.text}>Haz tu pedido</Text>
                </ImageBackground>
            </TouchableOpacity>
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
        resizeMode: "cover",
        justifyContent: "center"
        */
      //top:-100,
      //left: -100,
       //justifyContent: "center",
       /* height: 250,
        width: "90%",
        alignSelf: "center"*/
        //flexGrow:1,
    height:250,
    width:400,
    alignItems: 'center',
    justifyContent:'center',
    },
    image: {
        resizeMode : 'stretch',
    },
    touchable: {
       marginTop: sizes.hp('10%'),
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.APP_BACKGR,
        //position: 'absolute'
    }
})

export default HomeClientScreen;



/*
import React from 'react';
import { SafeAreaView, TouchableOpacity, VirtualizedList, StyleSheet, Text, ImageBackground } from 'react-native';
import { appStyles, colors } from '../../../index.styles';

const DATA = [];

const getItem = () => {
    return {
        id: 1,
        title: "Haz tu pedido"
    }
}

const getItemCount = (data) => {
    return 1;
  }

const Item = ({ title }) => {
    return (
        <TouchableOpacity style={styles.image}>
            <ImageBackground source={require('../../../icons/menu.jpg')} style={styles.image}>
                <Text style={styles.text}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
  );
}

const VirtualizedListExample = () => {
    return (
        <SafeAreaView style={appStyles.container}>
            <VirtualizedList
                data={DATA}
                //initialNumToRender={4}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.key}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        justifyContent: 'center',
        marginVertical: 50,
        //marginHorizontal: ,
        padding: 40,
        //alignItems: 'center',
        //marginTop: 50,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.TEXT_INPUT,
        //position: 'absolute'
    },
});

export default VirtualizedListExample;
*/