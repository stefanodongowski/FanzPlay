import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { FIRESTORE } from '../FirebaseConfig';

const subscribeToGameChanges = (gameID: string, callback: (gameState: string, currentQuestion: number) => void): Unsubscribe => {
  const gameRef = doc(FIRESTORE, 'games', gameID);

  // Subscribe to changes in the 'gameState' and 'currentQuestion' fields
  const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
    const gameState = docSnapshot.data()?.gameState;
    const currentQuestion = docSnapshot.data()?.currentQuestion;
    callback(gameState, currentQuestion);
  });

  return unsubscribe;
};

export default subscribeToGameChanges;