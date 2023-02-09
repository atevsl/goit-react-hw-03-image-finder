import React from 'react';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
// import Modal from '../Modal/Modal';

import css from './App.module.css';
const APIkey = '32042597-d449e2f3b6adbf69100237dc7';

export class App extends React.Component {
  state = {
    imgSearchName: '',
    imgsToDisplay: [],
    page: 1,
  };

  onSubmitHendler = imgSearchName => {
    this.setState({ imgSearchName });
  };
  onLoadMoreHendler = () => {
    this.setState(prevstate => ({ page: prevstate.page + 1 }));
  };
  onFetchHendler = () => {
    return fetch(
      `https://pixabay.com/api/?q=${this.state.imgSearchName}&page=1&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
    ).then(response => {
      if (!response.ok) {
        throw new Error('there are no such image, please try again.');
      }
      return response.json();
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imgSearchName !== this.state.imgSearchName) {
      this.setState({ page: 1 });
      this.onFetchHendler()
        .then(data => {
          console.log(data);
          console.log(data.hits);
          this.setState({ imgsToDisplay: data.hits });
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (prevState.page !== this.state.page) {
      this.onFetchHendler()
        .then(data => {
          this.setState(prevstate => ({
            imgsToDisplay: [...prevstate.imgsToDisplay, ...data.hits],
          }));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  render() {
    return (
      <div className={css.AppWrap}>
        <Searchbar onSubmitHendler={this.onSubmitHendler}></Searchbar>
        <ImageGallery
          imgsToDisplay={this.state.imgsToDisplay}
          onModalShow={this.onModalShow}
        ></ImageGallery>

        {this.state.imgsToDisplay.length === 0 && <Loader></Loader>}
        {this.state.imgsToDisplay.length !== 0 && (
          <Button onLoadMoreHendler={this.onLoadMoreHendler}></Button>
        )}
      </div>
    );
  }
}
