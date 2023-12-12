import { Link, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import AdminGameCard from '../../components/AdminGameCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useGames from '../../services/gamesFetcher';
import { LinearGradient } from 'expo-linear-gradient';

const auth = FIREBASE_AUTH;

// create a component
const GamesPage = () => {
    const router = useRouter();
    const { games, loading: gamesLoading } = useGames();
    const [text, onChangeText] = React.useState('');

    return (
        <View style={styles.background}>
            <LinearGradient
                colors={['#000000', '#253031']}
                style={styles.gradient}
            >
                <View style={styles.games}>
                    {games.map((game, index) => (
                        <AdminGameCard key={index} game={game} />
                    ))}
                </View>
            </LinearGradient>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20
    },
    background: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    dark: {
        backgroundColor: '#253031'
    },
    input: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        padding: 10,
        width: 360,
        flexDirection: 'row'
    },
    textInput: {
        fontWeight: '300',
        color: 'white',
        width: 340,
        paddingLeft: 20,
        fontSize: 18
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
        width: 360,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20
    },
    buttonText: {
        fontSize: 24,
        color: '#253031',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontWeight: '500'
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.96 }]
    },
    upcoming: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
        padding: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        width: 360
    },
    games: {
        justifyContent: 'flex-start',
        flex: 1
    }
});

//make this component available to the app
export default GamesPage;
