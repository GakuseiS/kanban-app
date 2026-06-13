import { FC, ReactNode, DragEvent, PropsWithChildren } from 'react';

import { GhostIcon, HappyIcon, SmileIcon, UpsideDownIcon } from '@/ui/icons';

import { KANBAN_TASK_DRAG_KEY } from '../../constants';
import { KanbanTaskTypeEnum, IKanbanTask } from '../../types';

import styles from './kanbanStack.module.scss';

type Props = PropsWithChildren<{
  /** Заголовок */
  title: string;
  /** Тип */
  type: KanbanTaskTypeEnum;
  /** С кнопкой создания */
  shouldShowCreateButton: boolean;
  /** Обработчик создания задачи */
  onCreateTask: VoidFunction;
  /** Обработчик дропа задачи */
  onTaskDrop: (task: IKanbanTask, type: KanbanTaskTypeEnum) => void;
}>;

/** Иконки колонок канбана в зависимости от типа */
const KANBAN_STACK_ICONS: Record<KanbanTaskTypeEnum, ReactNode> = {
  todo: <HappyIcon />,
  in_progress: <SmileIcon />,
  review: <UpsideDownIcon />,
  done: <GhostIcon />,
};

/** Колонка канбана */
export const KanbanStack: FC<Props> = ({ title, type, children, onTaskDrop, onCreateTask, shouldShowCreateButton }) => {
  const handleOnDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>): void => {
    const task = JSON.parse(event.dataTransfer.getData(KANBAN_TASK_DRAG_KEY));

    onTaskDrop(task, type);
  };

  return (
    <div className={styles.container} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
      <div className={styles.head}>
        <div className={styles.titleGroup}>
          {KANBAN_STACK_ICONS[type]}
          <h3>{title}</h3>
        </div>

        {shouldShowCreateButton && (
          <button className={styles.button} onClick={onCreateTask}>
            + Добавить
          </button>
        )}
      </div>
      <div className={styles.tasks}>{children}</div>
    </div>
  );
};
