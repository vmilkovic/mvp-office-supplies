/**
 * Formats a price by adding a dot and normalizing decimals
 *
 * @param {number} price
 * @returns {string}
 */
export default (price) => (price / 100).toLocaleString('en-US', { minimumFractionDigits: 2 });
