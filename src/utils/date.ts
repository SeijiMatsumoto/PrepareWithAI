export const formatDate = (): string => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate =
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day +
    "-" +
    year;
  return formattedDate;
};
