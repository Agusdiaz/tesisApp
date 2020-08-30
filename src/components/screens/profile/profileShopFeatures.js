import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopActions from '../../../redux/authState/action'
import { Button, Dialog, Modal, Portal, Menu, } from 'react-native-paper';
import { Tabs, Tab, RadioButton } from 'material-bread';
import { updateShopFeatures } from '../../../api/shops'
import { Actions } from 'react-native-router-flux';

class ProfileShopFeaturesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedPets: this.props.shop.mascotas,
            checkedKids: this.props.shop.bebes,
            checkedGames: this.props.shop.juegos,
            checkedOutside: this.props.shop.aireLibre,
            checkedSmoking: this.props.shop.libreHumo,
            checkedWifi: this.props.shop.wifi,
            visibleDialog: null,
        }
    }

    _showDialog = () => this.setState({ visibleDialog: true });
    _hideDialog = () => this.setState({ visibleDialog: false });

    async editFeatures() {
        this.props.updateLoading(true)
        const data = await updateShopFeatures(this.state.checkedPets, this.state.checkedKids, this.state.checkedGames, this.state.checkedOutside,
            this.state.checkedSmoking, this.state.checkedWifi, this.props.shop.cuit, this.props.shop.token)
            if(data.status === 500 && data.body.error){
                this.props.logout()
                Actions.logsign({visible: true})
            } else if (data.status === 500 || data.status === 404) {
            this.props.updateLoading(false)
            this.props.showDialogResponse(data.body)
        }
        else {
            this.hideModal()
            this.props.updateLoading(false)
            this.props.updateShopFeatures(this.state.checkedPets, this.state.checkedKids, this.state.checkedGames, this.state.checkedOutside,
                this.state.checkedSmoking, this.state.checkedWifi)
            this.props.showDialogResponse(data.body)
        }
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    render() {
        return (
            <View>
                <Text style={styles.titleText}> Editá las carecterísticas de tu local </Text>

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

                <View style={{ flexDirection: "row", marginTop: sizes.wp('1%') }}>
                    <Button
                        style={{ margin: sizes.hp('1%'), width: '42%', marginRight: sizes.wp('6.5%') }}
                        icon="close-outline"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={this.hideModal}>
                        Cancelar
                    </Button>

                    <Button
                        style={{ margin: sizes.hp('1%'), width: '42%', }}
                        icon="check-outline"
                        mode="contained"
                        color={colors.APP_MAIN}
                        onPress={this._showDialog}>
                        Confirmar
                    </Button>
                </View>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialog}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea modificar su información?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialog}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this.editFeatures()
                                this._hideDialog()
                            }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    viewRadioButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    questionText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: sizes.hp('1.5%')
    },
    options: {
        marginRight: sizes.wp('6%')
    },
});

const mapStateToProps = state => {
    return {
        shop: state.authState.shop,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShopFeatures: (mascotas, bebes, juegos, aireLibre, libreHumo, wifi) => dispatch(ShopActions.updateShopFeatures(mascotas, bebes, juegos, aireLibre, libreHumo, wifi)),
        logout: () => dispatch(ShopActions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShopFeaturesScreen);