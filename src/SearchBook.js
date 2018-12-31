import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from "prop-types";

class SearchBook extends Component{

  state = {
    query : '',
    allBooks: [],
    existingBookIds: []
  }

  updateQuery = (query) => {
    this.setState(()=>({
      query: query
    }))
    this.searchQuery(query);
  }

  searchQuery = (query)=> {
    const bookIds=this.props.books.map((b)=> b.id)
    query === '' ? this.setState({
        allBooks:[],
        existingBookIds: bookIds
    }):
    BooksAPI.search(query).then(result=> {

      Array.isArray(result)
      ?
      this.setState({
        allBooks:result,
        existingBookIds: bookIds
      })
    : this.setState({
    allBooks: []
  })
  });
  }


  onHandleSearch = (currentShelf,toShelf,bookId) => {

    if(this.props.moveToShelf){
      BooksAPI.get(bookId).then((book)=>{
        this.props.moveToShelf(currentShelf,toShelf,book);
      });
    }
  }

  render(){

    const {allBooks,query,existingBookIds} = this.state;

    return(

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" value={query}
              onChange={(event)=>this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {allBooks.map((book)=>(
               existingBookIds.includes(book.id) === false &&
              (<li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    { book.imageLinks !== undefined ?
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                      : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `` }}></div>
                    }
                    <div className="book-shelf-changer">
                      <select onChange={(event)=>this.onHandleSearch('Search Section',event.target.value,book.id)}>
                        <option value="move">Move to...</option>
                        <option value="Want To Read">Want to Read</option>
                        <option value="Currently Reading">Currently Reading</option>
                        <option value="Read">Read</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors!== undefined ? <div className="book-authors">{book.authors.join(" , ")}</div> : <div className="book-authors"></div>}
                </div>
              </li>
              )
            ))}
          </ol>
        </div>
      </div>

    );
  }

}

SearchBook.propTypes = {
  moveToShelf: PropTypes.func.isRequired
}

export default SearchBook;
