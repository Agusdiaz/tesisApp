import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ListView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { appStyles, colors, sizes } from '../../../index.styles'
import { IconButton, Dialog, Button, Portal, } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Animated from 'react-native-reanimated';
import ChooseShop from './chooseShop'
import ChooseMenu from './chooseMenu'
import OrderSummary from './orderSummary'
import Payment from './payment'
import OrderActions from '../../../redux/orders/action'

const labels = ["Elegir local", "Realizar pedido", "Resumen pedido", "Pagar"];
const customStyles = {
    stepIndicatorSize: 36,
    currentStepIndicatorSize: 45,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 4,
    stepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.APP_MAIN,
    stepStrokeFinishedColor: colors.APP_MAIN,
    stepStrokeUnFinishedColor: colors.APP_INACTIVE,
    separatorFinishedColor: colors.APP_MAIN,
    separatorUnFinishedColor: colors.APP_INACTIVE,
    stepIndicatorFinishedColor: colors.APP_MAIN,
    stepIndicatorUnFinishedColor: '#FFFFFF',
    stepIndicatorCurrentColor: '#FFFFFF',
    stepIndicatorLabelCurrentColor: colors.APP_MAIN,
    stepIndicatorLabelFinishedColor: '#FFFFFF',
    stepIndicatorLabelUnFinishedColor: colors.APP_INACTIVE,
    labelColor: colors.APP_INACTIVE,
    labelSize: 14,
    currentStepLabelColor: colors.APP_MAIN,
}

const HEADER_EXPANDED_HEIGHT = 105
const HEADER_COLLAPSED_HEIGHT = -105

class HorizontalStepIndicator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: (props.pos !== undefined) ? props.pos : 0,
            visibleDialogOut: false,
            animatedValue: new Animated.Value(1),
        }
    }

    /* static getDerivedStateFromProps(props, state) {
        console.log(props.pos)
        if (props.pos !== undefined) {
          return {
            currentPosition: props.pos,
          };
        }
        return null;
      } */

    _showDialogOut = () => this.setState({ visibleDialogOut: true });
    _hideDialogOut = () => this.setState({ visibleDialogOut: false });

    previousStep = () => {
        if (this.state.currentPosition === 1)
            this._showDialogOut()
        else {
            this.setState({ currentPosition: this.state.currentPosition - 1 })
            this.updateScroll()
        }
    }

    nextStep = () => {
        this.setState({ currentPosition: this.state.currentPosition + 1 })
        this.updateScroll()
    }

    updateScroll = () => {
        this.setState({ animatedValue: new Animated.Value(1) })
    }

    render() {
        let translateY = this.state.animatedValue.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT],
            outputRange: [0, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp',
        });
        return (
            <View style={appStyles.container}>
                <Animated.View style={[styles.headerWrapper, { transform: [{ translateY }] }]}>

                    <View style={{ flexDirection: 'row', top: sizes.hp('8%'), left: sizes.wp('-5%'), justifyContent: 'center' }}>

                        {(this.state.currentPosition == 0) ?
                            <IconButton
                                icon='keyboard-backspace'
                                size={50}
                                style={{ left: sizes.wp('1%'), top: sizes.hp('-3.3%') }}
                                color={colors.APP_MAIN}
                                onPress={() => Actions.navbarclient({ page: 0 })}
                            />
                            :
                            null
                        }

                        {(this.state.currentPosition != 0) ?
                            <IconButton
                                style={{ left: sizes.wp('-2%'), top: sizes.hp('-2%') }}
                                icon='chevron-left'
                                color={(this.state.currentPosition !== 3) ? colors.APP_MAIN : colors.APP_INACTIVE}
                                size={40}
                                onPress={(this.state.currentPosition !== 3) ? () => this.previousStep() : null}/>
                            :
                            null
                        }

                        <View style={styles.stepIndicator}>
                            <StepIndicator
                                stepCount={4}
                                direction="horizontal"
                                customStyles={customStyles}
                                currentPosition={this.state.currentPosition}
                                labels={labels}
                            />
                        </View>

                    </View>

                    {(this.state.currentPosition == 0) ?

                        <ChooseShop nextStepParent={this.nextStep}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: { contentOffset: { y: this.state.animatedValue } },
                                    },
                                ],
                                { useNativeDriver: true }
                            )}
                        />

                        : (this.state.currentPosition == 1) ?

                            <ChooseMenu onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: { contentOffset: { y: this.state.animatedValue } },
                                    },
                                ],
                                { useNativeDriver: true }
                            )}
                                updateScrollFromParent={this.updateScroll} />

                            : (this.state.currentPosition == 2) ?

                                <OrderSummary nextStepParent={this.nextStep} />

                                :
                                <Payment/>
                    }

                </Animated.View>

                <Portal>
                    <Dialog
                        visible={this.state.visibleDialogOut}
                        onDismiss={this._hideDialogOut}>
                        <Dialog.Title style={{ alignSelf: 'center' }}>Perderás todo tu progreso, ¿desea continuar?</Dialog.Title>
                        <Dialog.Actions>
                            <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogOut}>Cancelar</Button>
                            <Button color={colors.APP_GREEN} onPress={() => {
                                this._hideDialogOut(), this.setState({ currentPosition: this.state.currentPosition - 1 }),
                                this.props.deleteOrder(), this.updateScroll()
                            }}>Sí</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    arrowButton: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        position: 'absolute',
        top: 31,
        right: 0,
        left: 0
    },
    stepIndicator: {
        top: sizes.hp('-4%'),
        marginLeft: sizes.wp('-2%'),
        height: sizes.hp('15%'),
        width: sizes.wp('70%'),
        justifyContent: "center",
        padding: 5,
    }
});

function mapStateToProps(state) {
    return {
        order: state.order
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteOrder: () => dispatch(OrderActions.deleteOrder()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalStepIndicator);