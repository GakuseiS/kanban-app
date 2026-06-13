import { convertToISODate } from '@/utils';

import { IKanbanTask } from '../../../types';
import { ITaskFieldsState } from '../types';

type ReturnType = Pick<IKanbanTask, 'startDay' | 'endDay' | 'text'>;

/** Подготавливает поля к формату задачи канбана
 *
 * @param state Состояние полей задачи при редактировании
 * @returns Подготовленные поля к формату задачи канбана
 */
export const prepareTaskFields = (state: ITaskFieldsState): ReturnType => ({
  startDay: new Date(convertToISODate(state.startDay)).valueOf(),
  endDay: new Date(convertToISODate(state.endDay)).valueOf(),
  text: state.text,
});
