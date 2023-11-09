import { Timestamp } from "firebase/firestore";
import { Question } from "./Question";
import { Team } from "./Team";

// Interface for a Game document with resolved references
export interface Game {
    questionTime: number;
    questions: Question[]; // An array of resolved Question documents
    startTime: Timestamp;
    team1ID: Team; // Resolved Team document
    team2ID: Team; // Resolved Team document
  }