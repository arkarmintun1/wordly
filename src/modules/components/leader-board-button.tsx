import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fonts } from '../../design';
import { generateBoxShadowStyle } from '../../utils';
import Route, { RootNavigationProp } from '../navigation/route';

const LeaderBoardButton = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const onPressLeaderBoard = () => {
    navigation.navigate(Route.Leaderboard);
  };

  return (
    <TouchableOpacity onPress={onPressLeaderBoard} testID="sign-in-button">
      <View style={styles.root}>
        <Text style={styles.label}>Leaderboard</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LeaderBoardButton;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FC7300',
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
