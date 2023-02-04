import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Loaders } from '../../../models';
import { RootState } from '../store';

interface AppState {
  loaders: {
    [key in Loaders]?: boolean;
  };
}

const initialState: AppState = {
  loaders: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoader: {
      reducer: (
        state,
        action: PayloadAction<{ loader: Loaders; value: boolean }>,
      ) => {
        const { loader, value } = action.payload;
        state.loaders[loader] = value;
      },
      prepare: (loader: Loaders, value: boolean) => ({
        payload: { loader, value },
      }),
    },
  },
});

export const appActions = appSlice.actions;

export const appSelectors = {
  selectLoader: (loader: Loaders) => (state: RootState) =>
    state.app.loaders[loader],
};

export default appSlice;
