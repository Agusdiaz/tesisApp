import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList, ImageBackground, Linking } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Avatar, Button, Dialog, TextInput, Modal, Card, Divider } from 'react-native-paper';
import { Tabs, Tab, } from 'material-bread';
import { Actions } from 'react-native-router-flux';

const uriImageBckg = '../../../icons/lights.jpg'

function Item({ title }) {
    return (
        <View>
            <Text style={styles.textList}>{title}</Text>
        </View>
    );
}

export default class ProfileShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { //IMAGENES?
            name: 'Nombre del Local',
            address: 'Lima 123',
            phoneNumber: '45897620',
            mail: 'local@mail.com',
            password: '123',
            schedule: [{
                id: '1',
                title: 'Domingo: 11am-11pm',
            },
            {
                id: '2',
                title: 'Lunes: CERRADO',
            },
            {
                id: '3',
                title: 'Martes: 10am-11pm',
            },
            {
                id: '4',
                title: 'Miércoles: 10am-11pm',
            },
            {
                id: '5',
                title: 'Jueves: 10am-11pm',
            },
            {
                id: '6',
                title: 'Viernes: 10am-1am',
            },
            {
                id: '7',
                title: 'Sábado: 11am-3am',
            },],
            selectedTab: 0,
            visibleDialogSessionOut: false,
        }
    }

    _showDialogSessionOut = () => this.setState({ visibleDialogSessionOut: true });

    _hideDialogSessionOut = () => this.setState({ visibleDialogSessionOut: false });

    render() {

        const Adress = props => <Text style={styles.rightText}>{this.state.address}</Text>

        const PhoneNumber = props => <Text style={styles.rightText}>{this.state.phoneNumber}</Text>

        const Schedule = props => <FlatList
            data={this.state.schedule}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            style={styles.flatListContent}
        />

        const Mail = propr => <Text style={styles.rightText}>{this.state.mail}</Text>

        return (
            <View style={appStyles.container}>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_MAIN}
                    scrollEnabled
                    actionItems={[
                        <Tab key={1} icon='info' label='Tu Información' />, //pie-chart-outlined
                        <Tab key={2} icon='restaurant-menu' label='Tu Menú' />,
                        <Tab key={3} icon='new-releases' label='Tus Promociones' />, //attach-money monetization-on new-releases
                        <Tab key={4} icon='settings' label='Ajustes' />,
                    ]}
                />

                {(this.state.selectedTab === 0) ?
                    <ImageBackground source={require(uriImageBckg)} style={styles.imageOutside} imageStyle={styles.imageInside} >
                        <Card style={styles.shopCard}>
                            <Card.Title style={{ margin: 20 }} titleStyle={{ alignSelf: 'center', fontSize: 22 }} title={this.state.name} />
                            <Divider />
                            <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Dirección:" right={Adress} rightStyle={styles.rightText} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Teléfono:" right={PhoneNumber} rightStyle={styles.rightText} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Horarios:" right={Schedule} rightStyle={styles.rightText} />
                            <Divider />
                            <Card.Title titleStyle={styles.leftText} title="Mail:" right={Mail} rightStyle={styles.rightText} />
                        </Card>
                    </ImageBackground>

                    : (this.state.selectedTab === 1) ?
                        <Text>Menu</Text>

                        : (this.state.selectedTab === 2) ?
                            <Text>Promociones</Text>


                            :

                            <ImageBackground source={require(uriImageBckg)} style={styles.imageOutside} imageStyle={styles.imageInside} >

                                <Button
                                    style={styles.buttonStyle}
                                    icon="pencil-outline"
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    onPress={() => { }}>
                                    Editar Perfil
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
    shopCard: {
        width: sizes.wp('91%'),
        height: sizes.hp('70%'),
        marginTop: sizes.hp('2%'),
        elevation: 10,
        borderRadius: 15,
        marginBottom: sizes.hp('3%'),
    },
    rightText: {
        fontSize: 16,
        right: sizes.wp('3%'),
    },
    leftText: {
        fontSize: 18,
    },
    flatListContent: {
        height: sizes.hp('9%'),
        top: sizes.hp('2.5%'),
        marginBottom: sizes.hp('5%')
    },
    textList: {
        fontSize: 16,
        margin: 5,
        alignSelf: 'flex-end'
    },
    imageOutside: {
        alignItems: 'center',
        resizeMode: 'contain',
        width: sizes.wp('100%'),
        height: sizes.hp('100%'),
        marginTop: sizes.hp('39.3%')
    },
    imageInside: {
        opacity: 0.75,
    },
    buttonStyle: {
        marginTop: sizes.hp('18%'),
        width: sizes.wp('50%'),
        height: sizes.hp('5%'),
        justifyContent: 'center'
    },
});
