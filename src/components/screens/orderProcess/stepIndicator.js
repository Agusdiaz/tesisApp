import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { appStyles, colors } from '../../../index.styles';
import { color } from 'react-native-reanimated';

const labels = ["Elegir local", "Realizar pedido", "Resumen del pedido", "Pagar"];
const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 4,
    stepStrokeCurrentColor: colors.APP_MAIN,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.APP_MAIN,
    stepStrokeUnFinishedColor: colors.APP_INACTIVE,
    separatorFinishedColor: colors.APP_MAIN,
    separatorUnFinishedColor: colors.APP_INACTIVE,
    stepIndicatorFinishedColor: colors.APP_GREEN,
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

export default class HorizontalStepIndicator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0
        }
    }

    render() {
        return (
            <View style={styles.stepIndicator}>
            <StepIndicator
                stepCount={4}
                direction="horizontal"
                customStyles={customStyles}
                currentPosition={this.state.currentPosition}
                labels={labels}
                //renderStepIndicator={renderIcon(this.state.currentPosition,'Second')}
            />
            </View>
        )
    }

    onPageChange(position) {
        this.setState({ currentPosition: position });
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
    stepIndicator: {
        marginTop: 100,
        justifyContent: "center",
        padding: 5,
    }
});