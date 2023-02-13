import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../../design';
import LeaderBoardButton from '../components/leader-board-button';
import LogoutIconButton from '../components/logout-icon-button';
import { RootStackParamList } from '../navigation';
import Route from '../navigation/route';
import { authActions, useAppDispatch, useAppSelector } from '../redux';
import { gameActions, gameSelectors } from '../redux/game/game.slice';
import GameCategoryItem from './game-category-item';

type Props = NativeStackScreenProps<RootStackParamList, Route.Home>;

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const gameCategories = useAppSelector(gameSelectors.selectCategories);

  const onPressLogout = () => {
    dispatch(authActions.logout());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LogoutIconButton iconName="log-out" onPress={onPressLogout} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(gameActions.getCategories());
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wordly</Text>
        </View>
        <View style={styles.flatlistContainer}>
          <FlatList
            style={styles.flatlist}
            data={gameCategories}
            renderItem={info => <GameCategoryItem label={info.item} />}
          />
        </View>
        <View style={styles.leaderboard}>
          <LeaderBoardButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  titleContainer: {
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.PlayfairDisplay_Medium,
    fontSize: 30,
  },
  flatlistContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  flatlist: {
    flexGrow: 0,
  },
  leaderboard: {
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
