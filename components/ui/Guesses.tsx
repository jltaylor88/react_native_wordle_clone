import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import LetterRow from './LetterRow';

export default function Guesses(): JSX.Element {
  const renderedGuesses = useMemo(() => {
    const rows: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      rows.push(<LetterRow key={i} rowIndex={i} />);
    }

    return rows;
  }, []);

  return <View style={styles.container}>{renderedGuesses}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
