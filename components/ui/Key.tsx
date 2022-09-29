import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../../constants/colors';
import useLetterBackground from '../../hooks/useLetterBackground';
import {LetterStates} from './LetterTile';

const keyMargin = 3;

export interface IKeyProps {
  letterState?: LetterStates;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function Key({
  children,
  letterState = 'preCheck',
  style,
  onPress,
}: PropsWithChildren<IKeyProps>): JSX.Element {
  const bgs = useLetterBackground(Colors.gray100, letterState);

  const [debouncedStyles, setDebouncedStyles] =
    useState<StyleProp<ViewStyle>>(bgs);
  useEffect(() => {
    setTimeout(() => {
      setDebouncedStyles(bgs);
    }, 4 * 300 + 600);
  }, [bgs]);

  return (
    <Pressable
      style={({pressed}) => [
        debouncedStyles,
        style,
        styles.containerStyles,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    elevation: 0,
    backgroundColor: Colors.gray300,
  },
  containerStyles: {
    height: 50,
    borderRadius: 5,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: keyMargin,
  },
});
