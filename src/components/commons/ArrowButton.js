import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { appStyles, colors } from '../../index.styles'
import { Actions } from 'react-native-router-flux';

class ArrowButton extends Component {

	goBack() {
		if (this.props.rute == 'logsign')
			return Actions.logsign()
		if (this.props.rute == 'navBarClientHome')
			//return Actions.navbarclient({ page: 0 })
			return Actions.pop()
		if (this.props.rute == 'navBarClientSearch')
			return Actions.navbarclient({ page: 1 })
		if (this.props.rute == 'navBarClientNotifications')
			return Actions.navbarclient({ page: 2 })
		if (this.props.rute == 'navBarClientProfile')
			return Actions.navbarclient({ page: 3 })
		return null
	}

	render() {
		return (
			<IconButton
				icon='keyboard-backspace'
				size={50}
				style={styles.arrowButton}
				color={colors.APP_MAIN}
				onPress={() => this.goBack()}
			/>
		);
	}
}

const styles = StyleSheet.create({
	arrowButton: {
		justifyContent: 'center',
		alignSelf: 'stretch',
		position: 'absolute',
		top: 30,
		right: 0,
		left: 0
	},
})

export default ArrowButton;