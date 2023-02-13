import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../redux';
import { gameActions, gameSelectors } from '../redux/game/game.slice';
import { useSelector } from 'react-redux';
import { Fonts } from '../../design';
import { appSelectors } from '../redux/app/app.slice';
import { Loaders } from '../../models';

const LeaderboardScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    appSelectors.selectLoader(Loaders.Leaderboard),
  );
  const leaderboard = useAppSelector(gameSelectors.selectLeaderboard);

  const loadData = () => {
    dispatch(gameActions.getLeaderboard());
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.root} testID="leaderboard">
        <FlatList
          onRefresh={loadData}
          refreshing={isLoading ?? false}
          style={styles.flatlist}
          data={leaderboard?.items}
          renderItem={info => (
            <View style={[styles.row]}>
              <Text style={styles.userId}>{info.item.username}</Text>
              <Text style={styles.userPoint}>{info.item.points}</Text>
            </View>
          )}
          ListHeaderComponent={
            <View style={[styles.row]}>
              <Text style={[styles.userId, styles.header]}>User Name/ID</Text>
              <Text style={[styles.userPoint, styles.header]}>Points</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  root: {
    marginTop: 50,
  },
  flatlist: {
    height: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    fontFamily: Fonts.RobotoSlab_Bold,
  },
  userId: {
    flex: 3,
    fontFamily: Fonts.RobotoSlab,
  },
  userPoint: {
    fontFamily: Fonts.RobotoSlab,
    flex: 1,
    alignItems: 'center',
  },
});
