import { useMemo, useState } from 'react';
import type { TTaskFieldsErrorsState, TTaskFieldsState } from './kanbanTask.type';
import { TKanbanTask, TKanbanTaskType } from '@/store/kanban.type';
import { convertToISODate, getDateMonthYear } from '@/utils/dateConvert';

type TKanbanTaskHookParams = {
  task: TKanbanTask;
  onDelete: (id: number, type: TKanbanTaskType) => void;
  onSubmit: (task: TKanbanTask) => void;
};

const defaultErrorsState = {
  text: false,
  startDay: false,
  endDay: false,
};

const prepareState = (task: TKanbanTask) => {
  return {
    startDay: getDateMonthYear(task.startDay),
    endDay: getDateMonthYear(task.endDay),
    text: task.text,
  };
};

export const useKanbanTask = ({ task, onDelete, onSubmit }: TKanbanTaskHookParams) => {
  const [taskFields, setTaskFields] = useState<TTaskFieldsState>(prepareState(task));
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<TTaskFieldsErrorsState>(defaultErrorsState);
  const isValid = useMemo(() => !Object.values(errors).some(Boolean), [errors]);

  const onTrashClick = () => {
    onDelete(task.id, task.type);
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const onFieldChange = (name: keyof TTaskFieldsState, value: number | string) => {
    setTaskFields((prev) => ({ ...prev, [name]: value }));
  };

  const resetState = () => {
    setTaskFields(prepareState(task));
    setErrors(defaultErrorsState);
  };

  const onCrossClick = () => {
    handleEditMode();
    resetState();
  };

  const onSubmitClick = () => {
    onSubmit({ ...task, ...prepareTask(taskFields) });
    handleEditMode();
  };

  const onValidate = (name: keyof TTaskFieldsErrorsState, value: boolean) => {
    setErrors((prev) => ({ ...prev, [name]: value }));
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
  };
};
