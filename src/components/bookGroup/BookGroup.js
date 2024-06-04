import './BookGroup.scss';
import { Component } from "react";

class BookGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            message:''
        };
    }
   
    handleremoveBookFromYear = (year, id) => {
        this.setState(prevState => {
            const updatedData = { ...prevState.data };
            updatedData[year] = updatedData[year].filter(book => book.id !== id);
            if (updatedData[year].length === 0) {
              delete updatedData[year];
            }
            return { data: updatedData };
          });
    }
    handleDeleteBook = (year, id) => {
        this.props.deleteBook(year, id); 
        this.handleremoveBookFromYear(year,id)
      };
    
      shouldComponentUpdate(nextProps) {
        // Проверяем, изменился ли массив данных
        if (nextProps.data !== this.props.data) {
          return true; // Рендерим компонент заново, если данные изменились
        }
        return false; // Не рендерим компонент заново, если данные не изменились
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
                                    onClick={() => this.handleDeleteBook(year, book.id)}
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
