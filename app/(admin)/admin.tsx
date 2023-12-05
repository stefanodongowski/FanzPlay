//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// create a component
const AdminPage = () => {
    const createGame = async () => {};

    const editGame = async () => {};

    const deleteGame = async () => {};

    const createTeam = async () => {};

    const editTeam = async () => {};

    const deleteTeam = async () => {};

    return (
        <View style={styles.background}>
            <LinearGradient
                colors={['#000000', '#253031']}
                style={styles.gradient}
            >
                <View style={styles.container}>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Create new game</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Edit game</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Delete game</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Create new team</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Edit team</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Delete team</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    buttonText: {
        fontSize: 24,
        color: '#000',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontWeight: '500'
    },
    button: {
        backgroundColor: '#DDE819',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
        width: 340,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20
    }
});

//make this component available to the app
export default AdminPage;
