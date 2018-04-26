import React from 'react';
import Book from './Book';

const BookShelf = (props) => (
    <div>
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        props.books.filter((book)=>{
                            return book.shelf === props.shelf;
                        }).map((book)=> (
                            <Book key={book.id} book={book} updateShelf={props.updateShelf}/>
                        ))
                    }
                </ol>
            </div>
        </div>
    </div>
);

export default BookShelf;