import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Leaderboard } from '../../../models';
import { RootState } from '../store';

interface GameState {
  categories?: string[];
  game?: Game;
  leaderboard?: Leaderboard;
}

const initialState: GameState = {
  categories: undefined,
  game: undefined,
  leaderboard: undefined,
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

    getLeaderboard: () => {},
    setLeaderboard: (state, action: PayloadAction<Leaderboard>) => {
      state.leaderboard = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;

export const gameSelectors = {
  selectCategories: (state: RootState) => state.game.categories,
  selectGame: (state: RootState) => state.game.game,
  selectLeaderboard: (state: RootState) => state.game.leaderboard,
};

export default gameSlice;
