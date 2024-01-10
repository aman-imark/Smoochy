import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
   
  },
  reducers: {
    setData: (state, action) => {
       return { ...state, ...action.payload };
    },
  },
});

export const { setData } = filterSlice.actions;
export default filterSlice.reducer;
