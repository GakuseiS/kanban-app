export const getDateMonthYear = (dateTime: number) => {
  const date = new Date(dateTime);

  const day = date.toLocaleString('ru-RU', {
    day: '2-digit',
  });

  const month = date.toLocaleString('ru-RU', {
    month: '2-digit',
  });
  const year = date.toLocaleString('ru-RU', {
    year: 'numeric',
  });

  return `${day}.${month}.${year}`;
};
