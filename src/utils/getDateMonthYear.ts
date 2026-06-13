/** Получает дату в формате 11.11.2000 из таймстампа
 *
 * @param timestamp Таймстамп
 * @returns Строка с датой в формате
 */
export const getDateMonthYear = (timestamp: number): string => {
  const date = new Date(timestamp);

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
