import { Game } from "./Game";

// Interface for a Question document
export interface Question {
    answer: string[];
    gameID: Game; //This could be deleted
    points: number;
    question: string;
  }