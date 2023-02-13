import { call, put, takeLatest } from 'redux-saga/effects';
import { Game, Leaderboard, Loaders } from '../../../models';
import gameService from '../../../services/game.service';
import { appActions } from '../app/app.slice';
import { gameActions } from './game.slice';

function* getGameCategories() {
  try {
    const gameCategories: string[] = yield call(gameService.getGameCategories);
    yield put(gameActions.setCategories(gameCategories));
  } catch (error) {
    console.error(error);
  }
}

function* getGameQuestions(action: ReturnType<typeof gameActions.getGame>) {
  try {
    yield put(appActions.setLoader(Loaders.Game, true));
    const quizType = action.payload;
    const game: Game = yield call(gameService.getGameQuestions, quizType);
    yield put(gameActions.setGame(game));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(appActions.setLoader(Loaders.Game, false));
  }
}

function* getLeaderboard() {
  try {
    yield put(appActions.setLoader(Loaders.Leaderboard, true));
    const leaderboard: Leaderboard = yield call(gameService.getLeaderboard);
    yield put(gameActions.setLeaderboard(leaderboard));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(appActions.setLoader(Loaders.Leaderboard, false));
  }
}

export function* gameSagas() {
  yield takeLatest(gameActions.getCategories.type, getGameCategories);
  yield takeLatest(gameActions.getGame.type, getGameQuestions);
  yield takeLatest(gameActions.getLeaderboard.type, getLeaderboard);
}
