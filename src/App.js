import React from 'react'
import { Route } from 'react-router-dom';
import SearchBook from './SearchBook';
import Dashboard from './Dashboard';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  booklist = [];
  state = {
    booksOnShelf: [],
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((booksOnShelf) => {
      this.setState(() => ({
        booksOnShelf
      })) 
    })
  }

  updateShelf = (updatedBook, event) => {
    var listOfBooks = this.state.booksOnShelf;
    var shelf = event.target.value;
    BooksAPI.update(updatedBook, shelf).then((res) =>{
      if(res){
        listOfBooks = listOfBooks.filter((book) => book.id !== updatedBook.id);
        var updatedBookWithNewShelf = updatedBook;
        updatedBookWithNewShelf.shelf = shelf;
        listOfBooks.push(updatedBookWithNewShelf);
        this.setState(() => ({
          booksOnShelf: listOfBooks
        }))
      }
    })
  }

  searchBooks = (query) => {
    let booksFromAPI = [];
    const tempBooks = this.state.booksOnShelf;
    BooksAPI.search(query).then((books) => {
       if(books !== undefined && Array.isArray(books)){
          booksFromAPI = books.map(function (book) {
          const bookWithShelf = tempBooks.find(b => b.id === book.id);
            if(bookWithShelf){
              book.shelf = bookWithShelf.shelf;
            } else {
              book.shelf = "none";
            }
         return book;
       });
      }
      this.setState(() => ({
        books:booksFromAPI
      }))
    })
    
  }

  

  render() {
    return (
      <div className="app">
       <Route exact path='/' render={() => (
         <Dashboard 
         booksOnShelf={this.state.booksOnShelf}
          updateShelf={this.updateShelf}
         />
       )} />
       <Route path='/search' render={() => (
        <SearchBook 
         books={this.state.books}
         searchBooks={ this.searchBooks }
         updateShelf={ this.updateShelf }
        />
      )} />        
      </div>
    )
  }
}

export default BooksApp
