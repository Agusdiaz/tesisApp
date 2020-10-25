import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { Button, ActivityIndicator, Portal, Modal, Dialog, IconButton } from 'react-native-paper'
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native-webview';
import { APIURL } from '../../../../assets/constants'
import { deleteOrder } from '../../../api/orders'

export default function PayOrder() {
    const [number] = useState(useSelector(state => state.order.numero))
    const [mail] = useState(useSelector(state => state.order.mail))
    const [cuit] = useState(useSelector(state => state.order.cuit))
    const [total] = useState(useSelector(state => state.order.total) + useSelector(state => state.order.propina))
    const [token] = useState(useSelector(state => state.authState.client.token))
    const [showCheckout, setShowCheckout] = useState(false)
    const [visibleDialogResponse, setVisibleDialogResponse] = useState(false)
    const [visibleDialogCancel, setVisibleDialogCancel] = useState(false)
    const [message, setMessage] = useState('')
    const [seconds, setSeconds] = useState('00')
    const [minutes, setMinutes] = useState(null)
    const [payed, setPayed] = useState(false)
    const dispatch = useDispatch()

    const deleteClientOrder = async () => {
        const data = await deleteOrder(number, token)
        dispatch({ type: 'DELETE_ORDER' })
    }

    const stateChange = (state) => {
        switch (state.title) {
            case 'success':
                setShowCheckout(false)
                setPayed(true)
                setMessage("¡Pago y pedido realizados exitosamente!")
                setVisibleDialogResponse(true)
                Actions.navbarclient()
                dispatch({ type: 'DELETE_ORDER' })
                break;
            case 'pending':
                setShowCheckout(false)
                setMessage("Pago pendiente")
                setVisibleDialogResponse(true)
                break;
            case 'failure':
                setShowCheckout(false)
                setMessage("Pago rechazado. Inténtalo nuevamente")
                setVisibleDialogResponse(true)
                break;
            case 'invalid':
                setShowCheckout(false)
                deleteClientOrder()
                dispatch({ type: 'LOGOUT' })
                Actions.logsign({ visible: true })
                break;
            case '¿En cuántas cuotas?':
                setPayed(true)
                break;
        }
    }

    const cancelOrder = async () => {
        const data = await deleteOrder(number, token)
        if (data.status === 500) {
            setMessage(data.body)
            setVisibleDialogResponse(true)
        } else {
            dispatch({ type: 'DELETE_ORDER' })
            setMessage(data.body)
            setVisibleDialogResponse(true)
            Actions.navbarclient()
        }
    }

    const goBack = () => {
        setMinutes(null)
        setShowCheckout(false)
    }

    useEffect(() => {
        if (minutes === '00' && seconds === '00') {
            setMinutes(null)
            if (!payed) {
                deleteClientOrder()
                setShowCheckout(false)
                setMessage("El tiempo para realizar el pago ha caducado. Vuelva a hacer el pedido")
                setVisibleDialogResponse(true)
                Actions.navbarclient()
            }
        }
        if (minutes === null) return
        const interval = setInterval(() => {
            var num = (Number(seconds) - 1).toString()
            var count = minutes;
            if (Number(seconds) === 0) {
                count = (Number(minutes) - 1).toString()
                num = '59'
            }
            setSeconds(num.length === 1 ? '0' + num : num)
            setMinutes(count.length === 1 ? '0' + count : count)
        }, 1000);
        return () => clearInterval(interval)
    }, [seconds, minutes])

    if (!showCheckout) {
        return (
            <View style={[appStyles.container, { top: sizes.hp('4%'), }]} >

                <Text style={styles.totalText}>El total a pagar es {"\n"}<Text style={[styles.totalText, { fontWeight: 'bold' }]}>${total}</Text></Text>

                <Button
                    style={styles.payButton}
                    icon="cash"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => { setShowCheckout(true), setMinutes('10'), setSeconds('00') }}>
                    Comenzar con el pago
 				</Button>

                <Button
                    style={styles.payButton}
                    icon="cancel"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => setVisibleDialogCancel(true)}>
                    Cancelar pedido
 				</Button>

                <Portal>
                    <Dialog
                        visible={visibleDialogResponse}
                        onDismiss={() => setVisibleDialogResponse(false)}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{message}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={() => setVisibleDialogResponse(false)}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={visibleDialogCancel}
                        onDismiss={() => setVisibleDialogCancel(false)}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>¿Esta seguro que desea cancelar su pedido?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('10%') }} color={colors.APP_RED} onPress={() => setVisibleDialogCancel(false)}>No</Button>
                            <Button color={colors.APP_GREEN} onPress={() => { setVisibleDialogCancel(false), cancelOrder() }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', top: sizes.hp('-1.5%'), width: sizes.wp('95%') }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: sizes.hp('5%') }}>
                    <Text style={styles.timer}>Tiempo restante: {(minutes === null) ? '00' : minutes}:{seconds}</Text>
                    <IconButton
                        icon='close'
                        size={30}
                        style={styles.arrowButton}
                        color={colors.APP_MAIN}
                        onPress={goBack}
                    />
                </View>

                <View style={{ height: sizes.hp('74%'), }}>
                    <WebView
                        source={{
                            uri: `${APIURL}payments/checkout/${number}/${mail}/${total}/${cuit}`,
                            headers: { 'Authorization': token },
                        }}
                        onNavigationStateChange={(event) => {
                            stateChange(event)
                        }}
                        startInLoadingState={true}
                        renderLoading={() => <Portal>
                            <Modal dismissable={false}
                                visible={true}
                                style={styles.modalActivityIndicator} >
                                <ActivityIndicator
                                    animating={true}
                                    size={60}
                                    color={colors.APP_MAIN}
                                />
                            </Modal>
                        </Portal>}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    totalText: {
        fontSize: 40,
        textAlign: 'center',
        color: colors.APP_MAIN,
        top: sizes.hp('-10%'),
        margin: 20,
        padding: 15,
    },
    payButton: {
        height: sizes.hp('5%'),
        justifyContent: 'center',
        top: sizes.hp('0%'),
        marginBottom: sizes.hp('10%')
    },
    timer: {
        fontSize: 22,
        color: colors.APP_MAIN,
        textAlign: 'center',
    },
});