export const isDateInPast = (date: number) => {
  return date < new Date().valueOf();
};
