import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  name: string;
}

const initialState: UserState = {
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const userActions = userSlice.actions;

export const userSelectors = {
  selectName: (state: RootState) => state.user.name,
};

export default userSlice;
