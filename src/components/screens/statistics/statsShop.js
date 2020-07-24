import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { appStyles, colors, sizes } from '../../../index.styles';
import { Banner } from 'react-native-paper';
import { Tabs, Tab, Icon } from 'material-bread';
import PieChartGraph from './pieChart'
import { Actions } from 'react-native-router-flux';

export default class StatsShopScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            visibleProducts: true,
        }
    }

    render() {

        return (
            <View style={appStyles.container}>

                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_MAIN}
                    actionItems={[
                        <Tab key={1} icon='pie-chart-outlined' label='Productos' />, //pie-chart
                        <Tab key={2} icon='insert-chart' label='Pedidos' />,
                        <Tab key={3} icon='access-time' label='Horarios' />,
                    ]}
                />

                {(this.state.selectedTab === 0) ?

                    <View style={{ alignItems: 'center' }}>
                        <Banner
                            style={styles.banner}
                            contentStyle={{ marginTop: sizes.hp('3.5%'), }}
                            visible={this.state.visibleProducts}
                            actions={[
                                {
                                    label: '',
                                    onPress: () => { },
                                },
                            ]}>
                            <Text style={{ fontSize: 22, textAlign: 'center' }}>¿Cuáles son los productos mas demandados por tu público?</Text>
                        </Banner>

                       <PieChartGraph/>

                    </View>

                    : (this.state.selectedTab === 1) ?

                        <View style={{ alignItems: 'center' }}>
                            <Banner
                                style={styles.banner}
                                contentStyle={{ marginTop: sizes.hp('3.5%'), }}
                                visible={this.state.visibleProducts}
                                actions={[
                                    {
                                        label: '',
                                        onPress: () => { },
                                    },
                                ]}>
                                <Text style={{ fontSize: 22, textAlign: 'center' }}>¿Cuántos pedidos recibes por mes en los últimos seis meses?</Text>
                            </Banner>

                            
                        </View>

                        :

                        <View style={{ alignItems: 'center' }}>
                            <Banner
                                style={styles.banner}
                                contentStyle={{ marginTop: sizes.hp('3.5%'), }}
                                visible={this.state.visibleProducts}
                                actions={[
                                    {
                                        label: '',
                                        onPress: () => { },
                                    },
                                ]}>
                                <Text style={{ fontSize: 22, textAlign: 'center' }}>¿Cuáles son tus horarios más populares?</Text>
                            </Banner>
                        </View>

                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    appBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: sizes.hp('5%'),
    },
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        top: sizes.hp('-24%'),
        width: sizes.wp('98%'),
        height: sizes.hp('10%'),
        elevation: 10,
        borderWidth: 1.27,
        borderRadius: 10,
        borderColor: colors.APP_MAIN,
    },
});
