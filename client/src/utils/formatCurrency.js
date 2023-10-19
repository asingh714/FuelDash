const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

function toDisplayFormat(value) {
  return `$${(parseInt(value, 10) / 100).toFixed(2)}`;
}
function toBackendFormat(value) {
  return parseInt(value, 10);
}

export { formatCurrency, toDisplayFormat, toBackendFormat };
