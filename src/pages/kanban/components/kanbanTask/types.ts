/** Данные полей задачи при редактировании */
export type ITaskFieldsState = {
  /** День начала */
  startDay: string;
  /** День завершения */
  endDay: string;
  /** Описание */
  text: string;
};

/** Состояние ошибок полей задачи */
export type ITaskFieldsErrorsState = {
  /** Есть ли ошибка в описании */
  text: boolean;
  /** Есть ли ошибка в дне начала */
  startDay: boolean;
  /** Есть ли ошибка в дне завершения */
  endDay: boolean;
};
