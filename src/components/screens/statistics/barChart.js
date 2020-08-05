import React from 'react'
import { BarChart, XAxis } from 'react-native-svg-charts'
import { StyleSheet, View } from 'react-native'
import { appStyles, colors, sizes } from '../../../index.styles';

export default class BarChartGraph extends React.PureComponent {

    render() {

        const data = [ 14, 30, 5, 0, 0, 0, 0, 0, 7, 6, 9, 11, 10, 23, 21, 10, 10, 4, 5, 18, 19, 18, 15, 12 ]
        console.log(data.length)

        return (
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
        )
    }
}

const styles = StyleSheet.create({
    barChart: {
        height: sizes.hp('35%'), 
        width: sizes.wp('80%'), 
        marginTop: sizes.hp('-45%'), 
        top: sizes.hp('30%'),
    },
})