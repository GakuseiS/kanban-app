import { ITaskFieldsErrorsState } from './types';

/** Начальное состояние ошибок */
export const DEFAULT_TASK_ERRORS_STATE: ITaskFieldsErrorsState = {
  text: false,
  startDay: false,
  endDay: false,
};
