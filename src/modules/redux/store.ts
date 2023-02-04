import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/app.slice';
import authSlice from './auth/auth.slice';
import userSlice from './user/user.slice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares: any[] = [];

middlewares.push(sagaMiddleware);

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [appSlice.name]: appSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
