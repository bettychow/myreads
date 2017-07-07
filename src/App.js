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
    results: [],
    showSearchPage: true
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  searchBooks(query) {
    BooksAPI.search(query, 20).then((results) => {
      console.log('query', query)
      console.log('results', results)
      this.setState({ results })
    })
  }

    

  render() {
  
    return (
      <div className="app">
        
          <BookShelves/>

        
          <SearchPage
            books={this.state.books}
            result={this.state.results}
            onSearchBooks={(query) => {
              this.searchBooks(query)
            } }
          /> 

      </div>
    )
  }
}

export default BooksApp
