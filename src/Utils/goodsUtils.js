
export const getTotal = (goods) => {
  return goods.reduce((acc, item) => {
    return acc + parseFloat(item.weight);
  }, 0);
};

export const getSubTotal = (goods) => {
  return goods.filter((e) => e.active).reduce((acc, item) => {
    return acc + parseFloat(item.weight);
  }, 0);
};

export const toggleCheckbox = (id, goods) => {
  return goods.map((item) => {
    if (item.id === id) {
      return {...item, active: !item.active};
    }
    return item;
  });
};


