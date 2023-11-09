import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE } from '../FirebaseConfig'

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
    const questionsCollection = collection(FIRESTORE, 'questions');

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