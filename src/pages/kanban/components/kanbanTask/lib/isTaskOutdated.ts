import { TKanbanTask } from '../../../../../store/kanban.type';

export const isTaskOutdated = (task: TKanbanTask) => {
  if (task.type === 'done') return false;
  return isDateInPast(task.endDay);
};

export const isDateInPast = (date: number | Date) => {
  const todayDate = new Date();
  return new Date(date) < todayDate;
};
