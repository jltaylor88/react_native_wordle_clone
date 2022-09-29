import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface IRowEntity {
  id: number;
  letters: string[];
}

const rowsAdaptor = createEntityAdapter<IRowEntity>({});

const initialState = rowsAdaptor.getInitialState({
  currentRow: 0,
});

export const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    setActiveRow: (state, action: PayloadAction<number>) => {
      state.currentRow = action.payload;
    },
    setInitialRows: (state, action: PayloadAction<IRowEntity[]>) => {
      rowsAdaptor.upsertMany(state, action.payload);
    },
    updateRow: (state, action: PayloadAction<{letter: string}>) => {
      const currentRow = state.currentRow;
      const currentValues = state.entities[currentRow]?.letters;
      const letters = !currentValues
        ? [action.payload.letter]
        : [...currentValues, action.payload.letter];
      const newPayload: IRowEntity = {
        id: currentRow,
        letters,
      };
      state.entities[currentRow] = newPayload;
    },
    checkRow: state => {
      if (state.entities[state.currentRow]?.letters.length !== 5) {
        return;
      }
      state.currentRow++;
    },
  },
});

const rowsReducer = rowsSlice.reducer;
export default rowsReducer;

export const {checkRow, setActiveRow, setInitialRows, updateRow} =
  rowsSlice.actions;
