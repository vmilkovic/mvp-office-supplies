/**
 * Fetch categoires
 *
 * @returns {Promise}
 */
export function fetchCategories() {
    // Created to be same as axios response
    return new Promise((resolve) => {
        resolve({
            data: {
                'hydra:member': window.categories,
            },
        });
    });
}
