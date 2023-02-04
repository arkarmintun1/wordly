import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Loaders } from '../../models';
import IconButton from '../components/logout-button';
import { RootStackParamList } from '../navigation';
import Route from '../navigation/route';
import { authActions, useAppDispatch, useAppSelector } from '../redux';
import { appSelectors } from '../redux/app/app.slice';

type Props = NativeStackScreenProps<RootStackParamList, Route.Home>;

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(appSelectors.selectLoader(Loaders.Home));

  const onPressLogout = () => {
    dispatch(authActions.logout());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton iconName="log-out" onPress={onPressLogout} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Text>Home</Text>
      <Button title="Game" onPress={() => navigation.navigate(Route.Game)} />
      <Button
        title="Leaderboard"
        onPress={() => navigation.navigate(Route.Leaderboard)}
      />
    </View>
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
});
