import {getTotal, toggleCheckbox, getSubTotal } from '../../Utils/goodsUtils';

export const initialState = {
  list: [],
  total: 0,
  subTotal: 0,
  getGoodsError: null,
  getGoodsLoading: null,
  addItemError: null,
  addItemLoading: null,
  selectedItemsId: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GetGoods': {
      return {
        ...state,
        list: action.subtype === 'success' ? action.list : state.goods,
        total: action.subtype === 'success' ? action.total : state.goods,
        subTotal: action.subtype === 'success' ? action.subTotal : state.goods,
        getGoodsLoading: action.subtype === 'loading',
        getGoodsError: action.subtype === 'failed' ? action.error : null,
      };
    }
    case 'addItem': {
      return {
        ...state,
        list: action.subtype === 'success' ? action.list : state.goods,
        total: action.subtype === 'success' ? action.total : state.goods,
        subTotal: action.subtype === 'success' ? action.subTotal : state.goods,
        addItemLoading: action.subtype === 'loading',
        getGoodsLoading: action.subtype === 'loading',
        addItemError: action.subtype === 'failed' ? action.error : null,
      };
    }
    case 'changeItem':
    case 'deleteItem': {
      return {
        ...state,
        list: action.subtype === 'success' ? action.list : state.goods,
        total: action.subtype === 'success' ? action.total : state.goods,
        subTotal: action.subtype === 'success' ? action.subTotal : state.goods,
        addItemLoading: action.subtype === 'loading',
        getGoodsLoading: action.subtype === 'loading',
        getGoodsError: action.subtype === 'failed' ? action.error : null,
      };
    }
    case 'deleteSelectedItem': {
      return {
        ...state,
        getGoodsLoading: action.subtype === 'loading',
        getGoodsError: action.subtype === 'failed' ? action.error : null,
      };
    }
    case 'toggleItem': {
      const newList = toggleCheckbox(action.id, state.list);
      return {
        ...state,
        list: newList,
        total: getTotal(newList),
        subTotal: getSubTotal(newList),
      };
    }
    case 'changeEdit':
      const newList = state.list.map((item) => {
        if (item.id === action.id) {
          return {...item, edit: action.edit};
        }
        return item;
      });
      return {
        ...state,
        list: newList,
      };
    default:
      return state;
  }
};

export default reducer;
