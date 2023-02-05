import { all } from 'redux-saga/effects';
import { authSagas } from './auth/auth.saga';
import { gameSagas } from './game/game.saga';

export default function* rootSaga() {
  yield all([authSagas(), gameSagas()]);
}
