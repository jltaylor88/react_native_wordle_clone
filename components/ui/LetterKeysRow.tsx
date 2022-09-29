import {useMemo} from 'react';
import LetterKey from './LetterKey';
import React from 'react';
import {keyFromIndex} from '../../utils/basicHelpers';

export interface ILetterKeysRowProps {
  letters: string[];
}

export default function LetterKeysRow({
  letters,
}: ILetterKeysRowProps): JSX.Element {
  const keys = useMemo(
    () =>
      letters.map((l, idx) => {
        return <LetterKey key={keyFromIndex(idx)} letter={l} />;
      }),
    [letters],
  );

  return <>{keys}</>;
}
