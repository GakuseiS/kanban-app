import type { TKanbanTask } from '../../../../../store/kanban.type';
import { isTaskOutdated } from './isTaskOutdated';

describe('isTaskOutdated', () => {
  test('Проверяет является ли задача с endDay 01.01.2000 просроченной', () => {
    const task: TKanbanTask = {
      id: 1,
      type: 'todo',
      startDay: 1700000000000,
      endDay: new Date(2000, 1, 1).valueOf(),
      text: 'Завершить рефакторинг старого кода.',
    };
    expect(isTaskOutdated(task)).toBe(true);
  });
  test('Проверяет является ли задача с endDay 01.01.3000 просроченной', () => {
    const task: TKanbanTask = {
      id: 1,
      type: 'todo',
      startDay: 1700000000000,
      endDay: new Date(3000, 1, 1).valueOf(),
      text: 'Завершить рефакторинг старого кода.',
    };
    expect(isTaskOutdated(task)).toBe(false);
  });
  test('Проверяет является ли задача с type done просроченной', () => {
    const task: TKanbanTask = {
      id: 1,
      type: 'done',
      startDay: 1700000000000,
      endDay: new Date(2000, 1, 1).valueOf(),
      text: 'Завершить рефакторинг старого кода.',
    };
    expect(isTaskOutdated(task)).toBe(false);
  });
});
