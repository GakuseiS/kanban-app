import { IKanbanTask, KanbanTaskTypeEnum } from '../../../types';

/** Проверяет является ли задача просроченной
 *
 * @param task Задача канбана
 * @returns Результат проверки
 */
export const isTaskOutdated = (task: IKanbanTask): boolean => {
  if (task.type === KanbanTaskTypeEnum.DONE) {
    return false;
  }

  return isDateInPast(task.endDay);
};

/** Проверяет находится ли дата в прошлом
 *
 * @param date Дата или таймтамп
 * @returns Результат проверки
 */
const isDateInPast = (date: number | Date): boolean => {
  const todayDate = new Date();

  return new Date(date) < todayDate;
};
