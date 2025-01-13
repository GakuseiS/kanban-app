import { useEffect, useState } from 'react';
import type { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { KANBAN_TASKS_KEY } from '@/constants/kanban';
import { KANBAN_DATA } from '@/store/kanbanData';
import { isDateString } from '@/utils/dateUtils';
import { getDateMonthYear } from '@/utils/dateConvert';

type TTasksState = Record<TKanbanTaskType, TKanbanTask[]>;

export const useKanban = () => {
  const [initTasks, setInitTasks] = useState<TTasksState>();
  const [tasks, setTasks] = useState<TTasksState>();
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebouncedValue<string>(search, 300);
  const [withNewTask, setWithNewTask] = useState<boolean>(false);

  useEffect(() => {
    const localStorageTasks = localStorage.getItem(KANBAN_TASKS_KEY);
    const preparedTasks = localStorageTasks ? JSON.parse(localStorageTasks) : groupTasksByType(sortTasks(KANBAN_DATA));
    setTasks(preparedTasks);
    setInitTasks(preparedTasks);
  }, []);

  useEffect(() => {
    const queryTasks = (search: string) => {
      if (!initTasks) return;
      if (search) {
        const nextState = Object.entries(initTasks).reduce((accumulator, [key, tasks]) => {
          const tasksKey = key as TKanbanTaskType;
          return { ...accumulator, [tasksKey]: tasks.filter((task) => queryTaskForMatch(search, task)) };
        }, {} as TTasksState);
        setTasks(nextState);
      } else {
        setTasks(initTasks);
      }
    };

    queryTasks(debouncedSearch);
  }, [debouncedSearch, initTasks]);

  const onTaskEdit = (task: TKanbanTask) => {
    const typedTasks = tasks?.[task.type];
    const taskIndex = typedTasks?.findIndex((task) => task.id === task.id);
    if (taskIndex === undefined || !tasks || !typedTasks) return;
    const preparedTasks = sortTasks(typedTasks.with(taskIndex, task));
    updateTasksState({ ...tasks, [task.type]: preparedTasks });
  };

  const onTaskCreate = (task: TKanbanTask) => {
    const typedTasks = tasks?.[task.type];
    if (!tasks || !typedTasks) return;
    const preparedTasks = sortTasks([task, ...typedTasks]);
    updateTasksState({ ...tasks, [task.type]: preparedTasks });
    handleEmptyTask();
  };

  const sortTasks = (tasks: TKanbanTask[]) => {
    return tasks.sort((a, b) => a.startDay - b.startDay);
  };

  const groupTasksByType = (tasks: TKanbanTask[]) => {
    return tasks.reduce((accumulator, currentValue) => {
      const type = currentValue.type;
      return { ...accumulator, [type]: accumulator[type] ? [...accumulator[type], currentValue] : [currentValue] };
    }, {} as TTasksState);
  };
  const onTaskDrop = (task: TKanbanTask, type: TKanbanTaskType) => {
    const updatedTasks = onTaskDelete(task.id, task.type);
    if (!updatedTasks) return;
    const sortedTasksByType = sortTasks([...updatedTasks[type], { ...task, type }]);
    const nextState = { ...updatedTasks, [type]: sortedTasksByType };
    updateTasksState(nextState);
  };

  const onTaskDelete = (id: number, type: TKanbanTaskType) => {
    const typedTasks = tasks?.[type];
    const taskIndex = typedTasks?.findIndex((task) => task.id === id);
    if (taskIndex === undefined || !tasks || !typedTasks) return;
    const preparedTasks = typedTasks.toSpliced(taskIndex, 1);
    const nextState = { ...tasks, [type]: preparedTasks };
    updateTasksState(nextState);
    return nextState;
  };

  const updateTasksState = (tasks: TTasksState) => {
    setTasks(tasks);
    updateLocalStorage(tasks);
  };

  const updateLocalStorage = (tasks: TTasksState) => {
    localStorage.setItem(KANBAN_TASKS_KEY, JSON.stringify(tasks));
  };

  const queryTaskForMatch = (query: string, task: TKanbanTask) => {
    const isQueryHasDate = isDateString(query);
    if (isQueryHasDate) {
      const isTaskDateHasMatch =
        getDateMonthYear(task.startDay).includes(query) || getDateMonthYear(task.endDay).includes(query);
      return isTaskDateHasMatch;
    }
    const isTextMatches = task.text.toLowerCase().includes(query.toLowerCase());
    return isTextMatches;
  };

  const handleEmptyTask = () => {
    setWithNewTask((prev) => !prev);
  };

  return {
    search,
    tasks,
    withNewTask,
    setSearch,
    onTaskDelete,
    onTaskEdit,
    onTaskDrop,
    handleEmptyTask,
    onTaskCreate,
  };
};
