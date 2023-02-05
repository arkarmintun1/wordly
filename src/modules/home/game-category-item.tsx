import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Fonts } from '../../design';
import { useNavigation } from '@react-navigation/native';
import Route, { RootNavigationProp } from '../navigation/route';

type Props = {
  label: string;
};

const GameCategoryItem = ({ label }: Props) => {
  const navigation = useNavigation<RootNavigationProp>();

  const onPressLabel = () => {
    navigation.navigate(Route.Game, { quizType: label });
  };

  return (
    <TouchableOpacity onPress={onPressLabel}>
      <View style={styles.root}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameCategoryItem;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#1F8A70',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderRadius: 16,
  },
  label: {
    fontFamily: Fonts.RobotoSlab_Bold,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});
