import { Game } from "./Game";

// Interface for a Question document
export interface Question {
    answers: string[];
    points: number;
    question: string;
    questionTime: number;
    correctAnswer: number; //index of correct answer choice
  }