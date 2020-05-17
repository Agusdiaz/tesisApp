import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, sizes } from '../../index.styles';
//import { Card, CardHeader, Avatar, IconButton } from 'material-bread'
import { Card, FAB, Modal, Portal } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import ProductDetails from '../commons/productDetails'
import { Actions } from 'react-native-router-flux';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Nombre del Producto',
            photo: 'https://picsum.photos/400',
            price: '$700',
            visibleModal: false,
        }
    }

    _showModal = () => this.setState({ visibleModal: true });
    _hideModal = () => this.setState({ visibleModal: false });

    render() {

        const Pic = props => <Image source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />

        const NamePrice = props => <View>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.state.name}</TextTicker>
            <Text style={styles.subtitle}>{this.state.price}</Text>
        </View>

        return (
            <View>

                <Card style={styles.productCard}>
                    <Card.Title left={Pic} leftStyle={styles.leftSide} right={NamePrice} rightStyle={styles.rightSide} />
                    <Card.Actions style={styles.actionStyles}>
                        <FAB
                            style={{ backgroundColor: '#FFFFFF', borderColor: colors.APP_MAIN, borderWidth: 2, marginLeft: sizes.wp('17%') }}
                            color={colors.APP_MAIN}
                            icon="eye"
                            small
                            onPress={this._showModal}
                        />
                    </Card.Actions>
                </Card>

                <Portal>
                    <Modal contentContainerStyle={styles.modalView} visible={this.state.visibleModal} onDismiss={this._hideModal}>
                        <ProductDetails hideModalFromChild={this._hideModal} />
                    </Modal>
                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        marginTop: sizes.hp('5%'),
        margin: sizes.hp('2%'),
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
    },
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
    rightSide: {
        width: sizes.wp('60%'),
        height: sizes.hp('7%'),
        marginRight: sizes.wp('3.5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
    },
    actionStyles: {
        right: sizes.wp('-60%'),
        bottom: sizes.hp('2%')
    },
});

export default ProductCard;