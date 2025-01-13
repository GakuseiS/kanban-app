import { useMemo, useState, DragEvent } from 'react';
import type { TTaskFieldsErrorsState, TTaskFieldsState } from './kanbanTask.type';
import type { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { convertToISODate, getDateMonthYear } from '@/utils/dateConvert';
import { KANBAN_TASK_DRAG_KEY } from '@/constants/kanban';
import { getRandomNumber } from '@/utils/randomNumber';

type TKanbanTaskHookParams = {
  task?: TKanbanTask;
  onDelete?: (id: number, type: TKanbanTaskType) => void;
  onSubmit: (task: TKanbanTask) => void;
  onClose?: VoidFunction;
};

const defaultErrorsState = {
  text: false,
  startDay: false,
  endDay: false,
};

const prepareState = (task?: TKanbanTask) => {
  return {
    startDay: task ? getDateMonthYear(task.startDay) : '',
    endDay: task ? getDateMonthYear(task.endDay) : '',
    text: task?.text ?? '',
  };
};

export const useKanbanTask = ({ task, onDelete, onSubmit, onClose }: TKanbanTaskHookParams) => {
  const [taskFields, setTaskFields] = useState<TTaskFieldsState>(prepareState(task));
  const [isEditMode, setEditMode] = useState<boolean>(!task);
  const [errors, setErrors] = useState<TTaskFieldsErrorsState>(defaultErrorsState);
  const isValid = useMemo(
    () => !Object.values(errors).some(Boolean) && Object.values(taskFields).every(Boolean),
    [errors, taskFields],
  );

  const onTrashClick = () => {
    if (!task) return;
    onDelete?.(task.id, task.type);
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const onFieldChange = (name: keyof TTaskFieldsState, value: number | string) => {
    setTaskFields((prev) => ({ ...prev, [name]: value }));
  };

  const resetState = () => {
    if (!task) return;
    setTaskFields(prepareState(task));
    setErrors(defaultErrorsState);
  };

  const onCrossClick = () => {
    if (task) {
      handleEditMode();
      resetState();
    } else {
      onClose?.();
    }
  };

  const onSubmitClick = () => {
    if (task) {
      onSubmit({ ...task, ...prepareTask(taskFields) });
      handleEditMode();
    } else {
      onSubmit({ id: getRandomNumber(), type: 'todo', ...prepareTask(taskFields) });
    }
  };

  const onValidate = (name: keyof TTaskFieldsErrorsState, value: boolean) => {
    setErrors((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnDrag = (event: DragEvent<HTMLDivElement>, task?: TKanbanTask) => {
    if (!task) return;
    event.dataTransfer.setData(KANBAN_TASK_DRAG_KEY, JSON.stringify(task));
  };

  const prepareTask = (state: TTaskFieldsState) => {
    return {
      startDay: new Date(convertToISODate(state.startDay)).valueOf(),
      endDay: new Date(convertToISODate(state.endDay)).valueOf(),
      text: state.text,
    };
  };

  return {
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
    handleOnDrag,
  };
};
