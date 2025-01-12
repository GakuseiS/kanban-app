import { FC } from 'react';
import clsx from 'clsx';
import { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { getDateMonthYear } from '@/utils/dateConvert';
import { isDateInPast } from '@/utils/dateCompare';
import { CheckIcon, CrossIcon, EditIcon, TrashIcon } from '@/ui/icons';
import { InputText } from '@/ui/input/text';
import { InputDate } from '@/ui/input/date';
import { useKanbanTask } from './useKanbanTask';
import styles from './kanbanTask.module.scss';

type KanbanTaskProps = {
  task: TKanbanTask;
  onDelete: (id: number, type: TKanbanTaskType) => void;
  onSubmit: (task: TKanbanTask) => void;
};

export const KanbanTask: FC<KanbanTaskProps> = (props) => {
  const { task } = props;
  const {
    taskFields,
    isEditMode,
    errors,
    isValid,
    onTrashClick,
    onFieldChange,
    onCrossClick,
    onSubmitClick,
    onValidate,
    handleEditMode,
  } = useKanbanTask(props);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>Начало:</span>
        {isEditMode ? (
          <InputDate
            value={taskFields.startDay}
            error={errors.startDay}
            onValueChange={(value) => onFieldChange('startDay', value)}
            setError={(isValid) => onValidate('startDay', isValid)}
          />
        ) : (
          <span className={styles.value}>{getDateMonthYear(task.startDay)}</span>
        )}
        {!isEditMode ? (
          <div className={styles.actions}>
            <button className={styles.edit} onClick={handleEditMode}>
              <EditIcon width={18} height={18} />
            </button>
            <button className={styles.trash} onClick={onTrashClick}>
              <TrashIcon width={18} height={18} />
            </button>
          </div>
        ) : null}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Окончание:</span>
        {isEditMode ? (
          <InputDate
            value={taskFields.endDay}
            onValueChange={(value) => onFieldChange('endDay', value)}
            setError={(isValid) => onValidate('endDay', isValid)}
          />
        ) : (
          <span className={clsx(styles.value, isDateInPast(task.endDay) && task.type !== 'done' && styles.overdue)}>
            {getDateMonthYear(task.endDay)}
          </span>
        )}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Описание:</span>
        {isEditMode ? (
          <InputText value={taskFields.text} onValueChange={(value) => onFieldChange('text', value)} />
        ) : (
          <span className={styles.value}>{task.text}</span>
        )}
      </div>
      {isEditMode ? (
        <div className={styles.buttons}>
          <button className={styles.button} onClick={onCrossClick}>
            <CrossIcon />
          </button>
          <button className={styles.button} onClick={onSubmitClick} disabled={!isValid}>
            <CheckIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
};
