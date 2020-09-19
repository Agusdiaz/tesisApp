import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { IconButton, Card } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { getTopProducts } from '../../../api/stats'
import { Actions } from 'react-native-router-flux';
import TextTicker from 'react-native-text-ticker';
import UserActions from '../../../redux/authState/action'

class PieChartGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            areProducts: true,
        }
    }

    componentDidMount() {
        this.getStats()
    }

    randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    pieColors = ['#F11616', '#8EF116', '#387FBB', '#E72ECF', '#EF8433', '#217C08', '#0030D8', '#A78CE3', '#000000', '#EFE433']

    async getStats() {
        const data = await getTopProducts(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 200) {
            var newStats = []
            data.body.map((obj, i) => {
                newStats.push({
                    key: i, nombre: obj.nombre, value: obj.cantidad, svg: { fill: this.pieColors[i] },
                    arc: { outerRadius: '100%', cornerRadius: 5 }
                })
            })
            this.setState({ areProducts: true, stats: newStats })
        }
        else if (data.status === 204)
            this.setState({ areProducts: false })
    }

    _renderItem(item) {
        return (
            <Card style={{ height: sizes.hp('8%'), elevation: 2, marginTop: 2, width: sizes.wp('87%'), marginBottom: 5 }}>
                <Card.Title style={{ alignSelf: 'center', height: sizes.hp('7%') }}
                    right={() => <View style={{ alignSelf: 'center', width: sizes.wp('65%') }}>
                        <TextTicker style={styles.title}
                            duration={5000}
                            loop
                            animationType='bounce'
                            repeatSpacer={50}
                            marqueeDelay={1000}>({item.value}) {item.nombre}</TextTicker>
                    </View>}
                    left={() => <View style={[styles.circle, { backgroundColor: item.svg.fill }]} />}
                    leftStyle={{ left: sizes.wp('0%'), }}
                    rightStyle={{ width: sizes.wp('65%'), left: sizes.wp('-5%') }} />
            </Card>
        );
    }

    render() {
        return (
            <View style={{ height: sizes.hp('90%') }}>
                <IconButton
                    icon="close"
                    style={{ right: sizes.wp('-75%'), marginBottom: -5 }}
                    color={colors.APP_MAIN}
                    size={30}
                    onPress={this.props.hideModalFromChild}
                />

                <Text style={styles.textTitle}>Top 10 de productos más demandados por tu público</Text>

                {(this.state.areProducts) ?

                    <View style={styles.pieChart}>
                        <PieChart
                            style={{ height: sizes.hp('40%') }}
                            outerRadius={'85%'}
                            innerRadius={10}
                            data={this.state.stats}
                        />

                        <FlatList
                            style={styles.list}
                            contentContainerStyle={{ alignItems: 'center' }}
                            data={this.state.stats}
                            initialNumToRender={0}
                            renderItem={({ item }) => this._renderItem(item)}
                            keyExtractor={(item, i) => i.toString()}
                        />

                    </View>
                    :
                    <View style={styles.viewImage}>
                        <Image source={require('../../../icons/noProducts.png')} style={styles.image} />
                        <Text style={styles.infoImage}>No se registran productos vendidos</Text>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textTitle: {
        color: colors.APP_MAIN,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: sizes.wp('87%')
    },
    pieChart: {
        width: sizes.wp('90%'),
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
    list: {
        height: sizes.hp('35%'),
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    circle: {
        width: 33,
        height: 33,
        borderRadius: 33 / 2,
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