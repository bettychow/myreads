import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class BookShelves extends Component {

    render() {
       
        let books = this.props.books
        
        const currentlyReading  = books.filter((book) => {return book.shelf === 'currentlyReading'} )
        const wantToRead  = books.filter((book) => {return book.shelf === 'wantToRead'} )
        const read  = books.filter((book) => {return book.shelf === 'read'} )
        
      return (
        <div className="app">
            
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            { currentlyReading.map((book) => (
                            <li key={book.id}>
                                <Book book={book} switchShelf={this.props.switchShelf} />
                            </li>
                        ))}
                        </ol>
                    </div>
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            { wantToRead.map((book) => (
                            <li key={book.id}>
                                <Book book={book} switchShelf={this.props.switchShelf} />
                            </li>
                        ))}
                        </ol>
                    </div>
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                             { read.map((book) => (
                            <li key={book.id}>
                                <Book book={book} switchShelf={this.props.switchShelf} />
                            </li>
                        ))}
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
                <div className="open-search">
                <Link to="/search">Add a book></Link>
                </div>
            </div>
            )}
        </div>
     )

  }
}

export default BookShelves