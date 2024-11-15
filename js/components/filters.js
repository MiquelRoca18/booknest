import { renderBooks } from './bookList.js'
import { fetchBooks } from '../services/apiService.js';

// Obtener datos Google API
fetchBooks('harry potter', ['free-ebooks', 'paid-ebooks'])
    .then(books => {
        console.log(books);
        renderBooks(books)
});