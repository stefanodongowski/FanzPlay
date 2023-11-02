import React from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useRouter } from 'expo-router';

const auth = FIREBASE_AUTH;

// create a component
const ProfilePage = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text>Profile Page</Text>
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
export default ProfilePage;