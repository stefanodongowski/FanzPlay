import { Link, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import GameCard, { Game } from  '../../components/GameCard';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const auth = FIREBASE_AUTH;

// Mock Data (to be deleted later)
const game1 : Game  =     
{
    team1: {
        name: 'UNC',
        logo: '../assets/temp/unc_logo.png',
    },
    team2: {
        name: 'Duke',
        logo: '../assets/temp/duke_logo.png',

    },
    date: 'FEB 3',
    time: '8:00PM',
  };

const game2 : Game  =     
{
    team1: {
        name: 'Virginia',
        logo: '../assets/temp/uva_logo.png',
    },
    team2: {
        name: 'Virginia Tech',
        logo: '../assets/temp/vt_logo.png',
    },
    date: 'JAN 17',
    time: '6:30PM',
  };

// create a component
const HomePage = () => {
    const router = useRouter();
    const [text, onChangeText] = React.useState('');
    return (
        <View style={[styles.container, styles.dark]}>
            <View style={styles.input}>
                <MaterialCommunityIcons name="key-variant" size={20} color="white" />
                <TextInput style={styles.textInput} value={text} placeholderTextColor={'#FFFFFF'} placeholder={'Enter code to join a game'} onChangeText={onChangeText}/>
            </View>
            <Pressable onPress={()=> console.log('Button Pressed')} style={styles.button}>
                <Text style={styles.buttonText}>Join</Text>
            </Pressable>
            <View style={{borderBottomColor: 'white', borderBottomWidth: 2, marginBottom: 5}}> 
                <Text style={styles.upcoming}>Upcoming Games</Text> 
            </View>
            <View style={styles.games}>

                <GameCard game={game1}/>
                <GameCard game={game2}/>
            </View>
            
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
        padding: 20, 
    },
    dark: {
        backgroundColor: '#253031',
    },
    input: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        padding: 10,
        width: 360,
        flexDirection: 'row',
    },
    textInput: {
        fontWeight: '300',
        color: 'white',
        width: 340,
        paddingLeft: 20,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#DDE819',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
        width: 360,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    buttonText: {
        fontSize: 24,
        color: '#253031',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontWeight: '500',
        },
    upcoming: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
        padding: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        width: 360,
    }, 
    games: {
        justifyContent: 'flex-start',
        flex: 1,

    },
});

//make this component available to the app
export default HomePage;