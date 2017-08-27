import React from 'react';
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
}

export default Category;
