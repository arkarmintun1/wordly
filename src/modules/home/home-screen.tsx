import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import Route from '../navigation/route';

type Props = NativeStackScreenProps<RootStackParamList, Route.Home>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Text>Home</Text>
        <Button title="Game" onPress={() => navigation.navigate(Route.Game)} />
        <Button
          title="Leaderboard"
          onPress={() => navigation.navigate(Route.Leaderboard)}
        />
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
});
