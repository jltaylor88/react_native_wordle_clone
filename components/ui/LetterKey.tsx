import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {Colors} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectLetterById} from '../../store/Letters/lettersSlice';
import {updateRow} from '../../store/Letters/rowsSlice';

import Key from './Key';

const keyMargin = 3;

export interface ILetterKeyProps {
  letter: string;
}

export default function LetterKey({letter}: ILetterKeyProps): JSX.Element {
  const [debouncedStyles, setDebouncedStyles] = useState<
    StyleProp<TextStyle>[]
  >([styles.keyText, styles.preCheck]);

  const letterState = useAppSelector(
    state => selectLetterById(state, letter)?.status,
  );

  const width = Dimensions.get('window').width;

  const keyWidth = (width - (2 * 9 + 2) * keyMargin - 10) / 10;

  const dispatch = useAppDispatch();
  const onKeyPress = useCallback(() => {
    dispatch(updateRow({letter}));
  }, [dispatch, letter]);

  const textStyles = useMemo(() => {
    const s: StyleProp<TextStyle>[] = [styles.keyText];
    if (!letterState || letterState === 'preCheck') {
      s.push(styles.preCheck);
    } else {
      s.push(styles.checked);
    }

    return s;
  }, [letterState]);

  useEffect(() => {
    setTimeout(() => {
      setDebouncedStyles(textStyles);
    }, 300 * 4 + 600);
  }, [textStyles]);

  return (
    <Key
      letterState={letterState}
      style={[{width: keyWidth}]}
      onPress={onKeyPress}>
      <Text style={debouncedStyles}>{letter}</Text>
    </Key>
  );
}

const styles = StyleSheet.create({
  keyText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
  },
  preCheck: {
    color: Colors.gray400,
  },
  checked: {
    color: 'white',
  },
});
