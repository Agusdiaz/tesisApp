import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, sizes, productCondition } from '../../index.styles';
import { Card, FAB, Modal, Portal, Button, Dialog, ActivityIndicator } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import ProductDetails from './productDetails'
import ProductDetailsOrder from './productDetailsOrder'
import { updateProductStatus } from '../../api/menus'
import { Actions } from 'react-native-router-flux';

class ProductCard extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            photo: 'https://picsum.photos/400',
            visibleModalDetails: false,
            visibleModalOrder: false,
            visibleDialogDisabled: false,
            visibleDialogResponse: false,
            statusMessage: '',
            actionMessage: '',
            loading: false,
            status: '',
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async updateStatus() {
        if (this._isMounted) {
            this.setState({ loading: true })
            const data = await updateProductStatus(this.state.status, this.props.data.id, this.props.shop.token)
            this._hideDialogDisabled()
            this.setState({ actionMessage: data.body, loading: false })
            if (data.status === 200) {
                this.props.refreshParent()
            }
            this._showDialogResponse()
        }
    }

    _showModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: true }) : null;
    _hideModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: false }) : null;

    _showModalOrder = () => (this._isMounted) ? this.setState({ visibleModalOrder: true }) : null;
    _hideModalOrder = () => (this._isMounted) ? this.setState({ visibleModalOrder: false }) : null;

    _showDialogDisabled = (text) => (this._isMounted) ? this.setState({ visibleDialogDisabled: true, statusMessage: text }) : null;
    _hideDialogDisabled = () => (this._isMounted) ? this.setState({ visibleDialogDisabled: false, statusMessage: '' }) : null;

    _showDialogResponse = () => (this._isMounted) ? this.setState({ visibleDialogResponse: true }) : null;
    _hideDialogResponse = () => (this._isMounted) ? this.setState({ visibleDialogResponse: false }) : null;

    render() {
        const pic = props => <Image source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />

        const NamePrice = props => <View>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
            <Text style={styles.subtitle}>${this.props.data.precio}</Text>
        </View>

        return (
            <View>
                <Card style={{ height: (this.props.data.condicion === null) ? sizes.hp('15%') : sizes.hp('19%'), }}>
                    <Card.Actions style={{ alignSelf: 'flex-end', margin: -2 }} >
                        {(this.props.data.condicion !== null) ?
                            <Button style={{}}
                                mode="contained"
                                dark
                                color={(this.props.data.condicion == productCondition.VEGAN) ? colors.VEGAN : (this.props.data.condicion === productCondition.CELIAC) ?
                                    colors.CELIAC : colors.VEGETARIAN} > {this.props.data.condicion}
                            </Button>
                            :
                            null}

                    </Card.Actions>
                    <Card.Title left={pic} leftStyle={{ marginLeft: sizes.wp('-1%'), marginTop: (this.props.data.condicion === null) ? sizes.hp('3.9%') : sizes.hp('0.5%'), }}
                        right={NamePrice} rightStyle={styles.rightSide} />
                    <Card.Actions style={styles.actionStyles}>
                        <FAB
                            style={{
                                backgroundColor: '#FFFFFF', borderColor: colors.APP_MAIN, borderWidth: 2, marginLeft: (this.props.rute === 'shop' || this.props.rute === 'disabled')
                                    ? sizes.wp('-23%') : sizes.wp('22%')
                            }}
                            color={colors.APP_MAIN}
                            icon="eye"
                            small
                            onPress={() => {
                                (this.props.rute === 'order') ?
                                    this._showModalOrder()
                                    : this._showModalDetails()
                            }}
                        />

                        {(this.props.rute === 'shop') ?
                            <FAB
                                style={{ backgroundColor: '#FFFFFF', borderColor: colors.APP_MAIN, borderWidth: 2, marginLeft: sizes.wp('34%') }}
                                color={colors.APP_MAIN}
                                icon="cart-remove"
                                small
                                onPress={() => {
                                    this.setState({ status: 0 })
                                    this._showDialogDisabled('¿Esta seguro que desea deshabilitar este producto?')
                                }} />
                            :
                            null
                        }

                        {(this.props.rute === 'disabled') ?
                            <FAB
                                style={{ backgroundColor: '#FFFFFF', borderColor: colors.APP_MAIN, borderWidth: 2, marginLeft: sizes.wp('34%') }}
                                color={colors.APP_MAIN}
                                icon="cart-plus"
                                small
                                onPress={() => {
                                    this.setState({ status: 1 })
                                    this._showDialogDisabled('¿Esta seguro que desea habilitar este producto?')
                                }} />
                            :
                            null
                        }

                    </Card.Actions>
                </Card>

                <Portal>
               
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalDetails} onDismiss={this._hideModalDetails}>
                        <ProductDetails hideModalFromChild={this._hideModalDetails} data={this.props.data} />
                    </Modal>

                    <Modal contentContainerStyle={[styles.modalView, {height: sizes.hp('88%')}]} visible={this.state.visibleModalOrder} onDismiss={this._hideModalOrder}>
                        <ProductDetailsOrder hideModalFromChild={this._hideModalOrder} data={this.props.data} />
                    </Modal>


                    <Dialog
                        visible={this.state.visibleDialogDisabled}
                        onDismiss={this._hideDialogDisabled}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.statusMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogDisabled}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => this.updateStatus()}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        visible={this.state.visibleDialogResponse}
                        onDismiss={this._hideDialogResponse}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.actionMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={'#000000'} onPress={this._hideDialogResponse}>Ok</Button>
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
                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        marginTop: sizes.hp('5%'),
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
    image: {
        width: sizes.wp('30%'),
        height: sizes.hp('13%'),
        borderRadius: 5
    },
    rightSide: {
        width: sizes.wp('60%'),
        height: sizes.hp('7%'),
        marginRight: sizes.wp('3.5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
    },
    actionStyles: {
        right: sizes.wp('-60%'),
        bottom: sizes.hp('2%'),
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

export default connect(mapStateToProps)(ProductCard);