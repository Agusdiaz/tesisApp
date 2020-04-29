import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, sizes } from '../../index.styles';
//import { Card, CardHeader, Avatar, IconButton } from 'material-bread'
import { Surface, Card, IconButton, Divider, FAB, Title, Paragraph } from 'react-native-paper';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Nombre del Producto',
            photo: 'https://picsum.photos/400',
            price: '$200',
            amount: 0,
        }
    }

    addAmount() {
        this.setState({ amount: this.state.amount + 1 })
    }

    lessAmount() {
        if (this.state.amount > 0)
            this.setState({ amount: this.state.amount - 1 })
    }

    render() {

        const pic = props => <Image source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />

        return (

            <Card style={styles.productCard}>
                <Card.Title left={pic} leftStyle={styles.leftSide} titleStyle={styles.title} title={this.state.name}
                    subtitle={this.state.price} subtitleStyle={styles.subtitle} />

                <Card.Actions style={styles.actionStyles}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                        <FAB
                            style={styles.fabAmount}
                            color={colors.APP_MAIN}
                            small
                            icon="minus"
                            onPress={() => this.lessAmount()}
                        />

                        <Surface style={styles.surfaceAmount}>
                            <Text>{this.state.amount}</Text>
                        </Surface>

                        <FAB
                            style={styles.fabAmount}
                            color={colors.APP_MAIN}
                            small
                            icon="plus"
                            onPress={() => this.addAmount()}
                        />

                        <FAB
                            style={{ backgroundColor: '#FFFFFF', borderColor: colors.APP_MAIN, borderWidth: 2, marginLeft: sizes.wp('17%') }}
                            color={colors.APP_MAIN}
                            small
                            icon="eye"
                            onPress={() => { }}
                        />
                    </View>

                </Card.Actions>

            </Card>
        )
    }
}

const styles = StyleSheet.create({
    productCard: {
        height: sizes.hp('15%'),
    },
    image: {
        width: sizes.wp('30%'),
        height: sizes.hp('13%'),
        borderRadius: 5
    },
    leftSide: {
        marginLeft: sizes.wp('-1%'),
        marginTop: sizes.hp('5.2%'),
    },
    title: {
        marginTop: sizes.hp('-1.7%'),
        marginLeft: sizes.wp('20%'),
        width: sizes.wp('60%'),
        textAlign: 'center'
    },
    subtitle: {
        width: sizes.wp('60%'),
        textAlign: 'center',
        fontSize: 16,
        marginLeft: sizes.wp('20%'),
    },
    actionStyles: {
        right: sizes.wp('-41%'),
        bottom: sizes.hp('2%')
    },
    fabAmount: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    surfaceAmount: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: sizes.wp('2%'),
        marginLeft: sizes.wp('2%'),
        borderRadius: 8,
    },
});

export default ProductCard;