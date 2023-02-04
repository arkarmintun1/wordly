import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import authService from '../../services/auth.service';
import Route, { RootStackParamList } from '../navigation/route';

type Props = NativeStackScreenProps<RootStackParamList, Route.SignIn>;

const SignInScreen = ({}: Props) => {
  const onPressSignIn = () => {
    authService.loginAnonymously();
  };

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Text style={styles.title}>Wordly</Text>
        <Button title="Sign In" onPress={onPressSignIn} />
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
    fontWeight: 'bold',
    fontSize: 50,
  },
});
