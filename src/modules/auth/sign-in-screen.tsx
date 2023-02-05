import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../../design';
import { Loaders } from '../../models';
import Route, { RootStackParamList } from '../navigation/route';
import { authActions, useAppDispatch, useAppSelector } from '../redux';
import { appSelectors } from '../redux/app/app.slice';

type Props = NativeStackScreenProps<RootStackParamList, Route.SignIn>;

const SignInScreen = ({}: Props) => {
  const isLoading = useAppSelector(appSelectors.selectLoader(Loaders.SignIn));
  const dispatch = useAppDispatch();

  const onPressSignIn = () => {
    dispatch(authActions.loginAnonymously());
  };

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Text style={styles.title}>Wordly</Text>
        <Button
          testID="sign-in-button"
          disabled={isLoading}
          title={isLoading ? 'Loading' : 'Sign In Anonymous'}
          onPress={onPressSignIn}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    rowGap: 100,
  },
  title: {
    fontSize: 50,
    fontFamily: Fonts.PlayfairDisplay_Medium,
  },
});
