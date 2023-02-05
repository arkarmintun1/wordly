import firestore from '@react-native-firebase/firestore';
import { Game, Question } from '../models';

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
}

const gameService = new GameService();

export default gameService;
