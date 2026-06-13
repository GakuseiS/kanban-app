import { getDateMonthYear } from '@/utils';

import { IKanbanTask } from '../../../types';
import { ITaskFieldsState } from '../types';

/** Подготавливает данные состояния задачи при редактировании
 *
 * @param task Данные задачи
 * @returns Начальные данные полей задачи
 */
export const prepareTaskState = (task?: IKanbanTask): ITaskFieldsState => ({
  startDay: task ? getDateMonthYear(task.startDay) : '',
  endDay: task ? getDateMonthYear(task.endDay) : '',
  text: task?.text ?? '',
});
