import { ChangeEvent, FC } from 'react';
import clsx from 'clsx';

import styles from './text.module.scss';

type Props = {
  /** Значение */
  value?: string;
  /** Тип поля */
  type?: 'tel' | 'text';
  /** Плейсхолдер */
  placeholder?: string;
  /** Есть ли ошибка */
  hasError?: boolean;
  /** Обработчик выхода из фокуса */
  onBlur?: VoidFunction;
  /** Обработчик изменения значения */
  onValueChange?: (value: string) => void;
  /** Обработчик изменения */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

/** Текстовое поле */
export const InputText: FC<Props> = (props) => {
  const { onValueChange, onChange, hasError, ...restProps } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onValueChange?.(event.target.value);
    onChange?.(event);
  };

  const inputClassName = clsx(styles.input, hasError && styles.error);

  return <input className={inputClassName} {...restProps} onChange={handleChange} autoComplete='off' />;
};
