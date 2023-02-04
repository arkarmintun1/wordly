import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  id?: number;
}

const initialState: AuthState = {
  id: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAnonymously: () => {},
    logout: () => {},
  },
});

export const authActions = authSlice.actions;

export const authSelectors = {
  selectId: (state: RootState) => state.auth.id,
};

export default authSlice;
