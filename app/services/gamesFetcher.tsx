import { useEffect, useState } from 'react';
import { collection, doc, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';
import { Game } from '../../types/Game';
import { Team } from '../../types/Team';
import { Question } from '../../types/Question';

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gamesCollection = collection(FIRESTORE, 'games');

    const unsubscribe = onSnapshot(gamesCollection, (snapshot) => {
      const fetchGames = snapshot.docs.map(async (docSnapshot) => {
        const gameData = docSnapshot.data();
        // Resolve the team references
        const team1Doc = await getDoc(doc(FIRESTORE, gameData.team1ID.path));
        const team2Doc = await getDoc(doc(FIRESTORE, gameData.team2ID.path));
        
        // Resolve the questions array of references
        const questionsPromises = gameData.questions.map((ref: { path: string; }) => 
          getDoc(doc(FIRESTORE, ref.path))
        );
        const questionsDocs = await Promise.all(questionsPromises); // Make a promise that questions will not be null

        // Map the fetched documents to the expected structure
        const questions = questionsDocs.map(doc => doc.data() as Question);

        // Construct the complete game object
        const completeGame: Game = {
          questionTime: gameData.questionTime,
          questions: questions,
          startTime: gameData.startTime,
          team1ID: team1Doc.data() as Team,
          team2ID: team2Doc.data() as Team,
        };

        return completeGame;
      });

      Promise.all(fetchGames).then(completeGames => {
        setGames(completeGames);
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, []);

  return { games, loading };
};

export default useGames;