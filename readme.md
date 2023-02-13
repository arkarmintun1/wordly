# Wordly

## Technology used

- React Native (cross platform for android and ios)
- Redux (state management)
- Firebase (authentication, data storage)
- Detox (e2e testing)

## Requirements

- For iOS, iOS simulator and xCode are required to build and run the app
- For Android, Emulator and Android Studio are required to build and run the app

## Setup

- Run `yarn` or `npm install` to install dependencies
- In the project's root folder, run
  - `yarn ios` or `npm run ios` to run the app on ios
  - `yarn android` or `npm run android` to run the app on android
- The app will be run on the simulator or emulator

## Screenshots

![Home Screen](/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202023-02-14%20at%2000.32.03.png 'Home Screen')

![Game Category Screen](/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202023-02-14%20at%2000.32.14.png 'Game Category Screen')

![Game Screen](/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202023-02-14%20at%2000.32.20.png 'Game Screen')

![Leaderboard Screen](/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202023-02-14%20at%2000.32.25.png 'Leaderboard Screen')

## Runnign Tests

The project has been setup with ios testing due to the known issue provided below

- Run `yarn start` or `npm run start` to run metro
- Run `yarn test` or `npm run test` to run `e2e` tests

## Known issue

- Running `e2e` test on android have some issues for latest react native version [Issue](https://github.com/wix/Detox/issues/3867)
