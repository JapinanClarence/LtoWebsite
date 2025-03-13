/**
 * 
 * @param {object} categories 
 * @returns 
 */
export const createCategoryMap = (categories) => ({
    get: (key) => categories[key] || null,
  });