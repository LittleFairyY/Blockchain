import Big from 'big.js';

Big.RM = 0;

const getFixedValue = (number, precision, decimalZero = true) => {
  if (number === undefined) {
    return '0';
  }
  if (isNaN(number) === true) {
    return '0';
  }
  const value = new Big(number);
  return decimalZero
    ? value.toFixed(precision)
    : value.round(precision).toString();
};

export default getFixedValue;
