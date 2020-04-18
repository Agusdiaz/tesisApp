import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { appStyles, colors } from '../../../index.styles';
import { Avatar, Button } from 'react-native-paper';

export default class ProfileClientScreen extends Component {
    render() {
        return (
            <View >
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Avatar.Text style={styles.avatar} size={100} label="JD" labelStyle={{color: colors.APP_MAIN}} />
                        <Text style={styles.name}>John Doe </Text>
                        <Text style={styles.userInfo}>jhonnydoe@mail.com </Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={styles.item}>
                        <View style={styles.iconContent}>
                            <Button
                                style={{ marginTop: 15 }}
                                icon="settings-outline"
                                mode="contained"
                                color={colors.APP_MAIN}
                                onPress={() => { }}>
                                Ajustes
 				            </Button>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.APP_MAIN,
        marginTop: 70,
    },
    headerContent: {
        padding: 50,
        alignItems: 'center',
    },
    avatar: {
        color: colors.APP_BACKGR,
        backgroundColor: colors.APP_BACKGR,
        marginBottom: 15,
    },
    name: {
        fontSize: 25,
        color: colors.APP_BACKGR,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userInfo: {
        fontSize: 16,
        color: colors.APP_BACKGR,
    },
    body: {
        backgroundColor: colors.APP_BACKGR,
        height: 500,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        marginTop: 80,
    },
    iconContent: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 5,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: colors.APP_MAIN,
    }
});