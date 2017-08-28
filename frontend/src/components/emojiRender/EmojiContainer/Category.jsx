import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.scss';

const Category = (props) => {
  const active = props.categoryName === props.activeCategory ? 'active' : null;
  return (
    <div className={style['category-name']}>
      <span
        role="presentation"
        className={style[`${active}`]}
        data-name={props.categoryName}
        onClick={e => props.setCategory(e)}
      > {props.categoryName}</span>
    </div>
  );
};

Category.propTypes = {
  setCategory: PropTypes.func,
  categoryName: PropTypes.string,
  activeCategory: PropTypes.string,
};

export default Category;
