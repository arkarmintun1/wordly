import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  id?: string;
}

const initialState: AuthState = {
  id: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    loginAnonymously: () => {},
    logout: () => {},
  },
});

export const authActions = authSlice.actions;

export const authSelectors = {
  selectId: (state: RootState) => state.auth.id,
};

export default authSlice;
