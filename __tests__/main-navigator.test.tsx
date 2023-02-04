import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';
import { Provider } from 'react-redux';
import MainNavigator from '../src/modules/navigation/main-navigator';
import { storeOptions } from '../src/modules/redux';
import authService from '../src/services/auth.service';

describe('Testing MainNavigator', () => {
  test('page contains the title and button', async () => {
    const store = configureStore(storeOptions);

    const component = (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );

    render(component);

    const title = await screen.findByText('Wordly');
    const button = await screen.findByTestId('sign-in-button');

    expect(title).toBeOnTheScreen();
    expect(button).toBeOnTheScreen();
  });

  test('clicking on sign in button calls the signin service method', async () => {
    const loginAnonymously = jest.spyOn(authService, 'loginAnonymously');

    const store = configureStore(storeOptions);

    const component = (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );

    render(component);

    const signInButton = await screen.findByTestId('sign-in-button');

    fireEvent(signInButton, 'press');

    expect(loginAnonymously).toHaveBeenCalled();
  });
});
