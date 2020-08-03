import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes, productCondition } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: 'https://picsum.photos/500',
        }
    }

    hideModal = () => {
        this.props.hideModalFromChild();
    }

    render() {

        const Close = props => <IconButton
            icon='close'
            color={colors.APP_MAIN}
            size={30}
            onPress={this.hideModal}
        />

        const Condition = props =>
            (this.props.data.condicion) ?
                <Button style={{}}
                    mode="contained"
                    dark
                    color={(this.props.data.condicion === productCondition.VEGAN) ? colors.VEGAN : (this.props.data.condicion === productCondition.CELIAC) ?
                        colors.CELIAC : colors.VEGETARIAN} >
                   {this.props.data.condicion}
                </Button>
                :
                null

        const NamePrice = props => <View>
            <TextTicker style={styles.title}
                duration={5000}
                loop
                animationType='bounce'
                repeatSpacer={50}
                marqueeDelay={1000}>{this.props.data.nombre}</TextTicker>
            <Text style={styles.subtitle}>${this.props.data.precio}</Text>
        </View>

        return (
            <Card style={styles.productCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-2') }} left={Condition} leftStyle={styles.condition} right={Close} rightStyle={styles.close} />
                <Divider />
                <Card.Title right={NamePrice} rightStyle={styles.rightSide} />
                <Card.Cover source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />
                <Card.Content style={{ alignItems: 'center' }}>
                    <Text style={styles.details} numberOfLines={6}>{this.props.data.detalle}</Text>

                    <DataTable style={{ marginTop: sizes.wp('4%'), width: sizes.wp('100%'), left: -10 }}>
                        <DataTableHeader
                            title={'¿De qué esta hecho este producto?'}
                            style={{ right: sizes.wp('-3%') }}
                        />
                        <DataTableRow >
                            <DataTableCell text={'Ingredientes '} type={'header'} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '16%'}} />
                            <DataTableCell text={'Detalle'} type={'header'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '15%',}} />
                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center' }} style={{ left: sizes.wp('-5%') }} />
                            <DataTableCell text={'Precio'} type={'header'} textStyle={{ textAlign: 'center' }} style={{ left: sizes.wp('-10%') }} />
                            <DataTableCell text={'Opcional'} type={'header'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '5%', left: sizes.wp('-15%') }} />
                        </DataTableRow>

                        <ScrollView style={{ height: sizes.hp('31%') }}>
                            {(this.props.data.ingredientes[0]) ?
                                this.props.data.ingredientes[0]
                                    .map(row =>
                                        < DataTableRow key={row.id} >
                                            <DataTableCell text={row.nombre} borderRight style={{ maxWidth: '16%' }} textStyle={{textAlign: 'center'}}/>
                                            <DataTableCell text={(row.detalle) ? row.detalle : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '15%', }} />
                                            <DataTableCell text={(row.cantidad) ? (row.cantidad).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ left: sizes.wp('-5%') }} />
                                            <DataTableCell text={(row.precio) ? '$'+(row.precio).toString() : '-'} textStyle={{ textAlign: 'center' }} style={{ left: sizes.wp('-10%') }} />
                                            <DataTableCell text={(row.opcion === 1) ? 'Agregar' : '-'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '5%', left: sizes.wp('-15%') }} />
                                        </DataTableRow>
                                    )
                                :
                                <DataTableCell text={'Este producto no posee ingredientes para mostrar'} style={styles.cell} textStyle={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: colors.APP_RED }} />
                            }
                        </ScrollView>
                    </DataTable>
                </Card.Content>

            </Card >
        )
    }
}

const styles = StyleSheet.create({
    productCard: {
        height: sizes.hp('80%'),
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
        //borderWidth: 1,
        width: sizes.wp('80%'),
        right: sizes.wp('-3%'),
        marginTop: sizes.hp('2%'),
    },
});

export default ProductDetails;