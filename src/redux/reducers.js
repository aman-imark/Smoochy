// reducers.js
const initialState = {
  filterData: null,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER_DATA':
      return { ...state, filterData: action.payload };
    default:
      return state;
  }
};

export default filterReducer;