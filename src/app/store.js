import { configureStore } from '@reduxjs/toolkit';
import monsterListReducer from '../features/monsterList/monsterListSlice';
import searchBarReducer from '../features/searchBar/searchBarSlice';
import monsterDisplayReducer from '../features/monsterDisplay/monsterDisplaySlice';

export const store = configureStore({
  reducer: {
    monsterList: monsterListReducer,
    searchBar: searchBarReducer,
    monsterDisplay: monsterDisplayReducer,
  },
});
