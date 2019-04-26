export const transformToSnaKeCase = (word = '') => {
  const charArr = [...word].map((char) => {
    const isUpper = char.match(/[A-Z]/);
    const result = isUpper ? `_${char.toLowerCase()}` : char;
    return result;
  });
  return charArr.join('');
};

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

export const transformModelKeys = (model) => {
  if (!model) return model;
  const camelCasedModel = {};
  Object.keys(model).forEach((key) => {
    const camelCaseKey = transformToCamelCase(key);
    camelCasedModel[camelCaseKey] = model[key];
  });
  return camelCasedModel;
};

export const groupAttributesByName = attributes => attributes
  .map(attribute => transformModelKeys(attribute))
  .reduce((accumulator, currentValue) => {
    const result = { ...accumulator };
    result[currentValue.attributeName] = result[currentValue.attributeName]
      ? [...result[currentValue.attributeName], currentValue]
      : [currentValue];
    return result;
  }, {});

export const generateRandomString = () => Math
  .random().toString(36).substring(5, 15) + Math.random().toString(36).substring(5, 15);

export default transformToSnaKeCase;
