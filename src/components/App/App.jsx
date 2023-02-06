import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.AppWrap}>
      <Searchbar></Searchbar>
      <ImageGallery>
        <ImageGalleryItem></ImageGalleryItem>
      </ImageGallery>
      <Button></Button>
    </div>
  );
};
