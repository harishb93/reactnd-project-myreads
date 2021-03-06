import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import BooksPage from './BooksPage';
import SearchBook from './SearchBook';
import { withAlert } from 'react-alert'

class App extends Component {

  state = {
    books: []
  }

  changeShelf = (currentShelf,toShelf,book) => {

    if(currentShelf!==toShelf){
      const toShelfVal= toShelf === 'Currently Reading' ? 'currentlyReading': (toShelf === 'Read'? 'read': 'wantToRead');

      BooksAPI.update(book,toShelfVal).then((b)=>{
        BooksAPI.getAll()
        .then((allBooks)=>{
          this.setState({
            books:allBooks
          });
        })
      });

      this.props.alert.success('Book moved from "'+currentShelf+'" to "'+toShelf+'"');
    }
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((allBooks)=>{
      this.setState({
        books:allBooks
      });
    })
  }

  render() {
    const {books}=this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path='/' component={() => (
              <BooksPage
                books={books}
                onShelfChange={this.changeShelf}
                />
            )}/>
          <Route path='/search' component= {({history}) => (
                <SearchBook
                  books={books}
                  moveToShelf={(currentShelf,toShelf,book)=>{
                    this.changeShelf(currentShelf,toShelf,book);
                    history.push('/');
                  }}
                  />
              )}/>
        </Switch>
      </div>
        )
      }
    }

export default withAlert(App);
