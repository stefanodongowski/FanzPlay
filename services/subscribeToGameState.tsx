import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { FIRESTORE } from '../FirebaseConfig';

const subscribeToGameStateChanges = (gameID: string, callback: (gameState: string) => void): Unsubscribe => {
  const gameRef = doc(FIRESTORE, 'games', gameID);

  // Subscribe to changes in the 'gameState' field
  const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
    const gameState = docSnapshot.data()?.gameState;
    callback(gameState);
  });

  return unsubscribe;
};

export default subscribeToGameStateChanges;