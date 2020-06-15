import React, { Component } from 'react';
import { StyleSheet, Text, View, VirtualizedList, FlatList } from 'react-native';
import { colors, sizes } from '../../../index.styles'
//import { Card, CardHeader, Avatar, IconButton } from 'material-bread'
import { Button } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import ProductCard from '../../commons/productCardOrder'

const DATA = [
    { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '10' }, { key: '11' },
]

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MenuProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueButtons: 'salty',
        }
    }

    handleButtons = (values) => {
        if (values != null)
            this.setState({ valueButtons: values })
    }

    render() {

        return (
            <View style={{ width: sizes.wp('100%'), height: sizes.hp('100%'), top: sizes.hp('19%') }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('100%'), height: sizes.hp('4%'), marginTop: sizes.hp('-10%') }}>
                    <Button
                        style={styles.toggleButton}
                        dark
                        color={colors.SALTY}
                        mode={(this.state.valueButtons == 'salty') ? 'contained' : 'outlined'}
                        onPress={() => this.handleButtons('salty')}>
                        Salado
                    </Button>

                    <Button
                        style={styles.toggleButton}
                        dark
                        color={colors.SWEET}
                        mode={(this.state.valueButtons == 'sweet') ? 'contained' : 'outlined'}
                        onPress={() => this.handleButtons('sweet')}>
                        Dulce
                    </Button>

                    <Button
                        style={styles.toggleButton}
                        dark
                        color={colors.DRINKS}
                        mode={(this.state.valueButtons == 'drinks') ? 'contained' : 'outlined'}
                        onPress={() => this.handleButtons('drinks')}>
                        Bebidas
                    </Button>
                </View>

                {(this.state.valueButtons == 'salty') ?
                    <AnimatedFlatList
                        style={styles.list}
                        ItemSeparatorComponent={this.renderSeparator}
                        data={DATA}
                        initialNumToRender={0}
                        onScroll={this.props.onScroll}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => <ProductCard />}
                        keyExtractor={(item, i) => i.toString()}
                    />

                    :
                    (this.state.valueButtons == 'sweet') ?
                        <AnimatedFlatList
                            style={styles.list}
                            ItemSeparatorComponent={this.renderSeparator}
                            data={DATA}
                            initialNumToRender={0}
                            onScroll={this.props.onScroll}
                            scrollEventThrottle={16}
                            renderItem={({ item }) => <ProductCard />}
                            keyExtractor={(item, i) => i.toString()}
                        />

                        :

                        <AnimatedFlatList
                            style={styles.list}
                            ItemSeparatorComponent={this.renderSeparator}
                            data={DATA}
                            initialNumToRender={0}
                            onScroll={this.props.onScroll}
                            scrollEventThrottle={16}
                            renderItem={({ item }) => <ProductCard />}
                            keyExtractor={(item, i) => i.toString()}
                        />
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
    list: {
        top: sizes.hp('1%'),
        width: sizes.wp('100%'),
        //height: sizes.hp('70%'),
        marginBottom: sizes.hp('23%'),
    },
});

export default MenuProcess;