
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import BookService from './services/BookService';
import AppHeader from './components/appHeader/AppHeader'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookList from './components/bookList/BookList'
import AsideBar from './components/asideBar/AsideBar'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {

      },
      message: '',
      key: Date.now()
    };
    this.bookService = new BookService();
  }
  componentDidMount() {
    this.fetchBooks();
  }
  transformBooksToFakeData = (books) => {
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
      this.setState({ data: transformedData }, () => {

      });
      const isEmptyUsingKeys = Object.keys(transformedData).length === 0;
      if (isEmptyUsingKeys) {
        this.setState({ message: 'There are no books' })
      }
    } catch (error) {
      console.error("Error fetching books: ", error);
      this.setState({ isLoading: false });
    }
  }

  removeBookFromYear = (year, id) => {
    this.setState(prevState => {
      const updatedData = {...prevState.data };
      updatedData[year] = updatedData[year].filter(book => book.id!== id);
      if (updatedData[year].length === 0) {
        delete updatedData[year];
      }
      return { data: updatedData, key: Date.now() }; // Обновляем ключ
    });
  };
  deleteBook = (year, id) => {
    this.bookService.deleteBook(id);
    this.removeBookFromYear(year, id);
  }
  createBook = (name, authors, publishedYear, ISBN, rating, id) => {
    let publishedYeartmp;
    if(!publishedYear) {
      publishedYeartmp = 'Без года';
    } else {
      publishedYeartmp = publishedYear;
    }
    this.setState(prevState => ({
      data: {
       ...prevState.data,
        [publishedYeartmp]: [
         ...(prevState.data[publishedYeartmp]? prevState.data[publishedYeartmp] : []),
          {
            id: id,
            title: name,
            rating: `${rating}/5`,
            authors: authors.join(', '),
            ISBN: ISBN || '',
          } // Добавляем новую книгу
        ]
      },
      key: Date.now(), // Предполагается, что это не часть состояния, но если это часть, убедитесь, что она используется корректно
    }));
  };
  render() {
    document.querySelector('body').style.backgroundColor = 'rgb(199, 237, 249)';
    const { data, message, key} = this.state;
    console.log(this.state)
    return (
      <div className='App'>
        <Container>
          <Row>
            <Col>
              <AppHeader />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md={8}>
              <main>
                {Object.keys(data).length > 0 ? ( 
                  <BookList data={data} removeBookFromYear={this.removeBookFromYear} deleteBook={this.deleteBook} key={key}/>             ) : (
                  <p>{message}</p> 
                )}
              </main>
            </Col>
            <Col md={4}>
              <aside>
                <AsideBar data={data} createBook={this.createBook}></AsideBar>
              </aside>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;