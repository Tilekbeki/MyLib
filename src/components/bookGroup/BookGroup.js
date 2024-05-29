import './BookGroup.scss';
import { Component } from "react";
import BookService from '../../services/BookService';
class BookGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                
            },
            hover: false,
            message:''
        };
        this.bookService = new BookService();
    }
    componentDidMount() {
        this.fetchBooks();
    }
    
  
    removeBookFromYear = (year, id) => {
        this.setState(prevState => {
          const updatedData = { ...prevState.data };
          updatedData[year] = updatedData[year].filter(book => book.id !== id);
          if (updatedData[year].length === 0) {
            delete updatedData[year];
          }
          return { data: updatedData };
        });
      };
    deleteBook = (year,id) =>{
        this.bookService.deleteBook(id);
        this.removeBookFromYear(year, id);
    } 
    transformBooksToFakeData =(books)=> {
        const fakeData = {};
    
        books.forEach(book => {
            let year = book.publishedYear;
            if (year) {
                year = year.toString();
            } else {
                year = 'Без года'
            }
            if (!fakeData[year]) {
                fakeData[year] = [];
            }
            if (book.raiting === undefined || book.raiting === null || book.raiting === '') {
                book.raiting = 'unset';
            }
            
            book.ISBN = book.ISBN || 'unset';
            

            const formattedBook = {
                id: book.id,
                title: book.name,
                rating: `${book.raiting}/5`,
                authors: book.authors.join(', '), 
                ISBN: book.ISBN || '', 
            };
    
            fakeData[year.toString()].push(formattedBook);
        });
    
        return fakeData;
    }
    async fetchBooks() {
        try {
            const books = await this.bookService.getBooks();
            const transformedData = this.transformBooksToFakeData(books);
            this.setState({data: transformedData})
            const isEmptyUsingKeys = Object.keys(transformedData).length === 0;
            if(isEmptyUsingKeys) {
                this.setState({message:'There are no books'})
            }  
        } catch (error) {
            console.error("Error fetching books: ", error);
            this.setState({ isLoading: false });
        }
    }
    render() {
        const sortedYears = Object.keys(this.state.data).sort((a, b) => b - a);
    
        return (
            <div className="book-group">
                {this.state.message}
                {sortedYears.map((year) => (
                    <div key={year} className="book-group__list">
                        <h2>{year}</h2>
                        <div className='book-group__subtitles'>
                            <div className='book-subtitles__title'><b>Book title</b></div>
                            <div className='book-subtitles__raiting'><b>Raiting</b></div>
                            <div className='book-subtitles__authors'><b>Authors</b></div>
                            <div className='book-subtitles__ISBN'><b>ISBN</b></div>
                        </div>
                        {this.state.data[year].sort((a, b) => a.title.localeCompare(b.title)).map((book, index) => (
                            <div key={index} className="book-item">
                                <div className="book-item__title">📚 {book.title}</div>
                                <div className="book-item__raiting">{book.rating}</div>
                                <div className="book-item__authors">{book.authors}</div>
                                <div className="book-item__ISBN">{book.ISBN}</div>
                                <button 
                                  className='book-item__delete'
                                    onClick={() => this.deleteBook(year, book.id)}
                                >
                                    DELETE
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
    
    
}

export default BookGroup;
