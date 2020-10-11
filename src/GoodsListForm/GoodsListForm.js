import React, { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch} from 'react-redux';

import CategoryGoods from '../CategoryGoods/CategoryGoods';
import './GoodsListForm.css';
import PropTypes from 'prop-types';
import * as formActions from '../Store/actions/formActions';
import * as goodsActions from '../Store/actions/goodsActions';

export default function GoodsListForm(props) {
  const form = useSelector((state) => state.form, shallowEqual);
  const error = useSelector((state) => state.goods.addItemError, shallowEqual);
  const isLoading = useSelector((state) => state.goods.addItemLoading,
      shallowEqual);
  const {title, weight, description} = form;
  const dispatch = useDispatch();

  const onFormSubmit = useCallback(
      (e) => {
        e.preventDefault();
        dispatch(goodsActions.addItem(form));
        console.log(form);
      }, [dispatch, form],
  );

  const onInputChange = useCallback(
      ({ target }) => {
        dispatch(formActions.updateForm({
          [target.name]: target.value,
        }));
      }, [dispatch],
  );

  return (
    <div>
      {error && <div className='Wrong' >ERROR: {error}</div>}
      <form
        className="GoodsListForm"
        onSubmit={ onFormSubmit }
      >
        <input type="text"
          required
          className="GoodsListFormInput"
          placeholder="Title"
          name="title"
          value={ title }
          onChange={ onInputChange }
        />
        <input type="number"
          required
          className="GoodsListFormInput"
          placeholder="Weight"
          name="weight"
          value={ weight }
          onChange={ onInputChange }
        />
        <input type="text"
          className="GoodsListFormInput"
          placeholder="Description"
          name="description"
          value={ description }
          onChange={ onInputChange }
        />
        <CategoryGoods
          onChange={ onInputChange }
          categories={ props.categories }
        />
        {!isLoading && <button className="GoodsListFormButton">Add</button>}
      </form>
    </div>
  );
}

GoodsListForm.propTypes = {
  categories: PropTypes.array,
  onAdd: PropTypes.func,
};
