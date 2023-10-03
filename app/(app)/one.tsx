//import liraries
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Page = () => {
    return (
        <View style={styles.container}>
            <Link href="/" replace asChild>
                <Text>Logout</Text>
            </Link>
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
export default Page;
