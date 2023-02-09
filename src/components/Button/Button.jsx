import React from 'react';
import css from './Button.module.css';
const Button = props => {
  return (
    <button
      type="button"
      className={css.Button}
      onClick={props.onLoadMoreHendler}
    >
      Load more
    </button>
  );
};
export default Button;
