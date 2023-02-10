import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import Modal from '../Modal/Modal';

const ImageGallery = ({ imgsToDisplay, onModalShow }) => {
  return (
    <ul
      className={css.ImageGallery}
      onClick={e => {
        console.log('клик по картинке', e.target.src);
        // <Modal img={}></Modal>;
        onModalShow(e.target);
      }}
    >
      {imgsToDisplay.map(img => {
        return (
          <ImageGalleryItem
            webformatURL={img.webformatURL}
            tags={img.tags}
            key={img.id}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};
export default ImageGallery;
