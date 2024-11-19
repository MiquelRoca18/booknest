import { apiKey, apiUrl } from '../config.js'
const API_URL = apiUrl;
const API_KEY = apiKey; // Más tarde se cambiará paramayor seguridad


/**
 * Realiza una llamada a la API de Google Books con soporte para múltiples filtros.
 * @param {string} query - El término de búsqueda (por ejemplo, 'harry potter').
 * @param {Array<string>} [filters=[]] - Una lista de filtros adicionales (opcional).
 * @param {number} [maxResults=10] - Número máximo de resultados que deseas obtener (opcional).
 * @param {string} [startIndex=0] - Índice desde el cual empezar los resultados (útil para la paginación).
 * @returns {Promise<Object>} - Un objeto con los resultados de la búsqueda combinados de todos los filtros.
*/
export async function fetchBooks(query, filters = [], maxResults = 6, startIndex = 0) {
    try {
        let allBooks = [];
        
        // Realiza una llamada a la API para cada filtro
        for (const filter of filters) {
            const response = await fetch(`${API_URL}?q=${query}&filter=${filter}&maxResults=${maxResults}&startIndex=${startIndex}&key=${API_KEY}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            allBooks = [...allBooks, ...data.items]; // Combina los resultados
        }
        
        return allBooks;  // Devuelve los libros combinados de todos los filtros
    } catch (error) {
        console.error('Error fetching books:', error);
        return null;
    }
}

// export async function fetchBooks(query, filter = '', maxResults = 10, startIndex = 0) {
//     try {
//         const response = await fetch(`${API_URL}?q=${query}&filter=${filter}&maxResults=${maxResults}&startIndex=${startIndex}&key=${API_KEY}`);
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }
//         const data = await response.json();
//         return data; 
//     } catch (error) {
//         console.error('Error fetching books:', error);
//         return null;
//     }
// }