import React from 'react';
import '../Total/Total.css';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';

export default function Total(props) {
  const total = useSelector((state) => state.goods.total, shallowEqual);
  const subTotal = useSelector((state) => state.goods.subTotal, shallowEqual);

  return (
    <div className='Total_Container'>
      <div className='Total'>
        <div>SubTotal:</div>
        <div>{subTotal}</div>
      </div>
      <div className='Total'>
        <div>Total:</div>
        <div>{total}</div>
      </div>
    </div>
  );
}

Total.propTypes = {
  total: PropTypes.number,
  subTotal: PropTypes.number,
};
