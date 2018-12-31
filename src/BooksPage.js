import React from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from "prop-types";

function BooksPage(props){

  return (

    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf books={props.books.filter((book)=>{return book.shelf==='currentlyReading'})}
            title='Currently Reading'
            onShelfChange={props.onShelfChange}/>
          <BookShelf books={props.books.filter((book)=>{return book.shelf==='wantToRead'})}
            title='Want To Read'
            onShelfChange={props.onShelfChange}/>
          <BookShelf books={props.books.filter((book)=>{return book.shelf==='read'})}
            title='Read'
            onShelfChange={props.onShelfChange}/>
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>

  )
}

BooksPage.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BooksPage;
