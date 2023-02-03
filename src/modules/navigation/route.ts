enum Route {
  Home = 'Home',
  Game = 'Game',
  Leaderboard = 'Leaderboard',
  SignIn = 'SignIn',
}

export type RootStackParamList = {
  [Route.Home]: undefined;
  [Route.Game]: undefined;
  [Route.Leaderboard]: undefined;
  [Route.SignIn]: undefined;
};

export default Route;
