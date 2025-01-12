export const isDateInPast = (date: number | Date) => {
  const todayDate = new Date();
  return new Date(date) < todayDate;
};

export const isDateString = (string: string) => {
  return !!string.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/g);
};
