import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imgsToDisplay, onModalShow }) => {
  return (
    <ul
      className={css.ImageGallery}
      onClick={e => {
        onModalShow(e.target);
      }}
    >
      {imgsToDisplay.map(img => {
        return (
          <ImageGalleryItem
            webformatURL={img.webformatURL}
            tags={img.tags}
            key={img.id}
            largeImageURL={img.largeImageURL}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  imgsToDisplay: PropTypes.array.isRequired,
  onModalShow: PropTypes.func.isRequired,
};

export default ImageGallery;
