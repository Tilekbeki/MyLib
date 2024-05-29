import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, addDoc,doc,deleteDoc
} from 'firebase/firestore';

class BookService {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyA2Aqbb8OfXpLq1UDI-dQtrPm_xkxss2mM",
  authDomain: "mylibrary-3874b.firebaseapp.com",
  databaseURL: "https://mylibrary-3874b-default-rtdb.firebaseio.com",
  projectId: "mylibrary-3874b",
  storageBucket: "mylibrary-3874b.appspot.com",
  messagingSenderId: "1066410593489",
  appId: "1:1066410593489:web:824eeec18770276e85c9f0"
    };
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
   
  }
  async getBooks() {
    try {
      const colRef = collection(this.db, 'books');
      const snapshot = await getDocs(colRef);
      const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return books;
    } catch (error) {
      console.error("Error fetching books: ", error);
      return [];
    }
  }

  async getRecommendedBook() {
    try {
      const colRef = collection(this.db, 'books');
      const snapshot = await getDocs(colRef);
      let books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      books.filter((book)=>book.publishedYear<=2021);
       
        let maxRating = 0;
        let booksWithMaxRating = [];
        books.forEach(book => {
            if (book.raiting > maxRating) {
                maxRating = book.raiting;
                booksWithMaxRating = [book]; 
            } else if (book.raiting === maxRating) {
                booksWithMaxRating.push(book); 
            }
        });
        
        if (booksWithMaxRating.length === 0) {
            throw new Error('Не найдены книги соответствующие критериям.');
        } else {
            const randomIndex = Math.floor(Math.random() * booksWithMaxRating.length);
            return booksWithMaxRating[randomIndex];
        }
    } catch (error) {
        console.error("Ошибка в системе рекомендации: ", error);
        return null;
    }
}


async createBook(name='unnamed', authors = 'unnamed', publishedYear=2024, ISBN='unset', raiting=0) {
  try {
    const colRef = collection(this.db, 'books');

    addDoc(colRef, {
      name: name,
      authors: authors,
      publishedYear: publishedYear,
      raiting: raiting,
      ISBN: ISBN
    }).then(()=>{
      console.log('created');
    })
  } catch (error) {
    console.error("Error creating book: ", error);
    return null;
  }
}

async deleteBook(id) {
  try {
    const docRef = doc(this.db, 'books', id);
    await deleteDoc(docRef);
    console.log(`Document with ID ${id} deleted`);
  } catch (error) {
    console.error("Error deleting book: ", error);
  }
}

}

export default BookService;






