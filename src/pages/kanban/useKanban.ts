import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useDebouncedValue } from '@/hooks';
import { isDateString, getDateMonthYear } from '@/utils';

import { KANBAN_DATA, KANBAN_TASKS_KEY } from './constants';
import { KanbanTaskTypeEnum, IKanbanTask, ITasksState } from './types';

type ReturnType = {
  /** Строка поиска */
  search: string;
  /** Задачи */
  tasks?: ITasksState;
  /** Есть ли новая задача */
  shouldShowNewTask: boolean;
  /** Сеттер строки поиска */
  setSearch: Dispatch<SetStateAction<string>>;
  /** Обработчик удаления задачи */
  handleDeleteTask: (id: number, type: KanbanTaskTypeEnum) => ITasksState | undefined;
  /** Обработчик редактирования задачи */
  handleEditTask: (task: IKanbanTask) => void;
  /** Обработчик отпускания задачи */
  handleDropTask: (task: IKanbanTask, type: KanbanTaskTypeEnum) => void;
  /** Обработчик очищения задачи */
  handleEmptyTask: VoidFunction;
  /** Обработчик создания задачи */
  handleCreateTask: (task: IKanbanTask) => void;
};

/** Хук логики канбана */
export const useKanban = (): ReturnType => {
  const [initTasks, setInitTasks] = useState<ITasksState>();
  const [tasks, setTasks] = useState<ITasksState>();
  const [search, setSearch] = useState<string>('');
  const [shouldShowNewTask, setShouldShowNewTask] = useState<boolean>(false);

  const debouncedSearch = useDebouncedValue<string>(search, 300);

  useEffect(() => {
    const localStorageTasks = localStorage.getItem(KANBAN_TASKS_KEY);
    const preparedTasks: ITasksState = localStorageTasks
      ? JSON.parse(localStorageTasks)
      : groupTasksByType(sortTasks(KANBAN_DATA));

    setTasks(preparedTasks);
    setInitTasks(preparedTasks);
  }, []);

  useEffect(() => {
    const queryTasks = (search: string): void => {
      if (!initTasks) {
        return;
      }

      if (search) {
        const nextState = Object.entries(initTasks).reduce((accumulator, [key, tasks]) => {
          const tasksKey = key as KanbanTaskTypeEnum;

          return { ...accumulator, [tasksKey]: tasks.filter((task) => queryTaskForMatch(search, task)) };
        }, {} as ITasksState);

        setTasks(nextState);
      } else {
        setTasks(initTasks);
      }
    };

    queryTasks(debouncedSearch);
  }, [debouncedSearch, initTasks]);

  const handleEditTask = (task: IKanbanTask): void => {
    const typedTasks = tasks?.[task.type];
    const taskIndex = typedTasks?.findIndex((typedTask) => typedTask.id === task.id);

    if (taskIndex === undefined || !tasks || !typedTasks) {
      return;
    }

    const preparedTasks = sortTasks(typedTasks.with(taskIndex, task));

    updateTasksState({ ...tasks, [task.type]: preparedTasks });
  };

  const handleCreateTask = (task: IKanbanTask): void => {
    const typedTasks = tasks?.[task.type];

    if (!tasks || !typedTasks) {
      return;
    }

    const preparedTasks = sortTasks([task, ...typedTasks]);

    updateTasksState({ ...tasks, [task.type]: preparedTasks });
    handleEmptyTask();
  };

  const handleDropTask = (task: IKanbanTask, type: KanbanTaskTypeEnum): void => {
    const updatedTasks = handleDeleteTask(task.id, task.type);

    if (!updatedTasks) {
      return;
    }

    const sortedTasksByType = sortTasks([...updatedTasks[type], { ...task, type }]);
    const nextState = { ...updatedTasks, [type]: sortedTasksByType };

    updateTasksState(nextState);
  };

  const handleDeleteTask = (id: number, type: KanbanTaskTypeEnum): ITasksState | undefined => {
    const typedTasks = tasks?.[type];
    const taskIndex = typedTasks?.findIndex((task) => task.id === id);

    if (taskIndex === undefined || !tasks || !typedTasks) {
      return;
    }

    const preparedTasks = typedTasks.toSpliced(taskIndex, 1);
    const nextState = { ...tasks, [type]: preparedTasks };

    updateTasksState(nextState);

    return nextState;
  };

  const handleEmptyTask = (): void => {
    setShouldShowNewTask((prev) => !prev);
  };

  const sortTasks = (tasks: IKanbanTask[]): IKanbanTask[] => {
    return tasks.sort((leftTask, rightTask) => leftTask.startDay - rightTask.startDay);
  };

  const groupTasksByType = (tasks: IKanbanTask[]): ITasksState => {
    return tasks.reduce((accumulator, currentValue) => {
      const type = currentValue.type;

      return { ...accumulator, [type]: accumulator[type] ? [...accumulator[type], currentValue] : [currentValue] };
    }, {} as ITasksState);
  };

  const updateTasksState = (tasks: ITasksState): void => {
    setTasks(tasks);
    localStorage.setItem(KANBAN_TASKS_KEY, JSON.stringify(tasks));
  };

  const queryTaskForMatch = (query: string, task: IKanbanTask): boolean => {
    const isQueryHasDate = isDateString(query);

    if (isQueryHasDate) {
      const isTaskDateHasMatch =
        getDateMonthYear(task.startDay).includes(query) || getDateMonthYear(task.endDay).includes(query);

      return isTaskDateHasMatch;
    }

    const isTextMatches = task.text.toLowerCase().includes(query.toLowerCase());

    return isTextMatches;
  };

  return {
    search,
    tasks,
    shouldShowNewTask,
    setSearch,
    handleDeleteTask,
    handleEditTask,
    handleDropTask,
    handleEmptyTask,
    handleCreateTask,
  };
};
