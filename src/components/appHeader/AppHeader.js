import React, { Component } from "react";
import BookService from '../../services/BookService';
import Typed from 'typed.js'; 
import logo from '../../resource/logo.png';
import './AppHeader.scss';

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendedBook: '',
        };
        this.el = React.createRef(); 
        this.typedInstance = null; 
    }
    
    componentDidMount() {
        let bookService = new BookService();
        bookService.getRecommendedBook()
            .then(recommendedBook => {
                const bookTitle = recommendedBook.name ? recommendedBook.name : 'Книга не найдена';
                this.setState({ recommendedBook: bookTitle });
            })
            .catch(error => {
                console.error("Error getting recommended book:", error);
            });
        this.typedInstance = new Typed(this.el.current, {
            strings: [
                "A person reading will know, someone watching TV will just hear. - Anna Chedid",
                "Books give us the opportunity to live several lives in one, whereas TV allows us to live one life several times. - Umberto Eco",
                "Those who read have secret knowledge that those who watch TV will never understand. - Daniel T. Willard",
                "Reading gives us new eyes to see the world, whereas TV makes us see the world through the eyes of others. - - Walter Wingate"
            ],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 30,
            backDelay: 100,
            loop: true,
        });
    }

    componentWillUnmount() {
        if (this.typedInstance) {
            this.typedInstance.destroy();
        }
    }

    render() {
        let goodBook = this.state.recommendedBook || 'Book is not exist...'; // Используем состояние, если оно есть, иначе показываем запасное значение
        return (
            <header className="header">
                <div className="quotes">
                    <h2>
                        <span ref={this.el}></span>{" "}
                    </h2>
                </div>
                <div className="header-bar">
                    <div className="header-goodBook">The good book is - &nbsp;<span>{goodBook}</span></div>
                    <div className="header-getList">
                        <div className="header-logo"><img src={logo} alt="" /><h1>MyLib</h1></div>
                        <p>Be better every day</p>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;
