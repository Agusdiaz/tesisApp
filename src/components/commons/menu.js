import React, { Component } from 'react';
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { colors, sizes } from '../../index.styles';
//import { Card, CardHeader, Avatar, IconButton } from 'material-bread'
import { Button } from 'react-native-paper';
import ProductCard from '../commons/productCard'

const DATA = [];

const getItem = (index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

const getItemCount = (data) => {
    return 10;
}

class Menu extends Component {
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
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: sizes.wp('100%'), height: sizes.hp('4%'), marginTop: 5 }}>
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
                    <VirtualizedList
                        style={[styles.list, {
                            marginBottom: (this.props.rute == 'client') ? sizes.hp('23%') :
                                sizes.hp('26%'),
                        }]}
                        data={DATA}
                        initialNumToRender={0}
                        data={DATA}
                        renderItem={({ item }) => <ProductCard rute={this.props.rute} />}
                        keyExtractor={item => item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                    />

                    :
                    (this.state.valueButtons == 'sweet') ?
                        <VirtualizedList
                            style={[styles.list, {
                                marginBottom: (this.props.rute == 'client') ? sizes.hp('23%') :
                                    sizes.hp('26%'),
                            }]}
                            data={DATA}
                            initialNumToRender={0}
                            data={DATA}
                            renderItem={({ item }) => <ProductCard rute={this.props.rute} />}
                            keyExtractor={item => item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />

                        :

                        <VirtualizedList
                            style={[styles.list, {
                                marginBottom: (this.props.rute == 'client') ? sizes.hp('23%') :
                                    sizes.hp('26%'),
                            }]}
                            data={DATA}
                            initialNumToRender={0}
                            data={DATA}
                            renderItem={({ item }) => <ProductCard rute={this.props.rute} />}
                            keyExtractor={item => item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
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
    },
});

export default Menu;