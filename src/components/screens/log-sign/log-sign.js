import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Actions } from 'react-native-router-flux';
import { verifyToken } from '../../../api/users'

class LogSignScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
           visibleDialog: (props.visible) ? props.visible : false
        }
    }

    _showDialog = () => this.setState({ visibleDialog: true });
    _hideDialog = () => this.setState({ visibleDialog: false });

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
                        onPress={() => Actions.login()}>
                        INICIA SESIÓN
 				</Button>

                    <Text style={styles.textScreen}> ¿Todavía no tenes cuenta?</Text>
                    <Button
                        style={styles.buttonView}
                        icon="account-plus"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={() => Actions.signupclient()}>
                        REGISTRATE
 				</Button>
                </View>

                <Dialog
                    style={{ width: sizes.wp('70%'), alignSelf: 'center' }}
                    visible={this.state.visibleDialog}
                    onDismiss={this._hideDialog}>
                    <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>Tu sesión ha caducado. Vuelve a iniciar sesión</Dialog.Title>
                    <Dialog.Actions>
                        <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialog}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
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

function mapStateToProps(state) {
    return {
        user: state.authState.client,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(LogSignScreen);