import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../store/hooks';
import {keyFromIndex} from '../../utils/basicHelpers';
import LetterTile from './LetterTile';

export interface ILetterRowProps {
  rowIndex: number;
}

export default function LetterRow({rowIndex}: ILetterRowProps): JSX.Element {
  const letters = useAppSelector(
    state => state.rows.entities[rowIndex]?.letters,
  );

  const rowLetters = useMemo(() => {
    const tiles: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      tiles.push(
        <LetterTile
          letterIndex={i}
          rowIndex={rowIndex}
          style={styles.tile}
          key={keyFromIndex(i)}
          letter={letters && letters[i]}
        />,
      );
    }
    return tiles;
  }, [letters, rowIndex]);

  return <View style={styles.rowContainer}>{rowLetters}</View>;
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  tile: {marginHorizontal: 2, marginVertical: 2},
});
