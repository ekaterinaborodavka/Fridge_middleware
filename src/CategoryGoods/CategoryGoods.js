import React from 'react';

import './CategoryGoods.css';
import PropTypes from 'prop-types';
import { categories, defaultCategory } from '../Mocks/CategotyGoods';

export default function CategoryGoods(props) {
  const {onChange} = props;

  return (
    <select className='CategoryGoods'
      name="category"
      defaultValue={ defaultCategory }
      onChange={ onChange }>
      { categories.map(({id, name}) => (
        <option key={ id } value={ name }>{name}</option>
      ))}
    </select>
  );
}

CategoryGoods.propTypes = {
  onChange: PropTypes.func,
  categories: PropTypes.array,
  defaultValue: PropTypes.string,
};
