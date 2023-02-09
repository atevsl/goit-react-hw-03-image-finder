import React from 'react';
import css from './Modal.module.css';
const Modal = props => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={props.img.largeImageURL} alt={props.img.tags} />
      </div>
    </div>
  );
};
export default Modal;
