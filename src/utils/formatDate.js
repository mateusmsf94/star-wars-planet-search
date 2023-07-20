function formatDate(date) {
  const dateTime = new Date(date);
  const POS_TO_REMOVE = 16;
  const formattedDate = dateTime
    .toISOString()
    .substring(0, POS_TO_REMOVE);

  return formattedDate;
}
export default formatDate;
