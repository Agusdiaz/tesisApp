import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { colors, sizes, appStyles } from '../../../index.styles';
import { Tabs, Tab } from 'material-bread'
import ProductMenu from '../../commons/menu'
import IngredientMenu from './ingredientMenu'
import SalesMenu from '../../commons/salesMenu'

class SelectMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
        }
    }

    render() {
        
        return (
            <View style={appStyles.container}>
                <Tabs
                    style={styles.appBar}
                    selectedIndex={this.state.selectedTab}
                    handleChange={index => this.setState({ selectedTab: index })}
                    backgroundColor={colors.APP_BACKGR}
                    underlineColor={colors.APP_MAIN}
                    actionItems={[
                        <Tab key={1} label='Productos' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                        iconStyles={{ color: (this.state.selectedTab == 0) ? colors.APP_MAIN : colors.APP_INACTIVE }}/>,
                        <Tab key={2} label='Ingredientes' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                        iconStyles={{ color: (this.state.selectedTab == 1) ? colors.APP_MAIN : colors.APP_INACTIVE }}/>,
                        <Tab key={3} label='Promociones' activeTextColor={colors.APP_MAIN} inActiveTextColor={colors.APP_INACTIVE}
                        iconStyles={{ color: (this.state.selectedTab == 2) ? colors.APP_MAIN : colors.APP_INACTIVE }}/>, //attach-money
                    ]}
                />

                    {(this.state.selectedTab === 0) ?
                            <ProductMenu rute='shop' />
                        : (this.state.selectedTab === 1) ?
                                <IngredientMenu/>
                            : 
                            <SalesMenu />
                          }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: sizes.hp('5%'),
        borderTopWidth: 2,
        borderColor: colors.APP_MAIN,
        
    },
});

export default SelectMenu