/** Задача канбана */
export type IKanbanTask = {
  /** Id задачи */
  id: number;
  /** Тип */
  type: KanbanTaskTypeEnum;
  /** День начала */
  startDay: number;
  /** День завершения */
  endDay: number;
  /** Описание */
  text: string;
};

/** Состояние карточек канбана */
export type ITasksState = Record<KanbanTaskTypeEnum, IKanbanTask[]>;

/** Тип для задачи канбана */
export enum KanbanTaskTypeEnum {
  /** Завершена */
  DONE = 'done',
  /** Необходимо выполнить */
  TODO = 'todo',
  /** В процессе выполнения */
  IN_PROGRESS = 'in_progress',
  /** Ревью */
  REVIEW = 'review',
}
