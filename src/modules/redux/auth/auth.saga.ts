import { call, put, takeLatest } from 'redux-saga/effects';
import { Loaders } from '../../../models';
import authService from '../../../services/auth.service';
import { appActions } from '../app/app.slice';
import { authActions } from './auth.slice';

function* loginAnonymously() {
  console.log('this is called');
  try {
    yield put(appActions.setLoader(Loaders.SignIn, true));
    yield call(authService.loginAnonymously);
  } catch (error) {
    console.error(error);
  } finally {
    yield put(appActions.setLoader(Loaders.SignIn, false));
  }
}

export function* authSagas() {
  yield takeLatest(authActions.loginAnonymously, loginAnonymously);
}
