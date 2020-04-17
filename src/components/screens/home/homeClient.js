import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { appStyles, colors } from '../../../index.styles';

class HomeClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.touchable}>
                <ImageBackground source={require('../../../icons/menu.jpg')} style={styles.image}>
                    <Text style={styles.text}>Haz tu pedido</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    image: {
        /*width: "100%", 
        height: 500, 
        marginTop: 10,
        resizeMode: 'contain',
        position:'relative',
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
        */
        height: 250,
        width: "90%",
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.TEXT_INPUT,
        position: 'absolute'
    }
})

export default HomeClientScreen;