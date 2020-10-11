import { categories, defaultCategory } from '../../Mocks/CategotyGoods';

const initialState = {
  list: categories,
  defaultCategory,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
