import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from '../auth/sign-in-screen';
import GameScreen from '../game/game-screen';
import HomeScreen from '../home/home-screen';
import LeaderboardScreen from '../leaderboard/leaderboard-screen';
import Route, { RootStackParamList } from './route';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const isSignedIn = true;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Route.Home}
        screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <>
            <Stack.Screen name={Route.Home} component={HomeScreen} />
            <Stack.Screen name={Route.Game} component={GameScreen} />
            <Stack.Screen
              name={Route.Leaderboard}
              component={LeaderboardScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={Route.SignIn} component={SignInScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
