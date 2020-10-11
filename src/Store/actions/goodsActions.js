import { getGoods as getGoodsResource,
  createItem as addItemResource,
  removeItem as removeItemResource,
  updateMergItem as updateItemResource } from '../../Resources/goods';
import { getTotal, getSubTotal } from '../../Utils/goodsUtils';

export const getGoods = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'GetGoods',
      subtype: 'loading',
    });
    getGoodsResource().then((res) => {
      dispatch({
        type: 'GetGoods',
        subtype: 'success',
        list: res,
        total: getTotal(res),
        subTotal: getSubTotal(res),
      });
    }, (getGoodsError) => {
      dispatch({
        type: 'GetGoods',
        subtype: 'failed',
        error: getGoodsError.message,
      });
    });
  };
};

export const addItem = (item) => async (dispatch, getState) =>{
  const state = getState();
  dispatch({
    type: 'addItem',
    subtype: 'loading',
  });
  addItemResource(item).then((res) => {
    const newElem = {active: false, edit: false, ...res.data};
    const newList = [...state.goods.list, newElem];
    dispatch({
      type: 'addItem',
      subtype: 'success',
      list: newList,
      total: getTotal(newList),
    });
  }, (addItemError) => {
    dispatch({
      type: 'addItem',
      subtype: 'failed',
      error: addItemError.message,
    });
  });
};

export const deleteItem = (id) => async (dispatch, getState) =>{
  const state = getState();
  dispatch({
    type: 'deleteItem',
    subtype: 'loading',
  });
  removeItemResource(id).then(()=> {
    const newList = state.goods.list.filter((e) => e.id !== id);
    dispatch({
      type: 'deleteItem',
      subtype: 'success',
      list: newList,
      total: getTotal(newList),
      subTotal: getSubTotal(newList),
    });
  }, (deleteItemError) => {
    dispatch({
      type: 'deleteItem',
      subtype: 'failed',
      error: deleteItemError.message,
    });
  });
};

export const deleteSelectedItem = (goods) => async (dispatch, getState) =>{
  const state = getState();
  dispatch({
    type: 'deleteSelectedItem',
    subtype: 'loading',
  });
  const selectedItems = state.goods.list.filter((e) => e.active)
      .map((e) => {
        return [...state.goods.selectedItemsId,
          e.id];
      });
  const promises = selectedItems.map((e) => removeItemResource(e));
  Promise.all(promises).then((res) => {
    dispatch(getGoods());
    dispatch({
      type: 'deleteSelectedItem',
      subtype: 'success',
    },
    );
  },
  (deleteItemError) => {
    dispatch(getGoods());
    dispatch({
      type: 'deleteSelectedItem',
      subtype: 'failed',
      error: deleteItemError.message,
    });
  },
  );
};

export const changeItem = (id, data, active) => async (dispatch, getState) =>{
  const state = getState();
  dispatch({
    type: 'changeItem',
    subtype: 'loading',
  });
  updateItemResource(id, data, active).then(()=> {
    const index = state.goods.list.findIndex((item) => item.id === id);
    const editGoodsList = [...state.goods.list];
    editGoodsList[index] = {id, active, ...data};
    console.log(id, data, active);
    console.log(state);
    dispatch({
      type: 'changeItem',
      subtype: 'success',
      list: editGoodsList,
      total: getTotal(editGoodsList),
      subTotal: getSubTotal(editGoodsList),
    });
  }, (changeItemError) => {
    dispatch({
      type: 'changeItem',
      subtype: 'failed',
      error: changeItemError.message,
    });
  });
};

export const selectItem = (itemId) => {
  return {
    type: 'toggleItem',
    id: itemId,
  };
};

export const changeEdit = (id, bool) => {
  return {
    type: 'changeEdit',
    id: id,
    edit: bool,
  };
};
