import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { TextInput, Button, ActivityIndicator, Portal, Modal, Dialog } from 'react-native-paper'
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native-webview';
import { APIURL } from '../../../../assets/constants'

export default function PayOrder() {

    const [idPago, setIdPago] = useState("2")
    const [mail, setMail] = useState('d@mail.com') //useSelector(state => state.authState.client.mail)
    const [total, setTotal] = useState(useSelector(state => state.order.total)+useSelector(state => state.order.propina))
    const [showCheckout, setShowCheckout] = useState(false)
    const [visibleDialogResponse, setVisibleDialogResponse] = useState(false)
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const stateChange = (state) => {
        switch (state.title) {
            case 'success':
                setShowCheckout(false)
                setMessage("¡Pago y pedido realizados exitosamente!")
                setVisibleDialogResponse(true)
                Actions.navbarclient()
                dispatch({type: 'DELETE_ORDER'})
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
        }
    }

    if (!showCheckout) {
        return (
            <View style={[appStyles.container, { top: sizes.hp('4%'), }]} >

        <Text style={styles.totalText}>El total a pagar es {"\n"}<Text style={[styles.totalText, {fontWeight: 'bold'}]}>${total}</Text></Text>

                <Button
                    style={styles.payButton }
                    icon="cash"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={() => setShowCheckout(true)}>
                    Comenzar con el pago
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
                 </Portal>
            </View>
        )
    } else {

        return (
            <View style={{ flex: 1, justifyContent: 'center', top: sizes.hp('0%'), width: sizes.wp('95%') }}>
                <View style={{ height: sizes.hp('79%'), }}>
                <WebView
                    source={{ uri: `${APIURL}payments/checkout/${idPago}/${mail}/${total}` }}
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
        top: sizes.hp('-20%'),
        margin: 20,
        padding: 15,
    },
    payButton: {
        width: sizes.wp('65%'),
        height: sizes.hp('7%'),
        justifyContent: 'center',
        top: sizes.hp('-10%')
    },
});