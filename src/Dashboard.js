import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const Dashboard = (props) => {
        const shelves = {
          currentlyReading: { title: 'Currently Reading', key: 'currentlyReading'},
          wantToRead: {title:'Want to Read', key: 'wantToRead'},
          read: { title:'Read', key: 'read'}
        }
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  { Object.values(shelves).map((shelf) =>
                    <BookShelf key={shelf.key}
                    shelf={shelf.key}
                    title={shelf.title}
                    books={ props.booksOnShelf }
                    updateShelf={ props.updateShelf }
                    />
                  )}                 
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
}

export default Dashboard;