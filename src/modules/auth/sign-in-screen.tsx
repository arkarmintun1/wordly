import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../../design';
import SignInButton from '../components/sign-in-button';
import Route, { RootStackParamList } from '../navigation/route';

type Props = NativeStackScreenProps<RootStackParamList, Route.SignIn>;

const SignInScreen = ({}: Props) => {
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Text style={styles.title} testID="title">
          Wordly
        </Text>
        <SignInButton />
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
