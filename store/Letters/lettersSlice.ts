import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {LetterStates} from '../../components/ui/LetterTile';
import {RootState} from '../RootStore';

export interface ILetterEntity {
  id: string;
  status: LetterStates;
}

const lettersAdapter = createEntityAdapter<ILetterEntity>();

const initialState = lettersAdapter.getInitialState({});

export const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    updateSelectedLetters: (
      state,
      action: PayloadAction<{word: string[]; gameWord: string | undefined}>,
    ) => {
      if (!action.payload.gameWord) {
        return state;
      }
      const wordArray = action.payload.word;
      const currentWordArray = Array.from(
        action.payload.gameWord.toUpperCase(),
      );

      for (let i = 0; i < wordArray.length; i++) {
        const letterKey = wordArray[i];
        if (letterKey in state.entities) {
          if (letterKey === currentWordArray[i]) {
            state.entities[letterKey]!.status = 'correct';
          } else if (currentWordArray.includes(letterKey)) {
            state.entities[letterKey]!.status = 'halfCorrect';
          } else {
            state.entities[letterKey]!.status = 'incorrect';
          }
        }
      }
    },
    setInitialValues: (state, action: PayloadAction<ILetterEntity[]>) => {
      lettersAdapter.upsertMany(state, action.payload);
    },
  },
});

export const {setInitialValues, updateSelectedLetters} = lettersSlice.actions;

export const {selectById: selectLetterById} = lettersAdapter.getSelectors(
  (state: RootState) => state.letters,
);

export default lettersSlice.reducer;
