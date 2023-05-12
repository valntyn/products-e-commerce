import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import favoriteReducer from './reducers/favoriteSlice';
import filterReducer from './reducers/filterSlice';
import productsReducer from './reducers/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    favorite: favoriteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */