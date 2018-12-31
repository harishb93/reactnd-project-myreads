import React, { Component } from 'react';
import PropTypes from "prop-types";

class BookShelf extends Component{

  render(){

    const {books,title,onShelfChange}=this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book)=>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">

                      { title ==='Currently Reading' &&
                        (
                          <select onChange={(event)=>onShelfChange(title,event.target.value,book)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="Currently Reading">Currently Reading</option>
                            <option value="Want To Read">Want to Read</option>
                            <option value="Read">Read</option>
                          </select>
                        )
                      }
                      { title ==='Read' &&
                        (
                          <select onChange={(event)=>onShelfChange(title,event.target.value,book)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="Read">Read</option>
                            <option value="Currently Reading">Currently Reading</option>
                            <option value="Want To Read">Want to Read</option>
                          </select>
                        )
                      }
                      { title ==='Want To Read' &&
                        (
                          <select onChange={(event)=>onShelfChange(title,event.target.value,book)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="Want To Read">Want to Read</option>
                            <option value="Currently Reading">Currently Reading</option>
                            <option value="Read">Read</option>
                          </select>
                        )
                      }

                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors.join(' , ')}</div>
                </div>
              </li>
            )) }
          </ol>
        </div>
      </div>

    );
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default BookShelf;
