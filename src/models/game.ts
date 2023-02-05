export interface Question {
  question: string;
  answer: string;
  complexity: number;
  userAnswer: string;
}

export interface Game {
  category: string;
  questions: Question[];
  points: number;
}
