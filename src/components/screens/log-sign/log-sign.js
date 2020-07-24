import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logsign } from '../../../redux/actions';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Actions } from 'react-native-router-flux';

class LogSignScreen extends Component {

    render() {
        return (
            <View style={appStyles.container} >

                <Image source={require('../../../icons/flamma.png')} style={styles.imageLogo} />
                <View style={styles.containerButton}>
                    <Text style={styles.textScreen}> ¿Ya sos usuario?</Text>
                    <Button
                        style={styles.buttonView}
                        icon="send"
                        mode="contained"
                        color={colors.APP_MAIN}
                        //disabled="true"
                        onPress={() => Actions.login()}>
                        INICIA SESIÓN
 				</Button>

                    <Text style={styles.textScreen}> ¿Todavía no tenes cuenta?</Text>
                    <Button
                        style={styles.buttonView}
                        icon="account-plus"
                        mode="contained"
                        color={colors.APP_MAIN}
                        //disabled="true"
                        onPress={() => Actions.signupclient()}>
                        REGISTRATE
 				</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageLogo: {
        width: sizes.wp('95%'), 
        height: sizes.hp('95%'), 
        top: sizes.hp('-4%'),
        resizeMode: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerButton: {
        top: sizes.hp('-29%'),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        width: "60%",
        height: 50,
        marginTop: 15,
        marginBottom: 80,
        justifyContent: "center",
        padding: 5,
    },
    textScreen: {
        color: colors.APP_MAIN,
        fontSize: 15,
    },
});

function MapStateToProps(state) {
    return {
        user: state.session && state.session.user ? state.session.user : false
    }
}

export default connect(MapStateToProps, { logsign })(LogSignScreen);