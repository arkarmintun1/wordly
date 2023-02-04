jest.mock('@react-native-firebase/auth', () => () => ({
  signInAnonymously: jest.fn().mockReturnValue({ user: { uid: '123' } }),
  onAuthStateChanged: jest
    .fn()
    .mockResolvedValue(123)
    .mockReturnValue(jest.fn()),
}));
