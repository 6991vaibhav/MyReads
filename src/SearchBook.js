import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchBook extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.props.searchBooks(query);
        this.setState(() => ({
            query
        }));
        
    };

    render(){
        const { query } = this.state;
        const { books, updateShelf } = this.props;
        const showingBooks = query === '' 
            ? []
            : books;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            Array.isArray(showingBooks) &&
                              showingBooks.map((book) => {                                
                                return (
                                <Book key={book.id} book={book} updateShelf={updateShelf}/>
                            )})
                        }
                    </ol>
                </div>
          </div>
        )
    }
}

export default SearchBook;