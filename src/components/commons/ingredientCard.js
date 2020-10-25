import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { colors, sizes, productCondition } from '../../index.styles';
import { Card, FAB, Modal, Portal, Button, Dialog, ActivityIndicator, TextInput, Divider, IconButton } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import { updateIngredientStatus, deleteIngredient, modifyIngredient } from '../../api/menus'
import UserActions from '../../redux/authState/action'
import { Actions } from 'react-native-router-flux';

class IngredientCard extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            photo: 'https://picsum.photos/400',
            visibleModalModify: false,
            visibleDialogDisabled: false,
            visibleDialogResponse: false,
            visibleDialogDelete: false,
            statusMessage: '',
            actionMessage: '',
            loading: false,
            status: '',
            nameError: false,
            name: this.props.data.nombre,
            details: (this.props.data.detalle != null) ? this.props.data.detalle : '',
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
            if (data.status === 500 && data.body.error) {
                this.props.logout()
                Actions.logsign({ visible: true })
            } else if (data.status === 200) {
                this.props.refreshParent()
            }
            this.props.showDialogResponse(data.body)
        }
    }

    async deleteIngredient() {
        if (this._isMounted) {
            this.setState({ loading: true })
            const data = await deleteIngredient(this.props.data.id, this.props.shop.cuit, this.props.shop.token, this.props.rute)
            if (data.status === 500 && data.body.error) {
                this.props.logout()
                Actions.logsign({ visible: true })
            } else if (data.status !== 200) {
                this.setState({ loading: false });
                this.props.showDialogResponse(data.body)
            } else {
                this.setState({ loading: false });
                this.props.refreshParent()
                this.props.showDialogResponse(data.body)
            }
        }
    }

    async modifyIngredient() {
        if (this._isMounted) {
            var response = {
                cuit: this.props.shop.cuit,
                ingrediente: {
                    id: this.props.data.id,
                    nombre: this.state.name,
                    detalle: (this.state.details.trim() === "") ? null : this.state.details,
                }
            }
            if (this.props.rute === 'initial') response.inicial
            this.setState({ loading: true })
            const data = await modifyIngredient(response, this.props.shop.token)
            if (data.status === 500 && data.body.error) {
                this.props.logout()
                Actions.logsign({ visible: true })
            } else if (data.status !== 200) {
                var message = (data.body.close) ? data.body.close : data.body;
                this.setState({ loading: false });
                this._hideModalModify()
                this.props.showDialogResponse(message)
            } else {
                this.setState({ loading: false });
                this._hideModalModify()
                this.props.refreshParent()
                this.props.showDialogResponse(data.body)
            }
        }
    }

    validateEmptyText(text) {
        if (text.trim() === "")
            this.setState(() => ({ nameError: true, name: text }))
        else if (text.length > 50)
            Alert.alert('Texto demasiado largo')
        else this.setState(() => ({ nameError: false, name: text }))
    }

    validateTextLength(text) {
        if (text.length > 100)
            Alert.alert('Texto demasiado largo')
        else this.setState({ details: text })
    }

    _showModalModify = () => (this._isMounted) ? this.setState({ visibleModalModify: true }) : null;
    _hideModalModify = () => (this._isMounted) ? this.setState({ visibleModalModify: false }) : null;

    _showDialogDisabled = (text) => (this._isMounted) ? this.setState({ visibleDialogDisabled: true, statusMessage: text }) : null;
    _hideDialogDisabled = () => (this._isMounted) ? this.setState({ visibleDialogDisabled: false, statusMessage: '' }) : null;

    _showDialogDelete = () => (this._isMounted) ? this.setState({ visibleDialogDelete: true }) : null;
    _hideDialogDelete = () => (this._isMounted) ? this.setState({ visibleDialogDelete: false }) : null;

    render() {
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={this._hideModalModify}
        />

        return (
            <View>
                <Card style={{ margin: 2, }}>
                    <Card.Content style={{ maxHeight: sizes.hp('17%') }}>
                        <View style={{ flexDirection: 'row', margin: -5 }}>
                            <View style={{ width: sizes.hp('30%'), alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: sizes.wp('57%'), alignItems: 'center' }}>
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

                            <View style={{ width: sizes.hp('13%'), alignItems: 'center', justifyContent: 'center' }}>
                                {(this.props.rute === 'enable') ?
                                    <View style={{}}>
                                        <FAB
                                            style={[styles.fabDisabled, { alignSelf: 'center' }]}
                                            color={colors.APP_MAIN}
                                            icon="cart-remove"
                                            small
                                            onPress={() => {
                                                this.setState({ status: 0 })
                                                this._showDialogDisabled('¿Esta seguro que desea deshabilitar este ingrediente?')
                                            }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <FAB
                                                style={[styles.fabDisabled, { marginTop: sizes.hp('1.3%'), marginRight: sizes.wp('3%') }]}
                                                color={colors.APP_MAIN}
                                                icon="delete"
                                                small
                                                onPress={this._showDialogDelete} />

                                            <FAB
                                                style={[styles.fabDisabled, { marginTop: sizes.hp('1.3%') }]}
                                                color={colors.APP_MAIN}
                                                icon="pencil"
                                                small
                                                onPress={this._showModalModify} />
                                        </View>
                                    </View>
                                    : (this.props.rute === 'disabled') ?
                                        <FAB
                                            style={styles.fabDisabled}
                                            color={colors.APP_MAIN}
                                            icon="cart-plus"
                                            small
                                            onPress={() => {
                                                this.setState({ status: 1 })
                                                this._showDialogDisabled('¿Esta seguro que desea habilitar este ingrediente?')
                                            }} />
                                        : (this.props.rute === 'initial') ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <FAB
                                                    style={[styles.fabDisabled, { marginRight: sizes.wp('3%') }]}
                                                    color={colors.APP_MAIN}
                                                    icon="delete"
                                                    small
                                                    onPress={this._showDialogDelete} />

                                                <FAB
                                                    style={styles.fabDisabled}
                                                    color={colors.APP_MAIN}
                                                    icon="pencil"
                                                    small
                                                    onPress={this._showModalModify} />
                                            </View>
                                            : null
                                }
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModalModify} dismissable={false}>
                        <Card style={styles.ingredientCard}>
                            <Card.Title style={{ margin: -10, marginTop: sizes.hp('-3') }} right={Close} rightStyle={styles.close} />
                            <Divider />
                            <Card.Title title='Modificá tu ingrediente' style={{ alignSelf: 'center' }} titleStyle={styles.titleText} titleNumberOfLines={2} />
                            <Divider />
                            <Card.Content style={{ alignItems: 'center', marginTop: sizes.hp('1%'), height: sizes.hp('22%'), }}>
                                <View style={{ alignItems: 'center', position: 'absolute', }}>
                                    <TextInput
                                        style={styles.inputView}
                                        mode='outlined'
                                        label='Nombre del Ingrediente'
                                        placeholder="Nombre"
                                        error={this.state.nameError}
                                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                        onChangeText={text => this.validateEmptyText(text)}
                                        value={this.state.name}
                                    />

                                    <TextInput
                                        style={[styles.inputView, { height: sizes.hp('10%') }]}
                                        mode='outlined'
                                        label='OPCIONAL - Detalles'
                                        multiline
                                        numberOfLines={5}
                                        placeholder='Detalles'
                                        theme={{ colors: { text: colors.TEXT_INPUT, primary: colors.APP_MAIN } }}
                                        onChangeText={(text) => this.validateTextLength(text)}
                                        value={this.state.details} />
                                </View>
                            </Card.Content>
                            <Divider />
                            <Card.Actions style={{ justifyContent: 'space-between', alignSelf: 'center', marginBottom: -10 }}>
                                <Button
                                    style={{}}
                                    mode="contained"
                                    color={colors.APP_MAIN}
                                    disabled={this.state.name === ''}
                                    onPress={() => this.modifyIngredient()}>
                                    Modificar
 				                </Button>
                            </Card.Actions>
                        </Card >
                    </Modal>

                    <Dialog
                        visible={this.state.visibleDialogDelete}
                        onDismiss={this._hideDialogDelete}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>Es posible que se eliminen productos y/o promociones que contengan este ingrediente</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('4%') }} color={colors.APP_RED} onPress={() => this._hideDialogDelete()}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialogDelete()
                                this.deleteIngredient()
                            }}>Continuar</Button>
                        </Dialog.Actions>
                    </Dialog>

                    <Dialog
                        style={{}}
                        visible={this.state.visibleDialogDisabled}
                        onDismiss={this._hideDialogDisabled}>
                        <Dialog.Title style={{ alignSelf: 'center', textAlign: 'center' }}>{this.state.statusMessage}</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogDisabled}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => this.updateStatus()}>Sí</Button>
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
        marginTop: sizes.hp('-12%'),
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
        width: sizes.wp('57%'),
        top: sizes.hp('0.5%'),
        fontSize: 14,
        textAlign: 'center',
    },
    fabDisabled: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
    },
    ingredientCard: {
        width: sizes.wp('90%'),
        elevation: 0
    },
    close: {
        left: sizes.wp('-2%')
    },
    inputView: {
        width: sizes.wp('60%'),
        marginTop: sizes.hp('0%'),
        marginBottom: sizes.hp('1%'),
        justifyContent: "center",
        padding: 5,
    },
    titleText: {
        color: colors.APP_MAIN,
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5
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