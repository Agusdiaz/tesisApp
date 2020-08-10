import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { HelperText, TouchableRipple, IconButton } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';

export default class PieChartGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            helperText: false,
            index: 0,
        }
    }

    render() {
        const data = [
            {
                value: 27,
                name: 'Hamburguesa',
                color: '#E33F22'
                //arc: { outerRadius: '130%', cornerRadius: 10,  }
            },
            {
                value: 23,
                name: 'Papas Fritas',
                color: '#2858E1'
            },
            {
                value: 20,
                name: 'Cerveza IPA',
                color: '#4EC62A'
            },
            {
                value: 15,
                name: 'Tacos',
                color: '#30C1D6'
            },
            {
                value: 6,
                name: 'Tiramisu',
                color: '#BF36B9'
            }

        ]

        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data
            .filter((obj) => { return obj.value > 0 })
            .map((obj, index) => ({
                value: obj.value,
                name: obj.name,
                svg: {
                    fill: obj.color,
                    onPress: () => this.setState({ helperText: true, index: index })
                },
                key: `pie-${index}`,
            }))
        //console.log('piedata   ', pieData)

        return (
            <View style={{ height: sizes.hp('90%')}}>
                <IconButton
                    icon="close"
                    style={{right: sizes.wp('-70%')}}
                    color={colors.APP_MAIN}
                    size={30}
                    onPress={this.props.hideModalFromChild}
                />

                <Text style={styles.textTitle}>¿Cuáles son los productos más demandados por tu público?</Text>

                <PieChart
                    style={styles.pieChart}
                    outerRadius={'90%'}
                    innerRadius={5}
                    data={pieData}
                    valueAccessor={({ item }) => item.value}
                />

                <HelperText type="info" visible={this.state.helperText} style={styles.helper}>
                    Producto: {data[this.state.index].name}{"\n"}
                    Cantidad vendida: {data[this.state.index].value}
                </HelperText>
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
    pieChart: {
        height: sizes.hp('35%'),
        width: sizes.wp('80%'),
        marginTop: sizes.hp('-45%'),
        top: sizes.hp('50%'),
    },
    helper: {
        fontSize: 25,
        color: '#000',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.APP_MAIN,
        //backgroundColor: colors.APP_MAIN,
        top: sizes.hp('35%'),
        height: sizes.hp('9%'),
        alignSelf: 'center',
        textAlign: 'center',
    },
})