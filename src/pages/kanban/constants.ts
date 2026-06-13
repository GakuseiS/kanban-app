import { KanbanTaskTypeEnum, IKanbanTask } from './types';

const { TODO, IN_PROGRESS, REVIEW, DONE } = KanbanTaskTypeEnum;

/** Колонки канбана по типу */
export const KANBAN_STACK_TYPES = [
  {
    title: 'To Do',
    type: TODO,
  },
  {
    title: 'In Progress',
    type: IN_PROGRESS,
  },
  {
    title: 'Review',
    type: REVIEW,
  },
  {
    title: 'Done',
    type: DONE,
  },
] as const;

/** Ключ для хранения задач канбана в localstorage */
export const KANBAN_TASKS_KEY = 'kanban/tasks';

/** Ключ для перетаскивания карточки канбана */
export const KANBAN_TASK_DRAG_KEY = 'drag/task';

/** Начальные данные канбана */
export const KANBAN_DATA: IKanbanTask[] = [
  {
    id: 1,
    type: DONE,
    startDay: 1700000000000,
    endDay: 1703740800000,
    text: 'Завершить рефакторинг старого кода.',
  },
  {
    id: 2,
    type: TODO,
    startDay: 1767206400000,
    endDay: 1767292800000,
    text: 'Разработать план по внедрению новой функциональности.',
  },
  {
    id: 3,
    type: IN_PROGRESS,
    startDay: 1767292800000,
    endDay: 1767379200000,
    text: 'Написать документацию для команды разработчиков.',
  },
  {
    id: 4,
    type: REVIEW,
    startDay: 1767379200000,
    endDay: 1767465600000,
    text: 'Провести код-ревью нового модуля.',
  },
  {
    id: 5,
    type: DONE,
    startDay: 1767465600000,
    endDay: 1767552000000,
    text: 'Тестирование системы после обновления.',
  },
  {
    id: 6,
    type: TODO,
    startDay: 1767552000000,
    endDay: 1767638400000,
    text: 'Подготовить презентацию для клиента.',
  },
  {
    id: 7,
    type: IN_PROGRESS,
    startDay: 1767638400000,
    endDay: 1767724800000,
    text: 'Оптимизировать алгоритмы обработки данных.',
  },
  {
    id: 8,
    type: REVIEW,
    startDay: 1767724800000,
    endDay: 1767811200000,
    text: 'Проверить результаты нагрузочного тестирования.',
  },
  {
    id: 9,
    type: TODO,
    startDay: 1767811200000,
    endDay: 1767897600000,
    text: 'Составить отчет по итогам проекта.',
  },
  {
    id: 10,
    type: DONE,
    startDay: 1767897600000,
    endDay: 1767984000000,
    text: 'Внедрить исправления по результатам тестирования.',
  },
  {
    id: 11,
    type: TODO,
    startDay: 1700000000000,
    endDay: 1700500000000,
    text: 'Обновить базу знаний компании до конца года.',
  },
  {
    id: 12,
    type: IN_PROGRESS,
    startDay: 1768070400000,
    endDay: 1768156800000,
    text: 'Разработать прототип нового интерфейса.',
  },
  {
    id: 13,
    type: REVIEW,
    startDay: 1768156800000,
    endDay: 1768243200000,
    text: 'Анализировать метрики производительности.',
  },
  {
    id: 14,
    type: DONE,
    startDay: 1768243200000,
    endDay: 1768329600000,
    text: 'Закрыть задачи по техническому долгу.',
  },
  {
    id: 15,
    type: TODO,
    startDay: 1768329600000,
    endDay: 1768416000000,
    text: 'Организовать тренинг для сотрудников.',
  },
  {
    id: 16,
    type: REVIEW,
    startDay: 1690000000000,
    endDay: 1690500000000,
    text: 'Провести проверку безопасности системы.',
  },
  {
    id: 17,
    type: DONE,
    startDay: 1692000000000,
    endDay: 1693000000000,
    text: 'Закрыть критические баги в системе.',
  },
];
