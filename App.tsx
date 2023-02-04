import React from 'react';
import { Provider } from 'react-redux';
import MainNavigator from './src/modules/navigation/main-navigator';
import { store } from './src/modules/redux';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
