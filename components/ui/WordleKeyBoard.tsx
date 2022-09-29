import React from 'react';
import {StyleSheet, View} from 'react-native';
import DeleteKey from './DeleteKey';
import EnterKey from './EnterKey';
import LetterKeysRow from './LetterKeysRow';

const keyRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const keyRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keyRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
export default function WordleKeyBoard(): JSX.Element {
  return (
    <>
      <View style={styles.row}>
        <LetterKeysRow letters={keyRow1} />
      </View>
      <View style={styles.row}>
        <LetterKeysRow letters={keyRow2} />
      </View>
      <View style={styles.row}>
        <EnterKey />
        <LetterKeysRow letters={keyRow3} />
        <DeleteKey />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'center'},
});
