import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { appStyles, colors, sizes } from '../../../index.styles';
import { IconButton, Dialog, Button, Portal, } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Animated from 'react-native-reanimated';
import ChooseShop from '../orderProcess/chooseShop'
import ChooseMenu from '../orderProcess/chooseMenu'
import OrderSummary from '../orderProcess/orderSummary'

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
    //stepIndicatorLabelFontSize: 15,
    //currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.APP_MAIN,
    stepIndicatorLabelFinishedColor: '#FFFFFF',
    stepIndicatorLabelUnFinishedColor: colors.APP_INACTIVE,
    labelColor: colors.APP_INACTIVE,
    labelSize: 14,
    currentStepLabelColor: colors.APP_MAIN,
}

const HEADER_EXPANDED_HEIGHT = 105
const HEADER_COLLAPSED_HEIGHT = -105

export default class HorizontalStepIndicator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: (this.props.pos != null) ? this.props.pos : 0,
            visibleDialogOut: false,
            animatedValue: new Animated.Value(0),
        }
    }

    _showDialogOut = () => this.setState({ visibleDialogOut: true });
    _hideDialogOut = () => this.setState({ visibleDialogOut: false });

    previousStep = () => {
        this.setState({ currentPosition: this.state.currentPosition - 1 })
        this.updateScroll()
    }

    nextStep = () => {
        this.setState({ currentPosition: this.state.currentPosition + 1 })
        this.updateScroll()
    }

    onPageChange(position) {
        this.setState({ currentPosition: position });
    }

    updateScroll = () => {
        this.setState({ animatedValue: new Animated.Value(0)})
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
                    <Portal>
                        <Dialog
                            visible={this.state.visibleDialogOut}
                            onDismiss={this._hideDialogOut}>
                            <Dialog.Title style={{ alignSelf: 'center' }}>Perderás todo tu progreso, ¿desea continuar?</Dialog.Title>
                            <Dialog.Actions>
                                <Button style={{ marginRight: sizes.wp('3%') }} color={colors.APP_RED} onPress={this._hideDialogOut}>Cancelar</Button>
                                <Button color={colors.APP_GREEN} onPress={() => { this._hideDialogOut(), Actions.navbarclient({ page: 0 }) }}>Sí</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>

                    <View style={{ flexDirection: 'row', top: sizes.hp('8%'), left: sizes.wp('-5%'), justifyContent: 'center' }}>

                        {(this.state.currentPosition == 0) ?
                            <IconButton
                                icon='keyboard-backspace'
                                size={50}
                                style={{ left: sizes.wp('1%'), top: sizes.hp('-3.3%') }}
                                color={colors.APP_MAIN}
                                onPress={this._showDialogOut}
                            />
                            :
                            null
                        }

                        {(this.state.currentPosition != 0) ?
                            <IconButton
                                style={{ left: sizes.wp('-2%'), top: sizes.hp('-2%') }}
                                icon='chevron-left'
                                color={colors.APP_MAIN}
                                size={40}
                                onPress={() => this.previousStep()} />
                            :
                            null
                        }

                        <View style={[styles.stepIndicator]}>
                            <StepIndicator
                                stepCount={4}
                                direction="horizontal"
                                customStyles={customStyles}
                                currentPosition={this.state.currentPosition}
                                labels={labels}
                            //renderStepIndicator={renderIcon(this.state.currentPosition,'Second')}
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
                            updateScrollFromParent = {this.updateScroll} />

                            : (this.state.currentPosition == 2) ?

                                <OrderSummary nextStepParent={this.nextStep}/>

                                :
                                <Text>Pagar</Text>
                    }

                </Animated.View>
            </View>
        )
    }
}

/*function renderIcon(position, stepStatus){
  if(position == 0){
    return 'map-search-outline'
  }
  if(position == 1){

  }
  if(position == 2){

  }
  if(position == 3){

  }
}*/

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