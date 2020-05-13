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
    TEXT_INPUT : '#000000',
    STAR : '#F5CD08',
};

const sizes = {
    wp : wp,
    hp : hp,
    TEXT_INPUT : 15,
};

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: colors.APP_BACKGR,
		alignItems: 'center',
        justifyContent: 'center',
        //marginTop: (Platform.OS === 'ios') ? 10 : 15, 
    },
})

export { colors, appStyles, sizes };