import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Button, Dialog, Modal, Portal, Menu, } from 'react-native-paper';
import { Tabs, Tab, } from 'material-bread';
import ShopCard from '../../commons/shopCard'
import MenuShop from '../../commons/menu'
import EditFeatures from '../profile/profileShopFeatures'
import EditSchedule from '../profile/profileShopSchedule'
import { Actions } from 'react-native-router-flux';

const uriImageBckg = '../../../icons/forks.jpg'

export default class ProfileShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { //IMAGENES?
            selectedTab: 0,
            visibleDialogSessionOut: false,
            visibleModalEditFeatures: false,
            visibleModalEditSchedule: false,
        }
    }

    _showDialogSessionOut = () => this.setState({ visibleDialogSessionOut: true });
    _hideDialogSessionOut = () => this.setState({ visibleDialogSessionOut: false });

    _showModalEditFeatures = () => this.setState({ visibleModalEditFeatures: true });
    _hideModalEditFeatures = () => this.setState({ visibleModalEditFeatures: false });

    _showModalEditSchedule = () => this.setState({ visibleModalEditSchedule: true });
    _hideModalEditSchedule = () => this.setState({ visibleModalEditSchedule: false });

    render() {


        return (
            <View style={appStyles.container}>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_MAIN}
                    scrollEnabled
                    actionItems={[
                        <Tab key={1} icon='info' label='Tu Información' />,
                        <Tab key={2} icon='restaurant-menu' label='Tu Menú' />,
                        <Tab key={3} icon='new-releases' label='Tus Promociones' />, //attach-money
                        <Tab key={4} icon='settings' label='Ajustes' />,
                    ]}
                />

                {(this.state.selectedTab === 0) ?
                    <ImageBackground source={require(uriImageBckg)} style={styles.imageOutside} imageStyle={styles.imageInside} >
                        <ShopCard />
                    </ImageBackground>

                    : (this.state.selectedTab === 1) ?
                        <MenuShop rute='shop'/>

                        : (this.state.selectedTab === 2) ?
                            <Text>Promociones</Text>

                            :

                            <ImageBackground source={require(uriImageBckg)} style={styles.imageOutside} imageStyle={styles.imageInside} >

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
                                    icon="logout-variant"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={this._showDialogSessionOut}>
                                    Cerrar Sesión
                                </Button>

                                <Dialog
                                    style={{ top: sizes.hp('-15%') }}
                                    visible={this.state.visibleDialogSessionOut}
                                    onDismiss={this._hideDialogSessionOut}>
                                    <Dialog.Title style={{ alignSelf: 'center' }}>¿Desea cerrar sesión?</Dialog.Title>
                                    <Dialog.Actions>
                                        <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogSessionOut}>Cancelar</Button>
                                        <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Ok</Button>
                                    </Dialog.Actions>
                                </Dialog>

                                <Portal>
                                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEditFeatures} onDismiss={this._hideModalEditFeatures}>
                                        <EditFeatures hideModalFromChild={this._hideModalEditFeatures}/>
                                    </Modal>

                                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalEditSchedule} onDismiss={this._hideModalEditSchedule}>
                                        <EditSchedule hideModalFromChild={this._hideModalEditSchedule}/>
                                    </Modal>
                                </Portal>
                            </ImageBackground>
                }

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

    },
    imageOutside: {
        alignItems: 'center',
        resizeMode: 'contain',
        width: sizes.wp('100%'),
        height: sizes.hp('100%'),
        marginTop: sizes.hp('38.1%')
    },
    imageInside: {
        opacity: 0.75,
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
        marginTop: sizes.hp('12%'),
        width: sizes.wp('60%'),
        height: sizes.hp('4%'),
        justifyContent: 'center'
    },
});
