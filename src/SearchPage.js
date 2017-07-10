import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'

class SearchPage extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })

    }

    clearQuery = () => {
        this.setState({ query: ''})
    }

    render() {
        const { books, searchResults, onSearchBooks, switchShelf } = this.props
        const { query } = this.state
        let showingResults
    
     if (query) {
         const match = new RegExp(escapeRegExp(query), 'i');
         showingResults = searchResults.filter((result) =>
         match.test(result.title))
     } else {
         showingResults = []
     }
         showingResults.sort(sortBy('title'))
      
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" 
                                placeholder="Search by title or author" 
                                value={query}
                                onChange={
                                    (event) => {
                                        this.updateQuery(event.target.value)
                                        onSearchBooks(event.target.value)
                                    }}
                        />                    
                    </div>
                    <button onClick={this.clearQuery}>Clear</button>
                </div>          
                <div className="search-books-results">
                    <ol className="books-grid">
                        { showingResults.map((book) => (
                            <li key={book.id}>
                                <Book book={book} switchShelf={this.props.switchShelf} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

        )
    }
}

export default SearchPage;