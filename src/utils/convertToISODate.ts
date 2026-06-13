/** Конвертирует строку с датой в формат ISO даты
 *
 * @param date Строка с датой в формате 11.11.2000
 * @returns Дата в формате 2000-11-11
 */
export const convertToISODate = (date: string): string => {
  return date.split('.').reverse().join('-');
};
