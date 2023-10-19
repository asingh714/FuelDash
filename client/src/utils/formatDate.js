function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();

  return `${month}-${day}-${year}`;
}

export default formatDate;
