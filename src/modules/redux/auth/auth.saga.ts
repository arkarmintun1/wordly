import { call, put, takeLatest } from 'redux-saga/effects';
import { Loaders } from '../../../models';
import authService from '../../../services/auth.service';
import { appActions } from '../app/app.slice';
import { authActions } from './auth.slice';

function* loginAnonymously() {
  try {
    yield put(appActions.setLoader(Loaders.SignIn, true));
    const id: string | undefined = yield call(authService.loginAnonymously);
    if (id) {
      yield put(authActions.setId(id));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(appActions.setLoader(Loaders.SignIn, false));
  }
}

function* logout() {
  try {
    yield call(authService.logout);
  } catch (error) {
    console.error(error);
  }
}

export function* authSagas() {
  yield takeLatest(authActions.loginAnonymously, loginAnonymously);
  yield takeLatest(authActions.logout, logout);
}
