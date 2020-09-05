import React from 'react'
import { connect } from 'react-redux';
import { BarChart } from 'react-native-chart-kit'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { HelperText, TouchableRipple, IconButton } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { getTopHours } from '../../../api/stats'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class BarChartGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    }

    componentDidMount() {
        this.getStats()
    }

    async getStats() {
        const data = await getTopHours(this.props.shop.cuit, this.props.shop.token)
        if(data.status === 500 && data.body.error){
            this.props.logout()
            Actions.logsign({visible: true})
        } else if (data.status === 200) {
            this.setState({ stats: data.body})
        }
    }

    render() {
        const barData = {
            labels: ['0hs', '1hs', '2hs', '3hs', '4hs', '5hs', '6hs', '7hs', '8hs', '9hs', '10hs', '11hs', '12hs', '13hs', '14hs',
                '15hs', '16hs', '17hs', '18hs', '19hs', '20hs', '21hs', '22hs', '23hs'],
            datasets: [
                { data: this.state.stats }
            ],
        }

        const chartConfig = {
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: () => "#E1454A",
            strokeWidth: 2,
            barPercentage: 1.5,
        };

        return (
            <View style={{ height: sizes.hp('90%') }}>
                <IconButton
                    icon="close"
                    style={{ right: sizes.wp('-70%') }}
                    color={colors.APP_MAIN}
                    size={30}
                    onPress={this.props.hideModalFromChild}
                />

                <Text style={styles.textTitle}>¿Cuáles son tus horarios más populares?</Text>
                <View style={styles.barChart}>
                    <ScrollView horizontal={true}>
                        <BarChart
                            style={styles.graphStyle}
                            data={barData}
                            width={sizes.wp('450%')}
                            height={sizes.wp('100%')}
                            chartConfig={chartConfig}
                            withInnerLines={false}
                            withHorizontalLabels={false}
                            showValuesOnTopOfBars
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
    barChart: {
        width: sizes.wp('80%'),
        top: sizes.hp('5%'),
    },
    graphStyle: {
        left: -65,
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

export default connect(mapStateToProps, mapDispatchToProps)(BarChartGraph);