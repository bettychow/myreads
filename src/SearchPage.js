import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


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
        const { books, results, onSearchBooks } = this.props
        const { query } = this.state
        let showingResults
    
     if (query) {
         const match = new RegExp(escapeRegExp(query), 'i');
        
          console.log('resultsxxx' , results)
      showingResults = books.filter((book) =>
        match.test(book.title))
     } else {
         showingResults = []
     }
         showingResults.sort(sortBy('title'))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                        <div className="search-books-input-wrapper">
                            <input type="text" 
                                   placeholder="Search by title or author" 
                                   value={query}
                                   onChange={
                                       (event, query) => {
                                        this.updateQuery(event.target.value)
                                        onSearchBooks(query)
                                       }}
                            />
                                   
                        </div>
                    </div>
                <div>
                    <button onClick={this.clearQuery}>Clear</button>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { showingResults.map((book) => (
                            <li key={book.title}>
                                <img src={book.imageLinks.thumbnail}/>
                                <p>{book.title} - {book.subtitle}</p>
                                <p>{book.authors}</p>
                            </li>
                        ))}

                    </ol>
                </div>
            </div>

        )
    }
}

export default SearchPage;