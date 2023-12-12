import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// create a component
const RewardsPage = () => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 2,
                    marginBottom: 5
                }}
            >
                <Text style={styles.prizes}>My Rewards</Text>
            </View>
            <Image
                source={require('../../assets/mock_rewards.png')}
                style={styles.image}
            ></Image>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#253031',
        padding: 20
    },
    image: {
        margin: 15
    },
    prizes: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
        padding: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        width: 360
    }
});

//make this component available to the app
export default RewardsPage;
