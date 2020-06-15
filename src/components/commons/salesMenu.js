import React, { Component } from 'react';
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { colors, sizes } from '../../index.styles';
//import { Card, CardHeader, Avatar, IconButton } from 'material-bread'
import { Button } from 'react-native-paper';
import SalesCard from '../commons/salesCard'

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

class SalesMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <View style={{ width: sizes.wp('100%'), height: sizes.hp('100%'), top: sizes.hp('19%') }}>

                    <VirtualizedList
                        style={styles.list}
                        data={DATA}
                        initialNumToRender={0}
                        renderItem={({ item }) => <SalesCard />}
                        keyExtractor={item => item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        top: sizes.hp('1%'),
        width: sizes.wp('100%'),
        marginBottom: sizes.hp('22%'),
    },
});

export default SalesMenu;

/*marginBottom: (this.props.rute == 'client') ? sizes.hp('23%') :
                                sizes.hp('26%'),*/