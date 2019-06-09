/**
 * @fileOverview Contains utility functions shared across the server
 *
 * @author Chima Chukwuemeka
*/

/**
 * @description Transforms a word in camel case to snake case
 *
 * @param {string} word - The word to be transformed
 *
 * @returns {string}
*/
export const transformToSnaKeCase = (word = '') => {
  const charArr = [...word].map((char) => {
    const isUpper = char.match(/[A-Z]/);
    const result = isUpper ? `_${char.toLowerCase()}` : char;
    return result;
  });
  return charArr.join('');
};

/**
 * @description Transforms a word in snake case to camel case
 *
 * @param {string} word - The word to be transformed
 *
 * @returns {string}
*/
export const transformToCamelCase = (word = '') => {
  const wordArr = word.split('_');
  if (!wordArr[1]) return word;
  for (let iterator = 1; iterator < wordArr.length; iterator += 1) {
    wordArr[iterator] = `${wordArr[iterator][0].toUpperCase()}${wordArr[
      iterator
    ].substring(1)}`;
  }
  return wordArr.join('');
};

/**
 * @description Transforms the property names of an object from snake case to camel case
 *
 * @param {object} model - The model whose properties should be transformed
 *
 * @returns {object}
*/
export const transformModelKeys = (model) => {
  if (!model) return model;
  const camelCasedModel = {};
  Object.keys(model).forEach((key) => {
    const camelCaseKey = transformToCamelCase(key);
    camelCasedModel[camelCaseKey] = model[key];
  });
  return camelCasedModel;
};

/**
 * @description Groups the attributes of a product by the attribute name
 *
 * @param {array} attributes - The attributes to be grouped
 *
 * @returns {object}
*/
export const groupAttributesByName = attributes => attributes
  .map(attribute => transformModelKeys(attribute))
  .reduce((accumulator, currentValue) => {
    const result = { ...accumulator };
    result[currentValue.attributeName] = result[currentValue.attributeName]
      ? [...result[currentValue.attributeName], currentValue]
      : [currentValue];
    return result;
  }, {});

/**
 * @description Generates a random string
 *
 * @returns {string}
*/
export const generateRandomString = () => Math
  .random().toString(36).substring(5, 15) + Math.random().toString(36).substring(5, 15);

/**
 * @description Capitalizes a string
 *
 * @param {string} string - The string to be capitalized
 *
 * @returns {string}
 */
export const capitalizeString = string => string.charAt(0)
  .toUpperCase() + string.slice(1).toLowerCase();

/**
 * @description Appends the host names to the URL of images in a product
 *
 * @param {object} product - The product to be modified
 * @param {string} hostName - The hostName to be appended
 *
 * @returns {object}
*/
export const appendImageUrls = (product, hostName) => {
  let myProduct = product;
  const { thumbnail, image, image2 } = product;
  const imageNames = { thumbnail, image, image2 };
  Object.keys(imageNames).forEach((key) => {
    if (imageNames[key]) {
      const imageUrl = `${hostName}/images/${imageNames[key]}`;
      myProduct = {
        ...myProduct,
        [key]: imageUrl,
      };
    }
  });
  return myProduct;
};

export default transformToSnaKeCase;
