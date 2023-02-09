import React from 'react';
import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
