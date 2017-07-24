import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves' 
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
  }
 

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  } 

  searchBooks(query) {
    BooksAPI.search(query, 20).then(resultsFromTheAPI => {
      resultsFromTheAPI.map(rBook => { 
        this.state.books.map(pBook => {
          if(rBook.id === pBook.id) {
            rBook.shelf = pBook.shelf;
          }
        })
	  })
    this.setState({ searchResults: resultsFromTheAPI });	
    })
  }

  updateShelf(selectedBook, newShelf) {
    BooksAPI.update(selectedBook, newShelf)
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })    
    
    this.state.searchResults.map(book => {
      if(book.id === selectedBook.id ) {
        book.shelf = newShelf
        }
    })  
    this.setState({ searchResults: this.state.searchResults })
  }

  calPercentDone(bookSelected,pageNum) {
       console.log('book', bookSelected)
    this.state.books.map(book => {
      if(book.id === bookSelected) {
        book.percentDone = parseInt(pageNum)/book.pageCount
      }
    })
    this.setState({ books: this.state.books })
  }
  
  render() {
  
    return ( 
        <div className="app">
          <Route exact path="/" render={() => (
            <BookShelves 
              books={this.state.books}
              switchShelf={(selectedBook, newShelf) => { this.updateShelf(selectedBook, newShelf)}}
              percentDone={(bookSelected, pageNum) => {this.calPercentDone(bookSelected, pageNum)}}
            />
          )}/>
          <Route exact path="/search" render={() => (
            <SearchPage
              books={this.state.books}
              searchResults={this.state.searchResults}
              onSearchBooks={query => this.searchBooks(query)}
              switchShelf={(selectedBook, newShelf) => { this.updateShelf(selectedBook, newShelf)} }
            /> 
          )}/>
        </div>
      )
    }
  }

export default BooksApp
