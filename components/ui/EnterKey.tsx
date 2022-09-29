import {StyleSheet, Text} from 'react-native';
import React, {useCallback} from 'react';

import Key from './Key';
import {Colors} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {checkRow} from '../../store/Letters/rowsSlice';
import {updateSelectedLetters} from '../../store/Letters/lettersSlice';
import {
  useGetRandomWordQuery,
  useSearchForWordMutation,
} from '../../services/word';

export default function EnterKey(): JSX.Element {
  const {data} = useGetRandomWordQuery();
  const word = data?.word;

  const dispatch = useAppDispatch();
  const currentWord = useAppSelector(
    state => state.rows.entities[state.rows.currentRow]?.letters,
  );
  const readableWord = currentWord ? currentWord.join('') : undefined;
  const [checkWord] = useSearchForWordMutation();

  const handleEnter = useCallback(async () => {
    const resp = await checkWord(readableWord);
    if ('data' in resp) {
      if (!currentWord) {
        return;
      }
      dispatch(checkRow());
      dispatch(updateSelectedLetters({word: currentWord, gameWord: word}));
    }
  }, [checkWord, currentWord, dispatch, readableWord, word]);
  return (
    <Key style={styles.button} onPress={handleEnter}>
      <Text style={styles.text}>Enter</Text>
    </Key>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: Colors.gray400,
  },
});
