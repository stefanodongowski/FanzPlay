import { User } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FIRESTORE } from "../FirebaseConfig";
import { Team } from "../types/Team";

const getTeam = (teamID: String) => {
    const [team, setTeam] = useState<any>();
    const [loading, setLoading] = useState(true); // Added loading state
    
  
    useEffect(() => {
      try {
        const teamsCollection = query(collection(FIRESTORE, 'teams'), where('__name__', '==', teamID));

        return onSnapshot(teamsCollection, (snapshot) => {
          const newTeam = snapshot.docs.map(doc => doc.data() as Team)[0];
          setTeam(newTeam);
          setLoading(false); // Set loading to false once data is loaded
        });
      }  catch {
        return
      }
    }, []);
  
    return { team, loading }; // Return both games and loading state
  };

export default getTeam;