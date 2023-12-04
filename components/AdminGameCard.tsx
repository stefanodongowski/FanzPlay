import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Image, Alert, ScrollView, Button } from 'react-native';
import { Game } from '../types/Game';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE } from '../FirebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { Question } from '../types/Question';
import QuestionEditModal from './QuestionEditModal';
import GameEditModal from './GameEditModal';
import QuestionSelectionModal from './QuestionSelectionModal';
import ManageModal from './ManageModal';

interface AdminGameCardProps {
  game: Game;
}

const formatDate = (timestamp: { toDate: () => any; }) => {
  const date = timestamp.toDate();
  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const AdminGameCard: React.FC<AdminGameCardProps> = ({ game }) => {
  const [showModal, setShowModal] = useState(false);
  const [gameState, setGameState] = useState(game.gameState);
  const [isFirstQuestion, setIsFirstQuestion] = useState(game.currentQuestion === 0);

  const [showQuestionEditModal, setShowQuestionEditModal] = useState(false);
  const [showGameEditModal, setShowGameEditModal] = useState(false);
  const [showQuestionSelectionModal, setShowQuestionSelectionModal] = useState(false);

  const updateGameState = async (newState: string) => {
    setGameState(newState);
    const gameRef = doc(FIRESTORE, 'games', game.gameID);
    await updateDoc(gameRef, { gameState: newState });
  };

   const handleNextQuestion = async () => {
    let nextIndex = isFirstQuestion ? 0 : game.currentQuestion + 1;
    if (nextIndex < game.questions.length) {
      const gameRef = doc(FIRESTORE, 'games', game.gameID);
      await updateDoc(gameRef, { currentQuestion: nextIndex, gameState: 'question' });
      setIsFirstQuestion(false);
    } else {
      updateGameState('finalLeaderboard');
      Alert.alert("Game Ended", "Please reset to play again. You can also edit your game");
      setShowModal(false);
    }
  };

  const handleStartGame = async () => {
    
    updateGameState('lobby');
  };

  const handleResetGame = async () => {
    
    updateGameState('inactive');
    const gameRef = doc(FIRESTORE, 'games', game.gameID);
    await updateDoc(gameRef, { currentQuestion: 0 });
    setIsFirstQuestion(true);
  };


  const confirmDelete = () => {
    Alert.alert(
      "Delete Game",
      "Are you sure you want to delete this game?",
      [
        { text: "Cancel", onPress: () => console.log("Deletion cancelled"), style: "cancel" },
        { text: "Yes", onPress: () => deleteGame() }
      ],
      { cancelable: false }
    );
  };

  const deleteGame = async () => {
    const gameRef = doc(FIRESTORE, 'games', game.gameID);
    await deleteDoc(gameRef);
  };

  const handleEditGame = () => {
    setShowGameEditModal(true);
  };

  const handleEditQuestions = () => {
    setShowQuestionSelectionModal(true);
  };

  
 

  const icon1 = game.team1.name === 'UNC' ? require('../assets/temp/unc_logo.png') : require('../assets/temp/uva_logo.png');
  const icon2 = game.team2.name === 'Duke' ? require('../assets/temp/duke_logo.png') : require('../assets/temp/vt_logo.png');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {game.team1.name + ' vs. ' + game.team2.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.logo} source={icon1} />
          <View style={styles.divider} />
          <Image style={styles.logo} source={icon2} />
          <View style={styles.timeAndDate}>
            <Text style={styles.dateTime}>{formatDate(game.startTime)}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {gameState === 'inactive' && (
            <Pressable style={({ pressed }) => [styles.button, styles.startButton, pressed && styles.buttonPressed]} onPress={handleStartGame}>
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
          )}
          {gameState !== 'inactive' && (<Pressable style={({ pressed }) => [styles.button, styles.manageButton, pressed && styles.buttonPressed]} onPress={() => setShowModal(true)}>
            <Text style={styles.buttonText}>Manage</Text>
          </Pressable>
          )}
                <Pressable style={({ pressed }) => [styles.button, styles.editButton, pressed && styles.buttonPressed]} onPress={() => {
        // Display options to choose which part to edit
        Alert.alert(
          "Edit Options",
          "What do you want to edit?",
          [
            { text: "Questions", onPress: handleEditQuestions },
            { text: "Game Time", onPress: handleEditGame }
          ],
          { cancelable: true }
        );
      }}>
        <Text style={styles.buttonText}> Edit</Text>
      </Pressable>
          <Pressable style={({ pressed }) => [styles.button, styles.resetButton, pressed && styles.buttonPressed]} onPress={handleResetGame}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.button, styles.deleteButton, pressed && styles.buttonPressed]} onPress={confirmDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>

      <ManageModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        game={game}
        handleNextQuestion={handleNextQuestion}
        isFirstQuestion={isFirstQuestion}
        setIsFirstQuestion={setIsFirstQuestion} 
      />
     
    <QuestionSelectionModal
        visible={showQuestionSelectionModal}
        onClose={() => setShowQuestionSelectionModal(false)}
        gameID={game.gameID}
        questions={game.questions}
        
      />
      <GameEditModal
        visible={showGameEditModal}
        onClose={() => setShowGameEditModal(false)}
        game={game}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 10,
  },
    card: {
      backgroundColor: 'white',
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
    },
    title: {
      color: '#000',
      fontSize: 28,
      fontStyle: 'normal',
      fontWeight: '400',
      padding: 10,
    },
    dateTime: {
      color: '#000',
      textAlign: 'center',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '300',
      width: 85,
    },
    timeAndDate: {
      flexShrink: 0,
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 10,
    },
    logo: {
      width: 100,
      height: 65,
      resizeMode: 'contain',
      marginLeft: 5,
      marginBottom: 10,
    },
    divider: {
      height: '90%',
      width: 2,
      marginHorizontal: 10,
      shadowColor: '#000',
      backgroundColor: '#FFF',
      shadowOpacity: 0.6,
      shadowRadius: 7,
      elevation: 2,
      marginBottom: 10,
      alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
      },
      modalButton: {
        backgroundColor: '#DDE819',
        shadowColor: '#000',
        padding: 10,
        margin: 10,
        borderRadius: 5,
      },
      modalButtonText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '500',
      },
    modalBackground: {
        flex: 1,
    },
    modalGradient: {
        flex: 1,
    },
      manageButton: {
        backgroundColor: 'orange',
      },
      editButton : {
        backgroundColor: 'purple', 
      },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 80, 
      marginHorizontal: 5,
    },
    startButton: {
      backgroundColor: 'green',
    },
    resetButton: {
      backgroundColor: 'red',
    },
    pauseButton: {
      backgroundColor: 'orange',
    },
    continueButton: {
      backgroundColor: 'blue',
    },
    deleteButton: {
      backgroundColor: 'red',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonPressed: {
      opacity: 0.8,
      transform: [{ scale: 0.96 }],
    },
  });

export default AdminGameCard;
