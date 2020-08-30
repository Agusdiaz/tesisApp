import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, } from 'react-native';
import { PieChart } from 'react-native-chart-kit'
import { HelperText, TouchableRipple, IconButton } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { getTopProducts } from '../../../api/stats'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class PieChartGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            stats: [],
        }
    }

    componentDidMount() {
        this.getStats()
    }

    randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    async getStats() {
        const data = await getTopProducts(this.props.shop.cuit, this.props.shop.token)
        if(data.status === 500 && data.body.error){
            this.props.logout()
            Actions.logsign({visible: true})
        } else if (data.status === 200)
            this.setState({ stats: data.body })
    }

    render() {
        const chartConfig = {
            color: () => "#E1454A",
            style: {
                marginLeft: 0
            },
        }

        const data = [];
        this.state.stats.map(obj => {
            data.push({ name: obj.nombre, cantidad: obj.cantidad, color: this.randomColor(), legendFontColor: "#000000",
            legendFontSize: 15})
        })

        return (
            <View style={{ height: sizes.hp('90%') }}>
                <IconButton
                    icon="close"
                    style={{ right: sizes.wp('-75%') }}
                    color={colors.APP_MAIN}
                    size={30}
                    onPress={this.props.hideModalFromChild}
                />

                <Text style={styles.textTitle}>¿Cuáles son los productos más demandados por tu público?</Text>
                <View style={styles.pieChart}>
                    <ScrollView  horizontal={true}>
                        <PieChart
                            data={data}
                            width={sizes.wp('130%')}
                            height={sizes.wp('80%')}
                            chartConfig={chartConfig}
                            accessor="cantidad"
                            absolute
                            avoidFalseZero
                            hasLegend
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
    pieChart: {
        width: sizes.wp('90%'),
        top: sizes.hp('10%'),
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

export default connect(mapStateToProps, mapDispatchToProps)(PieChartGraph);