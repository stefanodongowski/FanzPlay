//import liraries
import { LinearGradient } from 'expo-linear-gradient';
import { addDoc, collection, doc, Firestore, setDoc, Timestamp } from 'firebase/firestore';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ViewProps, Modal, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Game } from '../../../types/Game';
import { Team } from '../../../types/Team';
import getTeam from '../../../services/teamFetcher'
import { FIRESTORE } from '../../../FirebaseConfig';

const handleAddGame = async (db: Firestore, team1ID: String, team2ID: String, startTime: Timestamp) => {
    if (team1ID && team2ID && startTime) {
        const team1: Team = getTeam(team1ID).team;
        const team2: Team = getTeam(team2ID).team;

        const newGame: Game = {
            gameID: '',
            gameState: "inactive", 
            currentQuestion: 0,
            questions: [],
            startTime: startTime,
            team1: team1,
            team2: team2, 
            team1score: 0, 
            team2score: 0,
        }

        console.log(newGame)

        const docRef = await addDoc(collection(db, "games"), newGame);
        await setDoc(doc(db, "games", docRef.id), {
            gameId: docRef.id
        });
    } else {
        alert("Make sure all fields are filled!")
    }
}

// create a component
const GameModal = () => {
    const db = FIRESTORE
    const [isOpen, setIsOpen] = useState(false);
    const [startTime, setStartTime] = useState(new Timestamp(0, 0));
    const [team1ID, setTeam1ID] = useState('');
    const [team2ID, setTeam2ID] = useState('');

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
            <Modal
                transparent={true}
                visible={isOpen}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={handleClose}>
                            <TextInput 
                                placeholder='Start time'
                                style={styles.input}
                                onChangeText={(text) => setStartTime(new Timestamp(parseInt(text), 0))}
                            />
                            <TextInput 
                                placeholder='Team 1 ID'
                                value={team1ID}
                                style={styles.input}
                                onChangeText={(text) => setTeam1ID(text)}
                            />
                            <TextInput 
                                placeholder='Team 2 ID'
                                value={team2ID}
                                style={styles.input}
                                onChangeText={(text) => setTeam2ID(text)}
                            />
                            <Button title="Cancel" onPress={handleClose} color="blue" />
                            <Button title="Add Game" onPress={() => handleAddGame(db, team1ID, team2ID, startTime)} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    );
};



// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    gradient: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        borderRadius: 10,
      },
    input: {
        backgroundColor: 'white',
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: '#DDE819',
        padding: 10,
        width: 300, 
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 15,
    },
    
});

//make this component available to the app
export default GameModal;
