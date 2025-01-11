import { ChangeEvent, FC } from 'react';
import { SearchIcon } from '../icons';
import styles from './input.module.scss';

type InputProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
};

export const Input: FC<InputProps> = ({ value, onValueChange, placeholder }) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };

  return (
    <div className={styles.container}>
      <input className={styles.input} value={value} onChange={onInputChange} placeholder={placeholder} />
      <span className={styles.icon}>
        <SearchIcon />
      </span>
    </div>
  );
};
