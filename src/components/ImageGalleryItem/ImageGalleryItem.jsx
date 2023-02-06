import React from 'react';
import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = () => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src="" alt="" className={css.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;
