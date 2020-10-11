import { defaultCategory } from '../../Mocks/CategotyGoods';

const initialState = {
  title: '',
  weight: '',
  description: '',
  category: defaultCategory,
  active: '',
  editMode: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateElement':
      return {
        ...state,
        ...action.payload,
      };
    case 'editElement':
      const editElement = {
        title: action.payload.title,
        weight: action.payload.weight,
        description: action.payload.description,
        category: action.payload.category,
      };
      return {
        ...state,
        ...editElement,
      };
    case 'changeEditMode':
      return {
        ...state,
        editMode: action.editMode,
      };
    default:
      return state;
  }
};

export default reducer;
