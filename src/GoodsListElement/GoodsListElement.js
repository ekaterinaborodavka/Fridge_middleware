import React, { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import './GoodsListElement.css';
import CategoryGoods from '../CategoryGoods/CategoryGoods';
import PropTypes from 'prop-types';
import * as elementActions from '../Store/actions/elementAction';
import * as goodsActions from '../Store/actions/goodsActions';

export default function GoodsListElement(props) {
  const element = useSelector((state) => state.element, shallowEqual);
  const goods = useSelector((state) => state.goods, shallowEqual);
  const dispatch = useDispatch();

  const { title, weight, description, category, active, id } = props.good;
  const { onToggle, onDelete, good } = props;

  const currentGood = goods.list.find((item) => item.id === id);
  const {edit} = currentGood;

  const onDeleteElement = useCallback(
      (e) => {
        onDelete(good.id);
      }, [good.id, onDelete],
  );

  const onToggleElement = useCallback(
      (e) => {
        onToggle(good.id);
      }, [good.id, onToggle],
  );

  const onInputChange = useCallback(
      ({ target }) => {
        dispatch(elementActions.updateElement({
          ...element,
          [target.name]: target.value,
        }));
      }, [element, dispatch],
  );

  const onEdit = useCallback(
      (e) => {
        e.stopPropagation();
        dispatch(goodsActions.changeEdit(good.id, true));
        dispatch(elementActions.changeEditMode(true));
        dispatch(elementActions.editElement(props.good));
      }, [props, dispatch, good.id],
  );

  const onSave = useCallback(
      () => {
        const { good: {id}, onSave } = props;
        const {title, weight, description, category} = element;

        dispatch(goodsActions.changeEdit(good.id, false));
        dispatch(elementActions.changeEditMode(false));
        onSave(id, {title, weight, description, category}, active);
      }, [dispatch, element, good.id, props, active],
  );

  return (
    <div className="GoodsListElement">
      <div className="GoodsListElement_Column GoodsListElement_Checkbox">
        <input
          checked = { active }
          type='checkbox'
          onChange={() => onToggleElement()}/>
      </div>
      <div className="GoodsListElement_Column">{
                    edit ? <input type="text"
                      defaultValue={ title }
                      name="title"
                      onChange={ onInputChange }/> : title }
      </div>
      <div className="GoodsListElement_Column">{
                    edit ? <input type="number"
                      defaultValue={ weight }
                      name="weight"
                      onChange={ onInputChange }/> : weight }
      </div>
      <div className="GoodsListElement_Column">{
                    edit ? <CategoryGoods
                      defaultValue={ category }
                      onChange={ onInputChange }/> : category}
      </div>
      <div className="GoodsListElement_Column
      GoodsListElement_ColumnDescription">{
                    edit ? <input type="text"
                      defaultValue={ description }
                      name="description"
                      onChange={ onInputChange }/> : description}
      </div>
      <div className="GoodsListElement_Column GoodsListElement_Button">
        {
          ( !edit && <button className="GoodsListElement_Button_Edit"
            onClick={onEdit}
            disabled={element.editMode&&!edit}>Edit</button>
          ) || <button className="GoodsListElement_Button_Save"
            onClick={onSave}>Save</button>
        }
        <button className="GoodsListElement_Button_Delete"
          onClick={onDeleteElement}>Delete</button>
      </div>
    </div>
  );
}

GoodsListElement.propTypes = {
  categories: PropTypes.array,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
  onSave: PropTypes.func,
  good: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    weight: PropTypes.string,
    description: PropTypes.string,
    active: PropTypes.bool,
    category: PropTypes.string,
  }),
};
