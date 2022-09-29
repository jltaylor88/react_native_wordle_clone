import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Easing, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../../constants/colors';
import useLetterBackground from '../../hooks/useLetterBackground';
import {useAppSelector} from '../../store/hooks';
import LetterTileInner from './LetterTileInner';

export type LetterStates = 'preCheck' | 'correct' | 'incorrect' | 'halfCorrect';

export interface ILetterTileProps {
  rowIndex: number;
  letterIndex: number;
  letter?: string;
  style?: StyleProp<ViewStyle>;
}

export default function LetterTile({
  rowIndex,
  letterIndex,
  letter,
  style,
}: ILetterTileProps): JSX.Element {
  const [debouncedState, setDebouncedState] =
    useState<LetterStates>('preCheck');
  const [bgState, setBgState] = useState<LetterStates>('preCheck');

  const currentRow = useAppSelector(state => state.rows.currentRow);
  const letterState: LetterStates = useAppSelector(state => {
    if (!letter || rowIndex === currentRow) {
      return 'preCheck';
    }
    return state.letters.entities[letter]?.status || 'preCheck';
  });
  useEffect(() => {
    setTimeout(() => setDebouncedState(letterState), 300 * letterIndex);
  }, [letterIndex, letterState]);
  useEffect(() => {
    setTimeout(() => setBgState(debouncedState), 300);
  }, [debouncedState]);
  const tileBgs = useLetterBackground('white', bgState);
  const tileStyles: StyleProp<ViewStyle> = useMemo(() => {
    if (!letter) {
      return styles.noLetter;
    }
    if (bgState === 'preCheck') {
      return styles.preCheckTile;
    } else {
      return tileBgs;
    }
  }, [letter, bgState, tileBgs]);

  const rotate = useRef(new Animated.Value(0)).current;
  const rotateZ = useRef(new Animated.Value(0)).current;
  const rotateY = useRef(new Animated.Value(0)).current;

  const spin = rotate.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '90deg', '180deg'],
  });

  const z = rotateZ.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const y = rotateY.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const a = useMemo(() => {
    return Animated.sequence([
      Animated.timing(rotate, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rotateZ, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(rotateY, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 2,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]);
  }, [rotate, rotateY, rotateZ]);

  useEffect(() => {
    if (debouncedState !== 'preCheck') {
      a.start();
    }
  }, [a, debouncedState, rotate]);

  return (
    <Animated.View
      style={[
        styles.tile,
        tileStyles,
        {transform: [{rotateX: spin}, {rotateZ: z}, {rotateY: y}]},
        style,
      ]}>
      <LetterTileInner
        letterState={bgState}
        letter={letter}
        style={[styles.inner, tileBgs]}
      />
    </Animated.View>
  );
}

const tileHW = 60;
const borderWidth = 3;

const styles = StyleSheet.create({
  tile: {
    height: tileHW,
    width: tileHW,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noLetter: {
    borderWidth,
    borderColor: Colors.gray100,
  },

  preCheckTile: {
    borderWidth,
    borderColor: 'black',
  },

  inner: {
    fontSize: 32,
  },
});
