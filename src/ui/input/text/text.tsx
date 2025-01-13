import { ChangeEvent, FC } from 'react';
import clsx from 'clsx';
import styles from './text.module.scss';

type InputTextProps = {
  value?: string;
  type?: 'tel' | 'text';
  placeholder?: string;
  onValueChange?: (value: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  onBlur?: VoidFunction;
};

export const InputText: FC<InputTextProps> = (props) => {
  const { onValueChange, onChange, error, ...restProps } = props;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
    onChange?.(event);
  };

  return (
    <input
      className={clsx(styles.input, error && styles.error)}
      {...restProps}
      onChange={onInputChange}
      autoComplete='off'
    />
  );
};
