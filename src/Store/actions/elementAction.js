export const editElement = (elem) => {
  return {
    type: 'editElement',
    payload: elem,
  };
};

export const updateElement = (updateElement) => {
  return {
    type: 'updateElement',
    payload: updateElement,
  };
};

export const changeEditMode = (bool) => {
  return {
    type: 'changeEditMode',
    editMode: bool,
  };
};
