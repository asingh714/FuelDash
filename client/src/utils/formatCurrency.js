const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

const formatNumberToTwoDecimalPlaces = (num) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const formatNumberToWholeNumbers = (num) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  }).format(num);
};

function toDisplayFormat(value) {
  return `$${(parseInt(value, 10) / 100).toFixed(2)}`;
}

const formatToTwoDecimalPlaces = (num) => {
  return parseFloat(num).toFixed(2);
};

export {
  formatCurrency,
  toDisplayFormat,
  formatToTwoDecimalPlaces,
  formatNumberToTwoDecimalPlaces,
  formatNumberToWholeNumbers,
};
