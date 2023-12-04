import React, { useState } from 'react';
import { Modal, ScrollView, View, Text, Button, StyleSheet, Pressable, Alert } from 'react-native';
import { Question } from '../types/Question'; 
import { LinearGradient } from 'expo-linear-gradient';
import CreateQuestionModal from './AddQuestionModal';
import { Game } from '../types/Game';
import QuestionEditModal from './QuestionEditModal';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE } from '../FirebaseConfig';

interface QuestionSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  gameID: string;
  questions: Question[];
  
}

const QuestionSelectionModal: React.FC<QuestionSelectionModalProps> = ({ visible, onClose, questions, gameID }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showQuestionEditModal, setShowQuestionEditModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  
    const handleQuestionEdit = (question: Question) => {
      setSelectedQuestion(question);
      setShowQuestionEditModal(true);
    };
  
    const closeEditModal = () => {
      setShowQuestionEditModal(false);
    };

    const handleDeleteQuestion = (questionID: string) => {
        Alert.alert(
          "Confirm Delete",
          "Are you sure you want to delete this question?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => deleteQuestion(questionID) }
          ],
          { cancelable: false }
        );
      };
    
      const deleteQuestion = async (questionID: string) => {
        await deleteDoc(doc(FIRESTORE, 'games', gameID, 'questions', questionID));
      };
    
  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
        <View style={styles.modalBackground}>
        <LinearGradient colors={['#000000', '#253031']} style={styles.modalGradient}>
      <ScrollView style={styles.container}>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionItem}>
            <Text style={styles.modalText}>{question.question}</Text>
            <Pressable style={({ pressed }) => [styles.modalEditButton, pressed && styles.buttonPressed]} onPress={() => handleQuestionEdit(question)}>
            <Text style={styles.modalEditButtonText}>Edit</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.modalEditButton, styles.deleteButton, pressed && styles.buttonPressed]} onPress={() => handleDeleteQuestion(question.questionID)}>
            <Text style={styles.modalEditButtonText}>Delete</Text>
          </Pressable>
          </View>
        ))}
      </ScrollView>
      <Pressable style={({ pressed }) => [styles.modalButton, pressed && styles.buttonPressed]} onPress={() => setShowCreateModal(true)}>
        <Text style={styles.modalButtonText}>Add Question</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.modalButton, pressed && styles.buttonPressed]} onPress={onClose}>
            <Text style={styles.modalButtonText}>Close</Text>
          </Pressable>
          
               
      <CreateQuestionModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        gameID= {gameID}
      />
      
        </LinearGradient>
      </View>
      {showQuestionEditModal && (
        <QuestionEditModal
          visible={showQuestionEditModal}
          onClose={closeEditModal}
          gameID={gameID}
          question={selectedQuestion!}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 15
  },
  
  modalButton: {
    backgroundColor: '#DDE819',
    shadowColor: '#000',
    padding: 5,
    margin: 10,
    borderRadius: 5,
    
  },

  modalButtonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 24,
    fontWeight: '500',
  }, 
  modalEditButton: {
    backgroundColor: '#DDE819',
    shadowColor: '#000',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    
  },
  modalEditButtonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  }, 
  modalBackground: {
    flex: 1,
  },
  modalGradient: {
    flex: 1,
  },
  questionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red'
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});

export default QuestionSelectionModal;
