import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'



class SearchPage extends Component {
    state = {
        query: '',
        shelf: ''
    }


    updateQuery = (query) => {
        this.setState({ query: query.trim() })

    }

    clearQuery = () => {
        this.setState({ query: ''})
    }

    


    
    
        
    render() {
        const { books, searchResults, onSearchBooks, handleShelfChange } = this.props
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
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
                    </div>
                <div>
                    <button onClick={this.clearQuery}>Clear</button>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { showingResults.map((result) => (
                            <li key={result.industryIdentifiers[0].identifier}>
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks.thumbnail})`}}></div>
                                <p>{result.title} - {result.subtitle}</p>
                                <p>{result.authors}</p>
                                <div>
                                <select value={result.shelf} onChange={event => handleShelfChange(result, event.target.value)}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none ">None</option>
                                </select>
                                </div>
                            </li>
                        ))}

                    </ol>
                </div>
            </div>

        )
    }
}

export default SearchPage;