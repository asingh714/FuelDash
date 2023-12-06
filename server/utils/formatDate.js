const formatDate = (date) => {
  const d = new Date(date);
  const timezoneOffset = d.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(d.getTime() + timezoneOffset);

  let month = "" + (localDate.getMonth() + 1);
  let day = "" + localDate.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day].join("-");
};

module.exports = formatDate;
