import "./utils/constants.js"
import "./utils/helpers.js"
import "./services/apiService.js"
import "./api/amazonAPI.js"
import "./api/booksAPI.js"
import "./components/filters.js"
import "./components/bookList.js"
import "./components/pagination.js"

import { renderBooks } from './components/bookList.js'
import { fetchBooks } from './services/apiService.js';
import { valuesFilters } from './components/filters.js';

let query = document.querySelector('#inputSearch').value

console.log(query)
let filters = [];

// Obtener datos Google API
fetchBooks(query, filters)
    .then(books => {
        console.log(books);
        renderBooks(books);
        valuesFilters(books);
});