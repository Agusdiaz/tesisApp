import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { TextInput, Button, ActivityIndicator, Portal, Modal, Dialog } from 'react-native-paper'
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
    const dispatch = useDispatch()

    const stateChange = (state) => {
        switch (state.title) {
            case 'success':
                setShowCheckout(false)
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
            case 'invalid':
                setShowCheckout(false)
                dispatch({ type: 'DELETE_ORDER' })
                dispatch({type: 'LOGOUT'})
                Actions.logsign({ visible: true })
                break;
        }
    }

    const cancelOrder = async () => {
        const data = await deleteOrder(number, token)
        if(data.status === 500){
            setMessage(data.body)
            setVisibleDialogResponse(true)
        } else {
            dispatch({ type: 'DELETE_ORDER' })
            setMessage(data.body)
            setVisibleDialogResponse(true)
            Actions.navbarclient()
        }
    }

    if (!showCheckout) {
        return (
            <View style={[appStyles.container, { top: sizes.hp('4%'), }]} >

                <Text style={styles.totalText}>El total a pagar es {"\n"}<Text style={[styles.totalText, { fontWeight: 'bold' }]}>${total}</Text></Text>

                <Button
                    style={styles.payButton}
                    icon="cash"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => setShowCheckout(true)}>
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
                        <Dialog.Title style={{ alignSelf: 'center', textAlign:'center' }}>¿Esta seguro que desea cancelar su pedido?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('10%') }} color={colors.APP_RED} onPress={() => setVisibleDialogCancel(false)}>No</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {setVisibleDialogCancel(false), cancelOrder()}}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    } else {

        return (
            <View style={{ flex: 1, justifyContent: 'center', top: sizes.hp('0%'), width: sizes.wp('95%') }}>
                <View style={{ height: sizes.hp('79%'), }}>
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
        //width: sizes.wp('65%'),
        height: sizes.hp('5%'),
        justifyContent: 'center',
        top: sizes.hp('0%'),
        marginBottom: sizes.hp('10%')
    },
});