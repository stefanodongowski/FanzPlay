import { Link, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const auth = FIREBASE_AUTH;

// create a component
const HomePage = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Button title='Logout' onPress={() => {
                auth.signOut()
                router.replace('/')
            }} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default HomePage;