export type TKanbanTask = {
  id: number;
  type: TKanbanTaskType;
  startDay: number;
  endDay: number;
  text: string;
};

export type TKanbanTaskType = 'done' | 'todo' | 'in_progress' | 'review';
