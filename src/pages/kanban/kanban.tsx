import { useEffect, useState } from 'react';
import { Container } from '@/ui/container';
import { InputSearch } from '@/ui/input/search';
import { KANBAN_STACK_TYPES } from '@/constants/kanban';
import { KanbanStack } from './components/kanbanStack';
import { KANBAN_DATA } from '@/store/kanbanData';
import { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { KanbanTask } from './components/kanbanTask';
import styles from './kanban.module.scss';

type TTasksState = Record<TKanbanTaskType, TKanbanTask[]>;

const KANBAN_TASKS_KEY = 'kanban/tasks';
export const KanbanPage = () => {
  const [tasks, setTasks] = useState<TTasksState>();

  useEffect(() => {
    const localStorageTasks = localStorage.getItem(KANBAN_TASKS_KEY);
    setTasks(localStorageTasks ? JSON.parse(localStorageTasks) : groupTasksByType(sortTasks(KANBAN_DATA)));
  }, []);

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

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.head}>
          <h1 className={styles.title}>Your tasks</h1>
          <InputSearch placeholder='поиск...' />
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
