import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Button, Dialog, Modal, Portal, ActivityIndicator, TextInput } from 'react-native-paper';
import { Tabs, Tab } from 'material-bread';
import ShopCard from '../../commons/shopCard'
import Schedule from '../../commons/schedule'
import EditFeatures from './profileShopFeatures'
import { Actions } from 'react-native-router-flux';
import ShopActions from '../../../redux/authState/action'
import PieChart from '../statistics/pieChart'
import LineChart from '../statistics/lineChart'
import BarChart from '../statistics/barChart'
import { changePassword } from '../../../api/users'

class ProfileShopScreen extends Component {

    constructor() {
        super();
        this.state = {
            selectedTab: 0,
            loading: false,
            actionMessage: '',
            passwordNew: '',
            passwordRepeated: '',
            visibleDialogResponse: false,
            visibleDialogSessionOut: false,
            visibleModalEditFeatures: false,
            visibleModalEditSchedule: false,
            visibleModalStats: false,
            visibleModalPassword: false,
            stats: 0,
            checked: 1,
        }
        this.updateIsLoading = this.updateIsLoading.bind(this)
        this._showDialogResponse = this._showDialogResponse.bind(this)
    }

    updateIsLoading(value) {
        this.setState({ loading: value })
    }

    _showDialogSessionOut = () => this.setState({ visibleDialogSessionOut: true });
    _hideDialogSessionOut = () => this.setState({ visibleDialogSessionOut: false });

    _showModalEditFeatures = () => this.setState({ visibleModalEditFeatures: true });
    _hideModalEditFeatures = () => this.setState({ visibleModalEditFeatures: false });

    _showModalEditSchedule = () => this.setState({ visibleModalEditSchedule: true });
    _hideModalEditSchedule = () => this.setState({ visibleModalEditSchedule: false });

    _showModalStats = (value) => this.setState({ visibleModalStats: true, stats: value });
    _hideModalStats = () => this.setState({ visibleModalStats: false });

    _showModalPassword = () => this.setState({ visibleModalPassword: true });
    _hideModalPassword = () => this.setState({ visibleModalPassword: false });

    _showDialogResponse(message) {
        this.setState({ visibleDialogResponse: true, actionMessage: message })
    }
    _hideDialogResponse = () => this.setState({ visibleDialogResponse: false, actionMessage: '' });

    passwordsMatch() {
        if (this.state.passwordNew.localeCompare(this.state.passwordRepeated) === 0 && this.state.passwordNew.length > 5)
            return true
        else if (this.state.passwordNew.localeCompare(this.state.passwordRepeated) !== 0) {
            this._showDialogResponse('Las contraseñas ingresadas deben coincidir')
            return
        } else if (this.state.passwordNew.length <= 5) {
            this._showDialogResponse('La contraseña debe tener 6 o más caracteres')
            return
        }
    }

    async editPassword() {
        if (this.state.passwordNew != '' && this.state.passwordRepeated != '') {
            if (this.passwordsMatch()) {
                this.setState({ loading: true })
                const data = await changePassword(this.props.shop.mail, this.state.passwordNew, this.props.shop.token)
                if (data.status === 500 && data.body.error) {
                    this.props.logout()
                    Actions.logsign({ visible: true })
                } else if (data.status !== 200) {
                    this.setState({ passwordRepeated: '', passwordNew: '', loading: false });
                    this._showDialogResponse(data.body)
                } else {
                    this.setState({ passwordNew: '', passwordRepeated: '', loading: false });
                    this._showDialogResponse(data.body)
                    this._hideModalPassword()
                }
            }
        }
    }

