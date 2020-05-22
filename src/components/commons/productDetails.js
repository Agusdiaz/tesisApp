import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Nombre del Producto',
            photo: 'https://picsum.photos/400',
            price: '$700',
            details: 'Descripción del Producto',
            condition: 'Vegetariano',
            ingredients: [{
                id: 1,
                name: 'Ingrediente 1',
                amount: 2,
                unitPrice: 150,
                details: 'Detalles'
            },{
                id: 2,
                name: 'Ingrediente 2',
                amount: 1,
                unitPrice: 200,
                details: '-'
            },{
                id: 3,
                name: 'Ingrediente 3',
                amount: '-',
                unitPrice: '-',
                details: 'Detalles'
            },],
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
            (this.state.condition != '') ?
            <Button style={{}}
                mode="contained"
                dark
                color={(this.state.condition == 'Vegano') ? colors.VEGAN : (this.state.condition == 'Celíaco') ? colors.CELIAC : colors.VEGETARIAN} >
                {this.state.condition}
            </Button>
            :
            null
        
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

            <Card style={styles.productCard}>
                <Card.Title style={{ margin: -10, marginTop: sizes.hp('-2')}} left={Close} leftStyle={styles.close} right={Condition} rightStyle={styles.condition} />
                <Divider/>
                <Card.Title right={NamePrice} rightStyle={styles.rightSide} />
                <Card.Cover source={{ uri: this.state.photo }} resizeMode='cover' style={styles.image} />
                <Card.Content style={{ alignItems: 'center' }}>
                    <Text style={styles.details} numberOfLines={6}>{this.state.details}</Text>

                    <DataTable style={{ marginTop: sizes.wp('10%'), width: sizes.wp('100%'), left: -10}}>
                        <DataTableHeader
                            title={'¿De qué esta hecho este producto?'}
                            style={{right: sizes.wp('-3%')}}
                        />
                        <DataTableRow >
                            <DataTableCell text={'Ingredientes '} type={'header'} borderRight textStyle={{ textAlign: 'center' }} style={{ maxWidth: '35%'}}/>
                            <DataTableCell text={'Detalle'} type={'header'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '35%'}} />
                            <DataTableCell text={'Cantidad'} type={'header'} textStyle={{ textAlign: 'center' }} style={{ maxWidth: '5%', left: sizes.wp('-5%')}} />
                        </DataTableRow>

                        <ScrollView style={{ height: sizes.hp('31%') }}>
                            {this.state.ingredients
                                .map(row => (
                                    <DataTableRow key={row.id}>
                                        <DataTableCell text={row.name} borderRight style={{ maxWidth: '35%'}}/>
                                        <DataTableCell text={row.details} textStyle={{ textAlign: 'center'}} style={{ maxWidth: '35%'}}/>
                                        <DataTableCell text={(row.amount).toString()} textStyle={{ textAlign: 'center'}} style={{ maxWidth: '5%', left: sizes.wp('-5%')}} />
                                    </DataTableRow>
                                ))}
                        </ScrollView>
                    </DataTable>
                </Card.Content>

            </Card>
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
        right: sizes.wp('7%')
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
});

export default ProductDetails;