import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Game } from '../types/Game'; 

interface AdminManageGameProps {
    visible: boolean;
    onClose: () => void;
    game: Game;
    handleNextQuestion: () => void;
    isFirstQuestion: boolean;
    setIsFirstQuestion: (isFirst: boolean) => void;
  }

const AdminManageGame: React.FC<AdminManageGameProps> = ({ visible, onClose, game, handleNextQuestion, isFirstQuestion }) => {
      
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      
      <View style={styles.modalBackground}>
        <LinearGradient colors={['#000000', '#253031']} style={styles.modalGradient}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Manage Game: {game.team1.name} vs {game.team2.name}</Text>
            {isFirstQuestion ? (
            <Text style={styles.modalText}>
              Please click "Next Question" to start
            </Text>
          ) : (
            <Text style={styles.modalText}>
              Current Question: {game.questions[game.currentQuestion]?.question}
            </Text>
          )}
          <Pressable style={({ pressed }) => [styles.modalButton, pressed && styles.buttonPressed]} onPress={handleNextQuestion}>
            <Text style={styles.modalButtonText}>Next Question</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.modalButton, pressed && styles.buttonPressed]} onPress={onClose}>
            <Text style={styles.modalButtonText}>Close</Text>
          </Pressable>
          </View>
        </LinearGradient>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20, 
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15
  },
  modalButton: {
    backgroundColor: '#DDE819',
    shadowColor: '#000',
    padding: 10,
    marginTop: 20, 
    marginHorizontal: 10, 
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
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});

export default AdminManageGame;
