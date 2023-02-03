import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import SignInScreen from '../auth/sign-in-screen';
import GameScreen from '../game/game-screen';
import HomeScreen from '../home/home-screen';
import LeaderboardScreen from '../leaderboard/leaderboard-screen';
import Route, { RootStackParamList } from './route';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(firebaseUser =>
      setUser(firebaseUser),
    );

    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Route.Home}
        screenOptions={{ headerShown: false }}>
        {user ? (
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
