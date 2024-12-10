
const $ = el => document.querySelector(el)

function formatBookData(book) {
    return {
        title: book.volumeInfo?.title || 'Título no disponible',
        author:  truncateText(Array.isArray(book.volumeInfo?.authors) ? book.volumeInfo.authors[0] : 'Autor desconocido'),
        image: book.volumeInfo?.imageLinks?.thumbnail || 'default-image.jpg',
        price: book.saleInfo?.listPrice?.amount ? `$${book.saleInfo.listPrice.amount}` : 'Precio no disponible',
        rating: book.volumeInfo?.averageRating ? `${book.volumeInfo.averageRating}` : 'Sin calificación',
        link: book.volumeInfo?.infoLink ? `${book.volumeInfo?.infoLink}` : 'No disponible'
    };
}

// Mostrar datos Google API
export function renderBooks(books) {
    const template = $('#book-template')
    const container = $('.listBooks')
    const nav = container.querySelector('.pagination'); 
    const fragment = document.createDocumentFragment();

    books.forEach(book => {
        const formattedBook = formatBookData(book);
        const clone = template.content.cloneNode(true);

        clone.querySelector('.book-image').src = formattedBook.image;
        clone.querySelector('.book-title').textContent = formattedBook.title;
        clone.querySelector('.book-author').textContent = formattedBook.author;
        clone.querySelector('.book-price').textContent = formattedBook.price;
        if(formattedBook.link != 'No disponible'){
            clone.querySelector('.link-purchase').href = formattedBook.link;
        }else {
            clone.querySelector('.button-google').remove;
        }
        //Cantidad de estrellas segun rating
        const starTotal = 5;
        const starPercentage = (Number(formattedBook.rating) / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        clone.querySelector(`.stars-inner`).style.width = starPercentageRounded; 

        fragment.appendChild(clone)
    })

    
    // Insertar el fragmento *antes* del elemento <nav class="pagination">
    container.insertBefore(fragment, nav); // Esto lo coloca antes de 'nav'
}

function truncateText(text) {
    if (text && text.includes(".") &&  text.length > 20) {
        text = text.substr(0, text.indexOf('.'))
    }
    if (text && text.includes(",") &&  text.length > 20) {
        text = text.substr(0, text.indexOf(','))
    }
    return text; 
}
