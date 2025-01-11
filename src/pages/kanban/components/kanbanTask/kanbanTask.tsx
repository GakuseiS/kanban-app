import { FC } from 'react';
import clsx from 'clsx';
import { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { getDateMonthYear } from '@/utils/dateConvert';
import { isDateInPast } from '@/utils/dateCompare';
import { EditIcon, TrashIcon } from '@/ui/icons';
import styles from './kanbanTask.module.scss';

type KanbanTaskProps = {
  task: TKanbanTask;
  onDelete: (id: number, type: TKanbanTaskType) => void;
};

export const KanbanTask: FC<KanbanTaskProps> = ({ task, onDelete }) => {
  const onTrashClick = () => {
    onDelete(task.id, task.type);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>Начало:</span>
        <span className={styles.value}>{getDateMonthYear(task.startDay)}</span>
        <div className={styles.actions}>
          <button className={styles.edit}>
            <EditIcon width={18} height={18} />
          </button>
          <button className={styles.trash} onClick={onTrashClick}>
            <TrashIcon width={18} height={18} />
          </button>
        </div>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Окончание:</span>
        <span className={clsx(styles.value, isDateInPast(task.endDay) && task.type !== 'done' && styles.overdue)}>
          {getDateMonthYear(task.endDay)}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Описание:</span>
        <span className={styles.value}>{task.text}</span>
      </div>
    </div>
  );
};