    render() {

        return (
            <View style={appStyles.container}>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_BACKGR}
                    underlineColor={colors.APP_MAIN}
                    scrollEnabled
                    actionItems={[
                        <Tab key={1} icon='info' label='Tu Información' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 0) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                        <Tab key={2} icon='insert-chart' label='Estadísticas' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 1) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                        <Tab key={3} icon='settings' label='Ajustes' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                            iconStyles={{ color: (this.state.selectedTab == 2) ? colors.APP_MAIN : colors.APP_INACTIVE }} />,
                    ]}
                />

                {(this.state.selectedTab === 0) ?
                    <View style={{ top: sizes.hp('7%') }}>
                        <ShopCard />
                    </View>
                    : (this.state.selectedTab === 1) ?
                        <View>
                            <Button
                                style={styles.buttonStyle}
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={() => this._showModalStats(0)}>
                                Productos más pedidos
                                </Button>

                            <Button
                                style={styles.buttonStyle}
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={() => this._showModalStats(1)}>
                                Horarios más populares
                                </Button>

                            <Button
                                style={styles.buttonStyle}
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={() => this._showModalStats(2)}>
                                Pedidos por mes
                                </Button>
                        </View>
                        :
                        <View>

                            <Button
                                style={styles.buttonStyle}
                                icon="room-service-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={() => Actions.ordersshop()}>
                                Historial de Pedidos
                                </Button>

                            <Button
                                style={styles.buttonStyle}
                                icon="palette-swatch"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._showModalEditFeatures}>
                                Editar Características
                                </Button>

                            <Button
                                style={styles.buttonStyle}
                                icon="clock-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._showModalEditSchedule}>
                                Editar Horarios
                                </Button>

                            <Button
                                style={styles.buttonStyle}
                                icon="pencil-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._showModalPassword}>
                                Editar Contraseña
 				                </Button>

                            <Button
                                style={styles.buttonStyle}
                                icon="logout-variant"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._showDialogSessionOut}>
                                Cerrar Sesión
                                </Button>
                        </View>
                }

                <Portal>

                <Dialog
                        style={{ top: sizes.hp('-3%') }}
                        visible={this.state.visibleDialogSessionOut}
                        onDismiss={this._hideDialogSessionOut}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea cerrar sesión?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogSessionOut}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this.props.logout()
                                this._hideDialogSessionOut()
                                Actions.logsign()
                            }}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal contentContainerStyle={[styles.modalView, { marginTop: sizes.hp('3%') }]} visible={this.state.visibleModalStats} onDismiss={this._hideModalStats}>
                        {(this.state.stats === 0) ?
                            <PieChart hideModalFromChild={this._hideModalStats} />
                            :
                            (this.state.stats === 1) ?
                                <BarChart hideModalFromChild={this._hideModalStats} />
                                :
                                <LineChart hideModalFromChild={this._hideModalStats} />
                        }
                    </Modal>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEditFeatures} dismissable={false}>
                        <EditFeatures hideModalFromChild={this._hideModalEditFeatures} updateLoading={this.updateIsLoading} showDialogResponse={this._showDialogResponse} />
                    </Modal>

                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEditSchedule} dismissable={false}>
                        <Schedule hideModalFromChild={this._hideModalEditSchedule} data={this.props.shop.horarios[0]} rute={'editShop'} />
                    </Modal>

                    <Modal visible={this.state.visibleModalPassword} onDismiss={this._hideModalPassword} contentContainerStyle={[styles.modalView, {top: sizes.hp('-10%')}]}>

                        <Text style={styles.signupText}>Modificá tu contraseña</Text>
                        <TextInput
                            style={styles.inputView}
                            mode='outlined'
                            label='Nueva Contraseña'
                            secureTextEntry={true}
                            placeholder="Nueva contraseña"
                            theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                            onChangeText={text => this.setState({ passwordNew: text })}
                        />
                        <TextInput
                            style={styles.inputView}
                            mode='outlined'
                            disabled={(this.state.passwordNew === '') ? true : false}
                            label='Confirmar contraseña'
                            secureTextEntry={true}
                            placeholder="Confirmar contraseña"
                            theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                            onChangeText={text => this.setState({ passwordRepeated: text })}
                        />

                        <View style={{ flexDirection: "row", marginTop: sizes.wp('3%') }}>
                            <Button
                                style={{ margin: sizes.hp('1%'), width: '42%', marginRight: sizes.wp('10%') }}
                                icon="close-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={this._hideModalPassword}>
                                Cancelar
                            </Button>

                            <Button
                                style={{ margin: sizes.hp('1%'), width: '42%', }}
                                icon="check-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                disabled={(this.state.passwordNew == '' || this.state.passwordRepeated == '') ? true : false}
                                onPress={() => this.editPassword()} >
                                Confirmar
                            </Button>
                        </View>
                    </Modal>

                    <Dialog
                        //style={{ width: sizes.wp('70%'), alignSelf: 'center' }}
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Modal dismissable={false}
                        visible={this.state.loading}
                        style={styles.modalActivityIndicator} >
                        <ActivityIndicator
                            animating={this.state.loading}
                            size={60}
                            color={colors.APP_MAIN}
                        />
                    </Modal>

                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: sizes.hp('5%'),
        borderTopWidth: 2,
        borderColor: colors.APP_MAIN,
    },
    modalView: {
        marginTop: sizes.hp('0%'),
        margin: sizes.hp('2%'),
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
    },
    buttonStyle: {
        marginTop: sizes.hp('8%'),
        width: sizes.wp('62%'),
        height: sizes.hp('4%'),
        justifyContent: 'center'
    },
    signupText: {
        color: colors.APP_MAIN,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: sizes.hp('5%'),
        marginBottom: sizes.hp('4%'),
    },
    inputView: {
        width: "80%",
        height: 50,
        margin: sizes.hp('0.5%'),
        justifyContent: "center",
        padding: 8,
        fontSize: sizes.TEXT_INPUT,
    },
    
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(ShopActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShopScreen);