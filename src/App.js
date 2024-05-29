
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

import AppHeader from './components/appHeader/AppHeader'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookList from './components/bookList/BookList'
import AsideBar from './components/asideBar/AsideBar'
class App extends Component {

  

 


  render() {
    document.querySelector('body').style.backgroundColor= 'rgb(199, 237, 249)';
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
                <BookList />
              </main>
            </Col>
            <Col md={4}>
              <aside>
                <AsideBar></AsideBar>
              </aside>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
