import React from 'react'
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { getMonthOrders } from '../../../api/stats'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class LineChartGraph extends React.PureComponent {

    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            stats: [0, 0, 0, 0, 0, 0],
        }
    }

    componentDidMount() {
        var actualMonth = new Date().getMonth() + 1
        if (actualMonth < 6) {
            var rest = -(actualMonth - 6)
            var m = 12 - rest;
            for (var i = 0; i < rest; i++) {
                this.state.labels.push(this.months[m])
                m++
            }
            for (var i = 0; i < 6 - rest; i++) {
                this.state.labels.push(this.months[i])
            }
        }
        else {
            for (var i = actualMonth - 6; i < actualMonth; i++) {
                this.state.labels.push(this.months[i])
            }
        }
        this.getStats()
    }

    async getStats() {
        const data = await getMonthOrders(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 200)
            this.setState({ stats: data.body })
    }

    render() {
        const lineData = {
            labels: this.state.labels,
            datasets: [
                {
                    data: this.state.stats,
                    strokeWidth: 2,
                },
            ],
            legend: ['Cantidad de pedidos']
        };

        const chartConfig = {
            decimalPlaces: 0,
            color: () => "#E1454A",
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff"
            },
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
        }

        return (
            <View style={{ height: sizes.hp('80%') }}>
                <IconButton
                    icon="close"
                    style={{ right: sizes.wp('-70%'), top: sizes.hp('-2%') }}
                    color={colors.APP_MAIN}
                    size={30}
                    onPress={this.props.hideModalFromChild}
                />

                <Text style={styles.textTitle}>¿Cuántos pedidos recibiste en los últimos seis meses?</Text>
                <View style={styles.lineChart}>
                    <ScrollView horizontal={true}>
                        <LineChart
                            data={lineData}
                            width={sizes.wp('110%')}
                            height={sizes.wp('100%')}
                            yAxisLabel={''}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                borderRadius: 16,
                                left: sizes.wp('-5%')
                            }}
                            segments={6}
                        />
                    </ScrollView>
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
    lineChart: {
        width: sizes.wp('80%'),
        top: sizes.hp('5%'),
    },
})

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

export default connect(mapStateToProps, mapDispatchToProps)(LineChartGraph);