import { get, create, remove, updateMerg } from '../Services/networkProvider';

export const getGoods = async () => {
  const res = await get('goods');
  const goods = res.goods.map((item) =>{
    return {
      ...item,
      active: false,
      edit: false,
    };
  });
  return goods;
};

export const createItem = (item = {}) => {
  return create('goods', item);
};

export const removeItem = (id) => {
  return remove('goods', id);
};

export const updateMergItem = (id, item = {}) => {
  return updateMerg('goods', id, item);
};
