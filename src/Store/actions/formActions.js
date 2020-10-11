export const updateForm = (updatedForm) => {
  return {
    type: 'updateForm',
    payload: updatedForm,
  };
};

export const clearForm = () => {
  return {
    type: 'clearForm',
  };
};

export const addItem = (item) => {
  return {
    type: 'addItem',
    payload: item,
  };
};
