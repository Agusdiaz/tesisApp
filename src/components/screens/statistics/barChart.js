import React from 'react'
import { BarChart, XAxis } from 'react-native-svg-charts'
import { StyleSheet, View, Text } from 'react-native'
import { HelperText, TouchableRipple, IconButton } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';

export default class BarChartGraph extends React.PureComponent {

    render() {

        const data = [ 14, 30, 5, 0, 0, 0, 0, 0, 7, 6, 9, 11, 10, 23, 21, 10, 10, 4, 5, 18, 19, 18, 15, 12 ]
        console.log(data.length)

        return (
            <View style={{ height: sizes.hp('90%')}}>
                <IconButton
                    icon="close"
                    style={{right: sizes.wp('-70%')}}
                    color={colors.APP_MAIN}
                    size={30}
                    onPress={this.props.hideModalFromChild}
                />

                <Text style={styles.textTitle}>¿Cuáles son tus horarios más populares?</Text>
            <View style={styles.barChart}>
                <BarChart
                    style={{ flex: 1 }}
                    data={data}
                    gridMin={0}
                    svg={{ fill: '#415EDA' }}
                />
                <XAxis
                    style={{ marginHorizontal: -5, height: 30 }}
                    data={ data }
                    //scale={scale.scaleBand}
                    formatLabel={ (value, index) => index }
                    labelStyle={ { color: 'black' } }
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textTitle: {
        color: colors.APP_MAIN,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    barChart: {
        height: sizes.hp('35%'), 
        width: sizes.wp('80%'), 
        marginTop: sizes.hp('-45%'), 
        top: sizes.hp('50%'),
    },
})