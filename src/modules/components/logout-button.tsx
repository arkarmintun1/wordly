import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  iconName: string;
  size?: number;
  color?: string;
  onPress?: () => void;
};

const IconButton = ({ iconName, size, color, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
