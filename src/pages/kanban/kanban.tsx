import { useEffect, useState } from 'react';
import { Container } from '@/ui/container';
import { Input } from '@/ui/input';
import { KANBAN_STACK_TYPES } from '@/constants/kanban';
import { KanbanStack } from './components/kanbanStack';
import { KANBAN_DATA } from '@/store/kanbanData';
import { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { KanbanTask } from './components/kanbanTask';
import styles from './kanban.module.scss';

type TTasksState = Record<TKanbanTaskType, TKanbanTask[]>;

export const KanbanPage = () => {
  const [tasks, setTasks] = useState<TTasksState>();

  useEffect(() => {
    setTasks(groupTasksByType(sortTasks(KANBAN_DATA)));
  }, []);

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

    setTasks({ ...tasks, [type]: preparedTasks });
  };

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.head}>
          <h1 className={styles.title}>Your tasks</h1>
          <Input placeholder='поиск...' />
        </div>
        <div className={styles.content}>
          {KANBAN_STACK_TYPES.map((stackType) => (
            <KanbanStack key={stackType.type} title={stackType.title} type={stackType.type}>
              {tasks?.[stackType.type].map((task) => <KanbanTask key={task.id} task={task} onDelete={onTaskDelete} />)}
            </KanbanStack>
          ))}
        </div>
      </Container>
    </div>
  );
};
