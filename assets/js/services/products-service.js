import axios from 'axios';

/**
 * Fetch category products
 *
 * @param {string|null} categoryIri
 * @param {string|null} searchTerm
 * @returns {Promise}
 */
export function fetchProducts(categoryIri, searchTerm) {
    const params = {};

    if (categoryIri) {
        params.category = categoryIri;
    }

    if (searchTerm) {
        params.name = searchTerm;
    }

    return axios.get('/api/products', {
        params,
    });
}

/**
 * Get a product from API
 *
 * @param {string} iri
 * @returns {Promise}
 */
export function fetchOneProduct(iri) {
    return axios.get(iri);
}
