import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {LetterStates} from './LetterTile';

export interface ILetterTileInnerProps {
  letter?: string;
  letterState: LetterStates;
  style?: StyleProp<TextStyle>;
}
export default function LetterTileInner({
  letter,
  letterState,
  style,
}: ILetterTileInnerProps): JSX.Element {
  const textStyles: StyleProp<TextStyle> = useMemo(() => {
    if (letterState === 'preCheck') {
      return styles.preCheckText;
    } else {
      return styles.checkedText;
    }
  }, [letterState]);

  return <Text style={[styles.tileText, textStyles, style]}>{letter}</Text>;
}

const styles = StyleSheet.create({
  tileText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  preCheckText: {color: 'black'},
  checkedText: {color: 'white'},
});
