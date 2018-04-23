import React from 'react'
import { Route } from 'react-router-dom';
import SearchBook from './SearchBook';
import Dashboard from './Dashboard';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  booklist = [];
  booksOnShelf = [];
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      })) 
    })
    this.booksOnShelf = this.state.books;
  }

  updateShelf = (updatedBook, event) => {
    var listOfBooks = this.state.books;
    var shelf = event.target.value;
    BooksAPI.update(updatedBook, shelf).then((res) =>{
      if(res){
        listOfBooks = listOfBooks.filter((book) => book.id !== updatedBook.id);
        var updatedBookWithNewShelf = updatedBook;
        updatedBookWithNewShelf.shelf = shelf;
        listOfBooks.push(updatedBookWithNewShelf);
        console.log(listOfBooks);
        this.setState(() => ({
          books: listOfBooks
        }))
      }
    })
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      this.booklist = this.booksOnShelf.concat(books);
      this.setState(() => ({
        books: this.booklist
      }))
    })
  }

  

  render() {
    return (
      <div className="app">
       <Route exact path='/' render={() => (
         <Dashboard 
          books={this.state.books}
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
