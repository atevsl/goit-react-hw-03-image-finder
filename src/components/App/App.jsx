import React from 'react';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import Oops from 'components/Oops/Oops';
import css from './App.module.css';

const APIkey = '32042597-d449e2f3b6adbf69100237dc7';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends React.Component {
  state = {
    imgSearchName: '',
    imgsToDisplay: [],
    page: 1,
    img: null,
    status: Status.IDLE,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imgSearchName !== this.state.imgSearchName ||
      prevState.page !== this.state.page
    ) {
      if (this.state.imgSearchName.trim() === '') {
        return this.setState({ status: Status.REJECTED });
      }
      this.setState({ status: Status.PENDING });
      this.onFetchHendler()
        .then(data => {
          if (data.total === 0) {
            this.setState({ status: Status.REJECTED });
            return;
          }
          this.setState(prevstate => ({
            imgsToDisplay: [...prevstate.imgsToDisplay, ...data.hits],
            total: data.totalHits,
            status: Status.RESOLVED,
          }));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  onSubmitHendler = imgSearchName => {
    this.setState({
      imgSearchName,
      page: 1,
      imgsToDisplay: [],
    });
  };

  onLoadMoreHendler = () => {
    this.setState(prevstate => ({ page: prevstate.page + 1 }));
  };

  onFetchHendler = () => {
    return fetch(
      `https://pixabay.com/api/?q=${this.state.imgSearchName}&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
    ).then(response => {
      if (!response.ok) {
        throw new Error('there are no such image, please try again.');
      }
      return response.json();
    });
  };

  onModalShow = img => {
    this.setState({ img });
  };

  render() {
    const totalPage =
      this.state.imgsToDisplay.length / (this.state.page * this.state.total);
    return (
      <div className={css.AppWrap}>
        <Searchbar onSubmitHendler={this.onSubmitHendler}></Searchbar>

        <ImageGallery
          imgsToDisplay={this.state.imgsToDisplay}
          onModalShow={this.onModalShow}
        ></ImageGallery>
        {this.state.status === 'pending' && <Loader></Loader>}
        {this.state.status === 'rejected' && (
          <Oops imgSearchName={this.state.imgSearchName}></Oops>
        )}
        {totalPage < 1 && this.state.status === 'resolved' && (
          <Button onLoadMoreHendler={this.onLoadMoreHendler}></Button>
        )}
      </div>
    );
  }
}
