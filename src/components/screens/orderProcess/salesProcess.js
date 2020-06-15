import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { colors, sizes } from '../../../index.styles'
//import { Card, CardHeader, Avatar, IconButton } from 'material-bread'
import { Button } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import SalesCard from '../../commons/salesCard'

const DATA = [
    { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '10' }, { key: '11' },
]

const EMPTY = [
    { key: '1' }
]

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class SalesProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areSales: true,
        }
    }

    render() {

        return (
            <View style={{ width: sizes.wp('100%'), height: sizes.hp('100%'), top: sizes.hp('8%') }}>
            
            {(this.state.areSales) ?
                    <AnimatedFlatList
                        style={styles.list}
                        //ItemSeparatorComponent={this.renderSeparator}
                        data={DATA}
                        initialNumToRender={0}
                        onScroll={this.props.onScroll}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => <SalesCard />}
                        keyExtractor={(item, i) => i.toString()}
                    /> 
                    :
                    <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noSales.png')} style={styles.image} />
                    <Text style={styles.infoImage}>Actualmente no hay promociones vigentes</Text>
                </View> 
                }  
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toggleButton: {
        width: sizes.wp('34%'),
        height: sizes.hp('4.3%'),
        justifyContent: 'center',
        borderWidth: -1
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        marginTop: sizes.hp('75%'),
        top: sizes.hp('-60%'),
    },
    image: {
        width: 170,
        height: 170,
        marginBottom: sizes.hp('2%'),
        alignSelf: 'center',
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    list: {
        top: sizes.hp('1%'),
        width: sizes.wp('100%'),
        //height: sizes.hp('70%'),
        marginBottom: sizes.hp('14%'),
    },
});

export default SalesProcess;