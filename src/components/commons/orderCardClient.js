import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Button, Card, Title, Dialog, IconButton, Divider, FAB, TextInput } from 'react-native-paper';
import { Fab } from 'material-bread';

const orderNumber = props => <Text style={styles.rightText}> 10 </Text>

const total = props => <Text style={styles.rightText}> $10 </Text>

const time = props => <Text style={styles.rightText}> 20 min </Text>

class OrderCardShop extends Component {
    constructor() {
        super();
        this.state = { //PONER METODO PARA SABER EL ESTADO
            orderNumber: 7856,
            isReady: true,
            total: '$1500',
            time: '20 min',
            mailShare:'',
            visibleDialogTake: false,  
            visibleDialogShare: false,
        };
    }

    _showDialogTake = () => this.setState({ visibleDialogTake: true });

    _hideDialogTake = () => this.setState({ visibleDialogTake: false });

    _showDialogShare = () => this.setState({ visibleDialogShare: true });

    _hideDialogShare = () => this.setState({ visibleDialogShare: false });

    render() {

        const orderNumber = props => <Text style={styles.rightText}> {this.state.orderNumber} </Text>

        const stateOrder = props => (this.state.isReady) ? <Button style={{ borderRadius: 20, width: sizes.wp('30%'), marginRight: sizes.wp('2%') }} mode="contained" color={colors.APP_GREEN} labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
            Listo </Button> : <Button style={{ borderRadius: 20, width: sizes.wp('30%'), marginRight: sizes.wp('2%') }} mode="contained" color={colors.APP_PENDING} labelStyle={{ fontSize: 11, color: '#FFF' }} contentStyle={{ width: sizes.wp('50%'), alignSelf: 'center' }} >
                En proceso </Button>

        const total = props => <Text style={styles.rightText}> {this.state.total} </Text>

        const time = props => <Text style={styles.rightText}> {this.state.time} </Text>


        return (

            <View>
               
            <Card style={styles.cardContent}>
                
                <ImageBackground source={require('../../icons/ticket.jpg')} style={styles.imageOutside} imageStyle={styles.imageInside} >
                    
                    <Card.Title style={{marginTop: 10}} titleStyle={styles.leftText} title="Número del pedido:" right={orderNumber} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Estado:" right={stateOrder} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Total:" right={total} />
                    <Divider style={styles.divider} />
                    <Card.Title style={styles.cardTitle} titleStyle={styles.leftText} title="Tiempo desde creación:" right={time} />
                    <Divider style={styles.divider} />
                    <Card.Actions style={{ margin: 5 }}>

                        <Button
                            style={{ left: sizes.wp('0%'), width: '38%' }} //ESTANDARIZAR
                            icon="eye"
                            mode="contained"
                            color={colors.APP_MAIN}
                            onPress={() => { }}>
                            Ver Detalle
                        </Button>

                        <Button
                            style={{ left: sizes.wp('5%'), width: '38%' }} //ESTANDARIZAR
                            icon="cart-arrow-right"
                            mode="contained"
                            disabled={!this.state.isReady}
                            color={colors.APP_MAIN}
                            onPress={this._showDialogTake}>
                            Lo retiré
                        </Button>
                        
                        <FAB small icon='share-variant' color={'#FFFFFF'} 
                        style={{backgroundColor: (!this.state.isReady) ? colors.APP_MAIN : colors.APP_INACTIVE_FAB, left: sizes.hp('5%')}}
                        disabled={this.state.isReady}
                        onPress={this._showDialogShare}
                        />
                    </Card.Actions>
                </ImageBackground>

                <Dialog
                    visible={this.state.visibleDialogTake}
                    onDismiss={this._hideDialogTake}>
                    <Dialog.Title style={{ alignSelf: 'center' }}>¿Ya tenés tu pedido?</Dialog.Title>
                    <Dialog.Actions>
                        <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogTake}>No</Button>
                        <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Sí</Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog
                    style={{margin: 5}}
                    visible={this.state.visibleDialogShare}
                    onDismiss={this._hideDialogShare}>
                    <Dialog.Title style={{ alignSelf: 'center' }}>¡Podés compartir tu pedido!</Dialog.Title>
                    <Dialog.Content style={{alignItems: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 14}}>Solo tenés que ingresar el mail de alguien que también sea un usuario:</Text>
                        <TextInput
					style={styles.inputView}
					mode='outlined'
					label='Mail'
					placeholder="ejemplo@mail.com"
					theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
					onChangeText={(mailShare) => this.setState({ mailShare })}
					value={this.state.mailShare}/>
                    </Dialog.Content>
                    <Dialog.Actions style={{marginTop: sizes.hp('-2%')}}>
                        <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogShare}>Cancelar</Button>
                        <Button color={colors.APP_GREEN} onPress={() => console.log("Ok")}>Compartir</Button>
                    </Dialog.Actions>
                </Dialog>

            </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContent: {
        padding: 7,
        borderRadius: 15,
        elevation: 5,
    },
    cardTitle: {
        margin: -9
    },
    divider: {

    },
    rightText: {
        fontSize: 16,
        right: sizes.wp('3%'),
    },
    leftText: {
        fontSize: 18,
    },
    imageOutside: {
        resizeMode: 'contain',
    },
    imageInside: {
        opacity: 0.3,
        borderRadius: 15
    },
    inputView: {
        marginTop: sizes.hp('1%'),
		width: "90%",
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 8,
		fontSize: sizes.TEXT_INPUT,
	},  
});

export default OrderCardShop;