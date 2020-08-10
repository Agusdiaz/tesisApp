import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, sizes, productCondition } from '../../index.styles';
import { Card, FAB, Modal, Portal, Button, Dialog, ActivityIndicator } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import { updateIngredientStatus } from '../../api/menus'
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
            if (data.status === 200) {
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

        const pic = props => <Image source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />

        const NamePrice = props => <View style={{width: sizes.wp('43%'), alignItems: 'center'}}>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
            <Text style={styles.subtitle}>{(this.props.data.precio) ? '$'+(this.props.data.precio) : null}</Text>
        </View>

        return (
            <View>
                <Card style={{ maxHeight: sizes.hp('18%')  }}>
                    <Card.Title left={pic} leftStyle={{ marginLeft: sizes.wp('-1%'), marginTop: sizes.hp('6%') }}
                        right={NamePrice} rightStyle={styles.rightSide} />
                    {(this.props.data.detalle) ? 
                    <Card.Content style={{ alignItems: 'center', marginTop: 2 }}>
                     <Text style={styles.details} numberOfLines={4}><Text style={{fontWeight: 'bold', fontSize: 17}}>Detalle: </Text>
                        {this.props.data.detalle}</Text>
                        </Card.Content>
                        : null}
                    
                    <Card.Actions >

                        {(this.props.rute === 'enable') ?
                            <FAB
                                style={[styles.fabDisabled, {bottom: (this.props.data.detalle) ? sizes.hp('11%') : sizes.hp('2.5')}]}
                                color={colors.APP_MAIN}
                                icon="cart-remove"
                                small
                                onPress={() => {
                                    this.setState({ status: 0 })
                                    this._showDialogDisabled('¿Esta seguro que desea deshabilitar este producto?')
                                }} />
                            :
                            <FAB
                                style={[styles.fabDisabled, {bottom: (this.props.data.detalle) ? sizes.hp('11%') : sizes.hp('2.5')}]}
                                color={colors.APP_MAIN}
                                icon="cart-plus"
                                small
                                onPress={() => {
                                    this.setState({ status: 1 })
                                    this._showDialogDisabled('¿Esta seguro que desea habilitar este producto?')
                                }} />
                            }

                    </Card.Actions>
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
        width: sizes.wp('30%'),
        height: sizes.hp('13%'),
        borderRadius: 5
    },
    rightSide: {
        right: sizes.wp('23%'),
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        top: sizes.hp('-0.1%'),
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        right: sizes.wp('-33%'),
        top: sizes.hp('-2.1%'),
        width: sizes.wp('15%'),
    },
    details: {
        width: sizes.wp('43%'),
        top: sizes.hp('-3.5%'),
        fontSize: 16,
        textAlign: 'left',
        left: sizes.wp('7%'),
    },
    fabDisabled: {
        backgroundColor: '#FFFFFF', 
        borderColor: colors.APP_MAIN, 
        borderWidth: 2, 
        left: sizes.wp('82%'),
    },
});

function mapStateToProps(state) {
    return {
        shop: state.authState.shop
    };
}

export default connect(mapStateToProps)(IngredientCard);