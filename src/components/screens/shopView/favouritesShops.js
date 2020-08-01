import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, VirtualizedList, RefreshControl } from 'react-native';
import { Surface } from 'react-native-paper';
import { appStyles, colors, sizes } from '../../../index.styles';
import ShopCard from '../../commons/shopCardSummary'
import { Actions } from 'react-native-router-flux';
import ArrowButton from '../../commons/arrowButton'

class FavouritesShopsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            areFavourites: false,
            shops: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.getFavouritesShops()
    }

    getFavouritesShops(){
        this.props.shops.allShops.map(obj => {
            if (obj.favorito) {
                this.state.shops.push(obj)
            }
        })
        if (this.state.shops.length === 0)
            this.setState({ areFavourites: false })
        else this.setState({ areFavourites: true })
    }

    /*componentDidUpdate(oldProps) {
        var oldLength = 0
        var newLength = 0
        oldProps.shops.allShops.map(obj => {if(obj.favorito) oldLength++})
        this.props.shops.allShops.map(obj => {if(obj.favorito) newLength++})
        if(oldLength !== newLength){
            console.log('force')
            //this.setState({ shops: [] })
            this.forceUpdate()
        }
      }

    onRefresh() {
        //Clear old data of the list
        this.setState({ shops: [] });
        //Call the Service to get the latest data
        this.getFavourites()
    }*/

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 20,
                }}
            />
        );
    }

    render() {

        return (
            <View style={appStyles.container}>

                <ArrowButton rute='navBarClientProfile' />

                <Surface style={[styles.surface, { top: (this.state.areFavourites) ? sizes.hp('12.8%') : sizes.hp('-20%') }]}>
                    <Text style={{ fontSize: 20, color: colors.APP_BACKGR, fontWeight: 'bold', textAlign: 'center' }}>ESTOS SON TUS LOCALES FAVORITOS</Text>
                </Surface>

                {(this.state.areFavourites) ?
                    <VirtualizedList
                        style={styles.list}
                        ItemSeparatorComponent={this.renderSeparator}
                        //refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}
                        data={this.state.shops}
                        initialNumToRender={0}
                        renderItem={({ item }) => <ShopCard data={item}/>}
                        keyExtractor={(item, i) => i.toString()}
                        getItemCount={() => this.state.shops.length}
                        getItem={(item, i) => item[i]} />
                    :
                    <View style={styles.viewImage}>
                        <Image source={require('../../../icons/noStar.png')} style={styles.image} />
                        <Text style={styles.infoImage}>Todavía no tenés ningún local favorito</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    surface: {
        width: sizes.wp('100%'),
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.APP_MAIN,
    },
    viewImage: {
        justifyContent: 'center',
        margin: 20,
    },
    image: {
        width: 170,
        height: 170,
        marginBottom: sizes.hp('2%'),
        alignSelf: 'center'
    },
    infoImage: {
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    list: {
        //borderWidth: 5,
        //height: sizes.hp('-5%'),
        top: sizes.hp('13%'),
        marginBottom: sizes.hp('14%'),
        width: '100%'
    }
})

function mapStateToProps(state) {
    return {
        user: state.authState,
        shops: state.shops,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        //setShopsData: (shops) => dispatch(ShopActions.setShopsData(shops))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesShopsScreen)