import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

interface Team {
  color1: string;
  color2: string;
  logo: string;
  name: string;
}

const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const db = getFirestore();
    const teamsCollection = collection(db, 'teams');

    const unsubscribe = onSnapshot(teamsCollection, (snapshot) => {
      const newTeams = snapshot.docs.map(doc => doc.data() as Team);
      setTeams(newTeams);
      setLoading(false);  // Set loading to false once data is loaded
    });

    return () => unsubscribe();
  }, []);

  return { teams, loading }; // Return both games and loading state
};

export default useTeams;