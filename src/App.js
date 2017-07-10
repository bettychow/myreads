import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
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

  updateShelf(result, newShelf) {
    console.log('newShelf', newShelf);
    console.log('reuslt', result)
    BooksAPI.update(result, newShelf)
        this.state.searchResults.map((book) => {
          console.log('kkk', result.id)
          if(book.id === result.id ) {
            book.shelf = newShelf
          }
          })
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log('books', books)

    })    
    
    this.setState({ searchResults: this.state.searchResults })
    console.log('lll', this.state.searchResults)
  }
  
  render() {
  
    return ( 
        <div className="app">
          <Route exact path="/" render={() => (
            <BookShelves 
              books={this.state.books}
              switchShelf={(result, shelf) => { this.updateShelf(result, shelf)}}
            />
          )}/>
          <Route exact path="/search" render={() => (
            <SearchPage
              books={this.state.books}
              searchResults={this.state.searchResults}
              onSearchBooks={query => this.searchBooks(query)}
              switchShelf={(result, shelf) => { this.updateShelf(result, shelf)} }
            /> 
          )}/>
        </div>
      )
    }
  }

export default BooksApp
