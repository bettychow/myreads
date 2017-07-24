import React, { Component } from 'react'

class Book extends Component{
  
    render() {
        let book = this.props.book
        let gURL = `https://books.google.com/books?id=${book.id}&printsec=frontcover&source=gbs_ViewAPI#v=onepage&q&f=false`
        return ( 

            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf} key={book.id} onChange={event => this.props.changeShelf(book, event.target.value )}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
                <a className="preview" target="_blank" href={gURL}>Preview</a>
            </div>
        )
    }
}

export default Book