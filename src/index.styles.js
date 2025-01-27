import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const colors = {
    APP_MAIN : '#E1454A',
    APP_BACKGR : '#FFFFFF',
    APP_INACTIVE : '#827C7C',
    APP_INACTIVE_FAB : '#D2D4DA',
    APP_GREEN : '#56CB0E',
    APP_RED: '#F50808',
    APP_PENDING: '#E3BD12',
    APP_DELIVERED : '#1253E3',
    APP_WAITING: '#DA6C11',
    SALTY : '#EE9226',
    SWEET : '#E863A5',
    DRINKS : '#3658C6',
    VEGAN: '#20B620', 
    VEGETARIAN : '#208C28',
    CELIAC : '#B2AB11',
    TEXT_INPUT : '#000000',
    STAR : '#F5CD08',
};

const sizes = {
    wp : wp,
    hp : hp,
    TEXT_INPUT : 15,
};

const orderStage = {
    PENDING: 'pendiente',
    READY: 'listo',
    DELIVERED : 'entregado',
}

const productCondition = {
    VEGAN: 'vegano',
    CELIAC: 'celiaco',
    VEGETARIAN: 'vegetariano',
}

const productType = {
    SALTY: 'salado',
    SWEET: 'dulce',
    DRINK: 'bebida',
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: colors.APP_BACKGR,
		alignItems: 'center',
        justifyContent: 'center',
        //marginTop: (Platform.OS === 'ios') ? 10 : 15, 
    },
})

export { colors, appStyles, sizes, orderStage, productCondition, productType };