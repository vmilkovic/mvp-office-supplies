import axios from 'axios';

/**
 * Fetch categoires
 *
 * @returns {Promise}
 */
export function fetchCategories() {
    return axios.get('/api/categories');
}
