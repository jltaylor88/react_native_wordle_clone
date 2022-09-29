import {wordApi} from '../services/word';
import lettersReducer from './Letters/lettersSlice';
import rowsReducer from './Letters/rowsSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import {configureStore} from '@reduxjs/toolkit';

const RootStore = configureStore({
  reducer: {
    letters: lettersReducer,
    rows: rowsReducer,
    [wordApi.reducerPath]: wordApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(wordApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(RootStore.dispatch);

export default RootStore;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof RootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof RootStore.dispatch;
