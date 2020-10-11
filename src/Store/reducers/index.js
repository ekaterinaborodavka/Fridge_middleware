import { combineReducers } from 'redux';

import form from './formReducer';
import categories from './categoriesReducer';
import goods from './goodsReducer';
import element from './elementReducer';

export default combineReducers({
  form,
  categories,
  goods,
  element,
});
