import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { appStyles, colors } from '../../../src/index.styles'

class ArrowButton extends Component {

  render() {
    return (
        <IconButton
					icon='keyboard-backspace'
					size={50}
					style={styles.arrowButton}
					color={colors.APP_MAIN}
					onPress={() => this.toggleSnack}   //{() => navigation.navigate('Login')}
				/>
    );
  }
}

const styles = StyleSheet.create({
    arrowButton: {
		//marginTop: 10,
		justifyContent: 'space-evenly',
		alignSelf: 'stretch',
		//bottom: 50,
		position: 'absolute',
		top: 30,
		right: 0, 
		left: 0
	},
})

export default ArrowButton;