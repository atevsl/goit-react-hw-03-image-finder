import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imgsToDisplay, onModalShow }) => {
  return (
    <ul className={css.ImageGallery}>
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
