import { FC, ReactNode, DragEvent } from 'react';
import type { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { GhostIcon, HappyIcon, SmileIcon, UpsideDownIcon } from '@/ui/icons';
import { KANBAN_TASK_DRAG_KEY } from '@/constants/kanban';
import styles from './kanbanStack.module.scss';

type KanbanStackProps = {
  title: string;
  type: TKanbanTaskType;
  children: ReactNode;
  onTaskDrop: (task: TKanbanTask, type: TKanbanTaskType) => void;
};

const KANBAN_STACK_ICONS = {
  todo: <HappyIcon />,
  in_progress: <SmileIcon />,
  review: <UpsideDownIcon />,
  done: <GhostIcon />,
};

export const KanbanStack: FC<KanbanStackProps> = ({ title, type, children, onTaskDrop }) => {
  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    const task = JSON.parse(event.dataTransfer.getData(KANBAN_TASK_DRAG_KEY));
    console.log(task);
    onTaskDrop(task, type);
  };

  return (
    <div className={styles.container} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
      <div className={styles.head}>
        <div className={styles.titleGroup}>
          {KANBAN_STACK_ICONS[type]}
          <h3>{title}</h3>
        </div>
        {type === 'todo' ? <button className={styles.button}>+ Добавить</button> : null}
      </div>
      <div className={styles.tasks}>{children}</div>
    </div>
  );
};
