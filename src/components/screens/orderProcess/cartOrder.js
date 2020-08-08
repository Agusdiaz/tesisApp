import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { Card, FAB, Button, Divider, Portal, IconButton } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'
import { Actions } from 'react-native-router-flux';

class CartOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areProducts: false,
            products: [],
            total: 0,
        }
    }

    nextStep = () => {
        Actions.makeorder({pos: 2})
    }

    _renderItem(item) {
        if (this.state.areProducts) {
            return (
                {/* <SalesCard data={item} /> */ }
            );
        } else {
            return (
                <View style={styles.viewImage}>
                    <Image source={require('../../../icons/noProducts.png')} style={styles.image} />
                    <Text style={styles.infoImage}>No hay productos seleccionados</Text>
                </View>
            );
        }
    }

    render() {

        const total = props => <Text style={styles.rightText}> ${this.state.total} </Text>

        return (
            <View style={[appStyles.container, { top: sizes.hp('7%'), }]} >

                <IconButton
                    style={{ left: sizes.wp('-40%'), top: sizes.hp('-6%') }}
                    icon='chevron-left'
                    color={colors.APP_MAIN}
                    size={40}
                    onPress={() => Actions.pop()} />

                <Card style={styles.orderCard}>
                    <Card.Title style={{ alignItems: 'center' }} title='¿Qué es lo que estas pidiendo?' titleStyle={{ fontSize: 21, alignSelf: 'center' }} />
                    <Divider style={styles.divider} />
                    <Card.Content style={styles.cardContent}>
                        <FlatList
                            style={styles.list}
                            data={(this.state.areProducts) ? this.state.products : [1]}
                            initialNumToRender={0}
                            renderItem={({ item }) => this._renderItem(item)}
                            keyExtractor={(item, i) => i.toString()} />
                    </Card.Content>
                    <Divider style={styles.divider} />
                    <Card.Title style={{ margin: -9 }} titleStyle={styles.leftText} title="Total:" right={total} />
                    <Divider style={styles.divider} />
                </Card>

                <Button
                    style={{ top: sizes.hp('-5%'), right: sizes.wp('-20%'), width: '50%' }}
                    icon="arrow-right-bold-outline"
                    mode="contained"
                    color={colors.APP_MAIN}
                    onPress={this.nextStep}>
                    Continuar
 				</Button>

                <Portal>

                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    orderCard: {
        height: sizes.hp('78%'),
        width: sizes.wp('90%'),
        padding: 10,
        elevation: 2,
        top: sizes.hp('-6%'),
    },
    cardContent: {
        alignItems: 'center',
        height: sizes.hp('64%'),
    },
    list: {
        top: sizes.hp('1%'),
        width: sizes.wp('85%'),
    },
    divider: {
    },
    rightText: {
        fontSize: 16,
        right: sizes.wp('3%'),
    },
    leftText: {
        fontSize: 18,
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
        top: sizes.hp('11%')
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
});

export default CartOrder;