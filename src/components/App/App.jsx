import React from 'react';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
// import Modal from '../Modal/Modal';

import css from './App.module.css';
const APIkey = '32042597-d449e2f3b6adbf69100237dc7';
// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export class App extends React.Component {
  state = {
    imgSearchName: '',
    imgsToDisplay: [],
    page: 1,
    loading: false,
    loadingFailure: false,
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
      this.setState({ page: 1, loading: true, loadingFailure: false });

      this.onFetchHendler()
        .then(data => {
          if (data.total === 0) {
            this.setState({ loadingFailure: true });
            return;
          }
          this.setState({ imgsToDisplay: data.hits, loading: false });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(this.setState({ oading: false }));
    }
    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });
      this.onFetchHendler()
        .then(data => {
          this.setState(prevstate => ({
            imgsToDisplay: [...prevstate.imgsToDisplay, ...data.hits],
          }));
        })
        .catch(error => {
          console.log(error);
        })
        .finally(this.setState({ loading: false }));
    }
  }
  render() {
    return (
      <div className={css.AppWrap}>
        <Searchbar onSubmitHendler={this.onSubmitHendler}></Searchbar>
        {!this.state.loading && (
          <ImageGallery
            imgsToDisplay={this.state.imgsToDisplay}
            onModalShow={this.onModalShow}
          ></ImageGallery>
        )}

        {this.state.loading && <Loader></Loader>}
        {this.state.loadingFailure && (
          <p>
            Oops! Sorry, we couldnt find {this.state.imgSearchName}, what you
            are looking for. 😭
          </p>
        )}
        {this.state.imgsToDisplay.length !== 0 && !this.state.loading && (
          <Button onLoadMoreHendler={this.onLoadMoreHendler}></Button>
        )}
      </div>
    );
  }
}
