import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { authActions, useAppDispatch, useAppSelector } from '../redux';
import { appSelectors } from '../redux/app/app.slice';
import { Loaders } from '../../models';
import { Fonts } from '../../design';
import { generateBoxShadowStyle } from '../../utils';

const SignInButton = () => {
  const isLoading = useAppSelector(appSelectors.selectLoader(Loaders.SignIn));
  const dispatch = useAppDispatch();

  const onPressSignIn = () => {
    dispatch(authActions.loginAnonymously());
  };

  return (
    <TouchableOpacity
      onPress={onPressSignIn}
      disabled={isLoading}
      testID="sign-in-button">
      <View style={styles.root}>
        <Text style={styles.label}>
          {isLoading ? 'Loading' : 'Sign In Anonymous'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SignInButton;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#1F8A70',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    ...generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717'),
  },
  label: {
    fontFamily: Fonts.RobotoSlab_Medium,
    letterSpacing: 1.5,
    fontSize: 14,
    color: 'white',
  },
});
