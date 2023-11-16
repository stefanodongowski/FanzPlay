import { useEffect, useState } from 'react';
import { Unsubscribe, collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { FIRESTORE } from '../FirebaseConfig';
import { Game } from '../types/Game';
import { Team, DEFAULT_TEAM } from '../types/Team';
import { Question } from '../types/Question';

interface GameWithId extends Game {
  id: string;
}

const useGames = () => {
  const [games, setGames] = useState<GameWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gamesCollection = collection(FIRESTORE, 'games');
    let unsubscribeFunctions: Unsubscribe[] = [];

    const gamesUnsubscribe = onSnapshot(gamesCollection, async (snapshot) => {
      const initialGamesPromises = snapshot.docs.map(async (docSnapshot) => {
        const gameDataRaw = docSnapshot.data();
        const gameId = docSnapshot.id;

        // Resolve the team references
        const team1Doc = await getDoc(doc(FIRESTORE, gameDataRaw.team1ID.path));
        const team2Doc = await getDoc(doc(FIRESTORE, gameDataRaw.team2ID.path));
        const team1Data = team1Doc.exists() ? team1Doc.data() as Team : DEFAULT_TEAM;
        const team2Data = team2Doc.exists() ? team2Doc.data() as Team : DEFAULT_TEAM;

        return {
          ...gameDataRaw,
          id: gameId,
          team1: team1Data,
          team2: team2Data,
          questions: [] as Question[] // Initialize questions as an empty array
        } as GameWithId;
      });


      const initialGames = await Promise.all(initialGamesPromises);

      for (let game of initialGames) {
        const questionsSnapshot = await getDocs(collection(FIRESTORE, `games/${game.id}/questions`));
        const questions = questionsSnapshot.docs.map(doc => doc.data() as Question);
        game.questions = questions;
      }
      
      setGames(initialGames);

      // Set up real-time listeners for questions updates
      initialGames.forEach((game) => {
        const unsubscribeQuestions = onSnapshot(
          collection(FIRESTORE, `games/${game.id}/questions`),
          (questionsSnapshot) => {
            const questions = questionsSnapshot.docs.map(doc => doc.data() as Question);
            setGames(prevGames => prevGames.map(g => 
              g.id === game.id ? { ...g, questions: questions } : g
            ));
          }
        );

        unsubscribeFunctions.push(unsubscribeQuestions);
      });

      setLoading(false);
    });

    unsubscribeFunctions.push(gamesUnsubscribe);

    return () => {
      unsubscribeFunctions.forEach(unsub => unsub());
    };
  }, []);

  return { games, loading };
};

export default useGames;
