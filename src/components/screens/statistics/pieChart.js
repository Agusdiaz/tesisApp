import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit'
import { PieChart as Pie } from 'react-native-svg-charts'
import { IconButton } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import { getTopProducts } from '../../../api/stats'
import { Actions } from 'react-native-router-flux';
import UserActions from '../../../redux/authState/action'

class PieChartGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            areProducts: true,
            /* selectedSlice: {
                label: 'Seleccioná',
                value: ''
            },
            labelWidth: 0 */
        }
    }

    componentDidMount() {
        this.getStats()
    }

    randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    /* colors = [this.randomColor(), this.randomColor(), this.randomColor(), this.randomColor(), this.randomColor(), this.randomColor(), this.randomColor(),
        this.randomColor(), this.randomColor(), this.randomColor()]
    keys = []
    values = [] */
    pieColors = ['#F11616', '#8EF116', '#387FBB', '#E72ECF', '#EF8433', '#21D385', '#737A77', '#A78CE3', '#000000', '#EFE433']
    /* datos = [{nombre: 'Papas', cantidad: 25}, {nombre: 'Cerveza', cantidad: 24}, {nombre: 'Lomo', cantidad: 20}, {nombre: 'Nachos con cheddar', cantidad: 18}, {nombre: 'Torta', cantidad: 18}, {nombre: 'Waffle', cantidad: 17}, 
    {nombre: 'Medialuna', cantidad: 14}, {nombre: 'Cafe', cantidad: 10}, {nombre: 'Pollo', cantidad: 8}, {nombre: 'Tortilla babe', cantidad: 4}] */
    
    async getStats() {
        const data = await getTopProducts(this.props.shop.cuit, this.props.shop.token)
        if (data.status === 500 && data.body.error) {
            this.props.logout()
            Actions.logsign({ visible: true })
        } else if (data.status === 200){
            this.setState({ stats: data.body, areProducts: true })
            /* data.body.map(obj => {
                this.keys.push(obj.nombre)
                this.values.push(obj.cantidad)
            }) */
        }
        else if (data.status === 204)
            this.setState({ areProducts: false })
    }

    render() {
        const chartConfig = {
            color: () => "#E1454A",
            style: {
                marginLeft: 0
            },
        }

        const data = [];
        this.state.stats.map((obj, i) => {
            data.push({
                name: obj.nombre, cantidad: obj.cantidad, color: this.pieColors[i], legendFontColor: "#000000",
                legendFontSize: 15
            })
        })

        /* const { labelWidth, selectedSlice } = this.state;
        const { label, value } = selectedSlice;
        const data2 = this.keys.map((key, index) => {
            return {
                key,
                value: this.values[index],
                svg: { fill: this.colors[index] },
                arc: { outerRadius: (70 + this.values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
                onPress: () => this.setState({ selectedSlice: { label: key, value: this.values[index] } })
            }
        }) */

        return (
            <View style={{ height: sizes.hp('90%') }}>
                <IconButton
                    icon="close"
                    style={{ right: sizes.wp('-71%') }}
                    color={colors.APP_MAIN}
                    size={30}
                    onPress={this.props.hideModalFromChild}
                />

                <Text style={styles.textTitle}>¿Cuáles son los productos más demandados por tu público?</Text>

                {(this.state.areProducts) ?
                    <View style={styles.pieChart}>
                         <ScrollView horizontal={true}>
                             <PieChart
                                 data={data}
                                 width={sizes.wp('140%')}
                                 height={sizes.wp('80%')}
                                 paddingLeft={10}
                                 chartConfig={chartConfig}
                                 accessor="cantidad"
                                 absolute
                                 avoidFalseZero
                                 hasLegend
                             />
                         </ScrollView>

                         {/* <View style={{ justifyContent: 'center', flex: 1}}>
                        <Pie
                            style={{ height: sizes.hp('70%'), width: sizes.wp('90%')}}
                            outerRadius={'80%'}
                            innerRadius={'70%'}
                            data={data2}
                        />
                        <Text
                            onLayout={({ nativeEvent: { layout: { width } } }) => {
                                this.setState({ labelWidth: width });
                            }}
                            style={{
                                //position: 'absolute',
                                top: sizes.hp('-60%'),
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 25,
                            }}>
                            {`${label} \n ${value}`}
                        </Text>
                    </View> */}
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
        textAlign: 'center'
    },
    pieChart: {
        width: sizes.wp('90%'),
        top: sizes.hp('10%'),
        //left: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(PieChartGraph);