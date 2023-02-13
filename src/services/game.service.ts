import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  Game,
  Leaderboard,
  LeaderboardData,
  LeaderboardItem,
  Question,
} from '../models';

class GameService {
  async getGameCategories() {
    const gameCategories: string[] = [];
    const querySnapshot = await firestore().collection('quizzes').get();

    querySnapshot.forEach(documentSnapshot =>
      gameCategories.push(documentSnapshot.id),
    );

    return gameCategories;
  }

  async getGameQuestions(quizType: string) {
    const game: Game = { category: quizType, points: 0, questions: [] };

    const querySnapshot = await firestore()
      .collection('quizzes')
      .doc(quizType)
      .collection('questions')
      .limit(5)
      .get();

    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data() as Question;
      game.questions.push({
        question: data.question,
        answer: data.answer,
        complexity: data.complexity,
        userAnswer: '',
      });
    });

    return game;
  }

  async saveGame(game: Game) {
    const userId = auth().currentUser?.uid;
    await firestore()
      .collection('leaderboard')
      .doc(userId)
      .set(
        {
          username: auth().currentUser?.displayName,
          points: firestore.FieldValue.increment(game.points),
        },
        { merge: true },
      );
  }

  async getLeaderboard() {
    const leaderboard: Leaderboard = { items: [] };
    const querySnapshot = await firestore()
      .collection('leaderboard')
      .orderBy('points', 'desc')
      .limit(10)
      .get();

    querySnapshot.forEach(documentSnapshot => {
      const id = documentSnapshot.id;
      const data = documentSnapshot.data() as LeaderboardData;
      leaderboard.items.push({
        id: id,
        username: data.username ?? id,
        points: data.points,
      });
    });

    return leaderboard;
  }
}

const gameService = new GameService();

export default gameService;
