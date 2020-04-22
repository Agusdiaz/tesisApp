import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../index.styles';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} style={styles.avatar} icon="home-city" size={34} color={colors.APP_BACKGR} />

const RightContent = props =>  <IconButton {...props}
icon= {(1 == 1) ? "star-outline" : "star"} //PONER CONDICION
color={colors.STAR}
size={30}
onPress={() => { }}
/>

const ShopCard = () => (
    <Card style={{ alignContent: 'center' }}>
        <Card.Title title="Nombre Local" subtitle="Direccion Local" left={LeftContent} right={RightContent} />
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
            <Button
                style={{ left: sizes.wp('28%'), width: '40%' }} //ESTANDARIZAR
                icon="arrow-down-drop-circle-outline"
                mode="contained"
                color={colors.APP_MAIN}
                onPress={() => { }}>
                Ver Menu
                </Button>
        </Card.Actions>
    </Card>
);

const styles = StyleSheet.create({
    avatar: {
        color: colors.APP_BACKGR,
        backgroundColor: colors.APP_MAIN,
        marginBottom: 15,
        marginTop: 15
    },
});

export default ShopCard;