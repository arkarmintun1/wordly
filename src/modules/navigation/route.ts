import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

enum Route {
  Home = 'Home',
  Game = 'Game',
  Leaderboard = 'Leaderboard',
  SignIn = 'SignIn',
}

export type RootStackParamList = {
  [Route.Home]: undefined;
  [Route.Game]: { quizType: string };
  [Route.Leaderboard]: undefined;
  [Route.SignIn]: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default Route;
