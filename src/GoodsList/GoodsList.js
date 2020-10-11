import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import GoodsListElement from '../GoodsListElement/GoodsListElement';
import PropTypes from 'prop-types';
import * as goodsActions from '../Store/actions/goodsActions';

import './GoodsList.css';
import Loader from '../Loader/Loader';


export default function GoodsList(props) {
  const dispatch = useDispatch();

  const goods = useSelector((state) => state.goods.list, shallowEqual);
  const categories = useSelector((state) => state.categories.list,
      shallowEqual);
  const error = useSelector((state) => state.goods.getGoodsError, shallowEqual);
  const isLoading = useSelector((state) => state.goods.getGoodsLoading,
      shallowEqual);
  useEffect(() => {
    dispatch(goodsActions.getGoods());
  }, [dispatch]);

  const deleteItem = useCallback(
      (id) => {
        dispatch(goodsActions.deleteItem(id));
      }, [dispatch],
  );

  const toggleItem = useCallback(
      (id) => {
        dispatch(goodsActions.selectItem(id));
      }, [dispatch],
  );

  const changeItem = useCallback(
      (id, data = {}, active) => {
        dispatch(goodsActions.changeItem(id, data, active));
      }, [dispatch],
  );

  return (
    <div>
      {isLoading && <Loader />}
      {Array.isArray(goods) && goods.map( (good) => {
        return (
          <GoodsListElement
            good={ good }
            key={ good.id }
            categories={ categories }
            onDelete={ deleteItem }
            onToggle={ toggleItem }
            onSave={ changeItem }
          />
        );
      })}
      {error && <div className='Wrong' >ERROR: {error}</div>}
    </div>
  );
}

GoodsList.defaultProps = {
  goods: [],
};

GoodsList.propTypes = {
  goods: PropTypes.array,
  categories: PropTypes.array,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
  onEditElement: PropTypes.func,
};
