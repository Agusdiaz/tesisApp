import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Dialog, Portal, ActivityIndicator, Modal } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import { RadioButton, Select } from 'material-bread'
import { Actions } from 'react-native-router-flux';
import ShopActions from '../../../redux/authState/action'
import { updateShopFeatures } from '../../../api/shops'

class SignUpShopFeaturesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            type: '',
            checkedPets: this.props.shop.mascotas,
            checkedKids: this.props.shop.bebes,
            checkedGames: this.props.shop.juegos,
            checkedOutside: this.props.shop.aireLibre,
            checkedSmoking: this.props.shop.libreHumo,
            checkedWifi: this.props.shop.wifi,
            visibleDialogFinish: false,
            visibleDialogResponse: false,
            selectedType: 'Bar/Cervecería',
            actionMessage: '',
        }
    }

    async updateFeatures() {
        this._hideDialogFinish()
        this.setState({ loading: true })
        const data = await updateShopFeatures(this.state.checkedPets, this.state.checkedKids, this.state.checkedGames, this.state.checkedOutside,
            this.state.checkedSmoking, this.state.checkedWifi, this.props.shop.cuit, this.props.shop.token)
            if(data.status === 500 && data.body.error){
                this.props.logout()
                Actions.logsign({visible: true})
            } else if (data.status === 500 || data.status === 404) {
            this.setState({ loading: false, actionMessage: data.body })
            this._showDialogResponse()
        } else {
            this.setState({ loading: false })
            this.props.updateShopFeatures(this.state.checkedPets, this.state.checkedKids, this.state.checkedGames, this.state.checkedOutside,
                this.state.checkedSmoking, this.state.checkedWifi)
            Actions.signupshopschedule()
        }
    }

    _showDialogFinish = () => this.setState({ visibleDialogFinish: true });
    _hideDialogFinish = () => this.setState({ visibleDialogFinish: false });

    _showDialogResponse = () => this.setState({ visibleDialogResponse: true });
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false });

    render() {
        const types = [
            { id: '1', name: 'Bar/Cervecería' },
            { id: '2', name: 'Hamburguesería/Comida Rápida/Pizzería' },
            { id: '3', name: 'Restaurante/Tenedor Libre/Buffet' },
            { id: '4', name: 'Heladería/Chocolatería' },
            { id: '5', name: 'Confitería/Casa de té/Panadería' },
        ];
        return (
            <View style={appStyles.container}>
                <ArrowButton rute={'logsign'} />

                <Text style={styles.titleText}> ¡Bienvenido! Primero debes seleccionar las carecterísticas de tu local </Text>

                <Text style={styles.questionText}> ¿Tu local admite la presencia de animales? </Text>
                <View style={styles.viewRadioButtons}>
                <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedPets == 1}
                        onPress={() => this.setState({ checkedPets: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedPets == 0}
                        onPress={() => this.setState({ checkedPets: 0 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local dispone de entretenimiento para niños? </Text>
                <View style={styles.viewRadioButtons}>
                <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedKids == 1}
                        onPress={() => this.setState({ checkedKids: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedKids == 0}
                        onPress={() => this.setState({ checkedKids: 0 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local dispone de juegos/arcade para los clientes? </Text>
                <View style={styles.viewRadioButtons}>
                <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedGames == 1}
                        onPress={() => this.setState({ checkedGames: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedGames == 0}
                        onPress={() => this.setState({ checkedGames: 0 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local dispone de espacio al aire libre? </Text>
                <View style={styles.viewRadioButtons}>
                <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedOutside == 1}
                        onPress={() => this.setState({ checkedOutside: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedOutside == 0}
                        onPress={() => this.setState({ checkedOutside: 0 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local es libre de humo? </Text>
                <View style={styles.viewRadioButtons}>
                <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedSmoking == 1}
                        onPress={() => this.setState({ checkedSmoking: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedSmoking == 0}
                        onPress={() => this.setState({ checkedSmoking: 0 })}
                        label="No"
                    />
                </View>

                <Text style={styles.questionText}> ¿Tu local dispone de wifi para los clientes? </Text>
                <View style={styles.viewRadioButtons}>
                <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        labelStyle={styles.options}
                        checked={this.state.checkedWifi == 1}
                        onPress={() => this.setState({ checkedWifi: 1 })}
                        label="Sí"
                    />
                    <RadioButton
                        radioButtonColor={colors.APP_MAIN}
                        rippleColor={colors.APP_MAIN}
                        checked={this.state.checkedWifi == 0}
                        onPress={() => this.setState({ checkedWifi: 0 })}
                        label="No"
                    />
                </View>

                <Button
                    style={{ top: sizes.hp('5s%') }}
                    icon="arrow-right-bold-outline"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={this._showDialogFinish}>
                    Continuar
 				</Button>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogFinish}
                        onDismiss={this._hideDialogFinish}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¿La información seleccionada es correcta?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogFinish}>Modificar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => this.updateFeatures()}>Es correcta</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal dismissable={false}
                        visible={this.state.loading} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
                    </Modal>

                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={() => { this._hideDialogResponse() }}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

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
        top: sizes.hp('-3%'),
        padding: 15,
        margin: 15
    },
    selectList: {
        alignItems: 'center',
        marginBottom: sizes.hp('5%'),
    },
    viewRadioButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    questionText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: sizes.hp('1.5%')
    },
    options: {
        marginRight: sizes.wp('6%')
    },
})

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateShopFeatures: (mascotas, bebes, juegos, aireLibre, libreHumo, wifi) => dispatch(ShopActions.updateShopFeatures(mascotas, bebes, juegos, aireLibre, libreHumo, wifi)),
        logout: () => dispatch(ShopActions.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpShopFeaturesScreen);