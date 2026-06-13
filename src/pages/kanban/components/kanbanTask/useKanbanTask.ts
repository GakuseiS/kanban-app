import { useMemo, useState, DragEvent } from 'react';

import { getRandomNumber } from '@/utils';

import { ITaskFieldsErrorsState, ITaskFieldsState } from './types';
import { KANBAN_TASK_DRAG_KEY } from '../../constants';
import { KanbanTaskTypeEnum, IKanbanTask } from '../../types';
import { DEFAULT_TASK_ERRORS_STATE } from './constants';
import { prepareTaskFields, prepareTaskState } from './utils';

type Params = {
  /** Данные задачи */
  task?: IKanbanTask;
  /** Обработчик отправки формы */
  onSubmit: (task: IKanbanTask) => void;
  /** Обработчик закрытия */
  onClose?: VoidFunction;
  /** Обработчик удаления */
  onDelete?: (id: number, type: KanbanTaskTypeEnum) => void;
};

type ReturnType = {
  /** Поля задачи */
  taskFields: ITaskFieldsState;
  /** Находится ли в режиме редактирования */
  isEditMode: boolean;
  /** Ошибки полей */
  errors: ITaskFieldsErrorsState;
  /** Валидна ли форма */
  isValid: boolean;
  /** Обработчик отправки формы */
  handleSubmit: VoidFunction;
  /** Обработчик режима редактирования */
  handleEditMode: VoidFunction;
  /** Обработчик клика на крестик */
  handleClickCross: VoidFunction;
  /** Обработчик клика на корзину */
  handleClickTrash: VoidFunction;
  /** Обработчик изменения поля */
  handleChangeField: (name: keyof ITaskFieldsState) => (value: string) => void;
  /** Обработчик валидации */
  handleValidate: (name: keyof ITaskFieldsErrorsState) => (value: boolean) => void;
  /** Обработчик наведения при перетаскивании */
  handleOnDrag: (event: DragEvent<HTMLDivElement>, task?: IKanbanTask) => void;
};

/** Хук логики задачи канбана */
export const useKanbanTask = ({ task, onDelete, onSubmit, onClose }: Params): ReturnType => {
  const [taskFields, setTaskFields] = useState<ITaskFieldsState>(prepareTaskState(task));
  const [isEditMode, setEditMode] = useState<boolean>(!task);
  const [errors, setErrors] = useState<ITaskFieldsErrorsState>(DEFAULT_TASK_ERRORS_STATE);

  const isValid = useMemo(
    () => !Object.values(errors).some(Boolean) && Object.values(taskFields).every(Boolean),
    [errors, taskFields],
  );

  const handleClickTrash = (): void => {
    if (!task) {
      return;
    }

    onDelete?.(task.id, task.type);
  };

  const handleEditMode = (): void => {
    setEditMode((prev) => !prev);
  };

  const handleChangeField =
    (name: keyof ITaskFieldsState) =>
    (value: string): void => {
      setTaskFields((prev) => ({ ...prev, [name]: value }));
    };

  const handleClickCross = (): void => {
    if (task) {
      handleEditMode();
      resetState();
    } else {
      onClose?.();
    }
  };

  const handleSubmit = (): void => {
    if (task) {
      onSubmit({ ...task, ...prepareTaskFields(taskFields) });
      handleEditMode();
    } else {
      onSubmit({ id: getRandomNumber(), type: KanbanTaskTypeEnum.TODO, ...prepareTaskFields(taskFields) });
    }
  };

  const handleValidate =
    (name: keyof ITaskFieldsErrorsState) =>
    (value: boolean): void => {
      setErrors((prev) => ({ ...prev, [name]: value }));
    };

  const handleOnDrag = (event: DragEvent<HTMLDivElement>, task?: IKanbanTask): void => {
    if (!task) {
      return;
    }

    event.dataTransfer.setData(KANBAN_TASK_DRAG_KEY, JSON.stringify(task));
  };

  const resetState = (): void => {
    if (!task) {
      return;
    }

    setTaskFields(prepareTaskState(task));
    setErrors(DEFAULT_TASK_ERRORS_STATE);
  };

  return {
    taskFields,
    isEditMode,
    errors,
    isValid,
    handleClickTrash,
    handleChangeField,
    handleClickCross,
    handleSubmit,
    handleValidate,
    handleEditMode,
    handleOnDrag,
  };
};
