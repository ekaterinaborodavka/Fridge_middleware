import React, {useCallback} from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import './App.css';

import GoodsList from '../GoodsList/GoodsList';
import GoodsListForm from '../GoodsListForm/GoodsListForm';
import Total from '../Total/Total';
import * as goodsActions from '../Store/actions/goodsActions';

export default function App() {
  const goods = useSelector((state) => state.goods.list, shallowEqual);
  const dispatch = useDispatch();

  const deleteSelectedItem = useCallback(
      () => {
        dispatch(goodsActions.deleteSelectedItem(goods));
      }, [dispatch, goods],
  );

  return (
    <div className="Container">
      <div className="Title">Fridge</div>
      <div className="Container_Goods">
        <GoodsList />
        <Total />
        <GoodsListForm />
        <button className="Button_DelSelected" onClick={ deleteSelectedItem } >
            Delete Selected
        </button>
      </div>
    </div>
  );
}
