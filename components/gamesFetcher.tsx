import { useEffect, useState } from 'react';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { FIRESTORE } from '../FirebaseConfig'

interface Game {
  questionTime: number;
  questions: any[]; // might need to reconsider the type into explicit but this is stable for now
  startTime: Timestamp;  
  team1ID: string;
  team2ID: string;
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);  // Added loading state

  useEffect(() => {
    const db = FIRESTORE;
    const gamesCollection = collection(db, 'games');

    const unsubscribe = onSnapshot(gamesCollection, (snapshot) => {
      const newGames = snapshot.docs.map(doc => doc.data() as Game);
      setGames(newGames);
      setLoading(false);  // Set loading to false once data is loaded
    });

    return () => unsubscribe();
  }, []);

  return { games, loading };  // Return both games and loading state
};

export default useGames;