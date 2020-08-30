import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, sizes, productCondition } from '../../index.styles';
import { Card, FAB, Modal, Portal, Button, Dialog, ActivityIndicator } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import { updateIngredientStatus } from '../../api/menus'
import UserActions from '../../redux/authState/action'
import { Actions } from 'react-native-router-flux';

class IngredientCard extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            photo: 'https://picsum.photos/400',
            visibleModalDetails: false,
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
            const data = await updateIngredientStatus(this.state.status, this.props.data.id, this.props.shop.token)
            this._hideDialogDisabled()
            this.setState({ actionMessage: data.body, loading: false })
            if(data.status === 500 && data.body.error){
                this.props.logout()
                Actions.logsign({visible: true})
            } else if (data.status === 200) {
                this.props.refreshParent()
            }
            this._showDialogResponse()
        }
    }

    _showModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: true }) : null;
    _hideModalDetails = () => (this._isMounted) ? this.setState({ visibleModalDetails: false }) : null;

    _showDialogDisabled = (text) => (this._isMounted) ? this.setState({ visibleDialogDisabled: true, statusMessage: text }) : null;
    _hideDialogDisabled = () => (this._isMounted) ? this.setState({ visibleDialogDisabled: false, statusMessage: '' }) : null;

    _showDialogResponse = () => (this._isMounted) ? this.setState({ visibleDialogResponse: true }) : null;
    _hideDialogResponse = () => (this._isMounted) ? this.setState({ visibleDialogResponse: false }) : null;

    render() {
        return (
            <View>
                <Card style={{ margin: 2, }}>
                    <Card.Content style={{ maxHeight: sizes.hp('17%')}}>
                        <View style={{ flexDirection: 'row', margin: -5 }}>
                            <View style={{ width: sizes.hp('12%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />
                            </View>

                            <View style={{ width: sizes.hp('25%'), alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: sizes.wp('49%'), alignItems: 'center' }}>
                                    <TextTicker style={styles.title}
                                        duration={5000}
                                        loop
                                        animationType='bounce'
                                        repeatSpacer={50}
                                        marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
                                </View>
                                {(this.props.data.detalle) ?
                                    <Text style={styles.details} numberOfLines={5}><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Detalle: </Text>
                                        {this.props.data.detalle}</Text>
                                    : null}

                            </View>

                            <View style={{ width: sizes.hp('7%'), alignItems: 'center', justifyContent: 'center'}}>
                                {(this.props.rute === 'enable') ?
                                    <FAB
                                        style={styles.fabDisabled}
                                        color={colors.APP_MAIN}
                                        icon="cart-remove"
                                        small
                                        onPress={() => {
                                            this.setState({ status: 0 })
                                            this._showDialogDisabled('¿Esta seguro que desea deshabilitar este producto?')
                                        }} />
                                    : (this.props.rute === 'disabled') ?
                                        <FAB
                                            style={styles.fabDisabled}
                                            color={colors.APP_MAIN}
                                            icon="cart-plus"
                                            small
                                            onPress={() => {
                                                this.setState({ status: 1 })
                                                this._showDialogDisabled('¿Esta seguro que desea habilitar este producto?')
                                            }} />
                                        : null
                                }
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                <Portal>
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
    image: {
        width: sizes.wp('25%'),
        height: sizes.hp('11%'),
        borderRadius: 5
    },
    rightSide: {
        borderWidth: 1,
        width: sizes.wp('63%'),
        height: sizes.hp('12%'),
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    details: {
        width: sizes.wp('49%'),
        top: sizes.hp('0.5%'),
        fontSize: 14,
        textAlign: 'left',
    },
    fabDisabled: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
        position: 'absolute'
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCard);