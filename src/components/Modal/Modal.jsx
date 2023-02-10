import React from 'react';
import css from './Modal.module.css';
const Modal = props => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={props.img.src} alt={props.img.alt} />
      </div>
    </div>
  );
};
export default Modal;
