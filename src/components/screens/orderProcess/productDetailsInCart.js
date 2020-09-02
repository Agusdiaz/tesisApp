import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, productCondition } from '../../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton, Portal, Dialog, Surface } from 'react-native-paper';
import OrderActions from '../../../redux/orders/action'
import TextTicker from 'react-native-text-ticker'

class ProductDetailsInCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: 'https://picsum.photos/500',
        }
    }

    hideModal = () => { this.props.hideModalFromChild() }

    setAmount(action) {
        if (action === 0 && this.props.product.cantidad > 1){
            var cant = this.props.product.cantidad - 1
            this.props.updateProductAmount(this.props.product, cant)
            this.props.updateTotal(this.props.order.total - this.props.product.precio)
        }
        else if (action === 1){
            var cant = this.props.product.cantidad + 1
            this.props.updateProductAmount(this.props.product, cant)
            this.props.updateTotal(this.props.order.total + this.props.product.precio)
        }
    }

    render() {
        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={this.hideModal}
        />

        const Condition = props =>
            (this.props.product.condicion) ?
                <Button style={{}}
                    mode="contained"
                    dark
                    color={(this.props.product.condicion === productCondition.VEGAN) ? colors.VEGAN : (this.props.product.condicion === productCondition.CELIAC) ?
                        colors.CELIAC : colors.VEGETARIAN} >
                    {this.props.product.condicion}
                </Button>
                :
                null

        const NamePrice = props => <View>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.props.product.nombre}</TextTicker>
            <Text style={styles.subtitle}>${this.props.product.precio}</Text>
        </View>

        return (
            <Card style={styles.productCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-2') }} left={Condition} leftStyle={styles.condition} right={Close} rightStyle={styles.close} />
                <Divider />
                <Card.Title right={NamePrice} rightStyle={styles.rightSide} />
                <Card.Cover source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />
                <Card.Content style={{ alignItems: 'center'}}>
                    <Text style={styles.details} numberOfLines={6}>{this.props.product.detalle}</Text>
                    <DataTable style={{
                        marginTop: sizes.wp('1%'), width: sizes.wp('100%'), left: -10 }}>
                        <DataTableHeader
                            title={'¿De qué esta hecho este producto?'}
                            style={{ right: sizes.wp('-3%') }}
                        />
                        <View>
                            <DataTableRow >
                                <DataTableCell text={'INGREDIENTES'} type={'header'} borderRight textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '30%' }} />
                                <DataTableCell text={'Detalle'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '10%' }} minWidth={90} />
                                <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} style={{ maxWidth: '3%' }} minWidth={90} />
                            </DataTableRow>

                            <ScrollView style={{ height: sizes.hp('27%') }}>
                                {(this.props.product.ingredientes.length > 0) ?
                                    this.props.product.ingredientes
                                        .map(row =>
                                            < DataTableRow key={row.idIngrediente}>
                                                <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '30%' }} textStyle={{ textAlign: 'center' }} />
                                                <DataTableCell text={(row.detalle) ? row.detalle : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '10%', alignSelf: 'center' }} minWidth={90} />
                                                <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '3%', alignSelf: 'center' }} minWidth={90} />
                                            </DataTableRow>
                                        )
                                    :
                                    <DataTableCell text={'Este producto no posee ingredientes para mostrar'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                                }
                            </ScrollView>
                        </View>
                    </DataTable>
                </Card.Content>
                <Card.Actions style={{ alignSelf: 'center', marginTop: sizes.hp('0.5%') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>

                        <FAB
                            style={styles.fabAmount}
                            color={colors.APP_MAIN}
                            small
                            icon="minus"
                            onPress={() => this.setAmount(0)}
                        />

                        <Surface style={styles.surfaceAmount}>
                            <Text>{this.props.product.cantidad}</Text>
                        </Surface>

                        <FAB
                            style={styles.fabAmount}
                            color={colors.APP_MAIN}
                            small
                            icon="plus"
                            onPress={() => this.setAmount(1)}
                        />
                        </View>
                </Card.Actions>
            </Card >
        )
    }
}

const styles = StyleSheet.create({
    productCard: {
        width: sizes.wp('90%'),
        elevation: 0
    },
    close: {
        left: sizes.wp('-2%')
    },
    condition: {
        right: sizes.wp('-1%'),
        width: '38%'
    },
    image: {
        width: sizes.wp('86%'),
        height: sizes.hp('17%'),
        alignSelf: 'center',
        borderRadius: 5
    },
    leftSide: {
        marginLeft: sizes.wp('-1%'),
        marginTop: sizes.hp('5.2%'),
    },
    rightSide: {
        width: sizes.wp('75%'),
        height: sizes.hp('7%'),
        right: sizes.wp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 6,
        fontSize: 20,
    },
    details: {
        width: sizes.wp('76%'),
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    cell: {
        width: sizes.wp('80%'),
        right: sizes.wp('-3%'),
        marginTop: sizes.hp('2%'),
    },
    fabAmount: {
        backgroundColor: '#FFFFFF',
        borderColor: colors.APP_MAIN,
        borderWidth: 2,
        width: 45,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    surfaceAmount: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: sizes.wp('2%'),
        marginLeft: sizes.wp('2%'),
        borderRadius: 8,
    },
});

function mapStateToProps(state) {
    return {
        order: state.order,
        product: state.order.selectedProduct,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProductAmount: (id, amount) => dispatch(OrderActions.updateProductAmount(id, amount)),
        updateTotal: (total) => dispatch(OrderActions.updateTotal(total)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsInCart);