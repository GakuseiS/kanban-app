import { useEffect, useState } from 'react';
import { Container } from '@/ui/container';
import { InputSearch } from '@/ui/input/search';
import { KANBAN_STACK_TYPES, KANBAN_TASKS_KEY } from '@/constants/kanban';
import { KanbanStack } from './components/kanbanStack';
import { KANBAN_DATA } from '@/store/kanbanData';
import { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { KanbanTask } from './components/kanbanTask';
import { isDateString } from '@/utils/dateCompare';
import { getDateMonthYear } from '@/utils/dateConvert';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import styles from './kanban.module.scss';

type TTasksState = Record<TKanbanTaskType, TKanbanTask[]>;

export const KanbanPage = () => {
  const [initTasks, setInitTasks] = useState<TTasksState>();
  const [tasks, setTasks] = useState<TTasksState>();
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebouncedValue(search, 300);

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

  const onTaskTextEdit = (task: TKanbanTask) => {
    const typedTasks = tasks?.[task.type];
    const taskIndex = typedTasks?.findIndex((task) => task.id === task.id);
    if (taskIndex === undefined || !tasks || !typedTasks) return;
    const preparedTasks = sortTasks(typedTasks.with(taskIndex, task));
    updateTasksState({ ...tasks, [task.type]: preparedTasks });
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

  const onTaskDelete = (id: number, type: TKanbanTaskType) => {
    const typedTasks = tasks?.[type];
    const taskIndex = typedTasks?.findIndex((task) => task.id === id);
    if (taskIndex === undefined || !tasks || !typedTasks) return;
    const preparedTasks = typedTasks.toSpliced(taskIndex, 1);
    updateTasksState({ ...tasks, [type]: preparedTasks });
  };

  const updateTasksState = (tasks: TTasksState) => {
    setTasks(tasks);
    updateLocalStorage(tasks);
  };

  const updateLocalStorage = (tasks: TTasksState) => {
    localStorage.setItem(KANBAN_TASKS_KEY, JSON.stringify(tasks));
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
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

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.head}>
          <h1 className={styles.title}>Your tasks</h1>
          <InputSearch value={search} onValueChange={onSearchChange} placeholder='поиск...' />
        </div>
        <div className={styles.content}>
          {KANBAN_STACK_TYPES.map((stackType) => (
            <KanbanStack key={stackType.type} title={stackType.title} type={stackType.type}>
              {tasks?.[stackType.type].map((task) => (
                <KanbanTask key={task.id} task={task} onDelete={onTaskDelete} onSubmit={onTaskTextEdit} />
              ))}
            </KanbanStack>
          ))}
        </div>
      </Container>
    </div>
  );
};
