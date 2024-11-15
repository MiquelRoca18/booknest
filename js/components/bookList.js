import { fetchBooks } from "../services/apiService.js"

const $ = el => document.querySelector(el)

// Mostrar datos Google API
export function renderBooks(books) {
    const template = $('#book-template')
    const container = $('.listBooks')
    const nav = container.querySelector('.pagination'); // También debes agregar el punto para clases

    const fragment = document.createDocumentFragment();

    books.forEach(book => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.book-image').src = book.volumeInfo?.imageLinks?.thumbnail || 'default-image.jpg';
        clone.querySelector('.book-title').textContent = book.volumeInfo?.title || 'No Title';
        clone.querySelector('.book-author').textContent = book.volumeInfo?.authors?.join(', ') || 'Unknown Author';
        clone.querySelector('.book-price').textContent = book.saleInfo?.listPrice?.amount ? `$${book.saleInfo.listPrice.amount}` : 'Price not available';
        clone.querySelector('.book-rate').textContent = book.volumeInfo?.averageRating ? `Rating: ${book.volumeInfo.averageRating}` : 'No rating';

        fragment.appendChild(clone)
    })

    // Insertar el fragmento *antes* del elemento <nav class="pagination">
    container.insertBefore(fragment, nav); // Esto lo coloca antes de 'nav'
}
