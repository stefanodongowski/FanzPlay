import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

interface Question {
  answer: string[];
  gameID: string;
  points: number;
  question: string;
}

const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const db = getFirestore();
    const questionsCollection = collection(db, 'questions');

    const unsubscribe = onSnapshot(questionsCollection, (snapshot) => {
      const newQuestions = snapshot.docs.map(doc => doc.data() as Question);
      setQuestions(newQuestions);
      setLoading(false); // Set loading to false once data is loaded
    });

    return () => unsubscribe();
  }, []);

  return { questions, loading }; // Return both games and loading state
};

export default useQuestions;