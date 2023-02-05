import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Question } from '../../../models';
import { RootState } from '../store';

interface GameState {
  categories?: string[];
  game?: Game;
}

const initialState: GameState = {
  categories: undefined,
  game: undefined,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    getCategories: () => {},
    setCategories: {
      reducer: (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      },
      prepare: (categories: string[]) => ({ payload: categories }),
    },

    getGame: {
      reducer: () => {},
      prepare: (quizType: string) => ({ payload: quizType }),
    },
    setGame: {
      reducer: (state, action: PayloadAction<Game>) => {
        state.game = action.payload;
      },
      prepare: (game: Game) => ({ payload: game }),
    },
  },
});

export const gameActions = gameSlice.actions;

export const gameSelectors = {
  selectCategories: (state: RootState) => state.game.categories,
  selectGame: (state: RootState) => state.game.game,
};

export default gameSlice;
