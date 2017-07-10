import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves' 
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchResults: [],
    showSearchPage: true
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log('books', books)
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

  switchShelf(result, newShelf) {
    console.log('newShelf', newShelf);
    console.log('reuslt', result)
    BooksAPI.update(result, newShelf)
        this.state.searchResults.map((book) => {
          console.log('kkk', result.id)
          if(book.id === result.id ) {
            book.shelf = newShelf
          }
          })
        
    
    this.setState({ searchResults: this.state.searchResults })
    console.log('lll', this.state.searchResults)
  }
  

  render() {
  
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves/>
        )}/>
         <Route exact path="/search" render={() => (
          <SearchPage
            books={this.state.books}
            searchResults={this.state.searchResults}
            onSearchBooks={query => this.searchBooks(query)}
            handleShelfChange={(result, shelf) => { this.switchShelf(result, shelf)} }
          /> 
         )}/>
      </div>
    )
  }
}

export default BooksApp
