import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const colors = {
    APP_MAIN : '#E1454A',
    APP_BACKGR : '#FFFFFF',
    APP_INACTIVE: '#827C7C',
    TEXT_INPUT : '#000000',
};

const appStyles = StyleSheet.create({
    SpinnerView: {
        flex: 1,
        width: "95%",
        alignSelf: 'center',
        marginBottom: 20,
    },
    container: {
        flex: 1,
		backgroundColor: colors.APP_BACKGR,
		alignItems: 'center',
		justifyContent: 'center',
    },
})

export { colors, appStyles };