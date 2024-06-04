import React, { Component } from 'react';
import BookGroup from '../bookGroup/BookGroup';
import './BookList.scss'
class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }
    shouldComponentUpdate(nextProps) {
        // Проверяем, изменился ли объект data в свойствах
        if (nextProps.data !== this.props.data) {
          return true; // Рендерим компонент заново, если данные изменились
        }
        return false; // Не рендерим компонент заново, если данные не изменились
      }
    render() {
        // console.log(this.state);
        // console.log(this.state.data);
        const { removeBookFromYear, deleteBook } = this.props;

        return (
            <div className="book-list">
                <BookGroup data={this.state.data} removeBookFromYear={removeBookFromYear} deleteBook={deleteBook} />
            </div>
        );
    }
}

export default BookList;
