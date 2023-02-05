import { Platform } from 'react-native';

export const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string,
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const generateRandomCharacter = (length = 1) => {
  const word = new Array(length)
    .fill('')
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)]);
  return word.join('');
};
