import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/filterSlice';

const store = configureStore({
  reducer: {
    data: filterReducer,
  },
});

export default store;