export const KANBAN_STACK_TYPES = [
  {
    title: 'To Do',
    type: 'todo',
  },
  {
    title: 'In Progress',
    type: 'in_progress',
  },
  {
    title: 'Review',
    type: 'review',
  },
  {
    title: 'Done',
    type: 'done',
  },
] as const;

export const KANBAN_TASKS_KEY = 'kanban/tasks';
export const KANBAN_TASK_DRAG_KEY = 'drag/task';
