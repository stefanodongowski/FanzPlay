import { Timestamp } from "firebase/firestore";
import { Question } from "./Question";
import { Team } from "./Team";

// Interface for a Game document with resolved references
export interface Game {
    gameID: string;
    gameState: string;
    questions: Question[]; // An array of resolved Question documents
    startTime: Timestamp;
    team1: Team; // Resolved Team document
    team2: Team; // Resolved Team document
  }