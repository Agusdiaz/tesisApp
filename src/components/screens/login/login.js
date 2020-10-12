import React, { Component, useState, useEffect, useRef } from 'react';
//import { connect } from 'react-redux';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LoginActions from '../../../redux/authState/action'
import { TextInput, Button, ActivityIndicator, Modal, Dialog, Paragraph } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ArrowButton from '../../commons/arrowButton'
import { Actions } from 'react-native-router-flux';
import { login, setShopDevice, setClientDevice } from '../../../api/users'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';



import { useSelector, useDispatch } from 'react-redux';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function LoginScreen() {
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [messageError, setMessageError] = useState('')
    const [deviceId, setDeviceId] = useState('')
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setDeviceId(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const saveItem = async (item, selectedValue) => {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    const _login = async () => {
        setLoading(true)
        setTimeout(() => { setLoading(false) }, 3500); //5000
        const data = await login(email, password)
        if (data.status === 500 || data.status === 404) {
            setLoading(false)
            setEmail('')
            setPassword('')
            setMessageError(data.body)
            setVisibleDialog(true)
        } else if (data.status === 401) {
            setLoading(false)
            setPassword('')
            setMessageError(data.body)
            setVisibleDialog(true)
        } else {
            setLoading(false)
            saveItem('id_token', data.body.token)
            if (data.body.cuit === undefined) {
                const notif = await setClientDevice(email, deviceId)
                saveItem('profile', 'client')
                dispatch({ type: 'LOGIN_CLIENT', payload: { mail: data.body.mail, name: data.body.nombre, lastName: data.body.apellido, token: data.body.token } })
                Actions.navbarclient()
            } else if (data.body.nuevo === 0) {
                const notif = await setShopDevice(data.body.cuit, deviceId)
                saveItem('profile', 'shop')
                dispatch({
                    type: 'LOGIN_SHOP', payload: {
                        cuit: data.body.cuit, nombre: data.body.nombre, direccion: data.body.direccion, telefono: data.body.telefono,
                        mail: data.body.mail, mascotas: data.body.mascotas, bebes: data.body.bebes, juegos: data.body.juegos, aireLibre: data.body.aireLibre, libreHumo: data.body.libreHumo,
                        wifi: data.body.wifi, demora: data.body.demora, abierto: data.body.abierto, horarios: data.body.horarios, token: data.body.token,
                    }
                })
                Actions.navbarshop()
            } else {
                const notif = await setShopDevice(data.body.cuit, deviceId)
                saveItem('profile', 'newShop')
                dispatch({
                    type: 'LOGIN_SHOP', payload: {
                        cuit: data.body.cuit, nombre: data.body.nombre, direccion: data.body.direccion, telefono: data.body.telefono,
                        mail: data.body.mail, mascotas: data.body.mascotas, bebes: data.body.bebes, juegos: data.body.juegos, aireLibre: data.body.aireLibre, libreHumo: data.body.libreHumo,
                        wifi: data.body.wifi, demora: data.body.demora, abierto: data.body.abierto, horarios: data.body.horarios, token: data.body.token,
                    }
                })
                Actions.signupshopfeatures()
            }
            setEmail('')
            setPassword('')
        }
    }

    return (
        <KeyboardAvoidingView style={appStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? -150 : -100}>
            <ArrowButton rute={'logsign'} />

            <Image source={require('../../../icons/flammaPic.png')} style={styles.imageLogo} />

            <TextInput
                style={styles.inputView}
                mode='outlined'
                label='Email'
                placeholder="ejemplo@mail.com"
                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.inputView}
                mode='outlined'
                label='Contraseña'
                secureTextEntry={true}
                placeholder="Contraseña"
                theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            <TouchableOpacity>
                <Text style={{ color: colors.APP_MAIN, fontSize: 12 }}>¿Has olvidado tu contraseña?</Text>
            </TouchableOpacity>

            <Button
                style={{ top: sizes.hp('-13%') }}
                icon="send"
                mode="contained"
                color={colors.APP_MAIN}
                disabled={(email != '' && password != '') ? false : true}
                onPress={() => _login()}>
                INICIAR SESIÓN
             </Button>

            <Dialog
                style={{ width: sizes.wp('70%'), alignSelf: 'center' }}
                visible={visibleDialog}
                onDismiss={() => setVisibleDialog(false)}>
                <Dialog.Title style={{ alignSelf: 'center' }}>Error</Dialog.Title>
                <Dialog.Content style={{ alignItems: 'center' }}><Paragraph style={{ textAlign: 'center', fontWeight: 'bold' }}>{messageError}</Paragraph></Dialog.Content>
                <Dialog.Actions>
                    <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={() => setVisibleDialog(false)}>Ok</Button>
                </Dialog.Actions>
            </Dialog>

            <Modal dismissable={false}
                visible={loading}
                style={styles.modalActivityIndicator} >
                <ActivityIndicator
                    animating={loading}
                    size={60}
                    color={colors.APP_MAIN}
                />
            </Modal>

        </KeyboardAvoidingView>
    );
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

const styles = StyleSheet.create({
    imageLogo: {
        width: sizes.wp('50%'),
        height: sizes.hp('48%'),
        top: sizes.hp('-10%'),
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        width: sizes.wp('80%'),
        height: sizes.hp('5%'),
        top: sizes.hp('-13%'),
        marginBottom: 20,
        justifyContent: "center",
        padding: 5,
        fontSize: sizes.TEXT_INPUT,
    },
    modalActivityIndicator: {
        alignItems: 'center',
        backgroundColor: '#00000040'
    },
});