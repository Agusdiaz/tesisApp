import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Button, Dialog } from 'react-native-paper' 
import { Actions } from 'react-native-router-flux';

class SignUpShopMenu extends Component {

    constructor(props){
        super(props);
        this.state={
            visibleDialogFinish: false,
        }
    }

    _showDialogFinish = () => this.setState({ visibleDialogFinish: true });
    _hideDialogFinish = () => this.setState({ visibleDialogFinish: false });

    render() {
        return (
            <View style={appStyles.container}>

                <Text style={styles.titleText}>Empezá a cargar tu menú</Text>

                <TouchableOpacity style={styles.touchable} onPress={() => Actions.createproduct()}>
                    <ImageBackground source={require('../../../icons/product.jpg')} style={styles.imageContainerProduct} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>CREAR PRODUCTO</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchable} onPress={() => {}}>
                    <ImageBackground source={require('../../../icons/sale.jpg')} style={styles.imageContainerSale} imageStyle={styles.imageInside} resizeMode={'stretch'}>
                        <Text style={styles.text}>CREAR PROMOCIÓN</Text>
                    </ImageBackground>
                </TouchableOpacity>

            <View style={{flexDirection: 'row', top: sizes.hp('7%')}}>
                <Button
                    style={{ marginRight: sizes.wp('16%') }}
                    icon="book-open-variant"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => Actions.initialmenu({rute: 'initial'})}>
                    Ver Menú
 				</Button>

                <Button
                    style={{ }}
                    icon="arrow-right-bold-outline"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={this._showDialogFinish}>
                    Finalizar
 				</Button>
                 </View>

                 <Dialog
                    visible={this.state.visibleDialogFinish}
                    onDismiss={this._hideDialogFinish}>
                    <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Ha terminado de completar su menú?</Dialog.Title>
                    <Dialog.Actions>
                        <Button style={{ left: sizes.wp('-12%') }} color={colors.APP_RED} onPress={this._hideDialogFinish}>No</Button>
                        <Button color={colors.APP_GREEN} onPress={() => {}}>Sí</Button>
                    </Dialog.Actions>
                </Dialog>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: "bold",
        textAlign: "center",
        top: sizes.hp('-5%'),
        padding: 12,
    },
    imageContainerProduct: {
        height: sizes.hp('30%'),
        width: sizes.wp('96%'),
        top: sizes.hp('-1%'),
        justifyContent: 'center'
    },
    imageContainerSale: {
        height: sizes.hp('30%'),
        width: sizes.wp('96%'),
        bottom: sizes.hp('-1%'),
        justifyContent: 'center'
    },
    imageInside: {
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#FFF',
        opacity: 0.6,
    },
    touchable: {
    },
    text: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf: 'center',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        textShadowRadius: 12,    
        textShadowColor: '#000',
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(SignUpShopMenu);