import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE } from '../FirebaseConfig';
import { Game } from '../types/Game';
import { Team } from '../types/Team';
import { Question } from '../types/Question';

const useGame = (gameId: string) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!gameId) return;

    const fetchGame = async () => {
      const gameRef = doc(FIRESTORE, 'games', gameId);

      try {
        setLoading(true);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
          setLoading(false);
          return;
        }

        const gameData = gameSnapshot.data() as Omit<Game, 'team1ID' | 'team2ID' | 'questions'> & {
          team1ID: { path: string };
          team2ID: { path: string };
          questions: { path: string }[];
        };

        // Resolve the team references
        const team1Snapshot = await getDoc(doc(FIRESTORE, gameData.team1ID.path));
        const team2Snapshot = await getDoc(doc(FIRESTORE, gameData.team2ID.path));

        const team1Data: Team = team1Snapshot.exists() ? team1Snapshot.data() as Team : {} as Team;
        const team2Data: Team = team2Snapshot.exists() ? team2Snapshot.data() as Team : {} as Team;

        // Resolve the questions array of references
        const questionsData: Question[] = await Promise.all(
          gameData.questions.map(async (ref) => {
            const questionSnapshot = await getDoc(doc(FIRESTORE, ref.path));
            return questionSnapshot.exists() ? questionSnapshot.data() as Question : {} as Question;
          })
        );

        // Construct the complete game object
        const completeGame: Game = {
          ...gameData,
          team1ID: team1Data,
          team2ID: team2Data,
          questions: questionsData,
        };

        setGame(completeGame);
      } catch (error) {
        console.error('Error fetching game:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  return { game, loading };
};

export default useGame;
