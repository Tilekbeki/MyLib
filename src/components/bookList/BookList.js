import './BookList.scss'
import { Component } from "react";
import BookGroup from '../bookGroup/BookGroup'
class BookList extends Component {
    render() {
        return(
            <div className="book-list">
                <BookGroup></BookGroup>
            </div>
        )
    }
}

export default BookList;