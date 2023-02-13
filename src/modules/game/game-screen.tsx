import { NativeStackScreenProps } from '@react-navigation/native-stack';
import _ from 'lodash';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../../design';
import gameService from '../../services/game.service';
import { generateBoxShadowStyle, generateRandomCharacter } from '../../utils';
import { RootStackParamList } from '../navigation';
import Route from '../navigation/route';
import { useAppDispatch, useAppSelector } from '../redux';
import { gameActions, gameSelectors } from '../redux/game/game.slice';

type Props = NativeStackScreenProps<RootStackParamList, Route.Game>;

const GameScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(gameSelectors.selectGame);
  const [currentGame, setCurrentGame] = useState(game);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<string>();
  const [answer, setAnswer] = useState<string[]>();
  const [userAnswer, setUserAnswer] = useState<string[]>();
  const numColumns = 5;
  const [score, setScore] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={
            styles.scoreText
          }>{`${score}/${currentGame?.questions.length}`}</Text>
      ),
    });
  }, [navigation, score, currentGame]);

  useEffect(() => {
    dispatch(gameActions.getGame(route.params.quizType));
  }, [route]);

  useEffect(() => {
    setCurrentGame(game);
    setIndex(0);
  }, [game]);

  useEffect(() => {
    const questionSet = currentGame?.questions[index];
    setQuestion(questionSet?.question);
    const answer = _.shuffle(questionSet?.answer.split(''));
    const rows = _.floor(answer.length / numColumns) + 1;
    const remainingCharLength = rows * numColumns - answer.length;
    const remainingChars = generateRandomCharacter(remainingCharLength);
    setAnswer(_.shuffle([...answer, ...remainingChars]));
    setUserAnswer(new Array(answer.length).fill(''));
  }, [index, currentGame]);

  const onPressNext = async () => {
    const newIndex = index + 1;
    if (game?.questions.length && index < game.questions.length - 1) {
      setIndex(newIndex);
    }

    const isLastAnswer =
      currentGame?.questions.length &&
      newIndex === currentGame?.questions.length - 1;

    if (isLastAnswer) {
      currentGame.points = score;
      await gameService.saveGame(currentGame);
      navigation.replace(Route.Leaderboard);
    }
  };

  const onPressSelectedLetter = (value: string, _index: number) => {
    const _answer = _.clone(answer);
    const _userAnswer = _.clone(userAnswer);
    const emptyIndex = _answer?.findIndex(value => value === '');
    if (
      _userAnswer &&
      _answer &&
      !_.isUndefined(emptyIndex) &&
      emptyIndex > -1
    ) {
      _answer[emptyIndex] = value;
      setAnswer(_answer);
      _userAnswer[_index] = '';
      setUserAnswer(_userAnswer);
    }
  };

  const onPressAvailableLetter = async (value: string, _index: number) => {
    const _userAnswer = _.clone(userAnswer);
    const _answer = _.clone(answer);
    const emptyIndex = _userAnswer?.findIndex(value => value === '');
    if (
      _answer &&
      _userAnswer &&
      !_.isUndefined(emptyIndex) &&
      emptyIndex > -1
    ) {
      _userAnswer[emptyIndex] = value;
      setUserAnswer(_userAnswer);
      _answer[_index] = '';
      setAnswer(_answer);
    }

    const answerFull = _userAnswer?.every(value => value !== '');
    const isLastAnswer =
      currentGame?.questions.length &&
      index === currentGame?.questions.length - 1;
    if (answerFull && currentGame && _userAnswer) {
      const correctAnswer = currentGame.questions[index].answer;
      const userAnswer = _userAnswer?.join('');
      currentGame.questions[index].userAnswer = userAnswer;
      setCurrentGame(currentGame);

      let points = score;
      if (userAnswer === correctAnswer) {
        points = points + 1;
        setScore(points);
      }

      if (isLastAnswer) {
        currentGame.points = points;
        await gameService.saveGame(currentGame);
        navigation.replace(Route.Leaderboard);
      } else {
        setIndex(currentIndex => currentIndex + 1);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <View style={styles.game}>
          <Text style={styles.question} testID="game-question">
            {question}
          </Text>
          <View style={styles.wordsHolder} testID="game-word-holder">
            <FlatList
              style={styles.flatlist}
              columnWrapperStyle={{ justifyContent: 'center' }}
              data={userAnswer}
              scrollEnabled={false}
              numColumns={numColumns}
              renderItem={info => (
                <TouchableOpacity
                  onPress={() => onPressSelectedLetter(info.item, info.index)}
                  style={[styles.textContainer, styles.blankTextContainer]}>
                  <Text style={styles.blankText}>{info.item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.wordsHolder}>
            <FlatList
              style={styles.flatlist}
              data={answer}
              scrollEnabled={false}
              numColumns={numColumns}
              renderItem={info => (
                <TouchableOpacity
                  onPress={() => onPressAvailableLetter(info.item, info.index)}
                  disabled={info.item === ''}
                  style={[
                    styles.textContainer,
                    styles.answerTextContainer,
                    info.item !== '' && styles.shadow,
                  ]}>
                  <Text style={styles.answerText}>{info.item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={styles.skipContainer}>
          <TouchableOpacity
            style={[styles.skip, styles.shadow]}
            onPress={onPressNext}
            testID="skip-button">
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    height: '100%',
  },
  game: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontFamily: Fonts.PlayfairDisplay_Medium,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 20,
    lineHeight: 30,
    marginBottom: 50,
  },
  wordsHolder: {
    marginVertical: 10,
  },
  flatlist: {
    flexGrow: 0,
  },
  textContainer: {
    width: 50,
    height: 50,
    margin: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  shadow: {
    ...generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717'),
  },
  blankTextContainer: {
    backgroundColor: '#BFDB38',
  },
  blankText: {
    textAlign: 'center',
    fontFamily: Fonts.RobotoSlab_Bold,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  answerTextContainer: {
    backgroundColor: '#FC7300',
  },
  answerText: {
    textAlign: 'center',
    fontFamily: Fonts.RobotoSlab_Bold,
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  skipContainer: {
    width: '100%',
  },
  skip: {
    margin: 20,
    backgroundColor: '#1F8A70',
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  skipText: {
    fontFamily: Fonts.RobotoSlab,
    color: 'white',
    letterSpacing: 2.0,
  },
  scoreText: {
    fontFamily: Fonts.RobotoSlab,
    letterSpacing: 2.0,
    fontSize: 20,
  },
});
