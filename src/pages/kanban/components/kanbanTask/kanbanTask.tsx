import { FC, forwardRef } from 'react';
import clsx from 'clsx';

import { getDateMonthYear } from '@/utils';
import { CheckIcon, CrossIcon, EditIcon, TrashIcon } from '@icons';
import { InputText, InputDate } from '@/ui';

import { useKanbanTask } from './useKanbanTask';
import { isTaskOutdated } from './lib';
import { KanbanTaskTypeEnum, IKanbanTask } from '../../types';

import styles from './kanbanTask.module.scss';

type Props = {
  /** Данные задачи */
  task?: IKanbanTask;
  /** Обработчик отправки формы */
  onSubmit: (task: IKanbanTask) => void;
  /** Обработчик закрытия */
  onClose?: VoidFunction;
  /** Обработчик удаления */
  onDelete?: (id: number, type: KanbanTaskTypeEnum) => void;
};

/** Задача канбана */
export const KanbanTask: FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { task } = props;

  const {
    taskFields,
    isEditMode,
    errors,
    isValid,
    handleChangeField,
    handleClickTrash,
    handleClickCross,
    handleSubmit,
    handleValidate,
    handleEditMode,
    handleOnDrag,
  } = useKanbanTask(props);

  const isEditOrCreateMode = isEditMode || !task;

  return (
    <div ref={ref} className={styles.container} draggable={!!task} onDragStart={handleOnDrag(task)}>
      <div className={styles.row}>
        <span className={styles.label}>Начало:</span>

        {isEditOrCreateMode && (
          <InputDate
            value={taskFields.startDay}
            hasError={errors.startDay}
            onValueChange={handleChangeField('startDay')}
            setError={handleValidate('startDay')}
          />
        )}

        {!isEditOrCreateMode && <span className={styles.value}>{getDateMonthYear(task.startDay)}</span>}

        {!isEditMode && (
          <div className={styles.actions}>
            <button className={styles.edit} onClick={handleEditMode}>
              <EditIcon width={18} height={18} />
            </button>
            <button className={styles.trash} onClick={handleClickTrash}>
              <TrashIcon width={18} height={18} />
            </button>
          </div>
        )}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Окончание:</span>

        {isEditOrCreateMode && (
          <InputDate
            value={taskFields.endDay}
            hasError={errors.endDay}
            onValueChange={handleChangeField('endDay')}
            setError={handleValidate('endDay')}
          />
        )}

        {!isEditOrCreateMode && (
          <span className={clsx(styles.value, isTaskOutdated(task) && styles.overdue)}>
            {getDateMonthYear(task.endDay)}
          </span>
        )}
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Описание:</span>

        {isEditOrCreateMode && <InputText value={taskFields.text} onValueChange={handleChangeField('text')} />}

        {!isEditOrCreateMode && <span className={styles.value}>{task.text}</span>}
      </div>

      {isEditMode && (
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleClickCross}>
            <CrossIcon />
          </button>
          <button className={styles.button} onClick={handleSubmit} disabled={!isValid}>
            <CheckIcon />
          </button>
        </div>
      )}
    </div>
  );
});
