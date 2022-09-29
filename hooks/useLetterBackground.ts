import {useMemo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {LetterStates} from '../components/ui/LetterTile';
import {Colors} from '../constants/colors';

export default function useLetterBackground(
  uncheckedBackground: string,
  letterState: LetterStates,
): StyleProp<ViewStyle> {
  const tileStyles: StyleProp<ViewStyle> = useMemo(() => {
    switch (letterState) {
      case 'preCheck':
        return {backgroundColor: uncheckedBackground};
      case 'correct':
        return styles.correctTile;
      case 'incorrect':
        return styles.incorrectTile;
      case 'halfCorrect':
        return styles.halfCorrectTile;
    }
  }, [letterState, uncheckedBackground]);

  return tileStyles;
}

const styles = StyleSheet.create({
  correctTile: {
    backgroundColor: Colors.green400,
  },
  incorrectTile: {
    backgroundColor: Colors.gray400,
  },
  halfCorrectTile: {
    backgroundColor: Colors.yellow400,
  },
});
