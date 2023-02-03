export enum GameCategory {
  ANIMALS = 'ANIMALS',
  CITIES = 'CITIES',
  FOOD = 'FOOD',
}

export interface Game {
  category: GameCategory;
  questions: {
    hint: string;
    word: string;
    answer: string;
    complexity: number;
  }[];
  points: number;
}
