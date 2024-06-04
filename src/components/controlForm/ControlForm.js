import './ControlForm.scss';
import { Component } from "react";
import BookService from '../../services/BookService';
class ControlForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            name: '',
            selectedYear: null,
            selectedRaiting: null,
            authors: [],
            ISBN: '',
            message: ''
        }
        this.bookService = new BookService();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }
    handleAuthorsChange = (event) => {
        const names = event.target.value.split(', ');

        const formattedNames = names.map(name => name.trim());

        this.setState({ authors: formattedNames });
    }
    handleYearChange = (event) => {
        this.setState({ selectedYear: event.target.value });
    };
    handleRaitingChange = (event) => {
        this.setState({ selectedRaiting: event.target.value });
    };

    handleISBNChange = (event) => {
        this.setState({ ISBN: event.target.value });
    };
    handleCreateBook = (event) => {
        event.preventDefault();
        const bookData = {
            name: this.state.name,
            raiting: this.state.selectedRaiting,
            authors: this.state.authors,
            ISBN: this.state.ISBN,
            publishedYear: this.state.selectedYear,
        };

        this.bookService.createBook(bookData.name, bookData.authors, bookData.publishedYear, bookData.ISBN, bookData.raiting)
            .then((id) => {
                console.log('Book created successfully');
                this.resetForm();
                console.log(bookData.name, bookData.authors, bookData.publishedYear, bookData.ISBN, bookData.raiting);
                this.props.createBook(bookData.name, bookData.authors, bookData.publishedYear, bookData.ISBN, bookData.raiting, id); // Передаем id в качестве последнего аргумента
            })
            .catch(error => {
                console.error('Failed to create book:', error);
            });
    };
    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    resetForm = () => {
        this.setState({
            name: '',
            selectedRaiting: null,
            ISBN: '',
            authors: [],
            selectedYear: null,
            message: 'Book has been added!'
        });
        setTimeout(()=>{this.setState({message: ''})}, 5000)
    };
    render() {
        const years = [];
        for (let year = 2024; year >= 1800; year--) {
            years.push(<option key={year} value={year}>{year}</option>);
        }

        console.log(this.state.data)
        return (
            <div className="control-form">

                <form onSubmit={this.handleCreateBook} className='create-form'>
                    <p><label htmlFor="name">Book name*</label></p>
                    <p><input type="text" id="name" maxLength="100" value={this.state.name} onChange={this.handleNameChange} placeholder="Enter name" required /></p>
                    <p><label htmlFor="isbnInput">ISBN</label></p>
                    <p><input
                        maxLength="17"
                        id="isbnInput"
                        placeholder="999-9-9999-9999-9"
                        onChange={this.handleISBNChange}
                        value={this.state.ISBN}
                    /></p>
                    <p><label htmlFor="authors">Authors*</label></p>
                    <p><input type="text" id="authors" placeholder="Tilek Tashbaev, Pedro Pedro Pedro" value={this.state.authors} onChange={this.handleAuthorsChange} required /></p>
                    <div className='control-form__wrap'>
                        <div>
                            <p><label htmlFor="year">Published year:</label></p>
                            <p><select name="publishedYear" id="year" value={this.state.selectedYear} onChange={this.handleYearChange}>
                                <option value={this.state.selectedYear}>choose year</option>
                                {years}
                            </select></p>
                        </div>
                        <div>
                            <p><label htmlFor="Raiting">Raiting:</label></p>
                            <p>
                                <select name="bookRaiting" id="Raiting" value={this.state.selectedRaiting} onChange={this.handleRaitingChange}>
                                    <option value={this.state.selectedRaiting} selected>choose rating</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </p>
                        </div>
                    </div>

                    <p>
                        <button type='submit' className='create-form__btn'>ADD</button>
                    </p>
                    <p className='message'>{this.state.message}</p>
                </form>
            </div>
        )
    }
}

export default ControlForm;