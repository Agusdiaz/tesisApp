import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { DataTable, DataTableHeader, DataTableCell, DataTablePagination, DataTableRow } from 'material-bread'
import { Card, FAB, Button, Divider, IconButton } from 'react-native-paper';
import TextTicker from 'react-native-text-ticker'

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition: 'Vegetariano',
            name: 'Nombre del Producto',
            photo: 'https://picsum.photos/400',
            price: '$700',
            details: 'Descripción del Producto'
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

                    <DataTable style={{ marginTop: sizes.wp('10%') }}>
                        <DataTableHeader
                            title={'¿De qué esta hecho este producto?'}
                        />
                        <DataTableRow >
                            <DataTableCell text={'Ingredientes'} type={'header'} borderRight relativeWidth={2} />
                            <DataTableCell text={'Cantidad'} type={'header'} right textStyle={{ textAlign: 'center' }} />
                        </DataTableRow>
                        <DataTableRow>
                            <DataTableCell text={'Ingrediente 1'} borderRight relativeWidth={2} />
                            <DataTableCell text={'2'} right textStyle={{ textAlign: 'center' }} />
                        </DataTableRow>
                        <DataTableRow>
                            <DataTableCell text={'Ingrediente 2'} borderRight relativeWidth={2} />
                            <DataTableCell text={'1'} right textStyle={{ textAlign: 'center' }} />
                        </DataTableRow>
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