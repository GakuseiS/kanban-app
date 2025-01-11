import { FC, ReactNode } from 'react';
import { TKanbanTaskType } from '@/store/kanban.type';
import { GhostIcon, HappyIcon, SmileIcon, UpsideDownIcon } from '@/ui/icons';
import styles from './kanbanStack.module.scss';

type KanbanStackProps = {
  title: string;
  type: TKanbanTaskType;
  children: ReactNode;
};

const KANBAN_STACK_ICONS = {
  todo: <HappyIcon />,
  in_progress: <SmileIcon />,
  review: <UpsideDownIcon />,
  done: <GhostIcon />,
};

export const KanbanStack: FC<KanbanStackProps> = ({ title, type, children }) => {
  return (
    <div className={styles.container}>
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
