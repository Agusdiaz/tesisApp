import React from 'react'
import { connect } from 'react-redux';
import { BarChart } from 'react-native-chart-kit'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { IconButton, List } from 'react-native-paper'
import { Select } from 'material-bread'
import { appStyles, colors, sizes } from '../../../index.styles';
import { getTopHours } from '../../../api/stats'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class BarChartGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            areStats: false,
            stats: [],
            selectedDay: 'Lunes',
            barData: {
                labels: ['0hs', '1hs', '2hs', '3hs', '4hs', '5hs', '6hs', '7hs', '8hs', '9hs', '10hs', '11hs', '12hs', '13hs', '14hs',
                    '15hs', '16hs', '17hs', '18hs', '19hs', '20hs', '21hs', '22hs', '23hs'],
                datasets: [
                    { data: null }
                ],
            }
        }
    }

    componentDidMount() {
        this.getStats()
    }

    async getStats() {
        const data = await getTopHours(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status !== 200) this.setState({ areStats: false })
        else {
            data.body.map(obj => {
                var hours = []
                obj.horas[0].map(h => hours.push(h.cantidad))
                this.state.stats.push({ id: obj.id, dia: obj.dia, horas: hours })
            })
            this.state.barData.datasets[0].data = this.state.stats[0].horas
            this.setState({ areStats: true })
        }
    }

    changeDay(value) {
        const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
        this.setState({ selectedDay: days[value] })
        this.state.barData.datasets[0].data = this.state.stats[value].horas
        this.handlePress()
    }

    handlePress = () => this.setState({ expanded: !this.state.expanded });

    render() {
        const chartConfig = {
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: () => "#E1454A",
            strokeWidth: 2,
            barPercentage: 1.5,
        };

        return (
            <View style={{ height: sizes.hp('80%') }}>
                <IconButton
                    icon="close"
                    style={{ right: sizes.wp('-70%'), top: sizes.hp('-2%') }}
                    color={colors.APP_MAIN}
                    size={30}
                    onPress={this.props.hideModalFromChild}
                />

                <Text style={styles.textTitle}>¿Cuáles son tus horarios más populares?</Text>
                <View style={styles.barChart}>

                    {(this.state.areStats) ?
                        <View>
                            <List.Accordion
                                style={{}}
                                titleStyle={{ color: '#000', fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}
                                title={this.state.selectedDay}
                                expanded={this.state.expanded}
                                onPress={this.handlePress}>
                                <View style={{ height: sizes.hp('40%') }}>
                                    <ScrollView style={{ flex: 1 }}>
                                        <List.Item title="Lunes" onPress={() => this.changeDay(0)} />
                                        <List.Item title="Martes" onPress={() => this.changeDay(1)} />
                                        <List.Item title="Miércoles" onPress={() => this.changeDay(2)} />
                                        <List.Item title="Jueves" onPress={() => this.changeDay(3)} />
                                        <List.Item title="Viernes" onPress={() => this.changeDay(4)} />
                                        <List.Item title="Sábado" onPress={() => this.changeDay(5)} />
                                        <List.Item title="Domingo" onPress={() => this.changeDay(6)} />
                                    </ScrollView>
                                </View>
                            </List.Accordion>
                            {(!this.state.expanded) ?
                                <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'flex-end' }}>
                                    <BarChart
                                        style={styles.graphStyle}
                                        data={this.state.barData}
                                        width={sizes.wp('420%')}
                                        height={sizes.wp('100%')}
                                        chartConfig={chartConfig}
                                        withInnerLines={false}
                                        withHorizontalLabels={false}
                                        showValuesOnTopOfBars
                                    />
                                </ScrollView>
                                : null}
                        </View>
                        :
                        <View style={styles.viewImage}>
                            <Image source={require('../../../icons/error.png')} style={styles.image} />
                            <Text style={styles.infoImage}>¡Error!{"\n"}Inténtelo más tarde</Text>
                        </View>}
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
        top: sizes.hp('2%'),
    },
    graphStyle: {
        left: sizes.wp('-10%'),
        marginTop: sizes.hp('5%'),
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
        height: sizes.hp('50%'),
    },
    image: {
        width: 170,
        height: 170,
        marginBottom: sizes.hp('2%'),
        marginTop: sizes.hp('-5%'),
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
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