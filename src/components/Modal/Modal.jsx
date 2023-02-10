import React from 'react';
import css from './Modal.module.css';
class Modal extends React.Component {
  onClickHehdler = e => {
    if (e.target === e.currentTarget) {
      console.log('кликнули по бєкдропу-закрываем модалку');
    }
  };
  onEscClose = e => {
    console.log(e);
    if (e.key === 'Escape') {
      console.log('кликнули по button esc');
    }
  };

  componentDidMount() {
    const modal = document.querySelector('#modal');
    modal.addEventListener('click', this.onClickHehdler);
    window.addEventListener('keypress', this.onEscClose);
  }
  render() {
    return (
      <div className={css.Overlay} id="modal">
        <div className={css.Modal}>
          <img src={this.props.img.src} alt={this.props.img.alt} />
        </div>
      </div>
    );
  }
}
export default Modal;
